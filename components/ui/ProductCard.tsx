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
        className="relative block aspect-square overflow-hidden rounded-card bg-sand-200 shadow-card transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-card-hover"
      >
        {/* Skeleton enquanto a imagem carrega (evita layout shift) */}
        {!loaded && (
          <span className="absolute inset-0 animate-pulse bg-sand-300/60" aria-hidden />
        )}
        <Image
          src={image}
          alt={namePlaceholder ? "Foto do produto Vista Pipa" : product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 280px"
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-all duration-500 ease-out group-hover:scale-[1.05]",
            loaded ? "opacity-100" : "opacity-0"
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
          className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center rounded-full bg-sand/95 py-2 text-xs font-semibold uppercase tracking-wide text-ink opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          Ver produto
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
                "relative h-6 w-6 rounded-full p-[3px] transition-transform duration-200 hover:scale-110",
                i === active && "scale-110"
              )}
            >
              <span
                className={cn(
                  "block h-full w-full rounded-full border ring-offset-2 ring-offset-sand transition-all",
                  i === active
                    ? "border-white ring-2 ring-ink"
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
