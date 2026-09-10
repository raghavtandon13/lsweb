import { FinanceWhisper } from "@/components/brand/finance-whisper";
import { BtnRow } from "@/components/ui/btn-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <FinanceWhisper side="right" tone="navy" />
      <Container className="relative flex flex-col items-stretch justify-between gap-5 py-10 sm:items-start sm:gap-6 sm:py-12 lg:flex-row lg:items-center lg:py-14">
        <div className="max-w-xl text-white">
          <h2 className="font-serif text-3xl sm:text-4xl">Ready to check your loan offers?</h2>
          <p className="mt-3 text-base text-white/90">
            Start with name and mobile. You can pause anytime and continue from login.
          </p>
        </div>
        <BtnRow className="shrink-0 lg:justify-end">
          <ButtonLink href="/apply" variant="soft" size="lg" className="w-full sm:min-w-[13rem] sm:w-auto">
            Check eligibility
          </ButtonLink>
          <ButtonLink href="/help/contact" variant="onDark" size="lg" className="w-full sm:min-w-[13rem] sm:w-auto">
            Contact us
          </ButtonLink>
        </BtnRow>
      </Container>
    </section>
  );
}
