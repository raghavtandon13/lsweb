"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { LenderCard } from "@/components/apply/lender-card";
import { eligibleCategories } from "@/lib/cibil";
import { mockOffers } from "@/lib/mock";
import { loadApply, type ApplyState } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export default function CibilPage() {
  const router = useRouter();
  const [apply, setApply] = useState<ApplyState | null>(null);

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
    trackFunnel(5, "cibil_shown", { score_band: s.cibil.band });
    setApply(s);
  }, [router]);

  const report = apply?.cibil;
  if (!report || !apply) return null;

  const noOffer = apply.status === "no_offer";
  const cats = eligibleCategories(report.score, noOffer);
  const eligibleSlugs = new Set(cats.filter((c) => c.eligible).map((c) => c.slug));
  const lenders = mockOffers.filter((o) => !o.productSlug || eligibleSlugs.has(o.productSlug));
  const pct = Math.round(((report.score - 300) / 600) * 100);

  return (
    <div className="space-y-4 sm:space-y-5">
      <Link
        href="/apply/cibil/details"
        className="card flex items-center gap-3 p-4 sm:gap-5 sm:p-5"
      >
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

      <section id="lenders" className="space-y-3">
        <div>
          <h2 className="font-serif text-xl text-navy sm:text-2xl">You are eligible for</h2>
          <p className="mt-1 text-sm text-muted">Apply on a match below. Soft check did not change your score.</p>
        </div>

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

        {!noOffer && lenders.length > 0 && (
          <div className="space-y-3">
            {lenders.map((o) => (
              <LenderCard key={o.id} offer={o} />
            ))}
          </div>
        )}

        {noOffer && (
          <div className="card space-y-3 p-4 sm:p-5">
            <p className="text-sm leading-6 text-muted">
              Unsecured personal offers did not match this profile. You can still apply on secured products.
            </p>
            <ButtonLink href="/loans/gold" className="w-full">
              Apply for gold loan
            </ButtonLink>
            <ButtonLink href="/loans/card-against-fd" variant="outline" className="w-full">
              Apply for card against FD
            </ButtonLink>
          </div>
        )}
      </section>
    </div>
  );
}
