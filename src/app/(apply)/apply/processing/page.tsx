"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiError, getOffers } from "@/lib/api";
import { trackFunnel } from "@/lib/analytics";
import { buildCibilReport } from "@/lib/cibil";
import { authToken, loadApply, saveApply } from "@/lib/session";

const lines = ["Checking duplicates…", "Pushing to lenders…", "Saving lender responses…"];

export default function ProcessingPage() {
    const router = useRouter();
    const [i, setI] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const s = loadApply();
        const token = authToken();
        if (!s?.consents?.bureau || !s.cibilOtpVerified || !token) {
            router.replace("/apply/consent");
            return;
        }

        const tick = window.setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 700);
        let cancelled = false;

        (async () => {
            try {
                // getOffers only: existing accepted lender outcomes from the last 30 days.
                // Pushing this application to lenders (genOffers) is a separate job, built later.
                const { offers } = await getOffers(token);
                if (cancelled) return;
                const current = loadApply();
                if (!current) return;
                const noOffer = offers.length === 0;
                saveApply({
                    ...current,
                    cibil: current.cibil ?? buildCibilReport(current),
                    offers,
                    status: noOffer ? "no_offer" : "eligible",
                });
                trackFunnel(5, "eligibility_completed", { outcome: noOffer ? "no_offer" : "eligible" });
                router.replace("/apply/cibil");
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof ApiError ? err.message : "Could not check offers. Please retry.");
            }
        })();

        return () => {
            cancelled = true;
            window.clearInterval(tick);
        };
    }, [router]);

    return (
        <div className="card p-8 text-center">
            <div className="mx-auto h-14 w-14 rounded-full border-2 border-spark-gold" />
            <h1 className="mt-6 font-serif text-3xl text-navy">Checking your offers</h1>
            <p className="mt-3 text-sm text-muted">{error || lines[i]}</p>
            <p className="mt-6 text-xs font-semibold text-[#2f9e6d]">It will not affect your score</p>
            <p className="mt-2 text-xs text-muted">Please wait. Do not close this page.</p>
        </div>
    );
}
