"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll com inércia (estilo das referências modernas, ex.: site da
 * Wolverine). Inicializa o Lenis sobre a janela e roda o loop de animação.
 * Respeita `prefers-reduced-motion`: se o usuário pede menos movimento, não
 * ativa nada e o scroll nativo do navegador é mantido.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.045, // "peso"/inércia do scroll; maior = mais suave/lento (5% menos que 1.1)
      easing: (t) => 1 - Math.pow(1 - t, 3), // expo/cubic-out, casa com os reveals
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
