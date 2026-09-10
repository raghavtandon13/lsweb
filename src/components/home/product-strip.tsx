import Link from "next/link";
import { getLoans } from "@/lib/products";
import { productVisuals } from "@/lib/product-visuals";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StatsRow } from "@/components/home/stats-row";

export function ProductStrip() {
  return (
    <section id="loans" className="bg-ivory">
      <Container className="py-10 sm:py-14 lg:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">Loans</p>
              <h2 className="mt-2 font-serif text-3xl text-navy sm:text-4xl lg:text-5xl">Pick a loan. See if you qualify.</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink sm:text-lg sm:leading-8">
                Personal, gold, payday, deposit and business loans from partner NBFCs. Credit cards sit under Credit.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-6">
              {getLoans().map((p, i) => {
                const visual = productVisuals[p.slug];
                return (
                  <Reveal key={p.slug} delay={i * 40} className="h-full">
                    <Link
                      href={`/loans/${p.slug}`}
                      className="group flex h-full min-w-0 flex-col items-center rounded-2xl border border-line bg-white px-2 py-4 text-center transition duration-300 hover:-translate-y-0.5 hover:border-spark-gold/50 hover:shadow-lift sm:px-3 sm:py-5"
                    >
                      <img
                        src={visual?.image}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-spark-gold/40 sm:h-14 sm:w-14"
                      />
                      <p className="mt-3 text-[12px] font-semibold leading-4 text-navy sm:text-[13px]">{p.name}</p>
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
