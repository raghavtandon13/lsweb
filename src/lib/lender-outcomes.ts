import type { ApplyState } from "@/lib/session";
import { isNoOfferProfile } from "@/lib/cibil";
import { mockOffers, type Offer } from "@/lib/mock";

/** Saved lender / NBFC API outcome. Only `accept` is shown in the UI. */
export type LenderOutcome = "accept" | "reject" | "dedupe";

export type LenderResponse = {
  lenderId: string;
  lenderName: string;
  /** Lower number is pushed first. */
  priority: number;
  outcome: LenderOutcome;
  reason?: string;
  offer?: Offer;
};

export function acceptedOffers(responses: LenderResponse[] | undefined): Offer[] {
  if (!responses?.length) return [];
  return responses
    .filter((r) => r.outcome === "accept" && r.offer)
    .sort((a, b) => a.priority - b.priority)
    .map((r) => r.offer as Offer);
}

export function hasAcceptOutcome(responses: LenderResponse[] | undefined) {
  return acceptedOffers(responses).length > 0;
}

const FALLBACK_LENDERS = [
  { lenderId: "ln_aarohan", lenderName: "Aarohan Finance", priority: 1 },
  { lenderId: "ln_northstar", lenderName: "Northstar NBFC", priority: 2 },
  { lenderId: "ln_kaveri", lenderName: "Kaveri Capital", priority: 3 },
];

/** Demo stand-in for: filter age/income/pincode → dedupe → create lead → push by priority. */
export function simulateLenderPush(apply: ApplyState): LenderResponse[] {
  if (isNoOfferProfile(apply)) {
    return [
      { ...FALLBACK_LENDERS[0], outcome: "dedupe", reason: "Open file already exists with this lender." },
      { ...FALLBACK_LENDERS[1], outcome: "reject", reason: "Income / employment outside policy." },
      { ...FALLBACK_LENDERS[2], outcome: "reject", reason: "Pincode or ticket not on book." },
    ];
  }
  return mockOffers.map((offer, i) => ({
    lenderId: offer.id,
    lenderName: offer.lender,
    priority: i + 1,
    outcome: "accept" as const,
    offer,
  }));
}
