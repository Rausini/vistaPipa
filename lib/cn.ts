import { twMerge } from "tailwind-merge";

/**
 * Junta classes condicionalmente e resolve conflitos do Tailwind:
 * a última classe vence (ex.: `bg-ink` + `bg-sand` → `bg-sand`).
 * Sem isso, classes passadas via `className` não sobrescrevem as do
 * componente de forma confiável.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
