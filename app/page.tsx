import { Hero } from "@/components/sections/Hero";
import { ProductSection } from "@/components/sections/ProductSection";
import { EditorialBanner } from "@/components/sections/EditorialBanner";
import { CollectionsGrid } from "@/components/sections/CollectionsGrid";
import { LensTech } from "@/components/sections/LensTech";
import { Manifesto } from "@/components/sections/Manifesto";
import { InstaFeed } from "@/components/sections/InstaFeed";
import { Newsletter } from "@/components/sections/Newsletter";
import { Reveal } from "@/components/util/Reveal";
import { getProductsByTag } from "@/lib/products";

export default function Home() {
  const bestSellers = getProductsByTag("best-seller");
  const performance = getProductsByTag("performance");

  return (
    <>
      {/* 1 — Hero (vídeo de fundo) — tem animação própria, não revela ao rolar */}
      <Hero />

      {/* 2 — Vitrine Best Sellers */}
      <Reveal>
        <ProductSection
          id="best-sellers"
          heading="Best Sellers"
          tagline="Design icônico ⚡ Caimento certo ⚡ Preço justo"
          products={bestSellers}
          ctaLabel="Ver todos"
          ctaHref="/collections/solar"
        />
      </Reveal>

      {/* 3 — Banner editorial */}
      <Reveal>
        <EditorialBanner />
      </Reveal>

      {/* 4 — Vitrine Performance */}
      <Reveal>
        <ProductSection
          id="performance"
          heading="Performance"
          products={performance}
          ctaLabel="Ver Performance"
          ctaHref="/collections/performance"
        />
      </Reveal>

      {/* 5 — Grade de coleções por uso */}
      <Reveal>
        <CollectionsGrid />
      </Reveal>

      {/* 6 — Tecnologia da lente */}
      <Reveal>
        <LensTech />
      </Reveal>

      {/* 7 — Manifesto da marca */}
      <Reveal>
        <Manifesto />
      </Reveal>

      {/* 8 — Prova social / feed Instagram */}
      <Reveal>
        <InstaFeed />
      </Reveal>

      {/* 9 — Newsletter */}
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
