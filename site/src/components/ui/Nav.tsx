"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "For Founders", href: "/founders" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[500] transition-all duration-300"
      style={{
        height: 56,
        background: scrolled ? "rgba(253,252,250,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-rule)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-full max-w-[960px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="EazyAccess home">
          <LogoMark size={19} variant="dark" showWordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-[13px] font-normal text-mid transition-colors hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/products"
          className="hidden rounded-button border border-accent bg-transparent px-5 py-[7px] font-body text-xs font-medium text-accent transition-all hover:bg-accent hover:text-[#FDFCFA] md:inline-flex"
        >
          Explore →
        </Link>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] w-5 bg-ink transition-transform ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden border-t bg-bg transition-all duration-300 ease-out md:hidden"
        style={{
          maxHeight: menuOpen ? 320 : 0,
          opacity: menuOpen ? 1 : 0,
          borderColor: menuOpen ? "var(--color-rule)" : "transparent",
        }}
      >
        <div className="px-6 py-4">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-body text-sm text-mid transition-colors hover:text-ink"
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
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-block rounded-button border border-accent px-5 py-2 font-body text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-[#FDFCFA]"
            style={{
              transitionDelay: menuOpen ? "160ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "none" : "translateY(-4px)",
              transition: "opacity 0.25s ease, transform 0.25s ease, background-color 0.2s, color 0.2s",
            }}
          >
            Explore →
          </Link>
        </div>
      </div>
    </header>
  );
}
