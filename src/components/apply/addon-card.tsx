import { ButtonLink } from "@/components/ui/button-link";
import type { Addon } from "@/lib/addons";

export function AddonCard({ addon, bought }: { addon: Addon; bought?: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-coral to-navy" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-spark-gold">Add-on</p>
            <h3 className="mt-0.5 font-serif text-xl text-navy">{addon.name}</h3>
          </div>
          <p className="shrink-0 font-serif text-2xl text-navy">₹{addon.price}</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{addon.tagline}</p>
        <p className="mt-2 text-xs text-muted">{addon.who}</p>
        <ButtonLink
          href={bought ? `/apply/addons/${addon.slug}/done` : `/apply/addons/${addon.slug}`}
          className="mt-4 w-full"
          variant={bought ? "outline" : "navy"}
        >
          {bought ? "Open" : `Continue · ₹${addon.price}`}
        </ButtonLink>
      </div>
    </article>
  );
}
