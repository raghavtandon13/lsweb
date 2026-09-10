import { inr } from "@/lib/format";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button-link";
import type { Offer } from "@/lib/mock";

export function LenderCard({ offer }: { offer: Offer }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted sm:text-sm">{offer.lender}</p>
            <h3 className="font-serif text-lg text-navy sm:text-xl">{offer.product}</h3>
          </div>
          {offer.recommended && (
            <span className="shrink-0 rounded-full bg-[#fff8e4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c48a10] sm:text-[11px]">
              Best fit
            </span>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted">Amount</dt>
            <dd className="font-semibold text-spark-gold">{inr(offer.amount)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">EMI</dt>
            <dd className="font-semibold text-navy">{inr(offer.emi)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">ROI</dt>
            <dd className="font-semibold text-navy">{offer.roi}% p.a.</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Tenure</dt>
            <dd className="font-semibold text-navy">{offer.tenureMonths} mo</dd>
          </div>
        </dl>
        {offer.why && <p className="mt-3 text-xs leading-5 text-muted sm:text-sm">{offer.why}</p>}
        <ButtonLink
          href="/dashboard/applications/SU-240918-1842"
          size="md"
          className="mt-4 w-full"
          onClick={() =>
            track("select_item", {
              item_id: offer.id,
              item_name: offer.lender,
              item_category: "loan_offer",
              item_variant: offer.product,
            })
          }
        >
          Apply with {offer.lender}
        </ButtonLink>
      </div>
    </article>
  );
}
