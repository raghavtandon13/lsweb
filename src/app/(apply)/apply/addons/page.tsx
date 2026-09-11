"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddonCard } from "@/components/apply/addon-card";
import { addonsFor } from "@/lib/addons";
import { type ApplyState, loadApply } from "@/lib/session";

export default function AddonsPage() {
    const router = useRouter();
    const [apply, setApply] = useState<ApplyState | null>(null);

    useEffect(() => {
        const s = loadApply();
        if (!s?.cibil) {
            router.replace("/apply/cibil");
            return;
        }
        setApply(s);
    }, [router]);

    if (!apply?.cibil) return null;
    const list = addonsFor({
        score: apply.cibil.score,
        noOffer: apply.status === "no_offer",
    });
    const bought = new Set(apply.purchasedAddons ?? []);

    return (
        <div className="space-y-4">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Add-ons</p>
                <h1 className="mt-1 font-serif text-3xl text-navy">Improve this file</h1>
                <p className="mt-2 text-sm text-muted">
                    Unsecured offers are thin or missing. These paid tools explain the score and help it move.
                </p>
            </div>
            {list.map((a) => (
                <AddonCard addon={a} bought={bought.has(a.slug)} key={a.slug} />
            ))}
        </div>
    );
}
