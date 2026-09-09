"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { isValidMobile, loadApply, saveApply } from "@/lib/session";
import { track, trackFunnel } from "@/lib/analytics";
import { TERMS_REQUIRED_MESSAGE, TermsAccept } from "@/components/apply/terms-accept";

export default function ApplyStartPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const existing = loadApply();
    if (existing?.name) setName(existing.name);
    if (existing?.mobile) setMobile(existing.mobile);
    if (existing?.termsAccepted) setTermsAccepted(true);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const m = mobile.replace(/\D/g, "").slice(-10);
    if (n.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (!isValidMobile(m)) {
      setError("Enter a valid 10-digit Indian mobile.");
      return;
    }
    if (!termsAccepted) {
      setError(TERMS_REQUIRED_MESSAGE);
      return;
    }
    saveApply({
      ...(loadApply() ?? {}),
      name: n,
      mobile: m,
      otpSentAt: new Date().toISOString(),
      status: "draft",
      termsAccepted: true,
    });
    track("generate_lead", { lead_source: "apply_form" });
    trackFunnel(1, "apply_start", { lead_source: "apply_form" });
    router.push("/apply/verify");
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 1</p>
      <h1 className="mt-2 font-serif text-3xl text-navy">Enter name and mobile</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        We will send an OTP to this number. No credit check on this step.
      </p>
      <div className="mt-8 space-y-5">
        <Field label="Name">
          <input
            className="input"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (as per PAN)"
          />
        </Field>
        <Field label="Mobile number" hint="OTP will be sent here.">
          <input
            className="input"
            inputMode="numeric"
            autoComplete="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile"
          />
        </Field>
        <TermsAccept
          checked={termsAccepted}
          onChange={(next) => {
            setTermsAccepted(next);
            if (next) setError("");
          }}
          className="mt-0"
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={!termsAccepted}>
          Send OTP
        </Button>
      </div>
    </form>
  );
}
