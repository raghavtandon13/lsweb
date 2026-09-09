import { ArrowRight, BadgeCheck } from "lucide-react";
import { homeFaqs } from "@/lib/faqs";
import { trustMarks } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, SectionHeading } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { EmiWidget } from "@/components/tools/emi-widget";
import { FinanceScene } from "@/components/brand/finance-scene";
import { SparrowFlight } from "@/components/brand/sparrow-flight";
import { SparrowMark } from "@/components/brand/sparrow-mark";
import { FinanceWhisper } from "@/components/brand/finance-whisper";
import { ProductStrip } from "@/components/home/product-strip";
import { QuickApply } from "@/components/home/quick-apply";
import { PromiseRow } from "@/components/home/promise-row";
import { WhyChoose } from "@/components/home/why-choose";
import { TrustBar } from "@/components/home/trust-bar";
import { CtaBanner } from "@/components/home/cta-banner";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import Link from "next/link";

const stories = [
  {
    quote: "Needed ₹32,000 for stock. Compared offers and took a 6-month loan instead of payday.",
    name: "Mehul D.",
    city: "Surat",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70",
  },
  {
    quote: "Gold loan in Pune — valuation at home, money the same day.",
    name: "Anjali K.",
    city: "Pune",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70",
  },
  {
    quote: "No personal loan offer. They suggested a card against FD. Clear and useful.",
    name: "Farhan S.",
    city: "Hyderabad",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <FinanceScene />
        <SparrowFlight />
        <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-white shadow-lift">
                <SparrowMark className="h-4 w-5 text-white" />
              </span>
              LoanSparrow
            </p>
            <h1 className="max-w-xl font-sans text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[56px]">
              Fast-track your loan approvals...
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-ink">
              Personal, gold and business loans from partner NBFCs. Start with name and mobile — free to check.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#products" variant="gold" size="lg">
                View loan products <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="outline" size="lg">
                How it works
              </ButtonLink>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {trustMarks.map((t) => (
                <li key={t} className="flex items-center gap-2 text-base font-medium text-navy">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <QuickApply />
          </div>
        </Container>
      </section>

      <PromiseRow />
      <TrustBar />
      <ProductStrip />

      <WhyChoose />
      <HowItWorksPreview />

      <section className="relative overflow-hidden border-y border-line bg-white py-16 lg:py-24">
        <FinanceWhisper side="right" />
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Credit score"
              title="Know your score before you apply"
              body="Understand what lenders look at — payment history, card utilisation and recent enquiries."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/credit-score" variant="gold">
                Check your credit score
              </ButtonLink>
              <ButtonLink href="/credit-health" variant="outline">
                Improve credit health
              </ButtonLink>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["300–900", "Score range"],
                ["30%", "Ideal card use"],
                ["On-time", "EMIs matter"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-line bg-ivory p-5">
                  <p className="font-serif text-2xl text-navy sm:text-3xl">{v}</p>
                  <p className="mt-1 text-sm font-medium text-ink">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <EmiWidget />
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Customers" title="What borrowers say" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <blockquote key={s.name} className="rounded-3xl border border-line bg-white p-7 shadow-[0_16px_40px_-28px_rgba(13,59,63,0.35)]">
                <div className="flex items-center gap-3">
                  <img src={s.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <footer className="text-base text-ink">
                    <span className="block font-semibold text-navy">{s.name}</span>
                    {s.city}
                  </footer>
                </div>
                <p className="mt-5 text-lg leading-8 text-navy">“{s.quote}”</p>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <FinanceWhisper side="left" />
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="FAQs"
            title="Common questions"
            body="Eligibility, offers, repayment and how LoanSparrow works with partner lenders."
          />
          <div>
            <Accordion items={homeFaqs} />
            <Link href="/faqs" className="mt-5 inline-block text-base font-semibold text-gold-deep">
              View all FAQs →
            </Link>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
