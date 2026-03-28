import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Products — EazyAccess",
  description:
    "A sovereign portfolio of tools for British life. HushRealm, PagePerfect, FarmCompanion, AllowanceGuard.",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 px-6 py-16 md:px-9">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-normal italic leading-tight tracking-tight text-bone sm:text-4xl">
            The portfolio.
          </h1>
          <p className="mt-4 max-w-lg font-body text-stone">
            Four products. One family. Each solves a specific, underserved problem — connected by craft, not category.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {products.map((brand) => (
              <ProductCard
                key={brand.slug}
                brand={brand}
                href={`/products/${brand.slug}`}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
