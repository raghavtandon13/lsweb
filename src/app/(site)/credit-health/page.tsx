import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const plan = [
    {
        t: "Week 1 — Pay on time",
        d: "List every EMI and card bill. Set auto-pay for at least the minimum due. Avoid a new personal loan just to ‘fix’ the score.",
    },
    {
        t: "Month 1 — Lower card use",
        d: "Keep credit card balances under 30% of the limit, ideally under 10%.",
    },
    {
        t: "Month 2 — Add a safe product if needed",
        d: "A card against FD can help a thin credit file. Another payday loan usually does not.",
    },
    {
        t: "Month 3 — Apply less often",
        d: "Too many loan applications in a short time can hurt the score. Use one journey, then wait.",
    },
];

export default function CreditHealthPage() {
    return (
        <>
            <PageHero
                body="There is no overnight fix. Pay on time, keep card use low, and avoid too many loan applications."
                eyebrow="Credit"
                title="Improve your credit health"
            />
            <Container className="grid gap-8 py-10 lg:grid-cols-2 lg:py-12">
                {plan.map((p) => (
                    <article className="card p-7" key={p.t}>
                        <h2 className="font-serif text-2xl text-navy">{p.t}</h2>
                        <p className="mt-3 leading-7 text-muted">{p.d}</p>
                    </article>
                ))}
            </Container>
            <Container className="pb-10">
                <ButtonLink className="w-full sm:w-auto" href="/small-ticket-loans" variant="outline">
                    If you still need a small amount
                </ButtonLink>
            </Container>
        </>
    );
}
