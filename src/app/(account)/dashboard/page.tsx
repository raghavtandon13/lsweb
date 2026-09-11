"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockApplications } from "@/lib/mock";
import { inr } from "@/lib/format";
import { sessionAcceptedOffers, sessionCustomer, sessionOfferState } from "@/lib/demo-customers";
import { ButtonLink } from "@/components/ui/button-link";
import { DashHead, StatusPill } from "@/components/dashboard/bits";

export default function DashboardHomePage() {
  const [name, setName] = useState("there");
  const [score, setScore] = useState<number | null>(null);
  const [band, setBand] = useState("");
  const [updated, setUpdated] = useState("");
  const [offerState, setOfferState] = useState<"yes" | "no" | "unknown">("unknown");
  const [offers, setOffers] = useState<ReturnType<typeof sessionAcceptedOffers>>([]);

  useEffect(() => {
    const { auth, demo, apply } = sessionCustomer();
    if (auth?.name) setName(auth.name.split(" ")[0]);
    const cibil = demo?.cibil ?? apply?.cibil;
    if (cibil) {
      setScore(cibil.score);
      setBand(cibil.band);
      setUpdated(cibil.updated);
    }
    setOfferState(sessionOfferState());
    setOffers(sessionAcceptedOffers());
  }, []);

  const hasOffers = offerState === "yes";

  const open = hasOffers ? mockApplications.find((a) => a.status === "Offers ready") : undefined;

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
                <p className="mt-3 flex-1 text-sm text-muted">
                  {offerState === "no"
                    ? "No loan offer. No worries — make a few changes by Credit Cure to get eligible."
                    : "No active application. Check eligibility to start."}
                </p>
                <ButtonLink href={offerState === "no" && score ? "/apply/cibil" : "/apply"} size="md" className="mt-5 w-full sm:w-auto">
                  {offerState === "no" && score ? "Credit Cure" : "Check eligibility"}
                </ButtonLink>
              </>
            )}
          </div>
        </article>

        <article className="flex flex-col rounded-[1.25rem] bg-navy p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-spark-gold">Credit snapshot</p>
          <p className="mt-3 font-serif text-5xl text-spark-gold">{score ?? "—"}</p>
          <p className="mt-1 text-sm text-white/75">
            {score ? `${band} · ${updated}` : "Score appears after CIBIL check"}
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
        {hasOffers ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {offers.slice(0, 2).map((o) => (
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
        ) : (
          <p className="rounded-2xl border border-line bg-white p-5 text-sm leading-6 text-muted">
            {offerState === "no"
              ? "No loan offer. No worries — make a few changes by Credit Cure to get eligible."
              : "Offers appear here after a CIBIL check on this mobile."}
          </p>
        )}
      </section>
    </div>
  );
}
