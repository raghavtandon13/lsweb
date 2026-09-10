import { cn } from "@/lib/cn";

export function FinanceBackdrop({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "navy";
}) {
  const gold = tone === "navy" ? "rgba(228,180,41,0.28)" : "color-mix(in srgb, var(--spark-gold) 28%, transparent)";
  const mint = tone === "navy" ? "rgba(29,184,174,0.22)" : "color-mix(in srgb, var(--spark-mint) 22%, transparent)";
  const sky = tone === "navy" ? "rgba(59,154,217,0.2)" : "color-mix(in srgb, var(--spark-sky) 18%, transparent)";

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1440 720">
        <circle className="hero-orb" cx="160" cy="120" r="70" fill={gold} />
        <circle className="hero-orb hero-orb-slow" cx="1280" cy="160" r="110" fill={mint} />
        <circle className="hero-orb" cx="1180" cy="520" r="80" fill={gold} />
        <circle className="hero-orb hero-orb-slow" cx="220" cy="560" r="90" fill={sky} />
        <g className="coin-float">
          <circle cx="168" cy="128" r="22" fill="var(--spark-gold)" />
          <text x="168" y="136" textAnchor="middle" fill="#6b4a08" fontSize="18" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
        <g className="coin-float coin-float-slow">
          <circle cx="1288" cy="168" r="28" fill="var(--spark-gold)" />
          <text x="1288" y="178" textAnchor="middle" fill="#6b4a08" fontSize="22" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
