"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashHead } from "@/components/dashboard/bits";
import { ButtonLink } from "@/components/ui/button-link";
import { getMe, getOffers } from "@/lib/api";
import { inr } from "@/lib/format";
import { type DisplayOffer, toDisplayOffer } from "@/lib/offers";
import { authToken } from "@/lib/session";

export default function DashboardHomePage() {
    const router = useRouter();
    const [name, setName] = useState("there");
    const [offers, setOffers] = useState<DisplayOffer[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = authToken();
        if (!token) {
            router.replace("/login");
            return;
        }
        Promise.all([
            getMe(token).then((p) => {
                if (p.name) setName(p.name.split(" ")[0]);
            }),
            getOffers(token).then(({ offers: accepted }) => setOffers(accepted.map(toDisplayOffer))),
        ]).finally(() => setReady(true));
    }, [router]);

    const hasOffers = offers.length > 0;

    return (
        <div className="space-y-6">
            <DashHead eyebrow={`Hi, ${name}`} title="Dashboard" body="Your offers and profile, for this mobile." />

            <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="font-serif text-xl text-navy sm:text-2xl">Available offers</h2>
                    <Link className="shrink-0 text-sm font-semibold text-spark-gold" href="/dashboard/offers">
                        See all
                    </Link>
                </div>
                {!ready ? (
                    <p className="rounded-2xl border border-line bg-white p-5 text-sm text-muted">Loading…</p>
                ) : hasOffers ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {offers.slice(0, 2).map((o) => (
                            <article className="flex flex-col rounded-2xl border border-line bg-white p-5" key={o.id}>
                                <p className="text-sm text-muted">Accepted by</p>
                                <p className="mt-1 font-serif text-xl text-navy">{o.lender}</p>
                                <p className="mt-1 flex-1 text-sm text-muted">
                                    {o.amount != null ? inr(o.amount) : "Amount pending"}
                                    {o.roi != null ? ` · ${o.roi}% p.a.` : ""}
                                </p>
                                <div className="mt-4">
                                    <ButtonLink
                                        className="w-full sm:w-auto"
                                        href="/dashboard/offers"
                                        size="sm"
                                        variant="outline"
                                    >
                                        View offer
                                    </ButtonLink>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-line bg-white p-5">
                        <p className="text-sm leading-6 text-muted">
                            No accepted offers yet on this mobile. Run an eligibility check to see who's interested.
                        </p>
                        <ButtonLink className="mt-4 w-full sm:w-auto" href="/apply" size="md">
                            Check eligibility
                        </ButtonLink>
                    </div>
                )}
            </section>
        </div>
    );
}
