import { useParams } from "next/navigation";
import { useEffect } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { track } from "@/lib/analytics";
import { inr } from "@/lib/format";
import { getProduct } from "@/lib/products";

export default function ProductPage() {
    const { slug } = useParams<{ slug: string }>();
    const product = getProduct(slug ?? "");

    useEffect(() => {
        if (!product) return;
        track("view_item", {
            item_id: product.slug,
            item_name: product.name,
            item_category: "loan",
        });
    }, [product]);

    if (!product) {
        return (
            <div className="px-5 py-24 text-center">
                <h1 className="font-serif text-4xl text-navy">Loan not found</h1>
                <p className="mt-3 text-muted">This product is not on LoanSparrow, or the link is outdated.</p>
                <ButtonLink className="mx-auto mt-8" href="/">
                    Home
                </ButtonLink>
            </div>
        );
    }

    const specs = [
        ["Amount", `${inr(product.amountMin, true)} – ${inr(product.amountMax, true)}`, "text-spark-gold"],
        ["Tenure", product.tenure, "text-spark-mint"],
        ["Pricing", product.rateFrom, "text-spark-sky"],
        ["Disbursal", product.disbursal, "text-spark-coral"],
    ];

    return (
        <>
            <PageHero actions body={product.summary} eyebrow={product.eyebrow} title={product.headline} />
            <Container className="grid items-start gap-8 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                <div className="min-w-0 space-y-8 lg:col-span-8 lg:space-y-10">
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {specs.map(([k, v, hue]) => (
                            <div className="rounded-2xl border border-line bg-white px-4 py-3.5" key={k}>
                                <p className="text-[11px] uppercase tracking-wider text-muted">{k}</p>
                                <p className={`mt-1.5 font-serif text-lg leading-snug ${hue}`}>{v}</p>
                            </div>
                        ))}
                    </div>
                    <section>
                        <h2 className="font-serif text-2xl text-navy">Why this product</h2>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                            {product.highlights.map((h) => (
                                <li
                                    className="rounded-2xl border border-line bg-white px-4 py-3.5 text-sm leading-6 text-navy sm:text-base sm:leading-7"
                                    key={h}
                                >
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="font-serif text-2xl text-navy">Suited for</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink sm:text-base sm:leading-7">
                            {product.suitedFor.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="font-serif text-2xl text-navy">Eligibility</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink sm:text-base sm:leading-7">
                            {product.eligibility.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="font-serif text-2xl text-navy">Documents</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink sm:text-base sm:leading-7">
                            {product.documents.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="mb-4 font-serif text-2xl text-navy">FAQs</h2>
                        <Accordion items={product.faqs} />
                    </section>
                </div>
                <aside className="lg:col-span-4">
                    <div className="sticky top-20 overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-lift">
                        <div className="h-1 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
                        <div className="p-5 sm:p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                                {product.name}
                            </p>
                            <p className="mt-2 font-serif text-2xl text-navy">Check eligibility</p>
                            <p className="mt-2.5 text-sm leading-6 text-muted">{product.caution}</p>
                            <ButtonLink className="mt-5 w-full" href="/apply" size="md">
                                Check eligibility
                            </ButtonLink>
                            <ol className="mt-5 space-y-3">
                                {product.steps.map((s, i) => (
                                    <li className="text-sm" key={s.title}>
                                        <span className="font-semibold text-navy">
                                            {i + 1}. {s.title}
                                        </span>
                                        <p className="text-muted">{s.body}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </aside>
            </Container>
        </>
    );
}
