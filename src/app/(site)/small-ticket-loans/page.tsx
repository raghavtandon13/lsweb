import { PageHero } from "@/components/layout/page-hero";
import { BtnRow } from "@/components/ui/btn-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function SmallTicketPage() {
  return (
    <>
      <PageHero
        eyebrow="Loans"
        title="Small ticket loans"
        body="Loans from about ₹8,000 to ₹50,000. Compare the total amount you repay, not only the monthly rate."
        actions
      />
      <Container className="grid gap-8 py-10 lg:grid-cols-3 lg:py-12">
        {[
          {
            t: "What counts as small",
            d: "On LoanSparrow: payday up to ₹50,000 and short-term PLs starting ₹10,000. If you need more, use Personal Loan or a secured line.",
          },
          {
            t: "Why the rate looks high",
            d: "Fixed costs of KYC and NACH do not shrink with the ticket. Compare rupees of interest, not only the monthly percentage.",
          },
          {
            t: "When to walk away",
            d: "If you must roll the loan to pay the last one, stop. Use gold or FD instead. A no-offer is cheaper than a trap.",
          },
        ].map((c) => (
          <article key={c.t} className="card p-7">
            <h2 className="font-serif text-2xl text-navy">{c.t}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{c.d}</p>
          </article>
        ))}
      </Container>
      <Container className="pb-10">
        <BtnRow>
          <ButtonLink href="/loans/payday" className="w-full sm:w-auto">
            Payday loans
          </ButtonLink>
          <ButtonLink href="/loans/short-term-personal" variant="outline" className="w-full sm:w-auto">
            Short term PL
          </ButtonLink>
        </BtnRow>
      </Container>
    </>
  );
}
