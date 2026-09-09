const partners = [
  { name: "Aarohan Finance", mark: "AF" },
  { name: "Northstar NBFC", mark: "NS" },
  { name: "Kaveri Capital", mark: "KC" },
  { name: "Hillgold", mark: "HG" },
  { name: "Meridian HFC", mark: "MH" },
  { name: "Pinnacle Credit", mark: "PC" },
];

export function TrustBar() {
  const ticker = [...partners, ...partners];

  return (
    <section className="flex items-center overflow-hidden border-b border-line bg-white py-16">
      <div className="marquee-track gap-24 px-10">
        {ticker.map((p, i) => (
          <span key={`${p.mark}-${i}`} className="marquee-item text-base">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-xs font-bold text-white">
              {p.mark}
            </span>
            {p.name}
          </span>
        ))}
      </div>
    </section>
  );
}
