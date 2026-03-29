"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "For Founders", href: "/founders" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[500] transition-all duration-400"
      style={{
        height: 64,
        background: scrolled ? "rgba(253,252,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-rule-light)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1080px] items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2.5" aria-label="EazyAccess home">
          <LogoMark size={20} variant="dark" showWordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`font-body text-[13px] transition-colors duration-200 hover:text-ink ${
                  isActive ? "font-medium text-ink" : "text-mid"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-button border border-accent bg-transparent px-6 py-2 font-body text-[12px] font-medium tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-[#FDFCFA] md:inline-flex"
        >
          Contact →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden border-t bg-bg transition-all duration-300 ease-out md:hidden"
        style={{
          maxHeight: menuOpen ? 340 : 0,
          opacity: menuOpen ? 1 : 0,
          borderColor: menuOpen ? "var(--color-rule-light)" : "transparent",
        }}
      >
        <div className="px-6 py-5">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3.5 font-body text-[15px] text-mid transition-colors hover:text-ink"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(-4px)",
                transition: "opacity 0.25s ease, transform 0.25s ease, color 0.2s",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-block rounded-button border border-accent px-6 py-2.5 font-body text-[12px] font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-[#FDFCFA]"
            style={{
              transitionDelay: menuOpen ? "160ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "none" : "translateY(-4px)",
              transition: "opacity 0.25s ease, transform 0.25s ease, background-color 0.2s, color 0.2s",
            }}
          >
            Contact →
          </Link>
        </div>
      </div>
    </header>
  );
}
