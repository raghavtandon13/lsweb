"use client";

import { useMemo, useState } from "react";
import { inr } from "@/lib/format";

function emiOf(principal: number, annualRate: number, months: number) {
    const r = annualRate / 12 / 100;
    if (r === 0) return principal / months;
    const pow = (1 + r) ** months;
    return (principal * r * pow) / (pow - 1);
}

export function EmiWidget({ compact = false }: { compact?: boolean }) {
    const [amount, setAmount] = useState(2_00_000);
    const [rate, setRate] = useState(16);
    const [months, setMonths] = useState(24);

    const emi = useMemo(() => emiOf(amount, rate, months), [amount, rate, months]);
    const total = emi * months;
    const interest = total - amount;

    return (
        <div className={compact ? "" : "card p-6 sm:p-8"}>
            {!compact && (
                <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">EMI calculator</p>
                    <h3 className="mt-4 font-serif text-3xl text-navy">Calculate your EMI</h3>
                </div>
            )}
            <div className="space-y-6">
                <label className="block">
                    <div className="mb-2 flex justify-between text-base">
                        <span className="text-ink">Amount</span>
                        <span className="font-semibold text-navy">{inr(amount)}</span>
                    </div>
                    <input
                        className="w-full accent-navy"
                        max={2500000}
                        min={10000}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        step={10000}
                        type="range"
                        value={amount}
                    />
                </label>
                <label className="block">
                    <div className="mb-2 flex justify-between text-base">
                        <span className="text-ink">Interest (p.a.)</span>
                        <span className="font-semibold text-navy">{rate}%</span>
                    </div>
                    <input
                        className="w-full accent-navy"
                        max={36}
                        min={8}
                        onChange={(e) => setRate(Number(e.target.value))}
                        step={0.5}
                        type="range"
                        value={rate}
                    />
                </label>
                <label className="block">
                    <div className="mb-2 flex justify-between text-base">
                        <span className="text-ink">Tenure</span>
                        <span className="font-semibold text-navy">{months} months</span>
                    </div>
                    <input
                        className="w-full accent-navy"
                        max={60}
                        min={1}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        step={1}
                        type="range"
                        value={months}
                    />
                </label>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-ivory p-3 sm:mt-8 sm:gap-3 sm:p-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink sm:text-sm">EMI</p>
                    <p className="mt-1 break-words font-serif text-base text-navy sm:text-2xl lg:text-3xl">
                        {inr(Math.round(emi))}
                    </p>
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink sm:text-sm">Interest</p>
                    <p className="mt-1 break-words font-serif text-base text-navy sm:text-2xl lg:text-3xl">
                        {inr(Math.round(interest))}
                    </p>
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink sm:text-sm">Total</p>
                    <p className="mt-1 break-words font-serif text-base text-navy sm:text-2xl lg:text-3xl">
                        {inr(Math.round(total))}
                    </p>
                </div>
            </div>
            <p className="mt-3 text-[15px] text-ink">
                Illustrative only. Lender APR, fees, and GST will change the number on your offer card.
            </p>
        </div>
    );
}
