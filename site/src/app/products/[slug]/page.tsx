import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { getProductBySlug, getAllSlugs, products } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — EazyAccess`,
    description: product.oneliner,
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.oneliner,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div
      className="flex min-h-screen flex-col"
      data-brand={product.slug}
      style={{ background: product.bg }}
    >
      <Nav />

      <main className="flex-1 pt-14">
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 md:px-10" style={{ color: product.text }}>
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p
                className="font-body text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: product.accent }}
              >
                {product.category}
              </p>
              <h1 className="mt-3 font-body text-4xl font-bold tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p
                className="mt-3 font-display text-xl italic md:text-2xl"
                style={{ color: product.accent }}
              >
                {product.tagline}
              </p>
              <p className="mt-6 max-w-[560px] font-body text-base font-light leading-relaxed opacity-80 md:text-[17px]">
                {product.oneliner}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Why it exists */}
        <section
          className="border-t px-6 py-14 md:px-10"
          style={{ borderColor: `${product.accent}22`, color: product.text }}
        >
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <div
                className="rounded-[12px] border-l-[3px] py-5 pl-6 pr-5"
                style={{
                  background: `${product.accent}0D`,
                  borderColor: product.accent,
                }}
              >
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: product.accent }}>
                  Why it exists
                </p>
                <p className="mt-2.5 font-body text-[15px] font-light leading-[1.8] opacity-90">
                  {product.why}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section className="px-6 py-14 md:px-10" style={{ color: product.text }}>
            <div className="mx-auto max-w-[720px]">
              <FadeIn>
                <p
                  className="font-body text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: product.accent }}
                >
                  What it does
                </p>
              </FadeIn>
              <div className="mt-8 space-y-6">
                {product.features.map((paragraph, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <div className="flex gap-4">
                      <div
                        className="mt-2 h-[6px] w-[6px] flex-shrink-0 rounded-full"
                        style={{ background: product.accent }}
                      />
                      <p className="font-body text-[15px] font-light leading-[1.8] opacity-85">
                        {paragraph}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Colour palette */}
        <section className="px-6 py-14 md:px-10" style={{ color: product.text }}>
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p
                className="font-body text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: product.accent }}
              >
                Brand palette
              </p>
              <div className="mt-5 flex gap-2">
                {product.palette.map((c) => (
                  <div key={c.hex} className="group flex flex-col items-center gap-2">
                    <div
                      className="h-12 w-12 rounded-lg border transition-transform group-hover:scale-110 sm:h-14 sm:w-14"
                      style={{
                        background: c.hex,
                        borderColor: `${product.accent}22`,
                      }}
                    />
                    <span className="font-mono text-[9px]" style={{ color: product.muted }}>
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-14 md:px-10" style={{ color: product.text }}>
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <div
                className="flex flex-col items-start gap-5 rounded-[12px] p-7 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  background: `${product.accent}0A`,
                  border: `1px solid ${product.accent}18`,
                }}
              >
                <div>
                  <p className="font-body text-[15px] font-semibold" style={{ color: product.text }}>
                    {product.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px]" style={{ color: product.muted }}>
                    {product.domain}
                  </p>
                </div>
                <a
                  href={`https://${product.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-button border px-6 py-2.5 font-body text-[13px] font-medium transition-all duration-200 hover:opacity-80"
                  style={{
                    borderColor: product.accent,
                    color: product.accent,
                    background: "transparent",
                  }}
                >
                  Visit {product.name}
                  <span>→</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Other products */}
        <section
          className="border-t px-6 py-14 md:px-10"
          style={{ borderColor: `${product.accent}22` }}
        >
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: product.muted }}>
                Also from EazyAccess
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {products
                  .filter((p) => p.slug !== product.slug)
                  .slice(0, 2)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group flex items-center gap-4 rounded-[10px] border p-4 transition-all hover:shadow-sm"
                      style={{
                        borderColor: `${p.accent}22`,
                        background: `${p.accent}08`,
                      }}
                    >
                      <div
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{ background: p.accent }}
                      />
                      <div className="min-w-0">
                        <p className="font-body text-[13px] font-semibold" style={{ color: p.text }}>
                          {p.name}
                        </p>
                        <p className="truncate font-body text-[11px] font-light" style={{ color: p.muted }}>
                          {p.tagline}
                        </p>
                      </div>
                      <span
                        className="ml-auto flex-shrink-0 font-body text-[11px] opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: p.accent }}
                      >
                        →
                      </span>
                    </Link>
                  ))}
              </div>
            </FadeIn>

            <div className="mt-8 flex items-center justify-between">
              <p className="font-body text-sm opacity-60" style={{ color: product.text }}>
                Part of the EazyAccess family.
              </p>
              <Link
                href="/products"
                className="font-body text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: product.accent }}
              >
                ← All products
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
