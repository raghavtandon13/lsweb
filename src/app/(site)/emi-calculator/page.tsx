import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmiWidget } from "@/components/tools/emi-widget";

export default function EmiPage() {
  return (
    <>
      <PageHero
        eyebrow="Credit"
        title="EMI calculator"
        body="See monthly EMI, total interest and total payable. Lender fees may change the final number."
      />
      <Container className="grid items-start gap-10 py-10 lg:grid-cols-2 lg:py-12">
        <EmiWidget />
        <div>
          <h2 className="font-serif text-3xl text-navy">How this works</h2>
          <p className="mt-4 leading-7 text-muted">
            This uses a reducing-balance EMI, which is common for personal loans. Payday rates quoted per month are
            different from yearly interest.
          </p>
          <p className="mt-4 leading-7 text-muted">
            Processing fee and GST are extra. Check the offer card for the final numbers.
          </p>
          <ButtonLink href="/apply" className="mt-8 w-full sm:w-auto">
            Check eligibility
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
