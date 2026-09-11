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
            aria-hidden
            className={cn(
                "pointer-events-none absolute inset-y-0 hidden w-[220px] overflow-hidden opacity-70 sm:w-[260px] lg:block",
                side === "right" ? "right-0" : "left-0",
            )}
        >
            <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 260 520">
                <defs>
                    <linearGradient id={`w-rail-${id}`} x1="0" x2="0" y1="0" y2="1">
                        <stop
                            offset="0%"
                            stopColor={navy ? "#ffffff" : "var(--spark-mint)"}
                            stopOpacity={navy ? "0.22" : "0.22"}
                        />
                        <stop
                            offset="100%"
                            stopColor={navy ? "var(--spark-gold)" : "var(--spark-gold)"}
                            stopOpacity={navy ? "0.2" : "0.18"}
                        />
                    </linearGradient>
                </defs>
                <rect fill={`url(#w-rail-${id})`} height="440" rx="5" width="10" x="78" y="40" />
                <rect fill={`url(#w-rail-${id})`} height="440" rx="5" width="10" x="172" y="40" />
                {[120, 230, 340].map((y, i) => (
                    <g className={i === 1 ? "coin-float-slow" : "coin-float"} key={y}>
                        <rect
                            fill={
                                navy
                                    ? "rgba(255,255,255,0.22)"
                                    : "color-mix(in srgb, var(--spark-mint) 28%, transparent)"
                            }
                            height="12"
                            rx="6"
                            width="104"
                            x="78"
                            y={y}
                        />
                        <circle cx="130" cy={y + 36} fill="var(--spark-gold)" r="15" />
                        <circle cx="125" cy={y + 30} fill="white" opacity="0.35" r="4" />
                        <text
                            fill="#6b4a08"
                            fontFamily="Georgia, serif"
                            fontSize="13"
                            textAnchor="middle"
                            x="130"
                            y={y + 41}
                        >
                            ₹
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
