import Image from "next/image";

// Texto EXATO do briefing — não alterar.
const MANIFESTO =
  "Nós criamos óculos pensando no equilíbrio entre forma e função. Cada peça nasce de um olhar apurado sobre o design — clássico, leve e feito para acompanhar o seu movimento. Poucos enxergam como nós. E é daí que vem a nossa essência.";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/assets/images/manifesto-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />

      <div className="container-site relative flex flex-col items-center py-24 text-center text-sand sm:py-32">
        <span aria-hidden className="text-2xl text-sand/70">✦</span>
        <p className="mt-6 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
          {MANIFESTO}
        </p>
        <span aria-hidden className="mt-6 text-2xl text-sand/70">✦</span>
        {/* Assinatura dos fundadores — nomes a confirmar */}
        <p className="mt-6 text-sm tracking-wide text-sand/85">
          — [DEFINIR] Fundadores, Vista Pipa
        </p>
      </div>
    </section>
  );
}
