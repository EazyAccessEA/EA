type LogoMarkVariant = "light" | "dark" | "ember";

interface LogoMarkProps {
  size?: number;
  variant?: LogoMarkVariant;
  showWordmark?: boolean;
  className?: string;
}

const EMBER = "#C8622A";
const BONE = "#F0EBE1";
const INK = "#141210";
const BG = "#FDFCFA";

export function LogoMark({
  size = 28,
  variant = "dark",
  showWordmark = true,
  className = "",
}: LogoMarkProps) {
  const strokeMain =
    variant === "ember"
      ? "rgba(240,235,225,0.5)"
      : variant === "light"
        ? BONE
        : INK;
  const wordmarkColor =
    variant === "light" ? "text-bone" : variant === "dark" ? "text-ink" : "text-bone";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M6 4H4V24H24V22"
          stroke={EMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
        <path
          d="M10 4H24V18"
          stroke={strokeMain}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-body font-semibold tracking-tight ${wordmarkColor}`}
          style={{ fontSize: size * 0.72, letterSpacing: "-0.025em" }}
        >
          EAZY<span className="text-accent">ACCESS</span>
        </span>
      )}
    </div>
  );
}
