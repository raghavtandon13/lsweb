import { cn } from "@/lib/cn";

export function FinanceBackdrop({ className, tone = "light" }: { className?: string; tone?: "light" | "navy" }) {
    const gold = tone === "navy" ? "rgba(228,180,41,0.28)" : "color-mix(in srgb, var(--spark-gold) 28%, transparent)";
    const mint = tone === "navy" ? "rgba(29,184,174,0.22)" : "color-mix(in srgb, var(--spark-mint) 22%, transparent)";
    const sky = tone === "navy" ? "rgba(59,154,217,0.2)" : "color-mix(in srgb, var(--spark-sky) 18%, transparent)";

    return (
        <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1440 720">
                <circle className="hero-orb" cx="160" cy="120" fill={gold} r="70" />
                <circle className="hero-orb hero-orb-slow" cx="1280" cy="160" fill={mint} r="110" />
                <circle className="hero-orb" cx="1180" cy="520" fill={gold} r="80" />
                <circle className="hero-orb hero-orb-slow" cx="220" cy="560" fill={sky} r="90" />
                <g className="coin-float">
                    <circle cx="168" cy="128" fill="var(--spark-gold)" r="22" />
                    <text fill="#6b4a08" fontFamily="Georgia, serif" fontSize="18" textAnchor="middle" x="168" y="136">
                        ₹
                    </text>
                </g>
                <g className="coin-float coin-float-slow">
                    <circle cx="1288" cy="168" fill="var(--spark-gold)" r="28" />
                    <text fill="#6b4a08" fontFamily="Georgia, serif" fontSize="22" textAnchor="middle" x="1288" y="178">
                        ₹
                    </text>
                </g>
            </svg>
        </div>
    );
}
