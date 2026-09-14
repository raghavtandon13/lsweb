import { track } from "@/lib/analytics";
import { inr } from "@/lib/format";
import type { DisplayOffer } from "@/lib/offers";

export function LenderCard({ offer }: { offer: DisplayOffer }) {
    const stats: { label: string; value: string }[] = [];
    if (offer.amount != null) stats.push({ label: "Amount", value: inr(offer.amount) });
    if (offer.emi != null) stats.push({ label: "EMI", value: inr(offer.emi) });
    if (offer.roi != null) stats.push({ label: "ROI", value: `${offer.roi}% p.a.` });
    if (offer.tenureMonths != null) stats.push({ label: "Tenure", value: `${offer.tenureMonths} mo` });

    return (
        <article className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
            <div className="p-4 sm:p-5">
                <p className="text-xs text-muted sm:text-sm">Accepted by</p>
                <h3 className="font-serif text-lg text-navy sm:text-xl">{offer.lender}</h3>
                {stats.length > 0 && (
                    <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm sm:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <dt className="text-xs text-muted">{s.label}</dt>
                                <dd className="font-semibold text-navy">{s.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
                {offer.link ? (
                    <a
                        className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl bg-navy px-4 text-sm font-semibold text-white"
                        href={offer.link}
                        onClick={() =>
                            track("select_item", {
                                item_id: offer.id,
                                item_name: offer.lender,
                                item_category: "loan_offer",
                            })
                        }
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Apply with {offer.lender}
                    </a>
                ) : (
                    <p className="mt-4 rounded-xl border border-line bg-ivory px-4 py-3 text-center text-sm text-muted">
                        Accepted — a LoanSparrow team member will reach out to continue this one.
                    </p>
                )}
            </div>
        </article>
    );
}
