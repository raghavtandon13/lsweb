"use client";

import { useMemo, useState } from "react";
import { inr } from "@/lib/format";

function emiOf(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
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
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
            EMI calculator
          </p>
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
            type="range"
            min={10000}
            max={2500000}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-navy"
          />
        </label>
        <label className="block">
          <div className="mb-2 flex justify-between text-base">
            <span className="text-ink">Interest (p.a.)</span>
            <span className="font-semibold text-navy">{rate}%</span>
          </div>
          <input
            type="range"
            min={8}
            max={36}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-navy"
          />
        </label>
        <label className="block">
          <div className="mb-2 flex justify-between text-base">
            <span className="text-ink">Tenure</span>
            <span className="font-semibold text-navy">{months} months</span>
          </div>
          <input
            type="range"
            min={1}
            max={60}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-navy"
          />
        </label>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-ivory p-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ink">EMI</p>
          <p className="mt-1 font-serif text-2xl text-navy sm:text-3xl">{inr(Math.round(emi))}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ink">Interest</p>
          <p className="mt-1 font-serif text-2xl text-navy sm:text-3xl">{inr(Math.round(interest))}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ink">Total</p>
          <p className="mt-1 font-serif text-2xl text-navy sm:text-3xl">{inr(Math.round(total))}</p>
        </div>
      </div>
      <p className="mt-3 text-[15px] text-ink">
        Illustrative only. Lender APR, fees, and GST will change the number on your offer card.
      </p>
    </div>
  );
}
