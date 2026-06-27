import Image from "next/image";
import Link from "next/link";

export type CollectionItem = {
  title: string;
  href: string;
  image: string;
  copy: string;
};

export function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 300px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="relative p-5 text-sand">
        <h3 className="font-display text-2xl">{item.title}</h3>
        <p className="mt-1 text-sm text-sand/90">{item.copy}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
          Explorar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
