import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta areia/quente da Vista Pipa + tom de alto contraste p/ CTA.
        sand: {
          DEFAULT: "#fff9f4",
          50: "#fffdfb",
          100: "#fff9f4",
          200: "#f7ede2",
          300: "#efe0d0",
        },
        brown: {
          DEFAULT: "#9e8770",
          light: "#b8a48f",
          dark: "#5b4c3b", // escurecido p/ contraste AA em texto sobre areia (~7.9:1)
        },
        ink: "#2b2017", // texto/CTA primário de alto contraste sobre areia
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(43, 32, 23, 0.18)",
        "card-hover": "0 18px 40px -14px rgba(43, 32, 23, 0.28)",
      },
      maxWidth: {
        site: "1280px",
      },
      keyframes: {
        "ticker-fade": {
          "0%, 100%": { opacity: "0" },
          "10%, 90%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
