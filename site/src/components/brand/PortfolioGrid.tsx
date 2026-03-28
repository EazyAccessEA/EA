import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";

export function PortfolioGrid() {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
