import Link from "next/link";
import { ArrowRight, BadgeCheck, Landmark, Shield, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FinanceScene } from "@/components/brand/finance-scene";
import { inr } from "@/lib/format";

const highlights = [
  { href: "/loans/personal", name: "Personal Loan", amount: "₹50K – ₹25L", rate: "From 10.99% p.a." },
  { href: "/loans/gold", name: "Gold Loan", amount: "₹25K – ₹50L", rate: "From 8.5% p.a." },
  { href: "/loans/unsecured-business", name: "Business Loan", amount: "₹1L – ₹50L", rate: "From 14% p.a." },
  { href: "/loans/payday", name: "Payday Loan", amount: "₹5K – ₹50K", rate: "Same-day options" },
];

const chips = [
  { icon: Shield, label: "Partner NBFCs" },
  { icon: Landmark, label: "8 loan products" },
  { icon: Sparkles, label: "100% digital" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#eaf8f6] via-white to-[#f4fbfa]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-gold-wash blur-3xl" />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <defs>
            <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V56" fill="none" stroke="rgba(10,51,56,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1440" height="800" fill="url(#hero-grid)" />
          <path
            d="M0 560 C 180 500, 320 620, 520 540 S 860 430, 1100 470 1440 380, 1440 380"
            fill="none"
            stroke="rgba(29,184,174,0.28)"
            strokeWidth="2"
          />
          <path
            d="M0 620 C 220 580, 400 680, 640 600 S 980 500, 1440 540"
            fill="none"
            stroke="rgba(10,51,56,0.1)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
          />
        </svg>
      </div>

      <Container className="relative grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-4 lg:py-16 xl:py-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            <BadgeCheck className="h-3.5 w-3.5" />
            Loan marketplace
          </p>
          <h1 className="max-w-xl font-serif text-4xl leading-[1.1] text-navy sm:text-5xl xl:text-[58px]">
            Loans for life’s next move — personal, gold or business.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
            Compare offers from partner NBFCs. Apply when you are ready — eligibility starts in a short form, not on this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/apply" variant="gold" size="lg">
              Check eligibility <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#products" variant="outline" size="lg">
              Explore products
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm text-navy shadow-sm ring-1 ring-line"
              >
                <c.icon className="h-4 w-4 text-gold-deep" />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <FinanceScene className="h-auto w-full" />
        </div>
      </Container>

      <Container className="relative pb-10 lg:pb-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="group rounded-2xl border border-line bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold hover:shadow-lift"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">{h.rate}</p>
              <h2 className="mt-2 font-serif text-xl text-navy">{h.name}</h2>
              <p className="mt-1 text-sm text-muted">{h.amount}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep">
                Know more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

void inr;
