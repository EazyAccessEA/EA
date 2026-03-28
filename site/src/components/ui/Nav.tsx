import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Press", href: "/press" },
];

export function Nav() {
  return (
    <header
      className="sticky top-0 z-[100] flex items-center justify-between border-b border-[#1A1A18] px-6 py-4 md:px-9"
      style={{
        background: "rgba(10,10,12,0.96)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Link href="/" className="flex items-center gap-2.5" aria-label="EazyAccess home">
        <LogoMark size={24} variant="light" showWordmark />
      </Link>
      <nav className="flex items-center gap-1" aria-label="Main navigation">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="rounded-md px-4 py-2 font-body text-sm font-medium text-stone transition-colors hover:text-bone"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
