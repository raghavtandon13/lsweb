import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { faqs } from "@/lib/faqs";

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        title="FAQs"
        body="Answers on eligibility, offers, repayment and how LoanSparrow works with partner lenders."
      />
      <Container className="space-y-10 py-10 lg:py-12">
        {faqs.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 font-serif text-2xl text-navy">{group.category}</h2>
            <Accordion items={group.items} />
          </section>
        ))}
      </Container>
    </>
  );
}
