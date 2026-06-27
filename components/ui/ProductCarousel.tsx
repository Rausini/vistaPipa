"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[70vw] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[260px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      <div className="mt-2 hidden justify-end gap-2 md:flex">
        <CarouselButton label="Anterior" onClick={() => scrollBy(-1)} dir="left" />
        <CarouselButton label="Próximo" onClick={() => scrollBy(1)} dir="right" />
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-sand"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
