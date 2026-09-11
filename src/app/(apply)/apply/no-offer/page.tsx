"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AddonCard } from "@/components/apply/addon-card";
import { EditDetailsBar } from "@/components/apply/edit-details-bar";
import { ButtonLink } from "@/components/ui/button-link";
import { addons } from "@/lib/addons";
import { trackFunnel } from "@/lib/analytics";
import { loadApply } from "@/lib/session";

export default function NoOfferPage() {
    const router = useRouter();

    useEffect(() => {
        const s = loadApply();
        if (s?.status !== "no_offer") router.replace("/apply");
        else trackFunnel(7, "no_offer_shown");
    }, [router]);

    return (
        <>
            <EditDetailsBar />
            <div className="card p-5 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Outcome</p>
                <h1 className="mt-2 font-serif text-3xl text-navy">No loan offer. No worries.</h1>
                <p className="mt-4 text-sm leading-7 text-muted">
                    Let's check your credit history and make a few changes by Credit Cure so you can get eligible for an
                    offer.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                    <ButtonLink className="w-full" href="/apply/addons">
                        Credit add-ons
                    </ButtonLink>
                    <ButtonLink className="w-full" href="/loans/gold" variant="outline">
                        See gold loans
                    </ButtonLink>
                    <ButtonLink className="w-full" href="/loans/card-against-fd" variant="outline">
                        Card against FD
                    </ButtonLink>
                </div>
            </div>
            <div className="mt-4 space-y-3">
                {addons.map((a) => (
                    <AddonCard addon={a} key={a.slug} />
                ))}
            </div>
        </>
    );
}
