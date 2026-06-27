import { Hero } from "@/components/sections/Hero";
import { ProductSection } from "@/components/sections/ProductSection";
import { EditorialBanner } from "@/components/sections/EditorialBanner";
import { CollectionsGrid } from "@/components/sections/CollectionsGrid";
import { LensTech } from "@/components/sections/LensTech";
import { Manifesto } from "@/components/sections/Manifesto";
import { InstaFeed } from "@/components/sections/InstaFeed";
import { Newsletter } from "@/components/sections/Newsletter";
import { getProductsByTag } from "@/lib/products";

export default function Home() {
  const bestSellers = getProductsByTag("best-seller");
  const performance = getProductsByTag("performance");

  return (
    <>
      {/* 1 — Hero (vídeo de fundo) */}
      <Hero />

      {/* 2 — Vitrine Best Sellers */}
      <ProductSection
        id="best-sellers"
        heading="Best Sellers"
        tagline="Design icônico ⚡ Caimento certo ⚡ Preço justo"
        products={bestSellers}
        ctaLabel="Ver todos"
        ctaHref="/collections/solar"
      />

      {/* 3 — Banner editorial */}
      <EditorialBanner />

      {/* 4 — Vitrine Performance */}
      <ProductSection
        id="performance"
        heading="Performance"
        products={performance}
        ctaLabel="Ver Performance"
        ctaHref="/collections/performance"
      />

      {/* 5 — Grade de coleções por uso */}
      <CollectionsGrid />

      {/* 6 — Tecnologia da lente */}
      <LensTech />

      {/* 7 — Manifesto da marca */}
      <Manifesto />

      {/* 8 — Prova social / feed Instagram */}
      <InstaFeed />

      {/* 9 — Newsletter */}
      <Newsletter />
    </>
  );
}
