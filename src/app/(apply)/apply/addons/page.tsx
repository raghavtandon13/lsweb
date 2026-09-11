"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addonsFor } from "@/lib/addons";
import { AddonCard } from "@/components/apply/addon-card";
import { loadApply, type ApplyState } from "@/lib/session";

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
        <AddonCard key={a.slug} addon={a} bought={bought.has(a.slug)} />
      ))}
    </div>
  );
}
