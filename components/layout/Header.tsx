"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

// Navegação enxuta (2 itens) — o lockup central assume o protagonismo.
// As demais coleções seguem acessíveis pela grade de coleções e pelo rodapé.
const NAV = [
  { label: "Solar", href: "/collections/solar", exists: true },
  { label: "Performance", href: "/collections/performance", exists: true },
];

function IconButton({
  label,
  solid,
  className,
  children,
}: {
  label: string;
  solid: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        solid ? "text-ink hover:bg-ink/5" : "text-sand hover:bg-white/10",
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

  // Transparente no topo, ganha cor (areia) ao rolar a página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Força o estado sólido quando o menu mobile abre (legibilidade do drawer).
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        // -mb-16 puxa a próxima seção (hero) p/ baixo do header → sobreposição.
        "sticky top-0 z-50 -mb-16 transition-colors duration-300",
        solid
          ? "border-b border-ink/10 bg-sand/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Grid de 3 colunas: nav à esquerda · logo centralizado · ações à direita. */}
      <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Coluna esquerda: nav desktop (2 itens) + toggle no mobile */}
        <div className="flex items-center gap-7 justify-self-start">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-ink hover:bg-ink/5" : "text-sand hover:bg-white/10"
            )}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch={item.exists ? undefined : false}
                className={cn(
                  "text-sm font-medium transition-colors",
                  solid
                    ? "text-ink/90 hover:text-brown-dark"
                    : "text-sand/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Coluna central: lockup horizontal — crossfade branco↔escuro. */}
        <Link
          href="/"
          aria-label="Vista Pipa — início"
          className="relative block h-[34px] w-[108px] justify-self-center sm:h-[38px] sm:w-[121px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/pipa-lockup-horizontal-white.svg"
            alt="Vista Pipa"
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
              solid ? "opacity-0" : "opacity-100"
            )}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/pipa-lockup-horizontal-dark.svg"
            alt=""
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
              solid ? "opacity-100" : "opacity-0"
            )}
          />
        </Link>

        {/* Coluna direita: ações */}
        <div className="flex items-center gap-0.5 justify-self-end">
          <IconButton label="Buscar" solid={solid}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Minha conta" solid={solid} className="hidden sm:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton label="Carrinho" solid={solid}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>
      </div>

      {/* Mobile nav drawer — absoluto p/ não interferir na sobreposição do hero */}
      <div
        className={cn(
          "absolute inset-x-0 top-full overflow-hidden border-t border-ink/10 bg-sand shadow-card lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
        style={{ transition: "max-height 0.3s ease" }}
      >
        <nav className="container-site flex flex-col py-2">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={item.exists ? undefined : false}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 py-3 text-base font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
