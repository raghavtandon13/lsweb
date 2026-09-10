import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { n: "1", title: "Name & OTP", body: "We send an OTP to your number.", hue: "text-spark-gold" },
  { n: "2", title: "Basic details", body: "PAN, pincode, income, work type and date of birth.", hue: "text-spark-mint" },
  { n: "3", title: "CIBIL OTP", body: "Soft check with consents. It will not affect your score.", hue: "text-spark-sky" },
  { n: "4", title: "Score & lenders", body: "See your CIBIL snapshot, then eligible partner offers.", hue: "text-spark-coral" },
];

export function HowItWorksPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">How it works</p>
            <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl lg:text-5xl">Four simple steps</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-ivory/70 p-6">
                  <p className={`font-serif text-4xl ${s.hue}`}>{s.n}</p>
                  <h3 className="mt-2 text-xl font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-base leading-7 text-ink">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <ButtonLink href="/help" variant="outline" className="mt-8 w-full sm:w-auto">
              See all steps
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="relative overflow-hidden rounded-[2rem] lg:col-span-5" delay={120}>
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=70"
            alt="Person completing a digital loan application"
            className="min-h-[220px] w-full object-cover sm:min-h-[320px] lg:min-h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lift sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">On your phone</p>
            <p className="mt-1 font-serif text-xl text-navy sm:text-2xl">No branch visit to begin</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
