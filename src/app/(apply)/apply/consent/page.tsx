"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loadApply, saveApply } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";

export default function ConsentPage() {
  const router = useRouter();
  const [bureau, setBureau] = useState(false);
  const [shareLenders, setShareLenders] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const s = loadApply();
    if (!s?.pincode) router.replace("/apply/details");
    else if (!s.termsAccepted) router.replace("/apply");
  }, [router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!bureau || !shareLenders) {
      setError("Bureau and lender-share are required. WhatsApp is optional.");
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
      applicationId: s.applicationId ?? `SU-${Date.now().toString().slice(-8)}`,
      status: "processing",
    });
    trackFunnel(4, "consent_recorded", { whatsapp_opt_in: whatsapp });
    router.push("/apply/processing");
  }

  const boxes: { key: "bureau" | "share" | "wa"; label: string; value: boolean; set: (v: boolean) => void }[] = [
    {
      key: "bureau",
      value: bureau,
      set: setBureau,
      label: "I authorise a credit bureau enquiry for this application.",
    },
    {
      key: "share",
      value: shareLenders,
      set: setShareLenders,
      label: "I agree that LoanSparrow may share my profile with partner NBFCs/banks to fetch offers.",
    },
    {
      key: "wa",
      value: whatsapp,
      set: setWhatsapp,
      label: "Optional: updates on WhatsApp.",
    },
  ];

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 4</p>
      <h1 className="mt-2 font-serif text-3xl text-navy">Consent</h1>
      <p className="mt-2 text-sm text-muted">
        You already accepted Terms, Privacy Policy, and Disclaimer when we sent OTP. Bureau and lender-share are still required. WhatsApp is optional.
      </p>
      <div className="mt-8 space-y-3">
        {boxes.map((b) => (
          <label key={b.key} className="flex gap-3 rounded-2xl border border-line bg-ivory p-4 text-sm leading-6">
            <input
              type="checkbox"
              className="mt-1 accent-navy"
              checked={b.value}
              onChange={(e) => b.set(e.target.checked)}
            />
            <span>{b.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-danger">{error}</p>}
      <Button type="submit" size="lg" className="mt-6 w-full">
        Run eligibility
      </Button>
    </form>
  );
}
