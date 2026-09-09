"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadApply, saveApply } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";

const lines = [
  "Checking pincode…",
  "Matching with lenders…",
  "Preparing offers…",
];

export default function ProcessingPage() {
  const router = useRouter();
  const [i, setI] = useState(0);

  useEffect(() => {
    const s = loadApply();
    if (!s?.consents?.terms) {
      router.replace("/apply/consent");
      return;
    }
    const tick = window.setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 700);
    const done = window.setTimeout(() => {
      const current = loadApply();
      if (!current) return;
      const income = Number(current.income ?? 0);
      const noOffer = income < 15000 || current.employment === "student";
      saveApply({
        ...current,
        status: noOffer ? "no_offer" : "eligible",
      });
      trackFunnel(5, "eligibility_completed", { outcome: noOffer ? "no_offer" : "eligible" });
      router.replace(noOffer ? "/apply/no-offer" : "/apply/offers");
    }, 2800);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [router]);

  return (
    <div className="card p-8 text-center">
      <div className="mx-auto h-14 w-14 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      <h1 className="mt-6 font-serif text-3xl text-navy">Eligibility</h1>
      <p className="mt-3 text-sm text-muted">{lines[i]}</p>
      <p className="mt-8 text-xs text-muted">Please wait. Do not close this page.</p>
    </div>
  );
}
