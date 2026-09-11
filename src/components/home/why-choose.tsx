import { FileCheck2, Lock, Scale, Zap } from "lucide-react";
import { FinanceWhisper } from "@/components/brand/finance-whisper";
import { Container, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const items = [
    {
        icon: Zap,
        title: "Fast eligibility",
        body: "Name, mobile and a short profile. See offers in minutes.",
        tint: "bg-[#fff1ec] text-spark-coral",
    },
    {
        icon: Scale,
        title: "Compare offers",
        body: "Amount, interest, fees and tenure side by side from partner NBFCs.",
        tint: "bg-[#e7f4fc] text-spark-sky",
    },
    {
        icon: Lock,
        title: "Secure process",
        body: "OTP login, encrypted data, and bureau check only after you agree.",
        tint: "bg-[#f3f0ff] text-spark-lilac",
    },
    {
        icon: FileCheck2,
        title: "Clear next steps",
        body: "If no offer matches, we say so and suggest gold or FD options.",
        tint: "bg-[#e8f8ef] text-spark-leaf",
    },
];

export function WhyChoose() {
    return (
        <section className="relative overflow-hidden bg-ivory py-12 sm:py-16 lg:py-24">
            <FinanceWhisper side="left" />
            <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <Reveal className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:col-span-5">
                    <img
                        alt="Customer checking loan offers on a phone"
                        className="h-full min-h-[220px] w-full object-cover sm:min-h-[320px] lg:min-h-[420px]"
                        src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 font-serif text-xl text-white sm:bottom-6 sm:left-6 sm:right-6 sm:text-3xl">
                        Real offers from partner NBFCs — or a clear no.
                    </p>
                </Reveal>
                <div className="lg:col-span-7">
                    <Reveal>
                        <SectionHeading
                            body="We match you with partner lenders. You see real offers, or a clear no."
                            eyebrow="Why LoanSparrow"
                            title="A simple way to find the right loan"
                        />
                    </Reveal>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map((item, i) => (
                            <Reveal delay={i * 80} key={item.title}>
                                <article className="h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                                    <span className={`grid h-11 w-11 place-items-center rounded-2xl ${item.tint}`}>
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-xl font-semibold text-navy">{item.title}</h3>
                                    <p className="mt-2 text-base leading-7 text-ink">{item.body}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
