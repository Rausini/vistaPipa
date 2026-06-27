# Briefing — Referência de design: Sunski (sunski.com)

> **Objetivo:** analisar **sunski.com** como **referência de direção** para o novo site da
> Vista Pipa, e cruzar com o site atual (`BRIEFING_NOVO_SITE.md`) para orientar o redesign.
> Fonte: homepage ao vivo de `https://sunski.com/`. Gerado em 2026-06-26.

---

## 0. Por que Sunski é uma boa referência

Mesmo segmento da Vista Pipa — **óculos de sol com posicionamento lifestyle/outdoor**, marca
direta ao consumidor (D2C, Shopify). Diferenças que valem copiar: **narrativa de marca forte**,
**navegação por persona/uso**, **prova social agressiva** e **bundle/cross-sell de proteção solar
(SPF)**. Serve como teto de qualidade de UX e copywriting.

---

## 1. Posicionamento e tom

- **Tagline:** *"Modern Sunglasses for Outdoor Enthusiasts"*
- **Grito de guerra (hero):** *"Go Outside / Feel Alive"*
- **Manifesto:** *"Humans were not born to scroll"* — conecta natureza × bem-estar × produto.
- **Tom:** otimista, anti-tela, "natureza como ritual diário", levemente irreverente
  (mascote cacto, "Sunski-isms", códigos secretos).
- **Pilares de valor (repetidos no site):**
  - `15.000+ avaliações 5 estrelas` (prova social no topo, no rodapé e em banner fixo)
  - `Frete grátis EUA acima de $75`
  - `Garantia vitalícia` ("Lifetime Warranty")
  - `Proteção para todas as estações` / materiais premium (resina, aço, lentes polarizadas CR-39)
  - `Fit inclusivo` (tamanhos de armação descritos: small/medium/large/oversized)

---

## 2. Estrutura da home (seção a seção, topo → base)

| # | Seção | Conteúdo / copy real | Observação de design |
|---|---|---|---|
| 0 | **Top bar promocional** | "Enjoy free US shipping with orders over $75!" + "15% Off Bundle! … Bundle Shades + SPF…" | Barra fina rotativa de promoções. |
| 0 | **Header / nav** | Shop · Virtual Try-On (New) · Sunglasses (dropdown) · SPF · Help & Support · Prescription Rx · Store Locator | Dropdown "Sunglasses": All, Guys, Gals, Premium, Alpine, Everyday. |
| 1 | **Hero** | **"Go Outside / Feel Alive"** · CTAs **"Shop Sunglasses"** (`/collections/all`) e **"Shop New Summer '26"** (`/collections/new-sunglasses`) · selo **"15,000+ 5-Star Reviews"** | Hero com imagem/produto; dois CTAs + prova social. |
| 2 | **Grade de produtos em destaque** | Heading **"Style without Shortcuts"** · tagline **"Iconic Design ⚡ Confident Fit ⚡ Fair Price"** | Carrossel com ~15 modelos, cada um com **preço**, **descrição curta de fit** e **swatches de cor**. |
| 3 | **Bundle / cross-sell SPF** | "Great choice! 15% off applied" · cards de SPF (Sol Power $29, Hot Block $24) + acessórios (Hardcase $20, Zipper Case $20, Retainer $12) | Botões "Add +"; incentiva ticket maior. |
| 4 | **Mini-cart / resumo** | Subtotal · "You Saved" · Shipping · "Checkout" · estado vazio com mascote ("Surfing Pot Cactus says your cart is empty!") | Personalidade até no carrinho vazio. |
| 5 | **Barra de benefícios** | Acessibilidade · "15,362 Five Star Reviews ★★★★★" · "STYLE BOOTH 😎 Virtual Try-On" · "Free US Shipping on $75+" · "New Summer Styles" | Faixa de reforço de confiança. |
| 6 | **Filosofia da marca** | **"Nature Obsessed"** · sub "Go Outside. Feel Alive." · blocos: "Protection for All Seasons", "California Born", "Daily Nature Kit" | Bloco de storytelling. |
| 7 | **Grade de coleções (4–5 cards)** | Heading **"Complete Sun Protection for Outdoor Enthusiasts."** · cards: **Sunglasses**, **SPF** (New), **New for Summer** (New), **Gals**, **Guys** — cada um com copy + CTA "Shop" | Navegação visual por **categoria/persona**. |
| 8 | **Missão (texto + imagem)** | **"Humans were not born to scroll"** · manifesto longo · assinatura **"Tom + Michael, Sunski Co-founders"** · "Sunski-ism #135: Stay protected, Stay grounded." | Texto editorial sobre fundo de natureza. |
| 9 | **Newsletter** | **"Sign Up for Future Deals + Early Access"** · campo de e-mail · link privacidade | Captura de e-mail. |
| 10 | **Footer** | 3 colunas (Legal/Policy · Customer Service · Company) + social (Instagram, TikTok) + "Do not sell my personal information" | Footer denso e completo. |

**Extras de conversão:** banner de cookies, modal de "código secreto" (`NATURECALLED` → 20% off).

---

## 3. Padrões de UX que valem trazer para a Vista Pipa

1. **Hero com proposta + 2 CTAs + prova social** — objetivo claro logo no topo.
2. **Card de produto rico:** foto + nome + **preço** + **fit em 1 frase** + **swatches de cor**.
   → Vista Pipa tem as fotos (263 imagens) e o `products.json` para alimentar isso.
3. **Navegação por persona/uso** (Guys / Gals / Alpine / Everyday / Premium).
   → A Vista Pipa já navega por coleção (Solar, Performance, Grau, Best Sellers); dá pra
   evoluir para personas/uso ("Praia", "Performance", "Casual", "Grau").
4. **Cross-sell / bundle** (óculos + proteção) para subir ticket — adaptar ao catálogo da Pipa.
5. **Prova social onipresente** (selo de avaliações repetido em hero, faixa e rodapé).
6. **Storytelling de marca** com manifesto assinado pelos fundadores.
   → A Vista Pipa **já tem** um manifesto forte ("Nós criamos óculos pensando no equilíbrio…").
7. **Personalidade nos detalhes** (carrinho vazio, mascote, "ismos", código secreto).
8. **Newsletter + early access** antes do footer.

---

## 4. Síntese: Antigo (Vista Pipa) × Referência (Sunski) → Novo site

| Elemento | Vista Pipa hoje | Sunski (referência) | Direção sugerida p/ o novo site |
|---|---|---|---|
| **Hero** | Slideshow em vídeo (`hero_background_v1.mp4`) | Hero estático + 2 CTAs + selo de reviews | Manter **vídeo**, adicionar **headline + 2 CTAs + prova social** sobreposta. |
| **Headline** | "Ótica Pipa" (banner) | "Go Outside / Feel Alive" | Criar um **grito de marca** curto (Pipa/praia/RN). |
| **Vitrines** | featured_collections (Best Sellers, Performance) | Grade rica com preço/fit/cores | Upgrade dos **cards de produto** (preço + fit + swatches). |
| **Navegação** | Coleções: Solar, Performance, Grau | Personas: Guys, Gals, Alpine, Everyday, Premium | Misturar **uso + coleção** (Solar/Praia, Performance, Grau, Best Sellers). |
| **Manifesto** | "Nós criamos óculos pensando no equilíbrio…" ✅ | "Humans were not born to scroll" (assinado) | **Reaproveitar o manifesto da Pipa**, assinar pelos fundadores. |
| **Prova social** | Ausente/discreta | 15k+ reviews em todo lugar | Adicionar **avaliações** (coletar/importar) e exibir com destaque. |
| **Cross-sell** | Não evidente | Bundle óculos + SPF (15% off) | Avaliar **bundles** (ex.: óculos + case/lente extra). |
| **Newsletter** | Banner "Receba…" no fim | "Future Deals + Early Access" | Manter, com copy de **acesso antecipado**. |
| **Footer** | Simples | 3 colunas + social + garantia | Footer completo: **garantia, trocas, FAQ, social, loja física**. |
| **Diferencial técnico** | `lente_polarizada_*.svg` (lente polarizada) | Materiais premium destacados | Criar bloco **"tecnologia da lente"** usando o asset existente. |

### Lacunas a resolver antes/junto do novo site
- **Prova social:** a Vista Pipa precisa de uma fonte de avaliações (não existe no acervo).
- **Garantia/políticas:** definir garantia, trocas, frete — Sunski usa isso como pilar.
- **Personas/copy:** criar headline de marca + descrições de fit por modelo (faltam textos).
- **Catálogo estruturado:** versionar `products.json` para alimentar cards ricos (preço/cor/fit).

---

## 5. Mapa de navegação/coleções (Sunski, para referência)

- `/collections/all` · `/collections/new-sunglasses` · `/collections/spf`
- `/collections/polarized-sunglasses-for-women` (Gals) · `/collections/polarized-sunglasses-for-men` (Guys)
- Premium · Alpine · Everyday · `/collections/rx-lenses` (grau) · `/collections/lens-kits`
- Páginas de apoio: Garantia vitalícia, Trocas/Returns, FAQ, Store Locator, Our Story, Blog, Reviews, Jobs.

---

### Apêndice — uso
Sunski é **referência externa** (não copiar arte/copy literal). Usar como guia de estrutura,
hierarquia de informação, padrões de conversão e tom. Arte e identidade devem partir dos assets
e da marca **Vista Pipa** (ver `BRIEFING_NOVO_SITE.md`).
