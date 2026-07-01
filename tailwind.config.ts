import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "rgb(var(--bg-primary) / <alpha-value>)",
        "bg-secondary": "rgb(var(--bg-secondary) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        border: "rgb(var(--border) / var(--border-opacity))",
        "card-bg": "rgb(var(--card-bg) / <alpha-value>)",
        "nav-bg": "rgb(var(--nav-bg) / <alpha-value>)",
        decorative: "rgb(var(--decorative) / var(--decorative-opacity))",
        "warm-white": "rgb(var(--warm-white) / <alpha-value>)",
        crimson: "rgb(var(--crimson) / <alpha-value>)",
        "crimson-light": "rgb(var(--crimson-light) / <alpha-value>)",
        "near-black": "rgb(var(--near-black) / <alpha-value>)",
        "mid-grey": "rgb(var(--mid-grey) / <alpha-value>)",
        "light-grey": "rgb(var(--light-grey) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
