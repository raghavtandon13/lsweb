/**
 * Dummy customers are JSON files in src/data/dummy-users/
 *   riya.json  — loan offers
 *   meera.json — accept offers + Credit Cure
 *   aman.json  — reject/dedupe only + Credit Cure
 *   kabir.json — reject/dedupe only + Credit Cure
 */
import type { ApplyState, EmploymentType } from "@/lib/session";
import type { CibilReport } from "@/lib/cibil";
import type { LenderResponse } from "@/lib/lender-outcomes";
import { acceptedOffers, hasAcceptOutcome } from "@/lib/lender-outcomes";
import { clearAuth, loadApply, loadAuth, normaliseMobile, saveApply } from "@/lib/session";
import riya from "@/data/dummy-users/riya.json";
import aman from "@/data/dummy-users/aman.json";
import meera from "@/data/dummy-users/meera.json";
import kabir from "@/data/dummy-users/kabir.json";

export const DEMO_CUSTOMERS_FILE = "src/data/dummy-users/";

export type DummyUserFile = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  hasLoanOffer: boolean;
  lenderResponses?: LenderResponse[];
  details: {
    name: string;
    mobile: string;
    email: string;
    pan: string;
    pincode: string;
    income: string;
    employment: EmploymentType;
    dob: string;
    amount: string;
    purpose: string;
  };
  cibil: CibilReport;
};

export const demoCustomers: DummyUserFile[] = [riya, meera, aman, kabir] as DummyUserFile[];

export function getDemoCustomer(id: string | undefined) {
  return demoCustomers.find((c) => c.id === id) ?? null;
}

export function getDemoCustomerByMobile(mobile: string | undefined) {
  if (!mobile) return null;
  const m = normaliseMobile(mobile);
  if (m.length !== 10) return null;
  return demoCustomers.find((c) => normaliseMobile(c.details.mobile) === m) ?? null;
}

/** Dummy file for this mobile only — never reuse another customer's leftover id. */
export function resolveDemoCustomer(input: { mobile?: string; demoCustomerId?: string }) {
  const byMobile = getDemoCustomerByMobile(input.mobile);
  if (byMobile) return byMobile;
  const byId = getDemoCustomer(input.demoCustomerId);
  if (byId && input.mobile && normaliseMobile(byId.details.mobile) !== normaliseMobile(input.mobile)) {
    return null;
  }
  return input.mobile ? null : byId;
}

export function sessionCustomer() {
  const auth = loadAuth();
  const apply = loadApply();
  const mobile = auth?.mobile || apply?.mobile;
  const demo = getDemoCustomerByMobile(mobile);
  const applyForMobile =
    apply && mobile && normaliseMobile(apply.mobile) === normaliseMobile(mobile) ? apply : null;
  return { auth, demo, apply: applyForMobile };
}

export function sessionOfferState(): "yes" | "no" | "unknown" {
  const { demo, apply } = sessionCustomer();
  if (apply?.lenderResponses?.length) return hasAcceptOutcome(apply.lenderResponses) ? "yes" : "no";
  if (demo?.lenderResponses?.length) return hasAcceptOutcome(demo.lenderResponses) ? "yes" : "no";
  if (demo) return demo.hasLoanOffer ? "yes" : "no";
  if (apply?.status === "no_offer") return "no";
  if (apply?.status === "eligible") return "yes";
  return "unknown";
}

export function sessionAcceptedOffers() {
  const { demo, apply } = sessionCustomer();
  if (apply?.lenderResponses?.length) return acceptedOffers(apply.lenderResponses);
  if (demo?.lenderResponses?.length) return acceptedOffers(demo.lenderResponses);
  return [];
}

export function sessionHasLoanOffers() {
  return sessionOfferState() === "yes";
}

function detailsFromDemo(demo: DummyUserFile): Partial<ApplyState> {
  const d = demo.details;
  return {
    demoCustomerId: demo.id,
    email: d.email,
    pan: d.pan,
    pincode: d.pincode,
    income: d.income,
    employment: d.employment,
    dob: d.dob,
    amount: d.amount,
    purpose: d.purpose,
  };
}

/** New lead. Different mobile = new customer (old PAN / CIBIL / dummy id dropped). */
export function beginApplyLead(input: { name: string; mobile: string; termsAccepted: boolean }) {
  const mobile = normaliseMobile(input.mobile);
  const name = input.name.trim();
  const existing = loadApply();
  const samePerson = Boolean(existing && normaliseMobile(existing.mobile) === mobile);
  const demo = getDemoCustomerByMobile(mobile);

  if (samePerson && existing) {
    saveApply({
      ...existing,
      name,
      mobile,
      otpSentAt: new Date().toISOString(),
      termsAccepted: input.termsAccepted,
      demoCustomerId: demo?.id,
      verified: false,
      cibil: undefined,
      cibilOtpVerified: false,
      consents: undefined,
      status: "draft",
      ...(demo ? detailsFromDemo(demo) : {}),
    });
    return;
  }

  saveApply({
    name,
    mobile,
    otpSentAt: new Date().toISOString(),
    status: "draft",
    termsAccepted: input.termsAccepted,
    verified: false,
    purchasedAddons: [],
    ...(demo ? detailsFromDemo(demo) : { demoCustomerId: undefined }),
  } satisfies ApplyState);
}

/** Prefill details and start apply from step 1 — same journey as a real user. */
export function startDemoJourney(id: string) {
  const c = getDemoCustomer(id);
  if (!c) return null;
  clearAuth();
  const d = c.details;
  saveApply({
    demoCustomerId: c.id,
    name: d.name,
    mobile: d.mobile,
    email: d.email,
    pan: d.pan,
    pincode: d.pincode,
    income: d.income,
    employment: d.employment,
    dob: d.dob,
    amount: d.amount,
    purpose: d.purpose,
    status: "draft",
    termsAccepted: false,
    verified: false,
    purchasedAddons: [],
  } satisfies ApplyState);
  return c;
}

export function hydrateDemoSession(mobile: string) {
  const demo = getDemoCustomerByMobile(mobile);
  if (!demo) return null;
  const d = demo.details;
  saveApply({
    demoCustomerId: demo.id,
    name: d.name,
    mobile: d.mobile,
    email: d.email,
    pan: d.pan,
    pincode: d.pincode,
    income: d.income,
    employment: d.employment,
    dob: d.dob,
    amount: d.amount,
    purpose: d.purpose,
    cibil: demo.cibil,
    lenderResponses: demo.lenderResponses ?? [],
    status: hasAcceptOutcome(demo.lenderResponses) || demo.hasLoanOffer ? "eligible" : "no_offer",
    verified: true,
    cibilOtpVerified: true,
    termsAccepted: true,
    purchasedAddons: [],
  } satisfies ApplyState);
  return demo;
}
