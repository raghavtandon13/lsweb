import { InnerHeroMotion } from "@/components/brand/inner-hero-motion";
import { BtnRow } from "@/components/ui/btn-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

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
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-r from-ivory via-white to-[#fff8e8]">
      <InnerHeroMotion />
      <Container className="relative flex min-h-0 flex-col justify-center py-6 sm:py-8 lg:py-9">
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-2xl font-serif text-[1.65rem] leading-tight text-navy sm:text-3xl lg:text-[2.05rem]">
          {title}
        </h1>
        {body && (
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink sm:mt-2.5 sm:text-base sm:leading-7">{body}</p>
        )}
        {actions && (
          <BtnRow className="mt-4 sm:mt-5">
            <ButtonLink href="/apply" variant="gold" size="md" className="w-full sm:w-auto">
              Check eligibility
            </ButtonLink>
            <ButtonLink href="/help" variant="outline" size="md" className="w-full sm:w-auto">
              How it works
            </ButtonLink>
          </BtnRow>
        )}
      </Container>
    </section>
  );
}
