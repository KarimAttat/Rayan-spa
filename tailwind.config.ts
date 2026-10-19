import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — Rayan SPA
 * Les valeurs vivent dans app/globals.css (:root) ; Tailwind ne fait
 * que les exposer sous forme de classes. Pour changer l'identité,
 * modifiez les variables CSS, pas ce fichier.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        night: "var(--night)",
        "night-ink": "var(--night-ink)",
        "tint-1": "var(--tint-1)",
        "tint-2": "var(--tint-2)",
        "tint-3": "var(--tint-3)",
        "tint-4": "var(--tint-4)",
        "tint-5": "var(--tint-5)",
      },
      fontFamily: {
        serif: ["var(--font-boska)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      fontSize: {
        small: ["var(--step-small)", { lineHeight: "1.45" }],
        body: ["var(--step-body)", { lineHeight: "1.5" }],
        lead: ["var(--step-lead)", { lineHeight: "1.32" }],
        head: ["var(--step-head)", { lineHeight: "0.98" }],
        display: ["var(--step-display)", { lineHeight: "0.86" }],
      },
      spacing: {
        margin: "var(--margin)",
        section: "var(--section)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
    },
  },
  plugins: [],
};

export default config;
