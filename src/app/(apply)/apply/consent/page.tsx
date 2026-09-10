"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConsentLine } from "@/components/apply/consent-line";
import { EditDetailsBar } from "@/components/apply/edit-details-bar";
import { loadApply, saveApply } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";
import { maskMobile } from "@/lib/format";

export default function ConsentPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [bureau, setBureau] = useState(false);
  const [shareLenders, setShareLenders] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const s = loadApply();
    if (!s?.pincode || !s.email) router.replace("/apply/details");
    else if (!s.termsAccepted) router.replace("/apply");
    else setMobile(s.mobile);
  }, [router]);

  function sendOtp() {
    setOtpSent(true);
    setError("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!otpSent) {
      setError("Send the CIBIL OTP first.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit CIBIL OTP.");
      return;
    }
    if (!bureau || !shareLenders) {
      setError("Tick the CIBIL check and lender-share boxes. WhatsApp is optional.");
      return;
    }
    const s = loadApply();
    if (!s?.termsAccepted) {
      setError("Accept Terms on the name & mobile step before eligibility.");
      return;
    }
    saveApply({
      ...s,
      consents: { bureau, shareLenders, terms: true, whatsapp },
      cibilOtpVerified: true,
      applicationId: s.applicationId ?? `SU-${Date.now().toString().slice(-8)}`,
      status: "processing",
    });
    trackFunnel(4, "consent_recorded", { whatsapp_opt_in: whatsapp, cibil_otp: true });
    router.push("/apply/processing");
  }

  return (
    <>
      <EditDetailsBar />
    <form onSubmit={onSubmit} className="card p-4 sm:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 4</p>
      <h1 className="mt-1.5 font-serif text-[1.7rem] leading-tight text-navy sm:text-3xl">CIBIL check</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        Soft CIBIL report to match lenders. OTP first, then the boxes below.
      </p>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#b7e4c7] bg-[#e8f8ef] px-3 py-3 sm:px-4">
        <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#2f9e6d]" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">It will not affect your score</p>
          <p className="mt-0.5 text-xs leading-5 text-muted">
            Soft enquiry for matching. A hard pull only if you accept an offer.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <span className="input-label">CIBIL OTP</span>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="input min-w-0 flex-1 tracking-[0.35em] sm:tracking-[0.45em]"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            disabled={!otpSent}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder={otpSent ? "••••••" : "Send OTP first"}
            aria-label="CIBIL OTP"
          />
          <Button type="button" variant="outline" size="md" className="w-full shrink-0 sm:w-auto" onClick={sendOtp}>
            {otpSent ? "Resend" : "Send OTP"}
          </Button>
        </div>
        <p className="mt-1.5 text-xs text-muted">
          {otpSent
            ? `Sent to ${mobile ? maskMobile(mobile) : "your mobile"}. Demo: any 6 digits.`
            : "Goes to the mobile registered with CIBIL (same number in this demo)."}
        </p>
      </div>

      <div className="mt-5">
        <span className="input-label">Consents</span>
        <div className="rounded-2xl border border-line bg-ivory px-3 sm:px-4">
          <ConsentLine
            id="consent-bureau"
            checked={bureau}
            onChange={setBureau}
            label="I authorise a CIBIL / bureau enquiry for this application."
            more="LoanSparrow requests a soft enquiry to fetch your score and summary. It will not affect your score. Used only to match partner NBFCs and banks for this application."
          />
          <ConsentLine
            id="consent-share"
            checked={shareLenders}
            onChange={setShareLenders}
            label="I agree to share my profile with partner NBFCs and banks."
            more="We share name, PAN, mobile, pincode, income, employment type and the bureau summary with lenders who can price this ticket. You pick a lender before KYC."
          />
          <ConsentLine
            id="consent-wa"
            checked={whatsapp}
            onChange={setWhatsapp}
            label="Optional: send updates on WhatsApp."
            more="Application status and offer reminders only. Opt out any time from the thread or support."
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      <Button type="submit" size="lg" className="mt-5 w-full">
        Fetch CIBIL & match lenders
      </Button>
    </form>
    </>
  );
}
