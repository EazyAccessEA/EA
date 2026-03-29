import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "For Founders — EazyAccess",
  description:
    "If you have built a software business serving British life and want it to survive you, talk to us.",
};

export default function FoundersPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="px-6 pb-20 pt-28 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                A letter to founders
              </p>
              <h1
                className="mt-7 font-display italic text-ink"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                If what you built
              </h1>
              <h1
                className="font-display italic text-accent"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                is good, talk to us.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* The letter */}
        <section className="px-6 py-24 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[740px] space-y-8">
            <FadeIn>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                If you have built a software business serving one of the domains we care about —
                life administration, education, publishing, agriculture, small business, property,
                health — or something adjacent, you may eventually receive an offer to sell.
              </p>
            </FadeIn>

            <FadeIn delay={60}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                Private equity will offer you a multiple. They will be friendly. They will explain
                the value of their network and their operational support. They may even be sincere
                about it. What they will not tell you — because it is not in their interest to — is
                that their fund has a defined lifespan, and your business is an asset within that fund,
                and the fund&rsquo;s objective is to return capital to its investors within that lifespan.
                What happens to your product after that is not their primary concern.
              </p>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                A strategic acquirer — a large technology company purchasing you to add to their
                portfolio — will offer you a higher multiple still. They may offer your team jobs.
                They may promise product continuity. Most of them mean it at the time of the offer.
                What happens is that your product becomes a feature, or it becomes a competitor they
                have neutralised, or it becomes a product abandoned quietly when it doesn&rsquo;t grow fast
                enough to justify resources within a company thirty times your size.
              </p>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="border-l-[3px] border-accent py-3 pl-10">
                <p className="font-display text-[28px] italic text-ink" style={{ lineHeight: 1.2 }}>
                  We are offering something different.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                We will pay a fair multiple — typically three to five times annual recurring revenue
                for healthy businesses. We will not pay more than a business is worth, because we
                fund acquisitions from product revenue rather than from a pool of capital that needs
                to be deployed. This means we will sometimes lose an auction to a buyer with more
                money and shorter time horizons.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                We will keep your product alive. Not as a feature of a larger platform, but as a
                distinct tool within a portfolio of distinct tools. We will invest in its design,
                its infrastructure, and its marketing. The EazyAccess brand mark on your product is
                not an absorption. It is an endorsement.
              </p>
            </FadeIn>

            <FadeIn delay={360}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                You may stay, if you want to. Many founders want to keep building the thing they
                started. We want that too, if you do. You may leave, if you have done what you came
                to do. We will run it well either way.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* What we look for */}
        <section className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                What we look for
              </p>
              <h2
                className="mt-5 font-display italic text-ink"
                style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05 }}
              >
                The profile is specific.
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {[
                { label: "Revenue", value: "£500k–£5M ARR" },
                { label: "Retention", value: "Above 85% annually" },
                { label: "Sector", value: "British life & work" },
                { label: "Design", value: "Bad or neglected" },
                { label: "Marketing", value: "Minimal investment" },
                { label: "Founder intent", value: "Fair permanent home" },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 50}>
                  <div className="rounded-[14px] border border-rule-light p-6 transition-all duration-300 hover:border-rule hover:bg-surface">
                    <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-[22px] italic text-ink">{item.value}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — dark section */}
        <section style={{ background: "var(--color-void)" }}>
          <div className="mx-auto max-w-[740px] px-6 py-28 md:px-12">
            <FadeIn>
              <p className="font-body text-[16px] leading-[1.85] text-[#7A776F]">
                If what you have built is good, and you want it to survive you — to be redesigned,
                improved, and held permanently by an organisation that treats software as craft
                rather than inventory — we would like to hear from you.
              </p>
              <p className="mt-10 font-display text-[28px] italic text-[#FDFCFA]">
                info@eazyaccess.org
              </p>
              <div className="mt-12">
                <Link
                  href="/philosophy"
                  className="font-body text-[13px] font-medium text-accent transition-colors duration-300 hover:text-[#FDFCFA]"
                >
                  Read our philosophy →
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
