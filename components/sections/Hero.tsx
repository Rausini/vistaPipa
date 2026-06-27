"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Título dividido em linhas — cada linha é revelada com máscara (overflow-hidden)
// e desliza de baixo, escalonando o início. Reproduz o "SplitText (lines)" do
// hero da Wolverine: yPercent 40 -> 0 + opacidade, easing expo.out, stagger 0.1s.
const TITLE_LINES = ["Born", "To", "Fly"];

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

  // h-dvh: o hero preenche a tela toda antes do scroll. O Header é sticky e
  // sobreposto (não ocupa altura), então não há desconto a fazer aqui.
  return (
    <section className="block h-dvh min-h-[560px] w-full md:px-2 md:pt-2">
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pb-12 pt-[42svh] text-sand sm:px-8 md:flex-row md:items-end md:px-10 md:pb-14 md:pt-0 md:rounded-2xl">
        {/* Bloco de texto (canto inferior esquerdo no desktop). */}
        <div className="max-w-xl">
          <p className="eyebrow text-sand/80">Vista Pipa</p>

          {/* Headline com revelação por linha. */}
          <h1 className="mt-3 font-display leading-[0.92] tracking-tight">
            {TITLE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={cn(
                    "block text-6xl sm:text-7xl lg:text-8xl",
                    !reducedMotion && "animate-hero-line",
                  )}
                  // Fase 2 do reveal começa em ~1s; stagger de 0.1s por linha.
                  style={{ animationDelay: `${1 + i * 0.1}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={cn(
              "mt-5 max-w-md text-base text-sand/90 sm:text-lg",
              !reducedMotion && "animate-fade-up",
            )}
            style={{ animationDelay: "1.35s" }}
          >
            Óculos clássicos, leves e feitos para acompanhar o seu movimento.
          </p>

          <div
            className={cn(
              "mt-7 flex flex-wrap gap-3",
              !reducedMotion && "animate-fade-up",
            )}
            style={{ animationDelay: "1.45s" }}
          >
            <Button href="/collections/solar" size="lg" variant="light">
              Ver Solar
            </Button>
            <Button href="/collections/novidades" size="lg" variant="outlineLight">
              Novidades
            </Button>
          </div>
        </div>

        {/* Card de destaque (canto inferior direito no desktop). */}
        <Link
          href="/collections/novidades"
          className={cn(
            "group mt-10 flex w-full flex-row gap-4 rounded-2xl border border-sand/15 bg-ink/10 p-3 backdrop-blur-[18px] transition-colors hover:bg-ink/20 sm:w-72 sm:flex-col md:mt-0",
            !reducedMotion && "animate-hero-card",
          )}
          // Card entra 0.2s após o início da fase 2 (~1.2s), igual ao original.
          style={{ animationDelay: "1.2s" }}
        >
          <div className="flex w-full flex-col justify-between gap-6 py-1 sm:gap-10">
            <span className="eyebrow text-sand/70">Nova coleção</span>
            <div className="flex items-end justify-between">
              <span className="font-display text-xl leading-tight sm:text-2xl">
                Verão 2026
              </span>
              <span
                aria-hidden
                className="pb-1 text-xl transition-transform duration-500 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </div>
        </Link>

        {/* Fundo: o painel começa pequeno (formato de card) e cresce até
            preencher a tela no load; o vídeo dá um zoom interno sutil.
            Desliga com prefers-reduced-motion (mostra o poster). */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 overflow-hidden md:rounded-2xl",
            !reducedMotion && "animate-hero-bg",
          )}
        >
          {!reducedMotion ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full animate-hero-video object-cover"
              // Zoom do vídeo (1.2->1) só na fase 2: segura 1.2 durante 1s (fill).
              style={{ animationDelay: "1s" }}
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
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/assets/images/hero-poster.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Overlays p/ legibilidade do texto sobre o vídeo:
              gradiente vertical (base) + scrim lateral esquerdo. */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}
