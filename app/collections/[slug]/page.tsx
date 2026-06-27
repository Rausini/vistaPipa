import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COLLECTIONS, getCollection } from "@/lib/collections";
import { getProductsByTag } from "@/lib/products";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Coleção não encontrada" };
  return {
    title: collection.title,
    description: collection.subtitle,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = collection.tag ? getProductsByTag(collection.tag) : [];

  return (
    <>
      {/* Cabeçalho da coleção */}
      <section className="relative isolate overflow-hidden bg-ink text-sand">
        <Image
          src={collection.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="container-site relative flex min-h-[38vh] flex-col justify-end py-12">
          {/* Breadcrumb */}
          <nav aria-label="Trilha" className="mb-3 text-xs text-sand/70">
            <Link href="/" className="hover:text-sand">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-sand">{collection.title}</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl">{collection.title}</h1>
          <p className="mt-3 max-w-md text-sand/85">{collection.subtitle}</p>
        </div>
      </section>

      {/* Listagem */}
      <section className="section-pad">
        <div className="container-site">
          {products.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-brown-dark">
                  {products.length}{" "}
                  {products.length === 1 ? "modelo" : "modelos"}
                </p>
              </div>
              <ProductGrid products={products} />
            </>
          ) : (
            <EmptyState title={collection.title} />
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-md rounded-card border border-dashed border-brown/40 bg-sand-200/60 px-6 py-16 text-center">
      <p className="font-display text-2xl text-brown-dark">
        Em breve por aqui
      </p>
      <p className="mt-3 text-sm text-brown-dark">
        Os produtos da coleção <strong>{title}</strong> serão exibidos quando o
        catálogo for versionado (<code className="text-brown-dark">products.json</code>{" "}
        — <span className="whitespace-nowrap">[DEFINIR]</span>).
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button href="/collections/solar" variant="secondary">
          Ver Solar
        </Button>
        <Button href="/">Voltar ao início</Button>
      </div>
    </div>
  );
}
