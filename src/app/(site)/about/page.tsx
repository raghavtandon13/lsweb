import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export default function AboutPage() {
    return (
        <>
            <PageHero
                body={`${site.legalName} helps you compare loan offers from partner banks and NBFCs. We are not the lender on this website.`}
                eyebrow="About us"
                title="LoanSparrow is a loan marketplace"
            />
            <Container className="grid gap-10 py-10 lg:grid-cols-12 lg:py-12">
                <div className="prose-legal lg:col-span-7">
                    <p>
                        LoanSparrow lets you check eligibility for payday, personal, gold, FD, mutual fund and business
                        loans in one place. You see named offers — amount, interest and fees — before you continue with
                        a lender.
                    </p>
                    <h2>What we do</h2>
                    <ul>
                        <li>Collect basic details with your consent</li>
                        <li>Match you with partner lender policies</li>
                        <li>Show offers, or tell you if none are available</li>
                        <li>Keep your application status in the dashboard</li>
                    </ul>
                    <h2>What we do not do</h2>
                    <p>
                        We do not ask you to send gold, cash or “processing” money to an individual. Insurance is
                        optional. Any lender fee is shown on the offer before you accept.
                    </p>
                </div>
                <aside className="h-fit rounded-2xl border border-line bg-white p-7 lg:col-span-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                        Registered office
                    </p>
                    <h2 className="mt-2 font-serif text-2xl text-navy">{site.legalName}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted">
                        {site.address.line1}
                        <br />
                        {site.address.line2}
                        <br />
                        CIN {site.cin}
                    </p>
                    <p className="mt-5 text-sm text-muted">
                        {site.email}
                        <br />
                        {site.phone}
                        <br />
                        {site.hours}
                    </p>
                </aside>
            </Container>
        </>
    );
}
