import Image from "next/image";

const POSTS = [
  "InstaFeed",
  "InstaFeed_1",
  "InstaFeed_2",
  "InstaFeed_4",
  "InstaFeed_5",
  "InstaFeed_6",
  "InstaFeed_7",
  "rbpipafeed_1",
];

export function InstaFeed() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Comunidade</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">@vistapipa</h2>
          </div>
          <a
            href="https://instagram.com/vistapipa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brown-dark transition-colors hover:text-ink"
          >
            Seguir no Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {POSTS.map((p) => (
            <a
              key={p}
              href="https://instagram.com/vistapipa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-sand-200"
            >
              <Image
                src={`/assets/images/feed/${p}.webp`}
                alt="Publicação da Vista Pipa no Instagram"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
