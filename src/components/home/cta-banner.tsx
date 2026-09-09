import { FinanceWhisper } from "@/components/brand/finance-whisper";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <FinanceWhisper side="right" tone="navy" />
      <Container className="relative flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center lg:py-20">
        <div className="max-w-xl text-white">
          <h2 className="font-serif text-4xl sm:text-5xl">Ready to check your loan offers?</h2>
          <p className="mt-4 text-lg text-white/90">
            Start with name and mobile. You can pause anytime and continue from login.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/apply" variant="soft" size="lg">
            Check eligibility
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white/25 bg-transparent text-white hover:border-white"
          >
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
