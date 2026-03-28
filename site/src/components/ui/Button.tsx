import Link from "next/link";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-bone border-transparent hover:bg-[#B5571F]",
  ghost:
    "bg-transparent text-ember border border-ember hover:bg-ember hover:text-bone",
};

export function Button({
  variant = "ghost",
  children,
  href,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-button border px-6 py-2.5 font-body text-sm font-medium transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
