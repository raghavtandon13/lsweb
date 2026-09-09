import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "navy" | "gold" | "ghost" | "outline" | "soft";
  size?: "md" | "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "navy",
  size = "md",
  onClick,
}: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition duration-300 hover:-translate-y-0.5",
        size === "lg" && "h-14 px-8 text-base",
        size === "md" && "h-12 px-6 text-[15px]",
        size === "sm" && "h-10 px-4 text-sm",
        variant === "navy" && "bg-navy text-white hover:bg-navy-soft shadow-lift",
        variant === "gold" && "bg-gold text-white hover:bg-gold-deep",
        variant === "ghost" && "bg-transparent text-navy hover:bg-gold-wash",
        variant === "outline" && "border border-line bg-white text-navy hover:border-gold",
        variant === "soft" && "bg-gold-wash text-navy hover:bg-[#d5e3e3]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
