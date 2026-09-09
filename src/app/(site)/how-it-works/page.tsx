import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const beats = [
  {
    t: "Enter name and mobile",
    d: "We send an OTP to confirm your number. No documents on this step. No credit check yet.",
  },
  {
    t: "Share basic details",
    d: "Pincode, monthly income, employment type and date of birth. This helps lenders check if they can offer you a loan.",
  },
  {
    t: "Give consent",
    d: "You choose credit bureau check, sharing with partner lenders, and terms. WhatsApp updates are optional.",
  },
  {
    t: "See offers",
    d: "If a partner can lend, you see amount, interest, fees and tenure. If not, we show other options such as gold or FD.",
  },
  {
    t: "Complete KYC with the lender",
    d: "You sign with the NBFC or bank on the offer. EMIs are paid to that lender. LoanSparrow keeps your application history.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Check loan eligibility in 4 steps"
        body="No branch visit to start. Apply on your phone, pause anytime, and continue after login."
        actions
      />
      <Container className="py-14 lg:py-16">
        <ol className="grid gap-4 lg:grid-cols-5">
          {beats.map((b, i) => (
            <li key={b.t} className="rounded-2xl border border-line bg-white p-6">
              <p className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-serif text-xl text-navy">{b.t}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{b.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/apply" size="lg">
            Check eligibility
          </ButtonLink>
          <ButtonLink href="/faqs" variant="outline" size="lg">
            FAQs
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
