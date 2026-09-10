import { cn } from "@/lib/cn";

export function FinanceWhisper({
  side = "right",
  tone = "light",
}: {
  side?: "left" | "right";
  tone?: "light" | "navy";
}) {
  const id = `${side}-${tone}`;
  const navy = tone === "navy";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 hidden w-[220px] overflow-hidden opacity-70 sm:w-[260px] lg:block",
        side === "right" ? "right-0" : "left-0",
      )}
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 260 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`w-rail-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={navy ? "#ffffff" : "var(--spark-mint)"} stopOpacity={navy ? "0.22" : "0.22"} />
            <stop offset="100%" stopColor={navy ? "var(--spark-gold)" : "var(--spark-gold)"} stopOpacity={navy ? "0.2" : "0.18"} />
          </linearGradient>
        </defs>
        <rect x="78" y="40" width="10" height="440" rx="5" fill={`url(#w-rail-${id})`} />
        <rect x="172" y="40" width="10" height="440" rx="5" fill={`url(#w-rail-${id})`} />
        {[120, 230, 340].map((y, i) => (
          <g key={y} className={i === 1 ? "coin-float-slow" : "coin-float"}>
            <rect
              x="78"
              y={y}
              width="104"
              height="12"
              rx="6"
              fill={navy ? "rgba(255,255,255,0.22)" : "color-mix(in srgb, var(--spark-mint) 28%, transparent)"}
            />
            <circle cx="130" cy={y + 36} r="15" fill="var(--spark-gold)" />
            <circle cx="125" cy={y + 30} r="4" fill="white" opacity="0.35" />
            <text
              x="130"
              y={y + 41}
              textAnchor="middle"
              fill="#6b4a08"
              fontSize="13"
              fontFamily="Georgia, serif"
            >
              ₹
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
