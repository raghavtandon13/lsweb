import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
    variant?: "navy" | "gold" | "ghost" | "outline" | "soft" | "onDark";
    size?: "md" | "lg" | "sm";
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ButtonLink({ href, children, className, variant = "navy", size = "md", onClick }: Props) {
    return (
        <Link
            className={cn(
                "inline-flex shrink-0 items-center justify-center gap-2 whitespace-normal rounded-2xl text-center font-semibold tracking-tight transition duration-300 hover:-translate-y-0.5 sm:whitespace-nowrap",
                size === "lg" && "min-h-12 px-5 py-3 text-[15px] sm:min-h-14 sm:px-8 sm:text-base",
                size === "md" && "min-h-11 px-5 py-2.5 text-sm sm:min-h-12 sm:px-6 sm:text-[15px]",
                size === "sm" && "min-h-9 px-3 py-2 text-xs sm:min-h-10 sm:px-4 sm:text-sm",
                variant === "navy" && "bg-navy text-white hover:bg-navy-soft shadow-lift",
                variant === "gold" && "bg-gold text-white hover:bg-gold-deep",
                variant === "ghost" && "bg-transparent text-navy hover:bg-gold-wash",
                variant === "outline" && "border border-line bg-white text-navy hover:border-gold",
                variant === "soft" && "bg-gold-wash text-navy hover:bg-[#d5e3e3]",
                variant === "onDark" &&
                    "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10",
                className,
            )}
            href={href}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
