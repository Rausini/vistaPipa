import data from "@/data/products.json";

export type ProductColor = {
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  /** Preço em BRL. `null` enquanto for [DEFINIR]. */
  priceBRL: number | null;
  fit: string;
  tags: string[];
  image: string;
  colors: ProductColor[];
};

const products = data.products as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

/** Marca placeholders [DEFINIR] para a UI exibir de forma clara. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return value == null || value.includes("[DEFINIR]");
}

export function formatPriceBRL(price: number | null): string {
  if (price == null) return "[DEFINIR]";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
