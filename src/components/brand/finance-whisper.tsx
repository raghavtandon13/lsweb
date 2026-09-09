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
        "pointer-events-none absolute inset-y-0 w-[220px] overflow-hidden opacity-40 sm:w-[260px]",
        side === "right" ? "right-0" : "left-0",
      )}
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 260 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`w-rail-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={navy ? "#ffffff" : "var(--navy)"} stopOpacity={navy ? "0.18" : "0.12"} />
            <stop offset="100%" stopColor={navy ? "#ffffff" : "var(--navy)"} stopOpacity={navy ? "0.06" : "0.05"} />
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
              fill={navy ? "rgba(255,255,255,0.2)" : "color-mix(in srgb, var(--navy) 28%, transparent)"}
            />
            <circle cx="130" cy={y + 36} r="14" fill={navy ? "rgba(255,255,255,0.16)" : "color-mix(in srgb, var(--navy) 18%, transparent)"} />
            <text
              x="130"
              y={y + 41}
              textAnchor="middle"
              fill={navy ? "rgba(255,255,255,0.45)" : "color-mix(in srgb, var(--navy) 35%, transparent)"}
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
