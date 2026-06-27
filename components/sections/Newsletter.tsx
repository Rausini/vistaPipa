"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sem backend nesta fase — apenas estado local de confirmação.
    if (email) setDone(true);
  };

  return (
    <section className="section-pad bg-ink text-sand">
      <div className="container-site flex flex-col items-center text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          Receba novidades e acesso antecipado
        </h2>
        <p className="mt-3 max-w-md text-sand/80">
          Lançamentos, ofertas e drops em primeira mão — direto no seu e-mail.
        </p>

        {done ? (
          <p className="mt-8 text-lg text-amber-200" role="status">
            Pronto! Você está na lista. ✦
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-full border border-sand/30 bg-transparent px-5 py-3 text-sand placeholder:text-sand/50 focus:border-sand focus:outline-none"
            />
            <Button type="submit" size="lg" variant="light">
              Inscrever
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-sand/60">
          Ao se inscrever, você concorda com a nossa{" "}
          <a href="/privacidade" className="underline hover:text-sand">
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </section>
  );
}
