import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — Rayan SPA
 * Palette "Marrakech claire" : murs de plâtre crème, terre cuite, accents rouges.
 * Modifica i colori qui per cambiare l'intera identità del sito.
 *
 * Nota: i nomi dei token mantengono i ruoli (sfondo / testo / accento),
 * mentre i valori sono ora CHIARI e caldi (terracotta su crema).
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
        // Fondi chiari (ruolo: sfondo)
        noir: "#FBF4EA", // crema avorio (sfondo principale)
        nuit: "#F4E7D5", // sabbia calda (sezioni alterne)
        ombre: "#EAD6BE", // argilla chiara (card / superfici)
        // Accenti caldi
        or: "#B5502E", // TERRACOTTA marrakshi (accento principale)
        "or-clair": "#CE6A41", // terracotta chiaro (hover / luce)
        rouge: "#A2311F", // rosso marocain (richiami)
        "rouge-clair": "#C0432B", // rosso chiaro (hover)
        terracotta: "#B23A2E", // rosso-terracotta (errori / avvisi)
        zellige: "#4A6151", // verde zellige (accento secondario)
        // Toni scuri / testo (ruolo: testo su fondo chiaro)
        sable: "#735A47", // bruno tenue (testo secondario)
        creme: "#3A2A1F", // espresso scuro (testo principale)
        ivoire: "#FFFCF6", // bianco avorio (superfici più chiare)
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        brand: ["var(--font-brand)", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        wide: "0.18em",
      },
      maxWidth: {
        content: "76rem",
      },
      boxShadow: {
        riad: "0 26px 60px -32px rgba(89,52,33,0.35)",
        glow: "0 0 0 1px rgba(181,80,46,0.25), 0 24px 60px -24px rgba(181,80,46,0.25)",
      },
      transitionTimingFunction: {
        riad: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s ease-in-out infinite",
        floaty: "floaty 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
