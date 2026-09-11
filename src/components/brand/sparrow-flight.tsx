import { BadgeCheck, Banknote, Clock, Sparkles, TrendingUp, Zap } from "lucide-react";
import { SparrowMark } from "@/components/brand/sparrow-mark";

const icons = [
    { Icon: Banknote, className: "sparrow-icon sparrow-icon-a", label: "Amount" },
    { Icon: BadgeCheck, className: "sparrow-icon sparrow-icon-b", label: "Approved" },
    { Icon: Zap, className: "sparrow-icon sparrow-icon-c", label: "Fast" },
    { Icon: Clock, className: "sparrow-icon sparrow-icon-d", label: "Quick" },
    { Icon: TrendingUp, className: "sparrow-icon sparrow-icon-e", label: "Rising" },
    { Icon: Sparkles, className: "sparrow-icon sparrow-icon-f", label: "Offers" },
];

export function SparrowFlight() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMinYMid slice" viewBox="0 0 1440 780">
                <defs>
                    <linearGradient id="sparrow-trail" x1="0" x2="0.35" y1="1" y2="0">
                        <stop offset="0%" stopColor="var(--spark-mint)" stopOpacity="0" />
                        <stop offset="42%" stopColor="var(--spark-gold)" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="var(--spark-coral)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="sparrow-trail-two" x1="0" x2="0.2" y1="1" y2="0">
                        <stop offset="0%" stopColor="var(--spark-sky)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--spark-lilac)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--spark-mint)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    className="sparrow-dash"
                    d="M90 700 C 180 560, 40 470, 210 360 C 360 250, 90 180, 280 70 C 360 10, 420 -40, 480 -80"
                    fill="none"
                    stroke="url(#sparrow-trail)"
                    strokeDasharray="7 12"
                    strokeWidth="2.4"
                />
                <path
                    className="sparrow-dash sparrow-dash-slow"
                    d="M240 740 C 80 600, 300 490, 120 360 C 20 250, 250 170, 110 40"
                    fill="none"
                    stroke="url(#sparrow-trail-two)"
                    strokeDasharray="4 10"
                    strokeWidth="1.6"
                />
            </svg>

            <div className="sparrow-flyer">
                <SparrowMark className="h-[72px] w-[90px] text-navy sm:h-[86px] sm:w-[108px]" />
            </div>
            <div className="sparrow-flyer sparrow-flyer-two">
                <SparrowMark className="h-12 w-[60px] text-spark-gold/80 sm:h-14 sm:w-[72px]" />
            </div>

            {icons.map(({ Icon, className, label }) => (
                <span className={className} key={label} title={label}>
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
            ))}
            <span className="sparrow-spark sparrow-spark-a" />
            <span className="sparrow-spark sparrow-spark-b" />
            <span className="sparrow-spark sparrow-spark-c" />
        </div>
    );
}
