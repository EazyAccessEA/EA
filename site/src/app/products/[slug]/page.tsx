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

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="px-6 pb-20 pt-28 md:px-12" style={{ color: product.text }}>
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p
                className="font-body text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: product.accent }}
              >
                {product.category}
              </p>
              <h1 className="mt-4 font-body text-4xl font-bold tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p
                className="mt-4 font-display text-xl italic md:text-[26px]"
                style={{ color: product.accent, lineHeight: 1.2 }}
              >
                {product.tagline}
              </p>
              <p className="mt-8 max-w-[560px] font-body text-[16px] leading-[1.75] opacity-75 md:text-[17px]">
                {product.oneliner}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Why it exists */}
        <section
          className="border-t px-6 py-16 md:px-12"
          style={{ borderColor: `${product.accent}18`, color: product.text }}
        >
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <div
                className="rounded-[14px] border-l-[3px] py-6 pl-8 pr-6"
                style={{
                  background: `${product.accent}0A`,
                  borderColor: product.accent,
                }}
              >
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: product.accent }}>
                  Why it exists
                </p>
                <p className="mt-3 font-body text-[16px] leading-[1.8] opacity-85">
                  {product.why}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section className="px-6 py-16 md:px-12" style={{ color: product.text }}>
            <div className="mx-auto max-w-[740px]">
              <FadeIn>
                <p
                  className="font-body text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: product.accent }}
                >
                  What it does
                </p>
              </FadeIn>
              <div className="mt-9 space-y-7">
                {product.features.map((paragraph, i) => (
                  <FadeIn key={i} delay={i * 70}>
                    <div className="flex gap-5">
                      <div
                        className="mt-2.5 h-[6px] w-[6px] flex-shrink-0 rounded-full"
                        style={{ background: product.accent }}
                      />
                      <p className="font-body text-[16px] leading-[1.8] opacity-80">
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
        <section className="px-6 py-16 md:px-12" style={{ color: product.text }}>
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p
                className="font-body text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: product.accent }}
              >
                Brand palette
              </p>
              <div className="mt-6 flex gap-3">
                {product.palette.map((c) => (
                  <div key={c.hex} className="group flex flex-col items-center gap-2.5">
                    <div
                      className="h-14 w-14 rounded-[10px] border transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
                      style={{
                        background: c.hex,
                        borderColor: `${product.accent}18`,
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
        <section className="px-6 py-16 md:px-12" style={{ color: product.text }}>
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <div
                className="flex flex-col items-start gap-6 rounded-[14px] p-8 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  background: `${product.accent}08`,
                  border: `1px solid ${product.accent}14`,
                }}
              >
                <div>
                  <p className="font-body text-[16px] font-semibold" style={{ color: product.text }}>
                    {product.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px]" style={{ color: product.muted }}>
                    {product.domain}
                  </p>
                </div>
                <a
                  href={`https://${product.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-button border px-7 py-3 font-body text-[13px] font-medium tracking-wide transition-all duration-300 hover:opacity-80"
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
          className="border-t px-6 py-16 md:px-12"
          style={{ borderColor: `${product.accent}18` }}
        >
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: product.muted }}>
                Also from EazyAccess
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {products
                  .filter((p) => p.slug !== product.slug)
                  .slice(0, 2)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group flex items-center gap-4 rounded-[12px] border p-5 transition-all duration-300 hover:shadow-sm"
                      style={{
                        borderColor: `${p.accent}18`,
                        background: `${p.accent}06`,
                      }}
                    >
                      <div
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{ background: p.accent }}
                      />
                      <div className="min-w-0">
                        <p className="font-body text-[14px] font-semibold" style={{ color: p.text }}>
                          {p.name}
                        </p>
                        <p className="truncate font-body text-[12px]" style={{ color: p.muted }}>
                          {p.tagline}
                        </p>
                      </div>
                      <span
                        className="ml-auto flex-shrink-0 font-body text-[11px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ color: p.accent }}
                      >
                        →
                      </span>
                    </Link>
                  ))}
              </div>
            </FadeIn>

            <div className="mt-10 flex items-center justify-between">
              <p className="font-body text-[14px] opacity-55" style={{ color: product.text }}>
                Part of the EazyAccess family.
              </p>
              <Link
                href="/products"
                className="font-body text-[13px] font-medium transition-opacity duration-300 hover:opacity-75"
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
