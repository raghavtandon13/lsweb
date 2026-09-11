"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildCibilReport } from "@/lib/cibil";
import { acceptedOffers, simulateLenderPush } from "@/lib/lender-outcomes";
import { resolveDemoCustomer } from "@/lib/demo-customers";
import { loadApply, saveApply } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";

const lines = ["Checking duplicates…", "Pushing to lenders…", "Saving lender responses…"];

export default function ProcessingPage() {
  const router = useRouter();
  const [i, setI] = useState(0);

  useEffect(() => {
    const s = loadApply();
    if (!s?.consents?.bureau || !s.cibilOtpVerified) {
      router.replace("/apply/consent");
      return;
    }
    const tick = window.setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 700);
    const done = window.setTimeout(() => {
      const current = loadApply();
      if (!current) return;
      const demo = resolveDemoCustomer(current);
      const lenderResponses = demo?.lenderResponses ?? simulateLenderPush(current);
      const noOffer = !acceptedOffers(lenderResponses).length;
      saveApply({
        ...current,
        demoCustomerId: demo?.id,
        cibil: demo?.cibil ?? buildCibilReport(current),
        lenderResponses,
        status: noOffer ? "no_offer" : "eligible",
      });
      trackFunnel(5, "eligibility_completed", { outcome: noOffer ? "no_offer" : "eligible" });
      router.replace("/apply/cibil");
    }, 2600);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [router]);

  return (
    <div className="card p-8 text-center">
      <div className="mx-auto h-14 w-14 rounded-full border-2 border-spark-gold" />
      <h1 className="mt-6 font-serif text-3xl text-navy">Checking CIBIL</h1>
      <p className="mt-3 text-sm text-muted">{lines[i]}</p>
      <p className="mt-6 text-xs font-semibold text-[#2f9e6d]">It will not affect your score</p>
      <p className="mt-2 text-xs text-muted">Please wait. Do not close this page.</p>
    </div>
  );
}
