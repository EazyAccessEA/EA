import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section className="relative flex min-h-[92vh] flex-col justify-center px-6 md:px-12">
          <div className="mx-auto w-full max-w-[1080px]">
            <FadeIn duration={900}>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                eazyaccess.org · est. 2025 · United Kingdom
              </p>
              <div className="mt-8">
                <h1
                  className="font-display italic text-ink"
                  style={{ fontSize: "clamp(64px, 10vw, 100px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
                >
                  Access
                </h1>
                <h1
                  className="font-display italic text-accent"
                  style={{ fontSize: "clamp(64px, 10vw, 100px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
                >
                  everything.
                </h1>
              </div>
              <p className="mt-10 max-w-[560px] font-body text-[17px] leading-[1.75] text-mid">
                A permanent portfolio of software built for the serious, practical
                parts of British life. Five products today. Thirty within fifteen
                years. Never for sale.
              </p>
              <div className="mt-12 flex items-center gap-7">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2.5 rounded-button border-[1.5px] border-accent bg-transparent px-8 py-3 font-body text-[13px] font-medium tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-[#FDFCFA]"
                >
                  Explore our products
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] text-faint transition-colors duration-300 hover:text-ink"
                >
                  Our philosophy →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── PRODUCTS ─── */}
        <section className="px-6 pb-36 pt-32 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[1080px]">
            <FadeIn>
              <div className="mb-16 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                <div>
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                    The portfolio · 5 products
                  </p>
                  <h2
                    className="mt-5 font-display italic text-ink"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.02 }}
                  >
                    Five products.
                  </h2>
                  <h2
                    className="font-display italic text-accent"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.02 }}
                  >
                    One permanent home.
                  </h2>
                </div>
                <p className="max-w-[260px] text-right font-body text-[13px] font-light leading-relaxed text-faint sm:pb-1">
                  Consumer, institutional, and community tools — built for the
                  realities of British life.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 60}>
                  <Link href={`/products/${p.slug}`}>
                    <ProductCard product={p} />
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* Platform note */}
            <FadeIn delay={300}>
              <div className="mt-8 flex items-center gap-6 rounded-[14px] border border-rule bg-bg px-7 py-6">
                <div className="h-11 w-[3px] flex-shrink-0 rounded-full bg-accent" />
                <p className="font-body text-[14px] leading-[1.75] text-mid">
                  <strong className="font-semibold text-ink">Shared infrastructure.</strong>{" "}
                  Every product connects through EazyAccess ID, Vault, and Pay.
                  Safeguarding files in OneSchool live in Vault. Reports are formatted by PagePerfect.
                  Each product makes every other product stronger.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── THESIS ─── */}
        <section className="px-6 py-36 md:px-12">
          <div className="mx-auto max-w-[1080px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                What we actually are
              </p>
              <div className="mt-10 border-l-[3px] border-accent pl-10">
                <h2 className="font-display italic text-ink" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.08 }}>
                  We are the permanent home
                </h2>
                <h2 className="font-display italic text-accent" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.08 }}>
                  for British software.
                </h2>
              </div>
            </FadeIn>

            <div className="mt-16 grid gap-x-20 gap-y-12 sm:grid-cols-2">
              {[
                {
                  h: "Not a startup.",
                  b: "Startups optimise for acquisition or IPO. Every product you have ever loved that got worse was a startup that exited. We are not that.",
                },
                {
                  h: "Not a fund.",
                  b: "We build and acquire software businesses using product revenue and hold them permanently. The only clock we operate on: is this better than it was last year?",
                },
                {
                  h: "Constellation Software, made British.",
                  b: "Patient capital. Permanent ownership. A design standard and philosophical identity that Constellation never needed. That is our specific differentiation.",
                },
                {
                  h: "The gap we fill.",
                  b: "No British-owned, design-led software organisation serves the unglamorous necessities of British life. Every tool is American, VC-backed, and being quietly prepared for sale. That gap is ours.",
                },
              ].map((item, i) => (
                <FadeIn key={item.h} delay={i * 70}>
                  <h3 className="font-body text-[15px] font-semibold tracking-tight text-ink">
                    {item.h}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-[1.8] text-mid">
                    {item.b}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PHILOSOPHY PREVIEW ─── */}
        <section className="px-6 pb-36 pt-32 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[1080px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                Six decisions made in advance
              </p>
              <h2
                className="mt-5 font-display italic text-ink"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.02 }}
              >
                What we believe.
              </h2>
            </FadeIn>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: "01", title: "No dark patterns.", desc: "If a product is genuinely useful, people will choose to pay for it without manipulation." },
                { n: "02", title: "British by substance.", desc: "Our products know what a council tax bill is, what the NHS looks like from the patient\u2019s side." },
                { n: "03", title: "Permanent ownership.", desc: "Every product we own today we expect to be improving twenty years from now." },
                { n: "04", title: "Design is the product.", desc: "Time a user spends confused is time they spent experiencing our product failing them." },
                { n: "05", title: "Privacy is infrastructure.", desc: "User data is not revenue. Encryption is not optional. GDPR compliance is the floor." },
                { n: "06", title: "Remove more than we add.", desc: "Our products do fewer things than our competitors. They do those things better." },
              ].map((item, i) => (
                <FadeIn key={item.n} delay={i * 50}>
                  <div className="philosophy-card rounded-[14px] border border-rule-light bg-bg p-7 hover:border-rule">
                    <span className="font-display text-[22px] italic text-ghost">{item.n}</span>
                    <h3 className="mt-3 font-body text-[15px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-body text-[14px] leading-[1.75] text-mid">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={350}>
              <div className="mt-10 text-center">
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] font-medium text-accent transition-colors duration-300 hover:text-accent-dark"
                >
                  Read our full philosophy →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── WE WILL NEVER SELL ─── */}
        <section className="relative overflow-hidden" style={{ background: "var(--color-void)" }}>
          {/* Subtle top glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-[50%] -translate-x-1/2"
            style={{ background: "linear-gradient(90deg, transparent, rgba(200,98,42,0.35), transparent)" }}
          />

          <div className="mx-auto max-w-[1080px] px-6 py-36 md:px-12">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                The only promise that matters
              </p>
              <h2
                className="mt-8 font-display italic"
                style={{ fontSize: "clamp(44px, 6.5vw, 76px)", lineHeight: 1, color: "#FDFCFA" }}
              >
                We will never sell.
              </h2>
              <div className="mt-10 grid max-w-[760px] gap-x-20 gap-y-6 sm:grid-cols-2">
                <p className="font-body text-[15px] leading-[1.8] text-[#7A776F]">
                  Every product you have ever loved that got worse was acquired by a company that
                  prioritised its own growth over your experience. That is the inevitable logic of
                  companies built to be sold. We are not built to be sold.
                </p>
                <p className="font-body text-[15px] leading-[1.8] text-[#7A776F]">
                  OneSchool will not be acquired by Capita. HushRealm will not be sunset after a
                  Series B. AllowanceGuard will not be pivoted into a fintech aggregator. We own
                  these products permanently.
                </p>
              </div>

              <div className="mt-16 flex flex-wrap gap-14 border-t border-[#1A1814] pt-12">
                {[
                  { label: "Founded", value: "UK" },
                  { label: "Investment taken", value: "None" },
                  { label: "Products sold", value: "Never" },
                  { label: "Data sold", value: "Never" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#4A4740]">
                      {label}
                    </p>
                    <p className="mt-1.5 font-display text-[28px] italic text-accent">{value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
