export function InnerHeroMotion() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute top-6 right-6 bottom-6 left-[42%] h-auto w-auto max-lg:left-[20%]"
        viewBox="0 0 720 360"
        preserveAspectRatio="xMaxYMid meet"
      >
        <circle className="hero-orb" cx="280" cy="70" r="64" fill="color-mix(in srgb, var(--navy) 16%, transparent)" />
        <circle className="hero-orb hero-orb-slow" cx="520" cy="120" r="96" fill="color-mix(in srgb, var(--navy) 12%, transparent)" />
        <circle className="hero-orb" cx="400" cy="230" r="74" fill="color-mix(in srgb, var(--navy) 8%, transparent)" />
        <circle className="hero-orb hero-orb-slow" cx="620" cy="260" r="48" fill="color-mix(in srgb, var(--navy) 12%, transparent)" />

        <g className="coin-float">
          <circle cx="430" cy="100" r="32" fill="var(--navy)" opacity="0.55" />
          <text x="430" y="111" textAnchor="middle" fill="white" fontSize="24" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
        <g className="coin-float coin-float-slow">
          <circle cx="560" cy="190" r="22" fill="var(--navy)" opacity="0.45" />
          <text x="560" y="198" textAnchor="middle" fill="white" fontSize="16" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
        <g className="coin-float">
          <circle cx="320" cy="210" r="26" fill="var(--navy)" opacity="0.28" />
          <text x="320" y="219" textAnchor="middle" fill="white" fontSize="18" fontFamily="Georgia, serif">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
