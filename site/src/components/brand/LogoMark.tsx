type LogoMarkVariant = "light" | "dark" | "ember";

interface LogoMarkProps {
  size?: number;
  variant?: LogoMarkVariant;
  showWordmark?: boolean;
  className?: string;
}

const EMBER = "#C8622A";
const BONE = "#F0EBE1";
const VOID = "#0A0A0C";

export function LogoMark({
  size = 28,
  variant = "light",
  showWordmark = true,
  className = "",
}: LogoMarkProps) {
  const strokeMain = variant === "ember" ? "rgba(240,235,225,0.5)" : variant === "light" ? BONE : VOID;
  const strokeAccent = EMBER;
  const wordmarkColor = variant === "dark" ? "text-void" : "text-bone";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
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
          stroke={strokeAccent}
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
        <span className={`font-body text-sm font-extrabold tracking-tight ${wordmarkColor}`}>
          EAZY<span className="text-ember">ACCESS</span>
        </span>
      )}
    </div>
  );
}
