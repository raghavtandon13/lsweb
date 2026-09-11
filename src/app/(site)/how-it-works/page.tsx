import { PageHero } from "@/components/layout/page-hero";
import { BtnRow } from "@/components/ui/btn-row";
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
        t: "CIBIL OTP and consents",
        d: "A soft CIBIL OTP plus one-line checkboxes. It will not affect your score. WhatsApp is optional.",
    },
    {
        t: "See CIBIL and lenders",
        d: "Your score snapshot first, then eligible partner offers — or other options if none match.",
    },
    {
        t: "Complete KYC with the lender",
        d: "You sign with the NBFC or bank on the offer. EMIs are paid to that lender. LoanSparrow keeps your application history.",
    },
];

const hues = ["text-spark-gold", "text-spark-mint", "text-spark-sky", "text-spark-coral", "text-spark-lilac"];

export default function HowItWorksPage() {
    return (
        <>
            <PageHero
                actions
                body="No branch visit to start. Apply on your phone, pause anytime, and continue after login."
                eyebrow="How it works"
                title="Check loan eligibility in 4 steps"
            />
            <Container className="py-10 lg:py-12">
                <ol className="grid gap-4 lg:grid-cols-5">
                    {beats.map((b, i) => (
                        <li className="rounded-2xl border border-line bg-white p-6" key={b.t}>
                            <p className={`font-serif text-3xl ${hues[i]}`}>{String(i + 1).padStart(2, "0")}</p>
                            <h2 className="mt-3 font-serif text-xl text-navy">{b.t}</h2>
                            <p className="mt-2 text-sm leading-6 text-muted">{b.d}</p>
                        </li>
                    ))}
                </ol>
                <BtnRow className="mt-10">
                    <ButtonLink className="w-full sm:w-auto" href="/apply" size="lg">
                        Check eligibility
                    </ButtonLink>
                    <ButtonLink className="w-full sm:w-auto" href="/faqs" size="lg" variant="outline">
                        FAQs
                    </ButtonLink>
                </BtnRow>
            </Container>
        </>
    );
}
