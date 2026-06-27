import Image from "next/image";
import { FeatureBlock, type Feature } from "@/components/ui/FeatureBlock";

const FEATURES: Feature[] = [
  {
    title: "Proteção UV400",
    description:
      "Bloqueio total dos raios UVA e UVB para proteger seus olhos sob qualquer sol.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
      </svg>
    ),
  },
  {
    title: "Lentes polarizadas",
    description:
      "Reduzem o reflexo da água e da areia, com contraste e nitidez para o dia inteiro.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Leveza no rosto",
    description:
      "Materiais selecionados para um caimento confortável que você esquece que está usando.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 13a4 4 0 0 1 8 0M13 13a4 4 0 0 1 8 0M11 12h2M2 11h1M21 11h1" />
      </svg>
    ),
  },
];

export function LensTech() {
  return (
    <section className="section-pad bg-sand-200">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sand">
            <Image
              src="/assets/images/lente-polarizada.webp"
              alt="Tecnologia da lente polarizada Vista Pipa"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain"
            />
          </div>

          <div>
            <p className="eyebrow">Tecnologia da lente</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Feita para o sol, o mar e o movimento
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="lg:flex lg:items-start lg:gap-4 lg:text-left">
                  <FeatureBlock feature={f} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
