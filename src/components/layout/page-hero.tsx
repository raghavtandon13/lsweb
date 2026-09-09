import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { InnerHeroMotion } from "@/components/brand/inner-hero-motion";

export function PageHero({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  actions?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ivory">
      <InnerHeroMotion />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.15] text-navy sm:text-5xl">{title}</h1>
        {body && <p className="mt-5 max-w-2xl text-lg leading-8 text-ink">{body}</p>}
        {actions && (
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/apply" variant="gold" size="lg">
              Check eligibility
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline" size="lg">
              How it works
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
