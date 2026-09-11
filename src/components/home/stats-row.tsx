import { IndianRupee, Layers, Smartphone, Timer } from "lucide-react";

const stats = [
    { value: "8", label: "Loan products", icon: Layers, tint: "bg-spark-gold/20 text-spark-gold" },
    { value: "2 min", label: "To check eligibility", icon: Timer, tint: "bg-spark-mint/20 text-spark-mint" },
    { value: "₹5K–₹50L", label: "Ticket range", icon: IndianRupee, tint: "bg-spark-sky/20 text-spark-sky" },
    { value: "100%", label: "Digital journey", icon: Smartphone, tint: "bg-spark-coral/20 text-spark-coral" },
];

export function StatsRow() {
    return (
        <aside className="flex h-full flex-col justify-center rounded-3xl bg-navy px-7 py-8 text-white lg:px-8 lg:py-10">
            <div className="flex flex-col gap-8">
                {stats.map((s, i) => (
                    <div
                        className={
                            i < stats.length - 1
                                ? "flex items-center gap-4 border-b border-white/15 pb-8"
                                : "flex items-center gap-4"
                        }
                        key={s.label}
                    >
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.tint}`}>
                            <s.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                            <p className="font-serif text-3xl leading-none text-white">{s.value}</p>
                            <p className="mt-1.5 text-sm text-white/75">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
