import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { PortfolioGrid } from "@/components/brand/PortfolioGrid";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero: full viewport, void bg, headline + CTA */}
        <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 text-center md:px-9">
          <h1 className="font-display text-4xl font-normal italic leading-[0.95] tracking-tight text-bone sm:text-5xl md:text-6xl lg:text-7xl">
            Access <span className="text-ember">everything.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-base text-stone md:text-lg">
            A sovereign portfolio of tools for British life.
          </p>
          <div className="mt-10">
            <Button href="/products" variant="ghost">
              Explore the portfolio →
            </Button>
          </div>
        </section>

        {/* Portfolio grid */}
        <section className="px-6 pb-20 md:px-9">
          <div className="mx-auto max-w-4xl">
            <PortfolioGrid />
          </div>
        </section>

        {/* About strip: 3 columns */}
        <section className="border-t border-surface px-6 py-16 md:px-9">
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
            <div>
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
                UK-built
              </h3>
              <p className="mt-2 font-body text-sm text-stone">
                Designed and built for British life — documents, privacy, farms, family.
              </p>
            </div>
            <div>
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
                Independently owned
              </h3>
              <p className="mt-2 font-body text-sm text-stone">
                No venture capital. No exit pressure. We build for the long term.
              </p>
            </div>
            <div>
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-ember">
                No investors, no agenda
              </h3>
              <p className="mt-2 font-body text-sm text-stone">
                Our only agenda is building tools that respect the people who use them.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
