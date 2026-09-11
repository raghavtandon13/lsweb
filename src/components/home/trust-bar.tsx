const partners = [
    { name: "Aarohan Finance", mark: "AF", tint: "bg-navy" },
    { name: "Northstar NBFC", mark: "NS", tint: "bg-spark-gold" },
    { name: "Kaveri Capital", mark: "KC", tint: "bg-spark-mint" },
    { name: "Hillgold", mark: "HG", tint: "bg-spark-sky" },
    { name: "Meridian HFC", mark: "MH", tint: "bg-spark-lilac" },
    { name: "Pinnacle Credit", mark: "PC", tint: "bg-spark-coral" },
];

export function TrustBar() {
    const ticker = [...partners, ...partners];

    return (
        <section className="flex items-center overflow-hidden border-b border-line bg-white py-8 sm:py-12 lg:py-16">
            <div className="marquee-track gap-24 px-10">
                {ticker.map((p, i) => (
                    <span className="marquee-item text-base" key={`${p.mark}-${i}`}>
                        <span
                            className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-bold text-white ${p.tint}`}
                        >
                            {p.mark}
                        </span>
                        {p.name}
                    </span>
                ))}
            </div>
        </section>
    );
}
