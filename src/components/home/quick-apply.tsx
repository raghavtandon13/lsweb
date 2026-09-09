"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { isValidMobile, saveApply } from "@/lib/session";
import { track, trackFunnel } from "@/lib/analytics";
import { TERMS_REQUIRED_MESSAGE, TermsAccept } from "@/components/apply/terms-accept";
import { cn } from "@/lib/cn";

export function QuickApply({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const m = mobile.replace(/\D/g, "").slice(-10);
    if (n.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (!isValidMobile(m)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!termsAccepted) {
      setError(TERMS_REQUIRED_MESSAGE);
      return;
    }
    saveApply({
      name: n,
      mobile: m,
      otpSentAt: new Date().toISOString(),
      status: "draft",
      termsAccepted: true,
    });
    track("generate_lead", { lead_source: "home_quick_apply" });
    trackFunnel(1, "apply_start", { lead_source: "home_quick_apply" });
    router.push("/apply/verify");
  }

  return (
    <div
      className={cn(
        "overflow-hidden border border-line bg-white/95 shadow-lift backdrop-blur-sm",
        !embedded && "rounded-3xl",
      )}
    >
      <div className="h-1.5 bg-gradient-to-r from-gold via-navy-soft to-navy" />
      <form onSubmit={onSubmit} className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-deep">Get your loan offer</p>
        <h2 className="mt-3 font-serif text-3xl text-navy">Start in 2 minutes</h2>
        <p className="mt-2 text-base text-ink">Enter your name and mobile. We send an OTP next.</p>

        <Field label="Name" className="mt-7">
          <input
            className="input"
            autoComplete="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Mobile number" className="mt-4">
          <div className="flex overflow-hidden rounded-[0.85rem] border border-line bg-white focus-within:border-gold focus-within:shadow-[0_0_0_4px_rgba(13,59,63,0.16)]">
            <span className="grid place-items-center border-r border-line bg-ivory px-3 text-base font-semibold text-navy">
              +91
            </span>
            <input
              className="w-full bg-transparent px-3 py-3.5 text-base outline-none"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </Field>

        <TermsAccept
          checked={termsAccepted}
          onChange={(next) => {
            setTermsAccepted(next);
            if (next) setError("");
          }}
        />

        {error && <p className="mt-3 text-base text-danger">{error}</p>}

        <Button type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={!termsAccepted}>
          Get OTP & continue
        </Button>

        <div className="mt-5 flex items-center justify-center gap-5 text-[15px] text-navy">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-gold" /> Secure
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <BadgeCheck className="h-4 w-4 text-gold" /> Free to check
          </span>
        </div>
      </form>
    </div>
  );
}
