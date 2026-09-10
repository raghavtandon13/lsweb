import { cn } from "@/lib/cn";

export function FinanceScene({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-[#fffdf8]", className)} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff8e8] via-white to-[#e8f8f6]" />
      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-spark-gold/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-spark-mint/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-spark-coral/10 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--spark-mint)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--spark-gold)" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="step" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--spark-mint)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="stepTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--spark-gold)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--spark-mint)" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <circle className="hero-orb" cx="180" cy="120" r="90" fill="color-mix(in srgb, var(--spark-mint) 16%, transparent)" />
        <circle className="hero-orb hero-orb-slow" cx="1280" cy="140" r="130" fill="color-mix(in srgb, var(--spark-gold) 22%, transparent)" />
        <circle className="hero-orb" cx="1100" cy="640" r="100" fill="color-mix(in srgb, var(--spark-sky) 16%, transparent)" />
        <circle className="hero-orb hero-orb-slow" cx="240" cy="620" r="70" fill="color-mix(in srgb, var(--spark-lilac) 14%, transparent)" />

        <g transform="translate(1000 120)" opacity="0.55">
          <rect x="86" y="20" width="14" height="560" rx="7" fill="url(#rail)" />
          <rect x="270" y="20" width="14" height="560" rx="7" fill="url(#rail)" />

          {[
            { y: 480 },
            { y: 340 },
            { y: 200 },
            { y: 70 },
          ].map((rung, i) => (
            <g key={rung.y} className={i % 2 ? "coin-float-slow" : "coin-float"}>
              <rect x="90" y={rung.y} width="190" height="18" rx="7" fill="url(#stepTop)" />
              <rect x="108" y={rung.y + 18} width="154" height="44" rx="10" fill="url(#step)" />
              <circle cx="185" cy={rung.y + 40} r="16" fill="var(--spark-gold)" />
              <circle cx="180" cy={rung.y + 34} r="4" fill="white" opacity="0.35" />
              <text
                x="185"
                y={rung.y + 46}
                textAnchor="middle"
                fill="#6b4a08"
                fontSize="18"
                fontFamily="Georgia, serif"
                fontWeight="600"
              >
                ₹
              </text>
            </g>
          ))}
        </g>

        <g opacity="0.12">
          <text x="70" y="720" fill="var(--spark-gold-deep)" fontSize="96" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
