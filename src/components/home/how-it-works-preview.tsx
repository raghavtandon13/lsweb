import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { n: "1", title: "Name & mobile", body: "We send an OTP to your number." },
  { n: "2", title: "Basic details", body: "Pincode, income, work type and date of birth." },
  { n: "3", title: "Consent", body: "Credit check and sharing with lenders — only if you tick." },
  { n: "4", title: "See offers", body: "Compare loan offers, or we tell you if none match." },
];

export function HowItWorksPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">How it works</p>
            <h2 className="mt-2 font-serif text-4xl text-navy sm:text-5xl">Four simple steps</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-ivory/70 p-6">
                  <p className="font-serif text-4xl text-navy/20">{s.n}</p>
                  <h3 className="mt-2 text-xl font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-base leading-7 text-ink">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <ButtonLink href="/how-it-works" variant="outline" className="mt-8">
              See all steps
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="relative overflow-hidden rounded-[2rem] lg:col-span-5" delay={120}>
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=70"
            alt="Person completing a digital loan application"
            className="min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-lift">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">On your phone</p>
            <p className="mt-1 font-serif text-2xl text-navy">No branch visit to begin</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
