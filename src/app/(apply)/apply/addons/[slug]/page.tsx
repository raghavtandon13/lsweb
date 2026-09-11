"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getAddon } from "@/lib/addons";
import { loadApply, saveApply } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export default function AddonPayPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const addon = getAddon(slug ?? "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = loadApply();
    if (!s?.cibil) {
      router.replace("/apply/cibil");
      return;
    }
    if (addon && (s.purchasedAddons ?? []).includes(addon.slug)) {
      router.replace(`/apply/addons/${addon.slug}/done`);
      return;
    }
    setReady(true);
  }, [addon, router]);

  if (!addon || !ready) return null;

  function pay() {
    const s = loadApply();
    if (!s || !addon) return;
    const purchasedAddons = Array.from(new Set([...(s.purchasedAddons ?? []), addon.slug]));
    saveApply({ ...s, purchasedAddons });
    track("purchase", { item_name: addon.name, value: addon.price, currency: "INR" });
    router.push(`/apply/addons/${addon.slug}/done`);
  }

  return (
    <div className="card p-5 sm:p-7">
      <Link href="/apply/addons" className="text-sm font-semibold text-spark-gold">
        ← All add-ons
      </Link>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Pay (demo)</p>
      <h1 className="mt-1 font-serif text-3xl text-navy">{addon.name}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{addon.tagline}</p>
      <p className="mt-4 font-serif text-4xl text-navy">₹{addon.price}</p>
      <p className="mt-1 text-xs text-muted">One-time. Demo checkout — no real debit.</p>
      <ul className="mt-5 space-y-2 text-sm text-navy">
        {addon.includes.map((i) => (
          <li key={i}>· {i}</li>
        ))}
      </ul>
      <Button type="button" size="lg" className="mt-6 w-full" onClick={pay}>
        Pay ₹{addon.price}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">{addon.who}</p>
    </div>
  );
}
