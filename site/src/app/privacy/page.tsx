import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Privacy Policy — EazyAccess",
  description: "Privacy policy for EazyAccess and its portfolio of products.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-16">
        <section className="px-6 pb-20 pt-28 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <h1
                className="font-display italic text-ink"
                style={{ fontSize: "clamp(38px, 5vw, 56px)", lineHeight: 0.95 }}
              >
                Privacy Policy
              </h1>
              <p className="mt-5 font-body text-[13px] text-faint">
                Last updated: March 2026
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 py-20 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[740px] space-y-7">
            <FadeIn>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                EazyAccess (&ldquo;we&rdquo;) respects your privacy. This site (eazyaccess.org) is
                the parent brand site for our portfolio of products. We do not sell your data. We do
                not use cookies. We use minimal, privacy-respecting analytics (Vercel Analytics)
                where applicable. We do not use Google Analytics or advertising trackers.
              </p>
            </FadeIn>
            <FadeIn delay={60}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                For product-specific privacy practices (e.g. HushRealm, PagePerfect, OneSchool),
                please refer to the privacy policy on each product&rsquo;s domain.
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                If you contact us (e.g. via info@eazyaccess.org), we use your details only to
                respond. We do not add you to marketing lists without your consent.
              </p>
            </FadeIn>
            <FadeIn delay={180}>
              <p className="font-body text-[16px] leading-[1.85] text-mid">
                For questions about this policy, contact{" "}
                <a
                  href="mailto:info@eazyaccess.org"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-3 transition-colors hover:decoration-accent"
                >
                  info@eazyaccess.org
                </a>.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
