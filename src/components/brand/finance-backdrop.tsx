import { cn } from "@/lib/cn";

export function FinanceBackdrop({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "navy";
}) {
  const fill = tone === "navy" ? "rgba(255,255,255,0.1)" : "color-mix(in srgb, var(--navy) 16%, transparent)";
  const gold = tone === "navy" ? "rgba(255,255,255,0.18)" : "color-mix(in srgb, var(--navy) 20%, transparent)";

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1440 720">
        <circle cx="160" cy="120" r="70" fill={gold} />
        <circle cx="1280" cy="160" r="110" fill={fill} />
        <circle cx="1180" cy="520" r="80" fill={gold} />
        <circle cx="220" cy="560" r="90" fill={fill} />
        <text x="140" y="140" fill={tone === "navy" ? "rgba(255,255,255,0.2)" : "color-mix(in srgb, var(--navy) 12%, transparent)"} fontSize="48" fontFamily="Georgia, serif">
          ₹
        </text>
        <text x="1248" y="180" fill={tone === "navy" ? "rgba(255,255,255,0.18)" : "color-mix(in srgb, var(--navy) 10%, transparent)"} fontSize="64" fontFamily="Georgia, serif">
          ₹
        </text>
      </svg>
    </div>
  );
}
