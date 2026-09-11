import Link from "next/link";
import { SparrowMark } from "@/components/brand/sparrow-mark";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Logo({
    className,
    dark = false,
    compact = false,
}: {
    className?: string;
    dark?: boolean;
    compact?: boolean;
}) {
    return (
        <Link className={cn("group inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)} href="/">
            <span
                className={cn(
                    "grid shrink-0 place-items-center rounded-xl",
                    compact ? "h-8 w-8" : "h-8 w-8 sm:h-9 sm:w-9",
                    dark ? "bg-gold text-white" : "bg-navy text-white",
                )}
            >
                <SparrowMark className="sparrow-still h-[18px] w-[22px] text-white" />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
                <span
                    className={cn(
                        "truncate font-serif tracking-tight",
                        compact ? "text-[17px]" : "text-[18px] sm:text-[22px] lg:text-[24px]",
                        dark ? "text-white" : "text-navy",
                    )}
                >
                    {site.name}
                </span>
                {!compact && (
                    <span
                        className={cn(
                            "hidden text-[10px] uppercase tracking-[0.16em] sm:block sm:text-xs",
                            dark ? "text-white" : "text-gold-deep",
                        )}
                    >
                        Loan marketplace
                    </span>
                )}
            </span>
        </Link>
    );
}
