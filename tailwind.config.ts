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
        // Varredura de brilho p/ skeletons de carregamento.
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        // Revelação suave (sobe + aparece) p/ conteúdo do hero no mount.
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Revelação por linha do título do hero (máscara overflow-hidden):
        // a linha desliza de baixo + aparece. Inspirado no SplitText "lines".
        "hero-line": {
          "0%": { opacity: "0", transform: "translateY(40%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Reveal de primeiro load do painel de fundo, em DUAS fases (igual ao
        // original da Wolverine, easing expo.out aplicado por trecho do keyframe):
        //   Fase 1 (0%->50%, ~1s): fade-in + sobe (translateY 60% -> 20%),
        //                          ainda pequeno (scale 0.6).
        //   Fase 2 (50%->100%, ~1s): cresce (scale 0.6 -> 1) e assenta (-> 0%).
        "hero-bg": {
          "0%": { opacity: "0", transform: "translateY(60%) scale(0.6)" },
          "50%": { opacity: "1", transform: "translateY(20%) scale(0.6)" },
          "100%": { opacity: "1", transform: "translateY(0%) scale(1)" },
        },
        // Zoom interno do vídeo (scale 1.2 -> 1). Só ocorre na fase 2, então é
        // disparado com animation-delay de 1s (via inline style no componente).
        "hero-video": {
          "0%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        // Card de destaque do hero entra com leve subida + escala.
        "hero-card": {
          "0%": { opacity: "0", transform: "translateY(10%) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        // cubic-bezier(0.16, 1, 0.3, 1) aproxima o easing "expo.out" do original.
        "hero-line": "hero-line 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-bg": "hero-bg 2s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-video": "hero-video 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-card": "hero-card 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
