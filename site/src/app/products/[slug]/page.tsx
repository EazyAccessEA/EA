import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { getProductBySlug, getAllSlugs } from "@/lib/products";

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
                className="mt-3 font-display text-xl italic"
                style={{ color: product.accent }}
              >
                {product.tagline}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Description + why */}
        <section
          className="border-t px-6 py-12 md:px-10"
          style={{ borderColor: `${product.accent}22`, color: product.text }}
        >
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-base leading-relaxed opacity-90 md:text-lg">
                {product.oneliner}
              </p>
              <div
                className="mt-8 rounded-lg border-l-2 py-4 pl-5 pr-4"
                style={{
                  background: `${product.accent}18`,
                  borderColor: product.accent,
                }}
              >
                <span className="font-body text-sm font-semibold" style={{ color: product.accent }}>
                  Why it exists:{" "}
                </span>
                <span className="font-body text-sm opacity-90">{product.why}</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section className="px-6 py-12 md:px-10" style={{ color: product.text }}>
            <div className="mx-auto max-w-[720px] space-y-8">
              {product.features.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <p className="font-body text-base leading-relaxed opacity-90">{paragraph}</p>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-6 py-12 md:px-10" style={{ color: product.text }}>
          <div className="mx-auto flex max-w-[720px] flex-wrap items-center gap-4">
            <a
              href={`https://${product.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-button border px-6 py-2.5 font-body text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: product.accent,
                color: product.accent,
                background: "transparent",
              }}
            >
              Visit {product.domain} →
            </a>
          </div>
        </section>

        {/* Part of the EazyAccess family */}
        <section
          className="border-t px-6 py-10 md:px-10"
          style={{ borderColor: `${product.accent}22` }}
        >
          <div className="mx-auto flex max-w-[720px] flex-wrap items-center justify-between gap-4">
            <p className="font-body text-sm opacity-80" style={{ color: product.text }}>
              Part of the EazyAccess family.
            </p>
            <Link
              href="/"
              className="font-body text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: product.accent }}
            >
              ← eazyaccess.org
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
