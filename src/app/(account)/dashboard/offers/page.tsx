"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LenderCard } from "@/components/apply/lender-card";
import { DashHead } from "@/components/dashboard/bits";
import { ButtonLink } from "@/components/ui/button-link";
import { getOffers } from "@/lib/api";
import { toDisplayOffer } from "@/lib/offers";
import { authToken } from "@/lib/session";

export default function DashboardOffersPage() {
    const router = useRouter();
    const [offers, setOffers] = useState<ReturnType<typeof toDisplayOffer>[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = authToken();
        if (!token) {
            router.replace("/login");
            return;
        }
        getOffers(token)
            .then(({ offers: accepted }) => setOffers(accepted.map(toDisplayOffer)))
            .finally(() => setReady(true));
    }, [router]);

    const hasOffers = offers.length > 0;

    return (
        <div>
            <DashHead
                body="Offers for this mobile, accepted by a lender in the last 30 days."
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
                        <LenderCard key={o.id} offer={o} />
                    ))}
                </div>
            )}
        </div>
    );
}
