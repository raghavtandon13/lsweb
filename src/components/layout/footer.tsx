import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { BtnRow } from "@/components/ui/btn-row";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { nav, site } from "@/lib/site";

export function Footer() {
    return (
        <footer className="mt-auto border-t border-line bg-navy text-white">
            <Container className="py-10 sm:py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Logo dark />
                        <p className="mt-5 max-w-sm text-base leading-8 text-white">{site.description}</p>
                        <BtnRow className="mt-6">
                            <ButtonLink className="w-full sm:w-auto" href="/apply" size="sm" variant="soft">
                                Check eligibility
                            </ButtonLink>
                            <ButtonLink className="w-full sm:w-auto" href="/help/contact" size="sm" variant="onDark">
                                Contact us
                            </ButtonLink>
                        </BtnRow>
                        <p className="mt-6 text-sm uppercase tracking-[0.14em] text-gold">
                            {site.legalName} · CIN {site.cin}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Loans</p>
                        <ul className="mt-4 space-y-2">
                            {nav.loans.slice(0, 6).map((p) => (
                                <li key={p.href}>
                                    <Link className="text-base text-white hover:text-gold" href={p.href}>
                                        {p.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Credit & help</p>
                        <ul className="mt-4 space-y-2">
                            {[
                                ...nav.credit.slice(0, 4),
                                ...nav.help,
                                { href: "/partner-with-us", label: "Partner with us" },
                            ].map((p) => (
                                <li key={p.href}>
                                    <Link className="text-base text-white hover:text-gold" href={p.href}>
                                        {p.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Legal</p>
                        <ul className="mt-4 space-y-2">
                            {nav.legal.map((p) => (
                                <li key={p.href}>
                                    <Link className="text-base text-white hover:text-gold" href={p.href}>
                                        {p.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-base text-white">
                            {site.phone}
                            <br />
                            {site.email}
                        </p>
                    </div>
                </div>
                <div className="mt-14 border-t border-white/10 pt-6 text-sm leading-7 text-white/90">
                    LoanSparrow is a marketplace. Credit facilities are extended by partner banks and NBFCs at their
                    sole discretion. *Rates are indicative and lender-specific. Read the offer, KFS, and MITC before you
                    accept. Not for US persons.
                </div>
            </Container>
        </footer>
    );
}
