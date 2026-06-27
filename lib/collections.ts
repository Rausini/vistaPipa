// Configuração das coleções. Os slugs batem com os CTAs do site
// (/collections/<slug>). `tag` cruza com os tags em products.json.
// Slugs reais a confirmar com o cliente ([DEFINIR] — ver §5 do briefing).

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  /** Tag usada p/ filtrar products.json. `null` = ainda sem produtos versionados. */
  tag: string | null;
  image: string;
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "solar",
    title: "Solar",
    subtitle: "Proteção e estilo para o sol de todo dia.",
    tag: "solar",
    image: "/assets/images/colecao-solar.webp",
  },
  {
    slug: "performance",
    title: "Performance",
    subtitle: "Leveza e aderência para o movimento.",
    tag: "performance",
    image: "/assets/images/colecao-performance.webp",
  },
  {
    slug: "grau",
    title: "Óculos de Grau",
    subtitle: "Enxergue melhor sem abrir mão do design.",
    tag: "grau",
    image: "/assets/images/colecao-grau.webp",
  },
  {
    slug: "novidades",
    title: "Novidades",
    subtitle: "Os lançamentos que acabaram de chegar.",
    tag: "novidades",
    image: "/assets/images/colecao-novidades.webp",
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    subtitle: "Os modelos preferidos de quem vive o sol de Pipa.",
    tag: "best-seller",
    image: "/assets/images/colecao-solar.webp",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
