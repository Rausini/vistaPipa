import Link from "next/link";

// Banner editorial full-width com art-direction (imagem desktop x mobile).
export function EditorialBanner() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Link
          href="/collections/solar"
          className="group relative block overflow-hidden rounded-card shadow-card"
        >
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/assets/images/banner-editorial-desktop.webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/banner-editorial-mobile.webp"
              alt="Ótica Pipa — coleção em destaque"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          </picture>
        </Link>
      </div>
    </section>
  );
}
