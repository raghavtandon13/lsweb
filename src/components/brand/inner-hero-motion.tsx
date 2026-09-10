export function InnerHeroMotion() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
      <svg
        className="absolute inset-y-0 right-0 h-full w-[52%] max-lg:w-[72%]"
        viewBox="0 0 520 150"
        preserveAspectRatio="xMaxYMid meet"
      >
        <circle className="hero-orb" cx="210" cy="42" r="28" fill="color-mix(in srgb, var(--spark-mint) 22%, transparent)" />
        <circle className="hero-orb hero-orb-slow" cx="390" cy="58" r="40" fill="color-mix(in srgb, var(--spark-gold) 22%, transparent)" />
        <circle className="hero-orb" cx="300" cy="110" r="32" fill="color-mix(in srgb, var(--spark-sky) 16%, transparent)" />

        <g className="coin-float">
          <circle cx="320" cy="48" r="18" fill="var(--spark-gold)" />
          <circle cx="315" cy="42" r="4" fill="white" opacity="0.35" />
          <text x="320" y="54" textAnchor="middle" fill="#6b4a08" fontSize="14" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
        <g className="coin-float coin-float-slow">
          <circle cx="430" cy="96" r="14" fill="var(--spark-mint)" />
          <text x="430" y="101" textAnchor="middle" fill="white" fontSize="11" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
