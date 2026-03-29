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

      <main className="flex-1 pt-14">
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-faint">
                Get in touch
              </p>
              <h1
                className="mt-6 font-display italic text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                We&rsquo;re listening.
              </h1>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <div className="h-px bg-rule-light" />
        </div>

        {/* Context */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <div className="grid gap-12 sm:grid-cols-[1fr_280px]">
              {/* Form */}
              <div>
                <FadeIn>
                  <ContactForm />
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div>
                <FadeIn delay={100}>
                  <div className="space-y-8">
                    <div>
                      <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                        Email directly
                      </p>
                      <a
                        href="mailto:info@eazyaccess.org"
                        className="mt-2 block font-body text-[15px] font-medium text-ink underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                      >
                        info@eazyaccess.org
                      </a>
                    </div>

                    <div>
                      <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                        For founders
                      </p>
                      <p className="mt-2 font-body text-[13px] font-light leading-relaxed text-mid">
                        If you have built a software business serving British
                        life and want it to survive you, we would like to hear
                        from you. Select &ldquo;Selling a software business&rdquo;
                        above, or read our{" "}
                        <a
                          href="/founders"
                          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                        >
                          letter to founders
                        </a>
                        .
                      </p>
                    </div>

                    <div>
                      <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                        Press & media
                      </p>
                      <p className="mt-2 font-body text-[13px] font-light leading-relaxed text-mid">
                        For press enquiries and brand assets, visit our{" "}
                        <a
                          href="/press"
                          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                        >
                          press page
                        </a>
                        .
                      </p>
                    </div>

                    <div className="rounded-[10px] border border-rule-light bg-surface p-5">
                      <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ghost">
                        Response time
                      </p>
                      <p className="mt-2 font-body text-[13px] font-light leading-relaxed text-mid">
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
