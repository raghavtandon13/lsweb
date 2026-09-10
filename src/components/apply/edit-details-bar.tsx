"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { loadApply } from "@/lib/session";
import { maskMobile, maskPan, inr } from "@/lib/format";

export function EditDetailsBar() {
  const path = usePathname();
  const [line, setLine] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = loadApply();
    if (!s?.pincode) return;
    const bits = [
      s.name,
      s.email,
      s.mobile ? maskMobile(s.mobile) : "",
      s.pan ? maskPan(s.pan) : "",
      s.pincode,
      s.amount ? inr(Number(s.amount)) : "",
    ].filter(Boolean);
    setLine(bits.join(" · "));
    setReady(true);
  }, [path]);

  if (!ready) return null;

  const href = `/apply/details?from=${encodeURIComponent(path)}`;

  return (
    <div className="mb-4 flex items-start justify-between gap-3 rounded-2xl border border-line bg-white px-3 py-3 sm:px-4">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Your details</p>
        <p className="mt-1 truncate text-sm text-navy">{line}</p>
      </div>
      <Link href={href} className="shrink-0 pt-0.5 text-sm font-semibold text-spark-gold hover:underline">
        Edit details
      </Link>
    </div>
  );
}
