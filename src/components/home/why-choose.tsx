import { FileCheck2, Lock, Scale, Zap } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FinanceWhisper } from "@/components/brand/finance-whisper";

const items = [
  {
    icon: Zap,
    title: "Fast eligibility",
    body: "Name, mobile and a short profile. See offers in minutes.",
  },
  {
    icon: Scale,
    title: "Compare offers",
    body: "Amount, interest, fees and tenure side by side from partner NBFCs.",
  },
  {
    icon: Lock,
    title: "Secure process",
    body: "OTP login, encrypted data, and bureau check only after you agree.",
  },
  {
    icon: FileCheck2,
    title: "Clear next steps",
    body: "If no offer matches, we say so and suggest gold or FD options.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-ivory py-16 lg:py-24">
      <FinanceWhisper side="left" />
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="relative overflow-hidden rounded-[2rem] lg:col-span-5">
          <img
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=70"
            alt="Customer checking loan offers on a phone"
            className="h-full min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-serif text-3xl text-white">
            Real offers from partner NBFCs — or a clear no.
          </p>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              eyebrow="Why LoanSparrow"
              title="A simple way to find the right loan"
              body="We match you with partner lenders. You see real offers, or a clear no."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  <item.icon className="h-6 w-6 text-gold-deep" />
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
