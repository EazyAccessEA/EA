import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";

const productHref = (slug: string) => `/products/${slug}`;

export function PortfolioGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((brand) => (
        <ProductCard
          key={brand.slug}
          brand={brand}
          href={productHref(brand.slug)}
        />
      ))}
      {/* Fourth slot placeholder: "Something new is being built." */}
      <div
        className="flex flex-col items-center justify-center rounded-card border border-surface/80 p-7 text-center transition-colors hover:border-stone/40"
        style={{ background: "var(--color-surface)" }}
      >
        <span className="font-body text-sm font-medium text-stone">
          Something new is being built.
        </span>
        <span className="mt-1 font-mono text-[10px] text-stone/60">
          No details yet.
        </span>
      </div>
    </div>
  );
}
