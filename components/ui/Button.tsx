import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// Cor do anel de foco por variante: `outline-ink` em fundos claros,
// `outline-sand` nas variantes usadas sobre fundos escuros.
const variants: Record<Variant, string> = {
  primary: "bg-ink text-sand hover:bg-brown-dark shadow-sm hover:shadow-md focus-visible:outline-ink",
  secondary:
    "border border-ink/80 text-ink hover:bg-ink hover:text-sand focus-visible:outline-ink",
  ghost: "text-ink hover:bg-ink/5 focus-visible:outline-ink",
  // CTAs sobre fundos escuros / foto (ex.: hero com vídeo).
  light: "bg-sand text-ink hover:bg-sand-300 shadow-sm hover:shadow-md focus-visible:outline-sand",
  outlineLight: "border border-sand/70 text-sand hover:bg-sand hover:text-ink focus-visible:outline-sand",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
