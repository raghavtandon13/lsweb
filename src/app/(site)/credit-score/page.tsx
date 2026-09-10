import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { CreditScoreCheck } from "@/components/tools/credit-score-check";

export default function CreditScorePage() {
  return (
    <>
      <PageHero
        eyebrow="Credit"
        title="Check your Financial Kundli"
        body="See your score in a minute. We pull a live bureau score only after you give consent."
      />
      <Container className="grid items-start gap-10 py-10 lg:grid-cols-2 lg:py-12">
        <CreditScoreCheck />
        <div>
          <h2 className="font-serif text-3xl text-navy">What moves the number</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <li>
              <strong className="text-navy">Payment history.</strong> Late EMIs and settled accounts linger.
            </li>
            <li>
              <strong className="text-navy">Utilisation.</strong> Revolving balances above ~30% of limit look hungry.
            </li>
            <li>
              <strong className="text-navy">Age and mix.</strong> A new personal loan on a two-month file is loud.
            </li>
            <li>
              <strong className="text-navy">Enquiries.</strong> Several hard pulls in a week look like distress.
            </li>
          </ul>
          <ButtonLink href="/credit-report" variant="outline" className="mt-8 w-full sm:w-auto">
            What’s in a report
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
