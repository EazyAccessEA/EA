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

      <main className="flex-1 pt-16">
        <section className="px-6 pb-10 pt-28 md:px-12">
          <div className="mx-auto max-w-[1080px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                The portfolio
              </p>
              <h1
                className="mt-5 font-display italic text-ink"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                Five products.
              </h1>
              <p className="mt-8 max-w-lg font-body text-[16px] leading-[1.75] text-mid">
                Each solves a specific, underserved problem in British life. Connected by shared
                infrastructure, not category. Held permanently.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 pb-32 pt-10 md:px-12">
          <div className="mx-auto max-w-[1080px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 60}>
                  <Link href={`/products/${p.slug}`}>
                    <ProductCard product={p} />
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
