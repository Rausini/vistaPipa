import { CollectionCard, type CollectionItem } from "@/components/ui/CollectionCard";

const COLLECTIONS: CollectionItem[] = [
  {
    title: "Solar",
    href: "/collections/solar",
    image: "/assets/images/colecao-solar.webp",
    copy: "Proteção e estilo para o sol de todo dia.",
  },
  {
    title: "Performance",
    href: "/collections/performance",
    image: "/assets/images/colecao-performance.webp",
    copy: "Leveza e aderência para o movimento.",
  },
  {
    title: "Óculos de Grau",
    href: "/collections/grau",
    image: "/assets/images/colecao-grau.webp",
    copy: "Enxergue melhor sem abrir mão do design.",
  },
  {
    title: "Novidades",
    href: "/collections/novidades",
    image: "/assets/images/colecao-novidades.webp",
    copy: "Os lançamentos que acabaram de chegar.",
  },
];

export function CollectionsGrid() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Coleções</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Navegue pelas coleções e descubra o seu Pipa ideal
          </h2>
          <p className="mt-3 text-brown-dark">
            Do sol de todo dia ao movimento — escolha por uso.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {COLLECTIONS.map((item) => (
            <CollectionCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
