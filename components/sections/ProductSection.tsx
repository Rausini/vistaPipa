import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/products";

export function ProductSection({
  id,
  heading,
  tagline,
  products,
  ctaLabel,
  ctaHref,
}: {
  id?: string;
  heading: string;
  tagline?: string;
  products: Product[];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section id={id} className="section-pad">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">{heading}</h2>
            {tagline && <p className="mt-2 text-brown-dark">{tagline}</p>}
          </div>
          <Button href={ctaHref} variant="secondary" className="hidden sm:inline-flex">
            {ctaLabel}
          </Button>
        </div>

        <ProductCarousel products={products} />

        <div className="mt-6 sm:hidden">
          <Button href={ctaHref} variant="secondary" className="w-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
