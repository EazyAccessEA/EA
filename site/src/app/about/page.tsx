import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "About — EazyAccess",
  description:
    "UK-built, independently owned. A sovereign portfolio of tools for British life. No investors, no agenda.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 px-6 py-16 md:px-9">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-normal italic leading-tight tracking-tight text-bone sm:text-4xl">
            Mission, story, founder.
          </h1>
          <p className="mt-6 font-body text-stone leading-relaxed">
            EazyAccess is a sovereign portfolio of tools built for British life. We don’t do everything — we do a few things well: documents, privacy, farms, family finance. Each product stands alone; together they share a single standard: craft over scale, clarity over noise.
          </p>
          <p className="mt-6 font-body text-stone leading-relaxed">
            We’re UK-built and independently owned. No venture capital, no exit pressure. That means we build for the long term and for the people using the products, not for a spreadsheet.
          </p>
          <p className="mt-6 font-body text-stone leading-relaxed">
            If you want the one-paragraph version for a press release or a partner page: <em className="text-bone">EazyAccess builds tools that give control back to the people using them. No extraction, no complexity, no compromise. Just clean, considered software that works.</em>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
