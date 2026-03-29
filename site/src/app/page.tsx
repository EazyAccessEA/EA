import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/brand/ProductCard";
import { products } from "@/lib/products";
import { domains } from "@/lib/domains";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1">
        {/* ─── SECTION 1: HERO ─── */}
        <section className="relative flex min-h-screen flex-col justify-center px-6 pt-14 md:px-10">
          <div className="mx-auto w-full max-w-[960px]">
            <FadeIn duration={1000}>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                eazyaccess.org · est. 2025 · United Kingdom
              </p>
              <div className="mt-7">
                <h1
                  className="font-display italic text-ink"
                  style={{ fontSize: "clamp(72px, 11vw, 116px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
                >
                  Access
                </h1>
                <h1
                  className="font-display italic text-accent"
                  style={{ fontSize: "clamp(72px, 11vw, 116px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
                >
                  everything.
                </h1>
              </div>
              <p className="mt-8 max-w-[540px] font-body text-[17px] font-light leading-relaxed text-mid">
                A permanent portfolio of software built for the serious, practical parts of British life.
                Five products today. Thirty within fifteen years. Never for sale.
              </p>
              <div className="mt-11 flex items-center gap-6">
                <Link
                  href="/products"
                  className="inline-block rounded-button border-[1.5px] border-accent bg-transparent px-7 py-[11px] font-body text-[13px] font-medium text-accent transition-all hover:bg-accent hover:text-[#FDFCFA]"
                >
                  Explore our products
                </Link>
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] text-faint transition-colors hover:text-ink"
                >
                  Our philosophy →
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <FadeIn delay={600} className="absolute bottom-11 left-6 flex items-center gap-3 md:left-10">
            <div className="h-9 w-px bg-rule" />
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
              Scroll
            </span>
          </FadeIn>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 2: PRODUCTS ─── */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <div className="mb-13 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                    The portfolio · 5 products
                  </p>
                  <h2
                    className="mt-4 font-display italic text-ink"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1 }}
                  >
                    Five products.
                  </h2>
                  <h2
                    className="font-display italic text-accent"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1 }}
                  >
                    One permanent home.
                  </h2>
                </div>
                <p className="max-w-[220px] text-right font-body text-xs font-light leading-relaxed text-faint">
                  Consumer, institutional, and community tools — all built for the realities of British life.
                </p>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-3.5 sm:grid-cols-2">
              {products.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>

            {/* Platform synergy note */}
            <FadeIn delay={350}>
              <div className="mt-6 flex items-center gap-5 rounded-[10px] border border-rule bg-surface px-6 py-5">
                <div className="h-10 w-[3px] flex-shrink-0 rounded-sm bg-accent" />
                <p className="font-body text-[13px] font-light leading-relaxed text-mid">
                  <strong className="font-semibold text-ink">Platform synergy: </strong>
                  OneSchool&rsquo;s safeguarding files live in EazyAccess Vault. School reports are formatted in PagePerfect.
                  Teachers and parents log in through EazyAccess ID. Every product makes every other product more valuable.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 3: DOMAINS ─── */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                    Seven domains
                  </p>
                  <h2
                    className="mt-4 font-display italic text-ink"
                    style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1 }}
                  >
                    Where we build.
                  </h2>
                  <h2
                    className="font-display italic text-accent"
                    style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1 }}
                  >
                    And what it&rsquo;s worth.
                  </h2>
                </div>
                <p className="max-w-[200px] text-right font-body text-xs font-light leading-relaxed text-faint">
                  Each domain is underserved. Each has durable, recurring revenue. None requires a single large bet.
                </p>
              </div>
            </FadeIn>

            {/* Revenue summary bar */}
            <FadeIn>
              <div className="mb-8 grid grid-cols-2 gap-6 rounded-[10px] border border-rule bg-surface p-6 sm:grid-cols-4">
                {[
                  { label: "Total addressable revenue", value: "£43–80M", sub: "Across 7 domains" },
                  { label: "Active products", value: "5", sub: "Building now" },
                  { label: "Domain target", value: "7", sub: "Over 15 years" },
                  { label: "Model", value: "Build & Acquire", sub: "From revenue, no investors" },
                ].map(({ label, value, sub }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ghost">
                      {label}
                    </p>
                    <p className="mt-1 font-display text-[26px] italic text-accent">{value}</p>
                    <p className="mt-0.5 font-body text-[10px] font-light text-faint">{sub}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Domain rows */}
            <div className="border-t border-rule">
              {domains.map((d, i) => (
                <FadeIn key={d.number} delay={i * 55}>
                  <div className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-rule-light py-6 sm:grid-cols-[48px_1fr_140px]">
                    <p className="pt-0.5 font-display text-2xl italic font-light text-ghost">
                      {d.number}
                    </p>
                    <div>
                      <h3 className="font-display italic text-ink" style={{ fontSize: "clamp(18px, 2.5vw, 26px)", lineHeight: 1.1 }}>
                        {d.name}
                        {d.featured && (
                          <span className="ml-2.5 inline-block rounded-[3px] bg-accent-bg px-2 py-0.5 align-middle font-body text-[10px] font-semibold uppercase tracking-[0.12em] not-italic text-accent">
                            Active
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 max-w-[480px] font-body text-[13px] font-light leading-relaxed text-mid">
                        {d.description}
                      </p>
                      {d.products.length > 0 ? (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {d.products.map((name) => {
                            const prod = products.find((x) => x.name === name);
                            if (!prod) return null;
                            return (
                              <span
                                key={name}
                                className="rounded-full px-2.5 py-0.5 font-body text-[10px] font-medium"
                                style={{
                                  color: prod.accent,
                                  background: prod.accentBg,
                                  border: `1px solid ${prod.accent}22`,
                                }}
                              >
                                {name}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-2 font-body text-[10px] font-normal uppercase tracking-[0.12em] text-ghost">
                          Planned · Building or Acquiring
                        </p>
                      )}
                    </div>
                    <div className="hidden pt-1 text-right sm:block">
                      <p className="font-display text-xl italic text-ink-mid">{d.arrPotential}</p>
                      <p className="mt-0.5 font-body text-[9px] uppercase tracking-[0.1em] text-faint">
                        ARR potential
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 4: PLATFORM ─── */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                Shared infrastructure
              </p>
              <h2
                className="mt-4 font-display italic text-ink"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1 }}
              >
                Four products are a portfolio.
              </h2>
              <h2
                className="font-display italic text-accent"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1 }}
              >
                Four on shared infrastructure are a platform.
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  name: "EazyAccess ID",
                  desc: "One account. One login. Every product. The switching cost of leaving one product is modest. The switching cost of leaving five is significant.",
                },
                {
                  name: "EazyAccess Vault",
                  desc: "Encrypted document storage built for HushRealm, shared across the portfolio. Your will, your school reports, your compliance certificates — one secure layer.",
                },
                {
                  name: "EazyAccess Pay",
                  desc: "One payment relationship. One family subscription covering every product. Users stop evaluating individual products on price and start evaluating the platform on value.",
                },
                {
                  name: "EazyAccess Acquire",
                  desc: "The organisational capability to identify, purchase, redesign, and integrate existing British software businesses. Not a product — a process.",
                },
              ].map((item, i) => (
                <FadeIn key={item.name} delay={i * 80}>
                  <div className="rounded-[12px] border border-rule bg-surface p-7">
                    <h3 className="font-body text-[15px] font-semibold tracking-tight text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-3 font-body text-[13px] font-light leading-relaxed text-mid">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 5: THESIS ─── */}
        <section className="px-6 py-28 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                What we actually are
              </p>
              <div className="mt-10 border-l-2 border-accent pl-8">
                <h2 className="font-display italic text-ink" style={{ fontSize: "clamp(28px, 3.8vw, 46px)", lineHeight: 1.1 }}>
                  We are the permanent home
                </h2>
                <h2 className="font-display italic text-accent" style={{ fontSize: "clamp(28px, 3.8vw, 46px)", lineHeight: 1.1 }}>
                  for British software.
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-x-20 gap-y-10 sm:grid-cols-2">
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
                <FadeIn key={item.h} delay={i * 80}>
                  <h3 className="font-body text-[15px] font-semibold tracking-tight text-ink-mid">
                    {item.h}
                  </h3>
                  <p className="mt-2.5 font-body text-[13px] font-light leading-relaxed text-mid">
                    {item.b}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 6: REVENUE PATH ─── */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <div className="grid grid-cols-2 gap-0 rounded-[12px] border border-rule bg-surface sm:grid-cols-4">
                {[
                  { phase: "Now", metric: "5 products", sub: "Being built" },
                  { phase: "Year 3", metric: "£5M ARR", sub: "OneSchool scaling" },
                  { phase: "Year 6–10", metric: "£25M ARR", sub: "Acquisitions + platform" },
                  { phase: "Year 10–15", metric: "£100M ARR", sub: "British institution" },
                ].map(({ phase, metric, sub }, i) => (
                  <div
                    key={phase}
                    className="p-7"
                    style={{ borderLeft: i > 0 ? "1px solid var(--color-rule)" : "none" }}
                  >
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ghost">
                      {phase}
                    </p>
                    <p className="mt-1.5 font-display text-[28px] italic text-accent">{metric}</p>
                    <p className="mt-1 font-body text-[11px] font-light text-faint">{sub}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="h-px bg-rule-light" />

        {/* ─── SECTION 7: PHILOSOPHY PREVIEW ─── */}
        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[960px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                Six decisions made in advance
              </p>
              <h2
                className="mt-4 font-display italic text-ink"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1 }}
              >
                What we believe.
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: "01", title: "No dark patterns.", desc: "If a product is genuinely useful, people will choose to pay for it without manipulation." },
                { n: "02", title: "British by substance.", desc: "Our products know what a council tax bill is, what the NHS looks like from the patient's side." },
                { n: "03", title: "Permanent ownership.", desc: "Every product we own today we expect to be improving twenty years from now." },
                { n: "04", title: "Design is the product.", desc: "Time a user spends confused is time they spent experiencing our product failing them." },
                { n: "05", title: "Privacy is infrastructure.", desc: "User data is not revenue. Encryption is not optional. GDPR compliance is the floor." },
                { n: "06", title: "Remove more than we add.", desc: "Our products do fewer things than our competitors. They do those things better." },
              ].map((item, i) => (
                <FadeIn key={item.n} delay={i * 60}>
                  <div className="rounded-[12px] border border-rule-light bg-bg p-6 transition-colors hover:border-rule hover:bg-surface">
                    <span className="font-display text-lg italic text-ghost">{item.n}</span>
                    <h3 className="mt-2 font-body text-[15px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-[13px] font-light leading-relaxed text-mid">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={400}>
              <div className="mt-8 text-center">
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Read our full philosophy →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── SECTION 8: WE WILL NEVER SELL ─── */}
        <section style={{ background: "var(--color-void)" }}>
          <div className="mx-auto max-w-[960px] px-6 py-28 md:px-10">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                The only promise that matters
              </p>
              <h2
                className="mt-7 font-display italic"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1, color: "#FDFCFA" }}
              >
                We will never sell.
              </h2>
              <div className="mt-8 grid max-w-[760px] gap-x-20 gap-y-5 sm:grid-cols-2">
                <p className="font-body text-sm font-light leading-relaxed text-[#8A8680]">
                  Every product you have ever loved that got worse was acquired by a company that
                  prioritised its own growth over your experience. That is the inevitable logic of
                  companies built to be sold. We are not built to be sold.
                </p>
                <p className="font-body text-sm font-light leading-relaxed text-[#8A8680]">
                  OneSchool will not be acquired by Capita or absorbed into a Microsoft product suite.
                  HushRealm will not be sunset after a Series B. AllowanceGuard will not be pivoted
                  into a fintech aggregator. We own these products permanently.
                </p>
              </div>

              <div className="mt-13 flex flex-wrap gap-12">
                {[
                  { label: "Founded", value: "UK" },
                  { label: "Investment taken", value: "None" },
                  { label: "Products sold", value: "Never" },
                  { label: "Data sold", value: "Never" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#504E4A]">
                      {label}
                    </p>
                    <p className="mt-1 font-display text-[28px] italic text-accent">{value}</p>
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
