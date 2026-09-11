import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { FinanceScene } from "@/components/brand/finance-scene";
import { FinanceWhisper } from "@/components/brand/finance-whisper";
import { SparrowFlight } from "@/components/brand/sparrow-flight";
import { SparrowMark } from "@/components/brand/sparrow-mark";
import { CtaBanner } from "@/components/home/cta-banner";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { ProductStrip } from "@/components/home/product-strip";
import { PromiseRow } from "@/components/home/promise-row";
import { QuickApply } from "@/components/home/quick-apply";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyChoose } from "@/components/home/why-choose";
import { EmiWidget } from "@/components/tools/emi-widget";
import { Accordion } from "@/components/ui/accordion";
import { BtnRow } from "@/components/ui/btn-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, SectionHeading } from "@/components/ui/container";
import { homeFaqs } from "@/lib/faqs";
import { trustMarks } from "@/lib/site";

const stories = [
    {
        quote: "Needed ₹32,000 for stock. Compared offers and took a 6-month loan instead of payday.",
        name: "Mehul D.",
        city: "Surat",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70",
    },
    {
        quote: "Gold loan in Pune — valuation at home, money the same day.",
        name: "Anjali K.",
        city: "Pune",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70",
    },
    {
        quote: "No personal loan offer. They suggested a card against FD. Clear and useful.",
        name: "Farhan S.",
        city: "Hyderabad",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70",
    },
];

export default function HomePage() {
    return (
        <>
            <section className="relative overflow-hidden">
                <FinanceScene />
                <SparrowFlight />
                <Container className="relative grid items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-12 lg:gap-14 lg:py-20">
                    <div className="min-w-0 lg:col-span-7">
                        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep sm:mb-4 sm:text-sm">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-white shadow-lift ring-2 ring-spark-gold/80 sm:h-8 sm:w-8">
                                <SparrowMark className="h-4 w-5 text-white" />
                            </span>
                            LoanSparrow
                        </p>
                        <h1 className="max-w-xl font-sans text-[1.75rem] font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-[56px]">
                            Fast-track your <span className="text-spark-gold">loan approvals ...</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-base leading-7 text-ink sm:mt-6 sm:text-xl sm:leading-8">
                            Personal, gold and business loans from partner NBFCs. Start with name and mobile — free to
                            check.
                        </p>
                        <BtnRow className="mt-6 sm:mt-8">
                            <ButtonLink className="w-full sm:w-auto" href="#loans" size="lg" variant="gold">
                                View loans <ArrowRight className="h-5 w-5" />
                            </ButtonLink>
                            <ButtonLink className="w-full sm:w-auto" href="/help" size="lg" variant="outline">
                                How it works
                            </ButtonLink>
                        </BtnRow>
                        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
                            {trustMarks.map((t) => (
                                <li className="flex items-center gap-2 text-base font-medium text-navy" key={t}>
                                    <BadgeCheck className="h-5 w-5 shrink-0 text-spark-leaf" />
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

            <section className="relative overflow-hidden border-y border-line bg-white py-12 sm:py-16 lg:py-24">
                <FinanceWhisper side="right" />
                <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <SectionHeading
                            body="Understand what lenders look at — payment history, card utilisation and recent enquiries."
                            eyebrow="Credit score"
                            title="Know your score before you apply"
                        />
                        <BtnRow className="mt-8">
                            <ButtonLink className="w-full sm:w-auto" href="/credit-score" variant="gold">
                                Check your credit score
                            </ButtonLink>
                            <ButtonLink className="w-full sm:w-auto" href="/credit-health" variant="outline">
                                Improve credit health
                            </ButtonLink>
                        </BtnRow>
                        <div className="mt-6 grid grid-cols-1 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                            {[
                                ["300–900", "Score range", "text-spark-mint"],
                                ["30%", "Ideal card use", "text-spark-gold"],
                                ["On-time", "EMIs matter", "text-spark-leaf"],
                            ].map(([v, l, hue]) => (
                                <div className="rounded-2xl border border-line bg-ivory p-4 sm:p-5" key={l}>
                                    <p className={`font-serif text-xl sm:text-2xl lg:text-3xl ${hue}`}>{v}</p>
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

            <section className="bg-ivory py-12 sm:py-16 lg:py-24">
                <Container>
                    <SectionHeading align="center" eyebrow="Customers" title="What borrowers say" />
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {stories.map((s) => (
                            <blockquote
                                className="rounded-3xl border border-line bg-white p-7 shadow-[0_16px_40px_-28px_rgba(13,59,63,0.35)]"
                                key={s.name}
                            >
                                <div className="flex items-center gap-3">
                                    <img alt="" className="h-12 w-12 rounded-full object-cover" src={s.photo} />
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

            <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
                <FinanceWhisper side="left" />
                <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
                    <SectionHeading
                        body="Eligibility, offers, repayment and how LoanSparrow works with partner lenders."
                        eyebrow="FAQs"
                        title="Common questions"
                    />
                    <div>
                        <Accordion items={homeFaqs} />
                        <Link className="mt-5 inline-block text-base font-semibold text-gold-deep" href="/help/faqs">
                            View all FAQs →
                        </Link>
                    </div>
                </Container>
            </section>

            <CtaBanner />
        </>
    );
}
