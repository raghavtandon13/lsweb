"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LenderCard } from "@/components/apply/lender-card";
import { AddonCard } from "@/components/apply/addon-card";
import { Button } from "@/components/ui/button";
import { addons } from "@/lib/addons";
import { eligibleCategories } from "@/lib/cibil";
import { resolveDemoCustomer } from "@/lib/demo-customers";
import { acceptedOffers } from "@/lib/lender-outcomes";
import { mockOffers } from "@/lib/mock";
import { loadApply, type ApplyState } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export default function CibilPage() {
  const router = useRouter();
  const [apply, setApply] = useState<ApplyState | null>(null);
  const [tab, setTab] = useState<"loans" | "sudhar">("loans");

  useEffect(() => {
    const s = loadApply();
    if (!s?.cibil || !s.cibilOtpVerified) {
      router.replace("/apply/consent");
      return;
    }
    if (s.status !== "eligible" && s.status !== "no_offer") {
      router.replace("/apply/processing");
      return;
    }
    trackFunnel(5, "cibil_shown", { score_band: s.cibil.band, demo: s.demoCustomerId ?? "" });
    setApply(s);
  }, [router]);

  const report = apply?.cibil;
  if (!report || !apply) return null;

  const demo = resolveDemoCustomer(apply);
  const responses = apply.lenderResponses ?? demo?.lenderResponses;
  const cats = eligibleCategories(report.score, apply.status === "no_offer");
  const eligibleSlugs = new Set(cats.filter((c) => c.eligible).map((c) => c.slug));
  const lenders = responses?.length
    ? acceptedOffers(responses)
    : apply.status === "no_offer"
      ? []
      : mockOffers.filter((o) => !o.productSlug || eligibleSlugs.has(o.productSlug));
  const noOffer = lenders.length === 0;
  const pct = Math.round(((report.score - 300) / 600) * 100);
  const bought = new Set(apply.purchasedAddons ?? []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {demo && (
        <p className="text-xs text-muted">
          Dummy file <span className="font-mono text-[11px] text-navy">src/data/dummy-users/{demo.id}.json</span>
        </p>
      )}

      <Link href="/apply/cibil/details" className="card flex items-center gap-3 p-4 sm:gap-5 sm:p-5">
        <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 sm:h-24 sm:w-24">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(#e4b429 ${pct}%, #d9e0e0 0)` }}
          />
          <div className="absolute inset-[7px] grid place-items-center rounded-full bg-white sm:inset-2">
            <p className="font-serif text-xl text-navy sm:text-3xl">{report.score}</p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-spark-gold">{report.band}</p>
          <p className="mt-0.5 font-serif text-xl text-navy sm:text-2xl">CIBIL score</p>
          <p className="mt-1 text-xs text-muted sm:text-sm">Tap for full details · It will not affect your score</p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-navy sm:h-6 sm:w-6" aria-hidden />
      </Link>

      {report.issues?.[0] && (noOffer || report.score < 700) && (
        <div className="rounded-2xl border border-[#f5c4b6] bg-[#fff8f5] px-4 py-3 text-sm text-navy">
          <p className="font-semibold">{report.issues[0].title}</p>
          <p className="mt-1 text-xs leading-5 text-muted">{report.issues[0].why}</p>
        </div>
      )}

      <div className="flex rounded-2xl border border-line bg-white p-1">
        <button
          type="button"
          onClick={() => setTab("loans")}
          className={cn(
            "min-h-10 flex-1 rounded-xl text-sm font-semibold",
            tab === "loans" ? "bg-navy text-white" : "text-navy",
          )}
        >
          Loan offers
        </button>
        <button
          type="button"
          onClick={() => setTab("sudhar")}
          className={cn(
            "min-h-10 flex-1 rounded-xl text-sm font-semibold",
            tab === "sudhar" ? "bg-navy text-white" : "text-navy",
          )}
        >
          Credit Cure
        </button>
      </div>

      {tab === "loans" && (
        <section className="space-y-3">
          {noOffer ? (
            <div className="card space-y-3 p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-spark-gold">Loan offers</p>
              <h2 className="font-serif text-xl text-navy sm:text-2xl">No loan offer. No worries.</h2>
              <p className="text-sm leading-6 text-muted">
                Let's check your credit history and make a few changes by Credit Cure so you can get eligible for
                an offer.
              </p>
              <Button type="button" onClick={() => setTab("sudhar")}>
                Credit Cure
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">Partners who can price this profile. Soft check did not change your score.</p>
              <div className="flex flex-wrap gap-2">
                {cats.map((c) => (
                  <span
                    key={c.slug}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold",
                      c.eligible
                        ? "border-[#b7e4c7] bg-[#e8f8ef] text-[#1b7a4a]"
                        : "border-line bg-ivory text-muted line-through decoration-muted/50",
                    )}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
              {lenders.map((o) => (
                <LenderCard key={o.id} offer={o} />
              ))}
            </>
          )}
        </section>
      )}

      {tab === "sudhar" && (
        <section className="space-y-3">
          <p className="text-sm text-muted">
            {noOffer
              ? "A few changes on the file can open offers. Credit Cure ₹99 · Builder ₹500 · Report ₹99."
              : "Optional plans to lift the score. Credit Cure ₹99 · Builder ₹500 · Report ₹99."}
          </p>
          {addons.map((a) => (
            <AddonCard key={a.slug} addon={a} bought={bought.has(a.slug)} />
          ))}
        </section>
      )}
    </div>
  );
}
