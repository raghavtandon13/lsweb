"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockApplications, mockCredit, mockOffers } from "@/lib/mock";
import { inr } from "@/lib/format";
import { loadAuth } from "@/lib/session";
import { ButtonLink } from "@/components/ui/button-link";
import { DashHead, StatusPill } from "@/components/dashboard/bits";

export default function DashboardHomePage() {
  const open = mockApplications.find((a) => a.status === "Offers ready");
  const [name, setName] = useState("there");

  useEffect(() => {
    const auth = loadAuth();
    if (auth?.name) setName(auth.name.split(" ")[0]);
  }, []);

  return (
    <div className="space-y-6">
      <DashHead eyebrow={`Hi, ${name}`} title="Dashboard" body="Track applications, offers and your credit snapshot." />

      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        <article className="flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-lift lg:col-span-2">
          <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">Active application</p>
            {open ? (
              <>
                <h2 className="mt-2 font-serif text-xl text-navy sm:text-2xl">{open.product}</h2>
                <p className="mt-1 text-sm text-muted">
                  {open.id} · {inr(open.amount)}
                </p>
                <div className="mt-3">
                  <StatusPill status={open.status} />
                </div>
                <div className="mt-auto pt-5">
                  <ButtonLink href={`/dashboard/applications/${open.id}`} size="md" className="w-full sm:w-auto">
                    View timeline
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 flex-1 text-sm text-muted">No active application. Check eligibility to start.</p>
                <ButtonLink href="/apply" size="md" className="mt-5 w-full sm:w-auto">
                  Check eligibility
                </ButtonLink>
              </>
            )}
          </div>
        </article>

        <article className="flex flex-col rounded-[1.25rem] bg-navy p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-spark-gold">Credit snapshot</p>
          <p className="mt-3 font-serif text-5xl text-spark-gold">{mockCredit.score}</p>
          <p className="mt-1 text-sm text-white/75">
            {mockCredit.band} · {mockCredit.updated}
          </p>
          <Link href="/credit-score" className="mt-auto pt-4 text-sm font-semibold text-spark-gold">
            Score guide →
          </Link>
        </article>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl text-navy sm:text-2xl">Available offers</h2>
          <Link href="/dashboard/offers" className="shrink-0 text-sm font-semibold text-spark-gold">
            See all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {mockOffers.slice(0, 2).map((o) => (
            <article key={o.id} className="flex flex-col rounded-2xl border border-line bg-white p-5">
              <p className="text-sm text-muted">{o.lender}</p>
              <p className="mt-1 font-serif text-xl text-navy">{inr(o.amount)}</p>
              <p className="mt-1 flex-1 text-sm text-muted">
                EMI {inr(o.emi)} · {o.roi}% p.a.
              </p>
              <div className="mt-4">
                <ButtonLink href="/dashboard/offers" variant="outline" size="sm" className="w-full sm:w-auto">
                  View offer
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
