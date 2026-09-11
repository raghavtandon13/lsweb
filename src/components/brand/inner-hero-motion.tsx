export function InnerHeroMotion() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
            <svg
                className="absolute inset-y-0 right-0 h-full w-[52%] max-lg:w-[72%]"
                preserveAspectRatio="xMaxYMid meet"
                viewBox="0 0 520 150"
            >
                <circle
                    className="hero-orb"
                    cx="210"
                    cy="42"
                    fill="color-mix(in srgb, var(--spark-mint) 22%, transparent)"
                    r="28"
                />
                <circle
                    className="hero-orb hero-orb-slow"
                    cx="390"
                    cy="58"
                    fill="color-mix(in srgb, var(--spark-gold) 22%, transparent)"
                    r="40"
                />
                <circle
                    className="hero-orb"
                    cx="300"
                    cy="110"
                    fill="color-mix(in srgb, var(--spark-sky) 16%, transparent)"
                    r="32"
                />

                <g className="coin-float">
                    <circle cx="320" cy="48" fill="var(--spark-gold)" r="18" />
                    <circle cx="315" cy="42" fill="white" opacity="0.35" r="4" />
                    <text fill="#6b4a08" fontFamily="Georgia, serif" fontSize="14" textAnchor="middle" x="320" y="54">
                        ₹
                    </text>
                </g>
                <g className="coin-float coin-float-slow">
                    <circle cx="430" cy="96" fill="var(--spark-mint)" r="14" />
                    <text fill="white" fontFamily="Georgia, serif" fontSize="11" textAnchor="middle" x="430" y="101">
                        ₹
                    </text>
                </g>
            </svg>
        </div>
    );
}
