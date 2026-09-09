"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockOffers } from "@/lib/mock";
import { inr } from "@/lib/format";
import { loadApply } from "@/lib/session";
import { track, trackFunnel } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button-link";

export default function OffersPage() {
  const router = useRouter();

  useEffect(() => {
    const s = loadApply();
    if (s?.status === "no_offer") router.replace("/apply/no-offer");
    else if (s?.status !== "eligible") router.replace("/apply");
    else trackFunnel(6, "offers_shown");
  }, [router]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Eligible</p>
        <h1 className="mt-2 font-serif text-3xl text-navy">Your loan offers</h1>
        <p className="mt-2 text-sm text-muted">Pick a lender to continue KYC.</p>
      </div>
      {mockOffers.map((o) => (
        <article key={o.id} className="card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">{o.lender}</p>
              <h2 className="font-serif text-2xl text-navy">{o.product}</h2>
            </div>
            {o.recommended && (
              <span className="rounded-full bg-gold-wash px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-deep">
                Fit
              </span>
            )}
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">Amount</dt>
              <dd className="font-semibold text-navy">{inr(o.amount)}</dd>
            </div>
            <div>
              <dt className="text-muted">EMI</dt>
              <dd className="font-semibold text-navy">{inr(o.emi)}</dd>
            </div>
            <div>
              <dt className="text-muted">ROI</dt>
              <dd className="font-semibold text-navy">{o.roi}% p.a.</dd>
            </div>
            <div>
              <dt className="text-muted">Fee</dt>
              <dd className="font-semibold text-navy">{o.processingFee}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">{o.highlights.join(" · ")} · {o.disbursal}</p>
          <ButtonLink
            href="/dashboard/offers"
            className="mt-5 w-full"
            onClick={() =>
              track("select_item", {
                item_id: o.id,
                item_name: o.lender,
                item_category: "loan_offer",
                item_variant: o.product,
              })
            }
          >
            Continue with {o.lender}
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
