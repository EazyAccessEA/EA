import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { products } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--color-void)", borderColor: "#1A1814" }}>
      <div className="mx-auto max-w-[1080px] px-6 pb-12 pt-16 md:px-12">
        <div className="mb-12 grid gap-14 sm:grid-cols-3">
          {/* Brand column */}
          <div>
            <LogoMark size={20} variant="light" showWordmark />
            <p className="mt-5 max-w-[300px] font-body text-[13px] leading-[1.75] text-[#6E6A60]">
              A permanent portfolio of British software. Five products. Seven
              domains. Thirty within fifteen years. Never for sale.
            </p>
          </div>

          {/* Products column */}
          <div>
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#3D3A34]">
              Products
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                  <div
                    className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="font-mono text-[10px] text-[#6E6A60]">{p.domain}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#3D3A34]">
              Company
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {[
                { label: "Philosophy", href: "/philosophy" },
                { label: "Products", href: "/products" },
                { label: "For Founders", href: "/founders" },
                { label: "Press", href: "/press" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-[13px] text-[#6E6A60] transition-colors hover:text-[#A8A49E]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-7 h-px bg-[#1E1C14]" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#3D3A34]">
            © {new Date().getFullYear()} EAZYACCESS LTD · UNITED KINGDOM
          </span>
          <div className="flex gap-7">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Press kit", href: "/press" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-[11px] text-[#3D3A34] transition-colors hover:text-[#6E6A60]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
