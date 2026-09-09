import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { SparrowMark } from "@/components/brand/sparrow-mark";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl",
          dark ? "bg-gold text-white" : "bg-navy text-white",
        )}
      >
        <SparrowMark className="sparrow-still h-[18px] w-[22px] text-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[22px] tracking-tight sm:text-[24px]", dark ? "text-white" : "text-navy")}>
          {site.name}
        </span>
        <span className={cn("text-xs uppercase tracking-[0.16em]", dark ? "text-white" : "text-gold-deep")}>
          Loan marketplace
        </span>
      </span>
    </Link>
  );
}
