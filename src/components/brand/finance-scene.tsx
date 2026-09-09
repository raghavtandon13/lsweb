import { cn } from "@/lib/cn";

export function FinanceScene({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-ivory", className)} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-ivory to-gold-wash/70" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="step" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="stepTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        <circle className="hero-orb" cx="180" cy="120" r="90" fill="rgba(13,59,63,0.05)" />
        <circle className="hero-orb hero-orb-slow" cx="1280" cy="140" r="130" fill="rgba(201,162,39,0.12)" />
        <circle className="hero-orb" cx="1100" cy="640" r="100" fill="rgba(29,184,174,0.1)" />

        <g transform="translate(1000 120)" opacity="0.16">
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
              <circle cx="185" cy={rung.y + 40} r="16" fill="var(--navy)" opacity="0.45" />
              <text
                x="185"
                y={rung.y + 46}
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontFamily="Georgia, serif"
                fontWeight="600"
              >
                ₹
              </text>
            </g>
          ))}
        </g>

        <g opacity="0.08">
          <text x="70" y="720" fill="var(--navy)" fontSize="96" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
