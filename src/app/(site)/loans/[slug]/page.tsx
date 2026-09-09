import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/products";
import { inr } from "@/lib/format";
import { track } from "@/lib/analytics";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

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
        <ButtonLink href="/" className="mt-8">
          Home
        </ButtonLink>
      </div>
    );
  }

  const specs = [
    ["Amount", `${inr(product.amountMin, true)} – ${inr(product.amountMax, true)}`],
    ["Tenure", product.tenure],
    ["Pricing", product.rateFrom],
    ["Disbursal", product.disbursal],
  ];

  return (
    <>
      <PageHero eyebrow={product.eyebrow} title={product.headline} body={product.summary} actions />
      <Container className="grid items-start gap-12 py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="space-y-16 lg:col-span-8">
          <div className="grid grid-cols-2 gap-5">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-line bg-white px-5 py-5">
                <p className="text-[11px] uppercase tracking-wider text-muted">{k}</p>
                <p className="mt-2 font-serif text-xl leading-snug text-navy">{v}</p>
              </div>
            ))}
          </div>
          <section>
            <h2 className="font-serif text-3xl text-navy">Why this product</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="rounded-2xl border border-line bg-white px-5 py-4 text-base leading-7 text-navy">
                  {h}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-navy">Suited for</h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 text-base leading-7 text-ink">
              {product.suitedFor.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-navy">Eligibility</h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 text-base leading-7 text-ink">
              {product.eligibility.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-navy">Documents</h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 text-base leading-7 text-ink">
              {product.documents.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-5 font-serif text-3xl text-navy">FAQs</h2>
            <Accordion items={product.faqs} />
          </section>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-24 card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{product.name}</p>
            <p className="mt-3 font-serif text-2xl text-navy">Check eligibility</p>
            <p className="mt-3 text-sm leading-6 text-muted">{product.caution}</p>
            <ButtonLink href="/apply" className="mt-6 w-full" size="lg">
              Check eligibility
            </ButtonLink>
            <ol className="mt-6 space-y-3">
              {product.steps.map((s, i) => (
                <li key={s.title} className="text-sm">
                  <span className="font-semibold text-navy">
                    {i + 1}. {s.title}
                  </span>
                  <p className="text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </Container>
    </>
  );
}
