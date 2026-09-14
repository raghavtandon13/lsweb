"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LenderCard } from "@/components/apply/lender-card";
import { DashHead } from "@/components/dashboard/bits";
import { getMe, getOffers } from "@/lib/api";
import { inr, maskMobile, maskPan } from "@/lib/format";
import { type DisplayOffer, toDisplayOffer } from "@/lib/offers";
import { authToken, type EmploymentType, employmentLabel } from "@/lib/session";

type Row = [string, string];

export default function ProfilePage() {
    const router = useRouter();
    const [rows, setRows] = useState<Row[] | null>(null);
    const [offers, setOffers] = useState<DisplayOffer[] | null>(null);

    useEffect(() => {
        const token = authToken();
        if (!token) {
            router.replace("/login");
            return;
        }
        getMe(token)
            .then((p) => {
                const emp = p.employment as EmploymentType | null;
                setRows([
                    ["Name", p.name ?? "—"],
                    ["Mobile", p.phone ? maskMobile(p.phone) : "—"],
                    ["Email", p.email ?? "—"],
                    ["PAN", p.pan ? maskPan(p.pan) : "—"],
                    ["Date of birth", p.dob ?? "—"],
                    ["Pincode", p.pincode ?? "—"],
                    ["Employment", emp && employmentLabel[emp] ? employmentLabel[emp] : "—"],
                    ["Declared income", p.income ? inr(Number(p.income)) : "—"],
                ]);
            })
            .catch(() => setRows([]));
        getOffers(token)
            .then(({ offers: accepted }) => setOffers(accepted.map(toDisplayOffer)))
            .catch(() => setOffers([]));
    }, [router]);

    return (
        <div className="max-w-xl">
            <DashHead
                body="Identity fields for this mobile. Logout clears the session so the next number starts as a new customer."
                title="Profile"
            />
            {rows === null ? (
                <div className="card mt-6 p-5 text-sm text-muted">Loading…</div>
            ) : rows.length === 0 ? (
                <div className="card mt-6 p-5 text-sm text-muted">Could not load your profile. Try again.</div>
            ) : (
                <dl className="card mt-6 divide-y divide-line">
                    {rows.map(([k, v]) => (
                        <div
                            className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                            key={k}
                        >
                            <dt className="text-xs font-medium uppercase tracking-wider text-muted sm:text-sm sm:normal-case sm:tracking-normal">
                                {k}
                            </dt>
                            <dd className="break-all text-sm font-medium text-navy sm:text-right">{v}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <h2 className="mt-8 font-serif text-xl text-navy">Your offers</h2>
            <p className="mt-1 text-sm text-muted">Accepted by a lender in the last 30 days.</p>
            {offers === null ? (
                <div className="card mt-4 p-5 text-sm text-muted">Loading…</div>
            ) : offers.length === 0 ? (
                <div className="card mt-4 p-5 text-sm text-muted">No accepted offers yet on this mobile.</div>
            ) : (
                <div className="mt-4 space-y-3">
                    {offers.map((o) => (
                        <LenderCard key={o.id} offer={o} />
                    ))}
                </div>
            )}
        </div>
    );
}
