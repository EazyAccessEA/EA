import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact — EazyAccess",
  description:
    "Get in touch with EazyAccess. General enquiries, acquisition conversations, press, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--color-bg)" }}>
      <Nav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="px-6 pb-20 pt-28 md:px-12">
          <div className="mx-auto max-w-[740px]">
            <FadeIn>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                Get in touch
              </p>
              <h1
                className="mt-7 font-display italic text-ink"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                We&rsquo;re listening.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="px-6 py-20 md:px-12" style={{ background: "var(--color-surface)" }}>
          <div className="mx-auto max-w-[740px]">
            <div className="grid gap-14 sm:grid-cols-[1fr_280px]">
              {/* Form */}
              <div>
                <FadeIn>
                  <ContactForm />
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div>
                <FadeIn delay={100}>
                  <div className="space-y-9">
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                        Email directly
                      </p>
                      <a
                        href="mailto:info@eazyaccess.org"
                        className="mt-3 block font-body text-[15px] font-medium text-ink underline decoration-accent/30 underline-offset-3 transition-colors hover:decoration-accent"
                      >
                        info@eazyaccess.org
                      </a>
                    </div>

                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                        For founders
                      </p>
                      <p className="mt-3 font-body text-[14px] leading-[1.7] text-mid">
                        If you have built a software business serving British
                        life and want it to survive you, we would like to hear
                        from you. Select &ldquo;Selling a software business&rdquo;
                        above, or read our{" "}
                        <a
                          href="/founders"
                          className="font-medium text-accent underline decoration-accent/30 underline-offset-3 transition-colors hover:decoration-accent"
                        >
                          letter to founders
                        </a>
                        .
                      </p>
                    </div>

                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                        Press & media
                      </p>
                      <p className="mt-3 font-body text-[14px] leading-[1.7] text-mid">
                        For press enquiries and brand assets, visit our{" "}
                        <a
                          href="/press"
                          className="font-medium text-accent underline decoration-accent/30 underline-offset-3 transition-colors hover:decoration-accent"
                        >
                          press page
                        </a>
                        .
                      </p>
                    </div>

                    <div className="rounded-[14px] border border-rule-light bg-bg p-6">
                      <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ghost">
                        Response time
                      </p>
                      <p className="mt-3 font-body text-[14px] leading-[1.7] text-mid">
                        We aim to respond within 2–3 working days. Acquisition
                        conversations may take longer as we consider each one
                        carefully.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
