import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "About — EazyAccess",
  description:
    "A permanent capital vehicle for British software. Built independently, held permanently, designed with care.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-14">
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                About EazyAccess
              </p>
              <h1
                className="mt-6 font-display italic text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                The permanent home
              </h1>
              <h1
                className="font-display italic text-accent"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95 }}
              >
                for British software.
              </h1>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        {/* The story */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px] space-y-8">
            <FadeIn>
              <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                EazyAccess is a permanent capital vehicle for British software. We build and acquire
                tools for the serious, practical parts of British life — documents, education,
                agriculture, family finance — and hold them permanently. No venture capital. No exit
                pressure. No timeline except: is this better than it was last year?
              </p>
            </FadeIn>

            <FadeIn delay={60}>
              <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                The model is Constellation Software meets 37signals, made British. Patient capital.
                Permanent ownership. A design standard and philosophical identity that creates trust
                over years, not quarters. Five products today. Thirty within fifteen years.
              </p>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="font-body text-[15px] font-light leading-[1.85] text-ink">
                If you want the one-paragraph version: EazyAccess builds tools that give control back
                to the people using them. No extraction, no complexity, no compromise. Just clean,
                considered software that works.
              </p>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        {/* The model */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                How we operate
              </p>
              <h2
                className="mt-4 font-display italic text-ink"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05 }}
              >
                The model.
              </h2>
            </FadeIn>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {[
                {
                  title: "Build from scratch",
                  body: "Products that do not exist yet, designed for British specificity. OneSchool, HushRealm, AllowanceGuard — all built in-house with intent.",
                },
                {
                  title: "Acquire with care",
                  body: "Revenue-generating software businesses serving British life. Fair multiples, permanent ownership, immediate investment in design and infrastructure.",
                },
                {
                  title: "Connect through platform",
                  body: "Shared identity, shared storage, shared billing. Each product makes every other product more valuable. The switching cost of the portfolio compounds.",
                },
                {
                  title: "Hold permanently",
                  body: "No fund lifecycle. No exit horizon. No acquirer waiting in the wings. Every product we own today, we expect to be improving twenty years from now.",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 60}>
                  <div>
                    <h3 className="font-body text-[15px] font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-body text-[13px] font-light leading-relaxed text-mid">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        {/* Key facts */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { label: "Founded", value: "2025" },
                  { label: "Headquarters", value: "United Kingdom" },
                  { label: "Products", value: "5" },
                  { label: "Investment taken", value: "None" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ghost">
                      {label}
                    </p>
                    <p className="mt-1.5 font-display text-xl italic text-accent">{value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        {/* The gap */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                Why this exists
              </p>
              <h2
                className="mt-4 font-display italic text-ink"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05 }}
              >
                The gap we fill.
              </h2>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="mt-8 space-y-6">
                <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                  No British-owned, design-led software organisation serves the unglamorous
                  necessities of British life. School management systems are built by companies
                  preparing for acquisition. Document vaults are American. Farm directories do
                  not exist. Family finance tools are built by banks optimising for their own
                  balance sheets.
                </p>
                <p className="font-body text-[15px] font-light leading-[1.85] text-mid">
                  Every tool is American, VC-backed, and being quietly prepared for sale. The
                  people using these tools can feel it — in the dark patterns, in the neglected
                  interfaces, in the features added for investors rather than users.
                </p>
                <p className="font-body text-[15px] font-light leading-[1.85] text-ink">
                  That gap is ours.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA — dark section */}
        <section style={{ background: "var(--color-void)" }}>
          <div className="mx-auto max-w-[720px] px-6 py-24 md:px-10">
            <FadeIn>
              <p className="font-body text-[15px] font-light leading-[1.85] text-[#8A8680]">
                We are building something that will take fifteen years to fully realise. Every
                decision we make today is tested against the organisation we are trying to build,
                not the one we have now.
              </p>
              <div className="mt-10 flex flex-wrap gap-6">
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-[#FDFCFA]"
                >
                  Read our philosophy →
                </Link>
                <Link
                  href="/founders"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-[#FDFCFA]"
                >
                  Letter to founders →
                </Link>
                <Link
                  href="/products"
                  className="font-body text-[13px] font-medium text-accent transition-colors hover:text-[#FDFCFA]"
                >
                  View our products →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
