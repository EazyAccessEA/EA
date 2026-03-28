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
        void: "var(--color-void)",
        bone: "var(--color-bone)",
        ember: "var(--color-ember)",
        stone: "var(--color-stone)",
        surface: "var(--color-surface)",
      },
      fontFamily: {
        display: ["var(--font-dm-serif)", "DM Serif Display", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
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
