"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPriceBRL, isPlaceholder, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const activeColor = product.colors[active] ?? product.colors[0];
  const image = activeColor?.image ?? product.image;
  const namePlaceholder = isPlaceholder(product.name);
  const pricePlaceholder = product.priceBRL == null;
  const href = `/collections/${product.tags.includes("performance") ? "performance" : "solar"}`;

  return (
    <article className="group flex w-full flex-col">
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        className="relative block aspect-square overflow-hidden rounded-card bg-sand-200 shadow-card transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none"
      >
        {/* Skeleton com varredura de brilho enquanto a imagem carrega (sem layout shift) */}
        {!loaded && (
          <span
            className="absolute inset-0 overflow-hidden bg-sand-300/60"
            aria-hidden
          >
            <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-sand-50/70 to-transparent motion-reduce:animate-none" />
          </span>
        )}
        <Image
          key={image}
          src={image}
          alt={namePlaceholder ? "Foto do produto Vista Pipa" : product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 280px"
          onLoad={() => setLoaded(true)}
          className={cn(
            // animate-fade-up dá um cross-fade suave ao trocar de cor (key={image} remonta).
            "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none",
            loaded ? "animate-fade-up opacity-100" : "opacity-0"
          )}
        />

        {namePlaceholder && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sand backdrop-blur-sm">
            Demo
          </span>
        )}

        {/* CTA sutil revelado no hover/focus */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-1.5 rounded-full bg-sand/95 py-2 text-xs font-semibold uppercase tracking-wide text-ink opacity-0 shadow-sm backdrop-blur transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
        >
          Ver produto
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              "font-display text-lg leading-tight",
              namePlaceholder && "text-brown-dark"
            )}
          >
            <Link href={href} className="transition-colors hover:text-brown-dark">
              {product.name}
            </Link>
          </h3>
          <p
            className={cn(
              "shrink-0 text-base font-semibold tabular-nums",
              pricePlaceholder && "text-brown-dark"
            )}
          >
            {formatPriceBRL(product.priceBRL)}
          </p>
        </div>

        <p className="text-sm text-brown-dark">{product.fit}</p>

        {/* Swatches de cor */}
        <div className="mt-2 flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Cor: ${c.name}`}
              aria-pressed={i === active}
              title={c.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                // p-2 amplia o alvo de toque (~40px) sem aumentar o disco visível.
                "group/sw relative -m-1 flex h-10 w-10 items-center justify-center rounded-full"
              )}
            >
              <span
                className={cn(
                  "block h-6 w-6 rounded-full border ring-offset-2 ring-offset-sand transition-[box-shadow,transform,border-color] duration-200 ease-out group-hover/sw:scale-110 motion-reduce:transform-none motion-reduce:transition-none",
                  i === active
                    ? "scale-110 border-white ring-2 ring-ink"
                    : "border-black/10"
                )}
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
          {product.colors.length > 0 && (
            <span className="ml-1 text-xs text-brown-dark">
              {product.colors.length}{" "}
              {product.colors.length === 1 ? "cor" : "cores"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
