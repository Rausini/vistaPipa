"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Navegação enxuta (2 itens), espelhando o header da referência (Wolverine):
// logo à esquerda · nav · ações à direita. Ao rolar, tudo condensa ao centro
// dentro de uma "pílula" escura translúcida e a logo vira só o ícone (pipa).
const NAV = [
  { label: "Solar", href: "/collections/solar", exists: true },
  { label: "Performance", href: "/collections/performance", exists: true },
];

// easing ~ "power2.out"/"expo.out" do original.
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function IconButton({
  label,
  className,
  children,
  onClick,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta o scroll para alternar entre o estado "topo" (transparente, largura
  // cheia) e o estado condensado (pílula escura ao centro). O header permanece
  // fixo e visível em toda a página — não há auto-hide ao rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O menu mobile aberto força o estado expandido visível.
  const condensed = scrolled && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[2vh] z-50 flex justify-center">
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex w-full items-center justify-between",
          condensed ? "gap-4 px-5 py-2.5 sm:px-6" : "gap-6 px-5 py-5 sm:px-8"
        )}
        style={{
          maxWidth: condensed ? "min(680px, 92vw)" : "1280px",
          transition: `max-width 0.45s ${EASE}, gap 0.45s ${EASE}, padding 0.45s ${EASE}`,
        }}
      >
        {/* Pílula de fundo: invisível no topo, ganha blur+preto ao condensar. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-2xl bg-black/85 backdrop-blur-lg"
          style={{
            opacity: condensed ? 1 : 0,
            transition: `opacity 0.45s ${EASE}`,
          }}
        />

        {/* ── Esquerda: logo (lockup → ícone) ───────────────────────────── */}
        <Link
          href="/"
          aria-label="Vista Pipa — início"
          className="relative block shrink-0 overflow-hidden"
          style={{
            height: condensed ? 30 : 34,
            width: condensed ? 26 : 153,
            transition: `width 0.45s ${EASE}, height 0.45s ${EASE}`,
          }}
        >
          {/* Lockup completo (esquerda fixa): é recortado pela caixa ao condensar. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/pipa-lockup-horizontal-white-v2.svg"
            alt="Vista Pipa"
            className="absolute left-0 top-0 h-full max-w-none object-contain object-left"
            style={{
              width: 153,
              opacity: condensed ? 0 : 1,
              transition: `opacity 0.35s ${EASE}`,
            }}
          />
          {/* Ícone (pipa) branco: aparece no estado condensado. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/pipa-icon-white-header.svg"
            alt=""
            aria-hidden
            className="absolute left-0 top-0 h-full object-contain object-center"
            style={{
              width: 26,
              opacity: condensed ? 1 : 0,
              visibility: condensed ? "visible" : "hidden",
              transition: `opacity 0.35s ${EASE}, visibility 0.35s ${EASE}`,
            }}
          />
        </Link>

        {/* ── Centro: navegação (desktop) ───────────────────────────────── */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={item.exists ? undefined : false}
              className="group relative text-sm font-medium tracking-[-0.02em] text-white/90 transition-colors hover:text-white"
            >
              <span
                aria-hidden
                className="absolute -inset-x-2 -inset-y-1.5 -z-10 rounded-md bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Direita: ações + toggle mobile ────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-0.5">
          <IconButton label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Minha conta" className="hidden sm:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Carrinho">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>

          {/* Toggle do menu (mobile) */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-9 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <span>Menu</span>
            <span aria-hidden className="text-base leading-none">
              {open ? "×" : "+"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Drawer mobile ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "pointer-events-auto absolute inset-x-3 top-[calc(100%-0.5rem)] overflow-hidden rounded-2xl bg-black/90 backdrop-blur-md lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ transition: `max-height 0.4s ${EASE}, opacity 0.3s ${EASE}` }}
      >
        <nav className="flex flex-col p-2">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={item.exists ? undefined : false}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
