import Link from "next/link";
import { products } from "@/lib/products";
import { productVisuals } from "@/lib/product-visuals";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StatsRow } from "@/components/home/stats-row";

export function ProductStrip() {
  return (
    <section id="products" className="bg-ivory">
      <Container className="py-14 lg:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">Loan types</p>
              <h2 className="mt-2 font-serif text-4xl text-navy sm:text-5xl">Pick a product. See if you qualify.</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-ink">
                Eight loan types from partner NBFCs — payday to gold, deposits and business working capital.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
              {products.map((p, i) => {
                const visual = productVisuals[p.slug];
                return (
                  <Reveal key={p.slug} delay={i * 40} className="h-full">
                    <Link
                      href={`/loans/${p.slug}`}
                      className="group flex h-full flex-col items-center rounded-2xl border border-line bg-white px-3 py-5 text-center transition duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift"
                    >
                      <img
                        src={visual?.image}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-wash"
                      />
                      <p className="mt-3 text-[13px] font-semibold leading-4 text-navy">{p.name}</p>
                      <p className="mt-1 text-[11px] leading-4 text-ink">{visual?.hint}</p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-4">
            <StatsRow />
          </div>
        </div>
      </Container>
    </section>
  );
}
