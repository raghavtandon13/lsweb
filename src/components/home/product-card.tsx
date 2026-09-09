import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { productIcons } from "@/lib/product-icons";
import { productVisuals } from "@/lib/product-visuals";
import { inr } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const Icon = productIcons[product.slug] ?? ArrowRight;
  const visual = productVisuals[product.slug];

  return (
    <Link
      href={`/loans/${product.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_10px_30px_-18px_rgba(18,35,58,0.25)] transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={visual?.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white text-navy shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-2xl text-navy">{product.name}</h3>
        <p className="mt-2 flex-1 text-base leading-7 text-ink">{product.short}</p>
        <p className="mt-4 text-base font-semibold text-navy">
          {inr(product.amountMin, true)} – {inr(product.amountMax, true)}
        </p>
        <p className="text-[15px] text-ink">
          {product.tenure} · {product.rateFrom}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-gold-deep">
          View product <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
