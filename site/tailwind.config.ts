import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-deep": "var(--color-surface-deep)",
        rule: "var(--color-rule)",
        "rule-light": "var(--color-rule-light)",
        ink: "var(--color-ink)",
        "ink-mid": "var(--color-ink-mid)",
        mid: "var(--color-mid)",
        faint: "var(--color-faint)",
        ghost: "var(--color-ghost)",
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-bg": "var(--color-accent-bg)",
        /* Legacy — used in dark sections */
        void: "var(--color-void)",
        bone: "var(--color-bone)",
        /* Ember shorthand */
        ember: "var(--color-accent)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant", "Georgia", "serif"],
        body: ["var(--font-outfit)", "Outfit", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
      },
    },
  },
  plugins: [],
};
export default config;
