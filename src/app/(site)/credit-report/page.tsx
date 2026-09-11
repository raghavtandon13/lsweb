import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const rows = [
    { name: "Aarohan Finance PL", type: "Personal loan", status: "Open", dpd: "000", limit: "₹1,20,000" },
    { name: "Retail card · Issuer A", type: "Credit card", status: "Open", dpd: "000", limit: "₹85,000" },
    { name: "Hillgold GL", type: "Gold loan", status: "Closed", dpd: "000", limit: "—" },
];

export default function CreditReportPage() {
    return (
        <>
            <PageHero
                body="See accounts, payments and enquiries. Live report data needs your consent and the bureau API."
                eyebrow="Credit"
                title="Credit report"
            />
            <Container className="py-10 lg:py-12">
                <div className="card overflow-hidden">
                    <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:px-6">
                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gold-deep">Sample report layout</p>
                            <h2 className="font-serif text-2xl text-navy">Tradelines</h2>
                        </div>
                        <ButtonLink className="w-full sm:w-auto" href="/apply" size="sm">
                            Unlock with consent
                        </ButtonLink>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <thead className="bg-ivory text-[11px] uppercase tracking-wider text-muted">
                                <tr>
                                    {["Account", "Type", "Status", "DPD", "Limit / amount"].map((h) => (
                                        <th className="px-6 py-3 font-semibold" key={h}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr className="border-t border-line" key={r.name}>
                                        <td className="px-6 py-4 font-medium text-navy">{r.name}</td>
                                        <td className="px-6 py-4 text-muted">{r.type}</td>
                                        <td className="px-6 py-4">{r.status}</td>
                                        <td className="px-6 py-4">{r.dpd}</td>
                                        <td className="px-6 py-4">{r.limit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="border-t border-line px-6 py-4 text-xs text-muted">
                        Figures above are fictional for layout. They are not your bureau. Dispute processes run through
                        the bureau and the lender, not by editing this table.
                    </p>
                </div>
            </Container>
        </>
    );
}
