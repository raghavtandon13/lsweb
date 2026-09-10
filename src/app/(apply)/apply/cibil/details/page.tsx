"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { EditDetailsBar } from "@/components/apply/edit-details-bar";
import { loadApply, type ApplyState } from "@/lib/session";
import { maskPan } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function CibilDetailsPage() {
  const router = useRouter();
  const [apply, setApply] = useState<ApplyState | null>(null);

  useEffect(() => {
    const s = loadApply();
    if (!s?.cibil || !s.cibilOtpVerified) {
      router.replace("/apply/consent");
      return;
    }
    setApply(s);
  }, [router]);

  const report = apply?.cibil;
  if (!report || !apply) return null;

  const pct = Math.round(((report.score - 300) / 600) * 100);
  const factors = [
    { label: "Payment history", value: `${report.paymentHistory}%`, bar: report.paymentHistory, hint: "On-time EMIs and card dues." },
    { label: "Credit utilisation", value: `${report.utilisation}%`, bar: Math.max(8, 100 - report.utilisation), hint: "Keep revolving balances under ~30%." },
    { label: "On-time EMIs", value: `${Math.round(report.onTime * 100)}%`, bar: Math.round(report.onTime * 100), hint: "Missed payments stay on file." },
    { label: "Enquiries (90 days)", value: String(report.enquiries90d), bar: Math.max(12, 100 - report.enquiries90d * 18), hint: "This matching check is soft — it will not affect your score." },
  ];

  return (
    <div className="space-y-4">
      <EditDetailsBar />
      <Link href="/apply/cibil" className="inline-flex items-center gap-1 text-sm font-semibold text-spark-gold">
        <ChevronLeft className="h-4 w-4" />
        Back to score & lenders
      </Link>

      <div className="card p-4 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Full CIBIL report</p>
        <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(#e4b429 ${pct}%, #d9e0e0 0)` }}
            />
            <div className="absolute inset-[10px] grid place-items-center rounded-full bg-white">
              <p className="font-serif text-4xl text-navy">{report.score}</p>
            </div>
          </div>
          <div className="w-full text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-spark-gold">{report.band}</p>
            <h1 className="mt-1 font-serif text-2xl text-navy sm:text-3xl">CIBIL score</h1>
            <p className="mt-1 text-sm text-muted">
              {apply.name ?? "Applicant"}
              {apply.pan ? ` · ${maskPan(apply.pan)}` : ""} · updated {report.updated}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-[#e8f8ef] px-3 py-1 text-xs font-semibold text-[#2f9e6d]">
              It will not affect your score
            </span>
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-muted">
                <span>300</span>
                <span>900</span>
              </div>
              <div className="relative mt-1 h-1.5 rounded-full bg-line">
                <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark-gold" style={{ left: `${pct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {[
          ["Accounts", String(report.accounts)],
          ["Utilisation", `${report.utilisation}%`],
          ["On-time", `${Math.round(report.onTime * 100)}%`],
          ["Enquiries 90d", String(report.enquiries90d)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-line bg-white px-3 py-3 sm:px-4">
            <p className="text-[11px] text-muted">{k}</p>
            <p className="mt-0.5 font-serif text-xl text-navy">{v}</p>
          </div>
        ))}
      </div>

      <div className="card p-4 sm:p-6">
        <h2 className="font-serif text-xl text-navy">What lenders see</h2>
        <ul className="mt-4 space-y-4">
          {factors.map((f) => (
            <li key={f.label}>
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-navy">{f.label}</span>
                <span className="shrink-0 font-semibold text-navy">{f.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-spark-gold" style={{ width: `${Math.min(100, f.bar)}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">{f.hint}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4 sm:p-6">
        <h2 className="font-serif text-xl text-navy">Accounts on file</h2>
        <ul className="mt-2 divide-y divide-line">
          {report.accountsList.map((a) => (
            <li key={a.name} className="flex items-center justify-between gap-3 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-semibold text-navy">{a.name}</p>
                <p className="text-xs text-muted">
                  {a.type} · opened {a.opened}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  a.status === "Active" ? "bg-[#e8f8ef] text-[#2f9e6d]" : "bg-ivory text-muted",
                )}
              >
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/apply/cibil#lenders"
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-navy px-5 text-[15px] font-semibold text-white"
      >
        Back to eligible lenders
      </Link>
    </div>
  );
}
