import { mockOffers } from "@/lib/mock";
import { inr } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button-link";

export default function DashboardOffersPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <h1 className="font-serif text-4xl text-navy">Available offers</h1>
      <p className="text-sm text-muted">
        Same cards as the eligibility result, kept here while they are still valid.
      </p>
      {mockOffers.map((o) => (
        <article key={o.id} className="card p-6">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-sm text-muted">{o.lender}</p>
              <h2 className="font-serif text-2xl text-navy">{o.product}</h2>
            </div>
            <p className="font-serif text-2xl text-navy">{inr(o.amount)}</p>
          </div>
          <p className="mt-3 text-sm text-muted">
            EMI {inr(o.emi)} · {o.roi}% p.a. · {o.processingFee} · {o.tenureMonths} months
          </p>
          <ButtonLink href="/dashboard/support" className="mt-5">
            Continue with lender
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
