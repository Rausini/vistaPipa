"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reducedMotion) {
      v.pause();
    } else {
      // autoplay pode falhar silenciosamente; o poster cobre o fallback.
      v.play().catch(() => {});
    }
  }, [reducedMotion]);

  // h-[calc(100dvh-2.25rem)]: 100dvh menos a altura da TopBar (h-9 = 2.25rem),
  // p/ o hero preencher a tela toda antes do scroll, sem faixa branca abaixo.
  return (
    <section className="relative h-[calc(100dvh-2.25rem)] min-h-[560px] w-full overflow-hidden bg-ink text-sand">
      {/* Vídeo de fundo (único vídeo do site). Desliga com prefers-reduced-motion. */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/hero-poster.webp"
        >
          <source src="/assets/videos/hero_background_v1.webm" type="video/webm" />
          <source src="/assets/videos/hero_background_v1.mp4" type="video/mp4" />
        </video>
      )}
      {reducedMotion && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/images/hero-poster.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlay p/ legibilidade do texto sobre o vídeo */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/60" />

      <div className="container-site relative flex h-full flex-col items-start justify-end pb-16 sm:justify-center sm:pb-0">
        <div className="max-w-xl">
          <p className="eyebrow text-sand/80">Vista Pipa</p>
          {/* Headline a validar com o cliente */}
          <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
            Poucos enxergam como nós.
          </h1>
          <p className="mt-4 max-w-md text-base text-sand/90 sm:text-lg">
            Óculos clássicos, leves e feitos para acompanhar o seu movimento.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/collections/solar" size="lg" variant="light">
              Ver Solar
            </Button>
            <Button href="/collections/novidades" size="lg" variant="outlineLight">
              Novidades
            </Button>
          </div>

          {/* Selo de prova social — dado real pendente ([DEFINIR]) */}
          <div className="mt-7 flex items-center gap-2 text-sm text-sand/90">
            <span aria-hidden className="text-amber-300">★★★★★</span>
            <span>+[DEFINIR] mil clientes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
