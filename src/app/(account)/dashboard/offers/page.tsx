"use client";

import { useEffect, useState } from "react";
import { DashHead } from "@/components/dashboard/bits";
import { ButtonLink } from "@/components/ui/button-link";
import { sessionAcceptedOffers } from "@/lib/demo-customers";
import { inr } from "@/lib/format";
import type { Offer } from "@/lib/mock";

export default function DashboardOffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setOffers(sessionAcceptedOffers());
        setReady(true);
    }, []);

    const hasOffers = offers.length > 0;

    return (
        <div>
            <DashHead
                body="Offers for this mobile. A different number after logout loads a different customer."
                title="Available offers"
            />
            {ready && !hasOffers && (
                <div className="card mt-6 p-5 sm:p-6">
                    <p className="font-serif text-xl text-navy">No loan offer. No worries.</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Let's check your credit history and make a few changes by Credit Cure so you can get eligible
                        for an offer.
                    </p>
                    <ButtonLink className="mt-4 w-full sm:w-auto" href="/apply/cibil" size="md">
                        Credit Cure
                    </ButtonLink>
                </div>
            )}
            {hasOffers && (
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {offers.map((o) => (
                        <article
                            className="flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white"
                            key={o.id}
                        >
                            <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm text-muted">{o.lender}</p>
                                        <h2 className="mt-0.5 font-serif text-xl text-navy">{o.product}</h2>
                                    </div>
                                    {o.recommended && (
                                        <span className="shrink-0 rounded-full bg-[#fff8e4] px-2.5 py-1 text-[11px] font-semibold text-[#c48a10]">
                                            Fit
                                        </span>
                                    )}
                                </div>
                                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <dt className="text-muted">Amount</dt>
                                        <dd className="font-semibold text-spark-gold">{inr(o.amount)}</dd>
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
                                <p className="mt-3 text-xs leading-5 text-muted">
                                    {o.highlights.join(" · ")} · {o.disbursal}
                                </p>
                                <ButtonLink
                                    className="mt-5 w-full"
                                    href="/dashboard/applications/SU-240918-1842"
                                    size="md"
                                >
                                    Continue with {o.lender}
                                </ButtonLink>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
