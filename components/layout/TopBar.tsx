"use client";

import { useEffect, useState } from "react";

// Banner promocional rotativo. Copy a confirmar com o cliente ([DEFINIR]).
const MESSAGES = [
  "Frete grátis acima de R$ [DEFINIR]",
  "Óculos + lente extra com desconto",
  "★★★★★ Aprovado por quem vive o sol de Pipa",
];

export function TopBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink text-sand">
      <div className="container-site flex h-9 items-center justify-center">
        <p
          key={i}
          aria-live="polite"
          className="text-center text-xs font-medium tracking-wide animate-[ticker-fade_4s_ease-in-out]"
        >
          {MESSAGES[i]}
        </p>
      </div>
    </div>
  );
}
