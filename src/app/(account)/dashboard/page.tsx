import Link from "next/link";
import { mockApplications, mockCredit, mockOffers } from "@/lib/mock";
import { inr } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button-link";

export default function DashboardHomePage() {
  const open = mockApplications.find((a) => a.status === "Offers ready");

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Good afternoon</p>
        <h1 className="mt-2 font-serif text-4xl text-navy">Dashboard</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="card p-6 lg:col-span-2">
          <p className="text-sm text-muted">Active application</p>
          {open ? (
            <>
              <h2 className="mt-2 font-serif text-2xl text-navy">{open.product}</h2>
              <p className="mt-1 text-sm text-muted">
                {open.id} · {inr(open.amount)} · {open.status}
              </p>
              <ButtonLink href={`/dashboard/applications/${open.id}`} className="mt-5">
                View timeline
              </ButtonLink>
            </>
          ) : (
            <p className="mt-3 text-muted">No active application. Check eligibility to start.</p>
          )}
        </article>
        <article className="rounded-2xl border border-line bg-navy p-6 text-white">
          <p className="text-[11px] uppercase tracking-wider text-gold">Credit snapshot</p>
          <p className="mt-3 font-serif text-5xl">{mockCredit.score}</p>
          <p className="mt-1 text-sm text-white/70">
            {mockCredit.band} · updated {mockCredit.updated}
          </p>
          <Link href="/credit-score" className="mt-4 inline-block text-sm text-gold">
            Score guide →
          </Link>
        </article>
      </div>
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-serif text-2xl text-navy">Available offers</h2>
          <Link href="/dashboard/offers" className="text-sm text-gold-deep">
            All
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {mockOffers.slice(0, 2).map((o) => (
            <div key={o.id} className="rounded-2xl border border-line bg-white p-5">
              <p className="text-sm text-muted">{o.lender}</p>
              <p className="font-serif text-xl text-navy">{inr(o.amount)}</p>
              <p className="text-sm text-muted">
                EMI {inr(o.emi)} · {o.roi}%
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
