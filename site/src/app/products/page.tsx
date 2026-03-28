import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Products — EazyAccess",
  description:
    "Five products for the serious, practical parts of British life. HushRealm, PagePerfect, FarmCompanion, AllowanceGuard, OneSchool.",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-14">
        <section className="px-6 pb-8 pt-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                The portfolio
              </p>
              <h1
                className="mt-4 font-display italic text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                Five products.
              </h1>
              <p className="mt-6 max-w-lg font-body text-[15px] font-light leading-relaxed text-mid">
                Each solves a specific, underserved problem in British life. Connected by shared
                infrastructure, not category. Held permanently.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 pb-24 pt-8 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <div className="grid gap-3.5 sm:grid-cols-2">
              {products.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 70}>
                  <Link href={`/products/${p.slug}`}>
                    <ProductCard product={p} index={i} />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
