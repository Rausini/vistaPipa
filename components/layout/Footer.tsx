import Link from "next/link";

const COLUMNS = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Trocas", href: "/trocas" },
      { label: "Garantia", href: "/garantia" },
      { label: "FAQ", href: "/faq" },
      { label: "Lojas", href: "/lojas" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacidade", href: "/privacidade" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand-200">
      <div className="container-site grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
        {/* Marca */}
        <div className="col-span-2 sm:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo/pipa-lockup-horizontal-dark.svg"
            alt="Vista Pipa"
            className="h-8 w-auto"
            width={102}
            height={32}
          />
          <p className="mt-4 max-w-xs text-sm text-brown-dark">
            Óculos com equilíbrio entre forma e função. Feitos para acompanhar o seu movimento.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink label="Instagram" href="https://instagram.com">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </SocialLink>
            <SocialLink label="TikTok" href="https://tiktok.com">
              <path d="M15 4v8.5a4 4 0 1 1-3-3.87M15 4c0 2.5 2 4.2 4.5 4.5" />
            </SocialLink>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="eyebrow mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    prefetch={false}
                    className="text-sm text-brown-dark transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-ink/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-brown-dark sm:flex-row">
          <p>© {new Date().getFullYear()} Vista Pipa. Todos os direitos reservados.</p>
          <p>Pagamento seguro · [DEFINIR meios de pagamento]</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-sand"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
