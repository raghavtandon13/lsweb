import { ArrowRight, Briefcase, Building2, Handshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const paths = [
    {
        href: "/partners/register",
        icon: Building2,
        title: "NBFC / Corporate",
        body: "Banks, NBFCs and corporate affiliates who want to offer loans through LoanSparrow.",
        cta: "Register as partner",
        tint: "bg-[#fff8e4] text-[#c48a10]",
    },
    {
        href: "/dsa/register",
        icon: Briefcase,
        title: "DSA / agent",
        body: "Direct selling agents who source loan applications. Approval is after compliance review.",
        cta: "Register as DSA",
        tint: "bg-[#e7f8f6] text-spark-mint",
    },
];

const perks = [
    {
        icon: Handshake,
        title: "One marketplace",
        body: "Customers start with mobile and PAN. You receive matched applications.",
        tint: "bg-[#e7f4fc] text-spark-sky",
    },
    {
        icon: ShieldCheck,
        title: "Consent-first",
        body: "Bureau and data share happen only after the customer ticks consent.",
        tint: "bg-[#f3f0ff] text-spark-lilac",
    },
];

export default function PartnerWithUsPage() {
    return (
        <>
            <PageHero
                body="Lending partners and DSAs join from this page. Customer login stays separate."
                eyebrow="Partners"
                title="Partner with us"
            />
            <Container className="py-8 lg:py-10">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                    {paths.map((p) => (
                        <article
                            className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-line bg-white"
                            key={p.href}
                        >
                            <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${p.tint}`}>
                                    <p.icon className="h-5 w-5" />
                                </span>
                                <h2 className="mt-4 font-serif text-2xl text-navy">{p.title}</h2>
                                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{p.body}</p>
                                <ButtonLink className="mt-5 w-full sm:w-auto" href={p.href} size="md" variant="gold">
                                    {p.cta} <ArrowRight className="h-4 w-4" />
                                </ButtonLink>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">Why partner</p>
                    <h2 className="mt-1.5 max-w-xl font-serif text-2xl text-navy sm:text-[1.75rem]">
                        Customers on one side. Partners on the other.
                    </h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {perks.map((item) => (
                            <article
                                className="flex gap-3 rounded-2xl border border-line bg-ivory p-4 sm:p-5"
                                key={item.title}
                            >
                                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${item.tint}`}>
                                    <item.icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <p className="mt-8 text-sm text-muted">
                    Already a customer? Use{" "}
                    <Link className="font-semibold text-spark-gold" href="/login">
                        customer login
                    </Link>{" "}
                    with mobile OTP. Partner and DSA access is issued after your registration is approved.
                </p>
            </Container>
        </>
    );
}
