# Prompt de criação — Novo site Vista Pipa

> **Como usar:** cole o conteúdo da seção **"PROMPT"** abaixo no agente.
> Fluxo em 2 fases: **(1) criar** com o plugin **`ui-ux-pro-max`** → **(2) refinar** com o
> **MCP `magic`**. Os arquivos de contexto e os assets já estão no repositório.

---

## Contexto / entradas (leitura obrigatória antes de construir)

- **Spec definitiva:** `BRIEFING_FINAL_NOVO_SITE.md` ← **fonte da verdade** (estrutura, copy, assets por seção).
- Apoio: `BRIEFING_NOVO_SITE.md` (acervo + estrutura do site atual) e
  `BRIEFING_REFERENCIA_SUNSKI.md` (referência de UX/roupagem — sunski.com).
- **Assets reais:** `assets/` (`videos/`, `images/`, `images/produtos/`, `logo/`, `icons/`).
- **Catálogo:** `assets/inventory.md` + `assets/download-log.csv`.

### Diretrizes fixas (não negociáveis)
1. **Hero:** vídeo de fundo full-bleed **`assets/videos/hero_background_v1.mp4`** (autoplay, muted, loop, `object-fit:cover`) com **poster** de fallback.
2. **Demais seções:** reutilizar **as mesmas imagens já catalogadas** da Vista Pipa (`assets/images/…`), **sem inventar arte nova** — apenas re-vestir com **roupagem moderna no estilo Sunski**.
3. **Identidade:** logo `assets/logo/logo_svg.svg`; paleta areia/quente (`#fff9f4`, marrom `#9e8770`); manifesto e copy reais do `BRIEFING_FINAL_NOVO_SITE.md`.

---

## PROMPT

```
Você vai construir o NOVO site da marca Vista Pipa (e-commerce de óculos — solar,
polarizado e grau; lifestyle praia/Pipa-RN).

LEIA PRIMEIRO, na íntegra, e trate como fonte da verdade:
- BRIEFING_FINAL_NOVO_SITE.md  (estrutura seção a seção, copy real e asset por seção)
- BRIEFING_NOVO_SITE.md         (acervo e estrutura do site atual)
- BRIEFING_REFERENCIA_SUNSKI.md (referência de UX/roupagem moderna — sunski.com)
Os assets estão em ./assets (videos, images, images/produtos, logo, icons).

================ FASE 1 — CRIAÇÃO com o plugin ui-ux-pro-max ================
Use o plugin ui-ux-pro-max para gerar a interface completa da home (e os componentes
reutilizáveis) seguindo EXATAMENTE a estrutura do BRIEFING_FINAL_NOVO_SITE.md:

Ordem das seções:
 0. Top bar promocional + Header (logo logo_svg.svg; menu: Solar, Performance, Grau,
    Best Sellers, Sobre, Ajuda; ícones de busca/conta/carrinho).
 1. HERO — vídeo de fundo assets/videos/hero_background_v1.mp4 (autoplay/muted/loop/cover,
    com poster de fallback). Overlay: headline curta + 2 CTAs ("Ver Solar" -> /collections/solar,
    "Novidades" -> /collections/novidades) + selo de prova social (condicional).
 2. Vitrine "Best Sellers" — grade/carrossel de cards ricos: foto + nome + preço +
    fit em 1 linha + swatches de cor. Fotos: assets/images/produtos/1_*.png.
 3. Banner editorial — assets/images/Banner_site_pc_1_13f1e3cc-*.svg (mobile:
    BANNER_SITE_MOBILE_10.svg), full-width moderno.
 4. Vitrine "Performance" — grade de cards (mesmo componente da seção 2).
 5. Grade de coleções por uso (cards com imagem+copy+CTA):
    Solar (rostoparaosite2_3.png), Performance (Novosprodutossite_6.png),
    Grau (fotosparaosite_4.png), Novidades (ModelosAtualizado.png).
 6. Bloco "tecnologia da lente" — lente_polarizada_5_*.svg (UV, polarização, leveza).
 7. Manifesto da marca, assinado pelos fundadores, sobre imagem de natureza
    (fotosparaosite_7.png). Texto EXATO:
    "Nós criamos óculos pensando no equilíbrio entre forma e função. Cada peça nasce de
     um olhar apurado sobre o design — clássico, leve e feito para acompanhar o seu
     movimento. Poucos enxergam como nós. E é daí que vem a nossa essência."
 8. Prova social / feed Instagram — InstaFeed*.png, rbpipafeed_1.png.
 9. Newsletter — "Receba novidades e acesso antecipado" (captura de e-mail).
10. Footer 3 colunas (Institucional / Atendimento / Legal) + social + logo.

Sistema de design (roupagem moderna estilo Sunski):
- Grid amplo, muito whitespace, hero/banners full-bleed.
- Cards com cantos suaves, sombra leve, hover trocando swatch de cor.
- Botões: primário sólido (CTA) + secundário outline.
- Paleta base areia/quente (#fff9f4, marrom #9e8770), alto contraste nos CTAs.
- Tipografia: display marcante nos headings + sans legível no corpo.
- Mobile-first, totalmente responsivo e acessível (WCAG AA, prefers-reduced-motion
  desliga autoplay do vídeo).

Regras de asset:
- NÃO gerar imagens novas: usar somente os arquivos de ./assets citados no briefing.
- Hero é o ÚNICO vídeo. Logo = logo_svg.svg. Favicon a partir de favicon.webp.
- Otimizar: servir imagens em WebP/AVIF com srcset + lazy-load; vídeo com poster e
  preload=metadata; reexportar SVGs pesados (lente_polarizada_*, banners).

Entregue HTML/CSS/JS (ou o stack do plugin) com componentes reutilizáveis:
Header, Hero, ProductCard, ProductCarousel, CollectionCard, EditorialBanner,
FeatureBlock, Manifesto, InstaFeed, Newsletter, Footer.

================ FASE 2 — REFINAMENTO com o MCP magic ================
Depois da home gerada, use o MCP `magic` para refinar e polir os componentes:
- Elevar o acabamento visual dos cards de produto, do hero (overlay/legibilidade do texto
  sobre o vídeo) e da grade de coleções.
- Microinterações e estados (hover/focus/loading), transições suaves, skeletons.
- Consistência do design system (espaçamento, tipografia, cores, raios, sombras).
- Acessibilidade e responsividade finas (foco visível, contraste, breakpoints).
- Performance (sem layout shift; vídeo e imagens otimizados).
Mantenha SEMPRE a estrutura de seções e os assets reais definidos na Fase 1.

================ RESTRIÇÕES ================
- Seguir BRIEFING_FINAL_NOVO_SITE.md como fonte da verdade; não alterar a ordem das seções.
- Copy real do briefing; onde houver lacuna (headline do hero, preços, reviews), usar
  placeholder claramente marcado como [DEFINIR] — sem inventar dados.
- Não acoplar a checkout/Shopify nesta fase (apenas links de coleção); CTAs apontam para
  /collections/<slug>.

================ ENTREGÁVEIS ================
1. Home completa e responsiva (Fase 1) + refino (Fase 2).
2. Biblioteca de componentes reutilizáveis.
3. Lista de pendências [DEFINIR] que precisam de dados do cliente (ver §5 do briefing final:
    products.json, reviews, políticas de frete/garantia/troca, slugs de coleção).
```

---

## Pós-execução (checklist humano)

- [ ] Hero roda o vídeo com poster e respeita `prefers-reduced-motion`.
- [ ] Todas as imagens vêm de `assets/` (nenhuma arte gerada).
- [ ] Ordem das 11 seções igual ao `BRIEFING_FINAL_NOVO_SITE.md`.
- [ ] Cards de produto com preço/fit/cores (ligar ao `products.json` quando versionado).
- [ ] Placeholders `[DEFINIR]` revisados com o cliente (reviews, frete, garantia, slugs).
- [ ] Lighthouse: performance/acessibilidade OK; imagens em WebP/AVIF.
