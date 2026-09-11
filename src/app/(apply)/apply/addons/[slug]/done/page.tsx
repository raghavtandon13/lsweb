"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getAddon } from "@/lib/addons";
import { loadApply, type ApplyState } from "@/lib/session";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button-link";

const SUDHAR_WEEKS = [
  { w: "Week 1", t: "Clear overdue", d: "Pay the oldest late dues first. One missed month hurts more than utilisation." },
  { w: "Week 2", t: "Cut cards to 30%", d: "Pay revolving balances before the statement date. Do not close the oldest card." },
  { w: "Week 3", t: "Stop shopping credit", d: "No new hard applications. Soft matching on LoanSparrow does not add a pull." },
  { w: "Week 4", t: "One on-time cycle", d: "Autopay minimum + extra to principal. Recheck score after the bureau cycle." },
];

export default function AddonDonePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const addon = getAddon(slug ?? "");
  const [apply, setApply] = useState<ApplyState | null>(null);

  useEffect(() => {
    const s = loadApply();
    if (!addon || !s?.cibil || !(s.purchasedAddons ?? []).includes(addon.slug)) {
      router.replace("/apply/addons");
      return;
    }
    setApply(s);
  }, [addon, router]);

  if (!addon || !apply?.cibil) return null;
  const r = apply.cibil;

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2f9e6d]">Paid · demo</p>
      <h1 className="font-serif text-3xl text-navy">{addon.name}</h1>

      {addon.slug === "sudhar" && (
        <ol className="space-y-3">
          {SUDHAR_WEEKS.map((x) => (
            <li key={x.w} className="card p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-spark-gold">{x.w}</p>
              <h2 className="mt-1 font-serif text-xl text-navy">{x.t}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{x.d}</p>
            </li>
          ))}
        </ol>
      )}

      {addon.slug === "builder" && (
        <div className="card p-5 sm:p-6">
          <p className="text-sm text-muted">Tradeline (demo)</p>
          <h2 className="mt-1 font-serif text-2xl text-navy">₹500 credit-builder</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">Tenure</dt>
              <dd className="font-semibold text-navy">6 months</dd>
            </div>
            <div>
              <dt className="text-muted">Reported as</dt>
              <dd className="font-semibold text-navy">Instalment loan</dd>
            </div>
            <div>
              <dt className="text-muted">EMI (demo)</dt>
              <dd className="font-semibold text-navy">₹0 extra</dd>
            </div>
            <div>
              <dt className="text-muted">Hard enquiry</dt>
              <dd className="font-semibold text-[#2f9e6d]">None</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-muted">
            Amount stays parked. On-time reporting is what thickens a thin file like {apply.name?.split(" ")[0] ?? "this"}’s.
          </p>
        </div>
      )}

      {addon.slug === "report" && (
        <>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-spark-gold">{r.band}</p>
            <p className="font-serif text-4xl text-navy">{r.score}</p>
            <p className="mt-1 text-sm text-muted">
              {r.accounts} accounts · {r.utilisation}% utilisation · {r.enquiries90d} enquiries / 90d
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="font-serif text-xl text-navy">Why this score</h2>
            {(r.issues ?? []).map((issue) => (
              <article key={issue.title} className="card p-4 sm:p-5">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                    issue.weight === "high" && "bg-[#fff1ec] text-[#c24141]",
                    issue.weight === "medium" && "bg-[#fff8e4] text-[#c48a10]",
                    issue.weight === "low" && "bg-[#e8f8ef] text-[#2f9e6d]",
                  )}
                >
                  {issue.weight}
                </span>
                <h3 className="mt-2 font-serif text-lg text-navy">{issue.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{issue.why}</p>
                <p className="mt-2 text-sm font-medium text-navy">Fix: {issue.fix}</p>
              </article>
            ))}
          </div>
        </>
      )}

      <ButtonLink href="/apply/cibil" variant="outline" className="w-full">
        Back to score
      </ButtonLink>
      <Link href="/apply/addons" className="block text-center text-sm font-semibold text-spark-gold">
        Other add-ons
      </Link>
    </div>
  );
}
