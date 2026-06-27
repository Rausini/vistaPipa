# Briefing FINAL — Novo site Vista Pipa (spec de construção)

> **O que é este arquivo:** o documento único e definitivo para construir o **novo site da
> Vista Pipa**. Funde o acervo/estrutura do site atual (`BRIEFING_NOVO_SITE.md`) com a
> **roupagem moderna da referência Sunski** (`BRIEFING_REFERENCIA_SUNSKI.md`).
> Gerado em 2026-06-26.

## Diretriz central (decisão do cliente)

> **Hero:** usar **`assets/videos/hero_background_v1.mp4`** como **vídeo de fundo full-bleed**.
> **Todo o resto:** reutilizar **as mesmas imagens já catalogadas** no acervo da Vista Pipa
> (`assets/images/…`), porém com **layout, hierarquia e padrões de conversão modernos** no
> estilo **Sunski**. Nada de inventar arte nova — **re-vestir** o que já existe.

---

## 1. Marca, tom e identidade

- **Marca:** Vista Pipa — óculos (solar / polarizado / grau), lifestyle praia/Pipa-RN.
- **Catálogo:** 39 produtos · 263 fotos (`assets/images/produtos/`).
- **Logo:** `assets/logo/logo_svg.svg` (principal) · `Logo_17.png` (fallback) · `favicon.webp`.
- **Tom (herdado + Sunski):** lifestyle, natureza/praia como ritual, design "clássico, leve".
- **Manifesto oficial (REUTILIZAR — texto real do site atual):**
  > *"Nós criamos óculos pensando no equilíbrio entre forma e função. Cada peça nasce de um
  > olhar apurado sobre o design — clássico, leve e feito para acompanhar o seu movimento.
  > Poucos enxergam como nós. E é daí que vem a nossa essência."*
- **Paleta/direção de arte:** extrair das fotos lifestyle (`rostoparaosite*`, `fotosparaosite*`)
  e dos banners. Tons quentes/areia já aparecem no tema atual (`#fff9f4`, marrom `#9e8770`).

---

## 2. Estrutura proposta do novo site (seção a seção)

> Cada seção lista: **layout (estilo Sunski)** + **assets reais da Vista Pipa** + **copy**.

### 0. Top bar promocional  *(novo — padrão Sunski)*
- Faixa fina rotativa. Ex.: "Frete grátis acima de R$X" · "Óculos + lente extra com desconto".
- **Copy/valores:** *a definir com o cliente* (frete, garantia, troca). Ver §5 (lacunas).

### 0. Header / navegação
- **Logo:** `logo_svg.svg`. Ícones: busca, conta, carrinho (referência: `assets/icons/`).
- **Menu por uso/coleção (mistura Pipa + personas Sunski):**
  `Solar` · `Performance` · `Grau` · `Best Sellers` · `Sobre` · `Ajuda`.

### 1. HERO — vídeo de fundo  ⭐ **(diretriz fixa)**
- **Mídia:** **`assets/videos/hero_background_v1.mp4`** em `object-fit:cover`, autoplay/muted/loop.
- **Poster/fallback** (mobile e enquanto carrega): um frame do vídeo **ou** `rostoparaosite_2.png`.
- **Overlay (estilo Sunski):** headline curta + 2 CTAs + selo de prova social.
  - **Headline:** grito de marca curto — *ex.:* "Poucos enxergam como nós." *(a validar)*
  - **CTA 1:** "Ver Solar" → `/collections/solar`
  - **CTA 2:** "Novidades" → `/collections/novidades`
  - **Selo:** "★★★★★ +X mil clientes" *(quando houver fonte de reviews — ver §5)*

### 2. Vitrine "Best Sellers" — grade de produtos rica  *(Sunski "Style without Shortcuts")*
- **Layout:** carrossel/grade de cards modernos: foto + nome + **preço** + **fit em 1 linha** + **swatches de cor**.
- **Assets:** fotos de `assets/images/produtos/` (capa = prefixo `1_…`). Cruzar com `products.json`.
- **Heading:** "Best Sellers" · **tagline:** "Design icônico ⚡ Caimento certo ⚡ Preço justo".
- **CTA:** "Ver todos" → `/collections/solar`.

### 3. Banner editorial 1  *(reaproveita banner do site atual, repaginado)*
- **Assets:** `Banner_site_pc_1_13f1e3cc-….svg` / `Banner_site_pc_1f5cbe40-….svg`
  (mobile: `BANNER_SITE_MOBILE_10.svg`). Tratar como faixa lifestyle full-width moderna.
- **Heading sugerido:** "Ótica Pipa" (do site atual) ou nova chamada.

### 4. Vitrine "Performance" — grade de produtos
- **Layout:** igual à §2. **Heading:** "Performance" · **CTA:** → `/collections/performance`.
- **Assets:** fotos de produto da linha performance (`assets/images/produtos/`).

### 5. Grade de coleções por uso  *(Sunski "Complete Sun Protection…")*
- **Layout:** 3–4 cards visuais com imagem + copy + CTA "Comprar".
- **Cards e assets:**
  | Card | Imagem (acervo) | CTA |
  |---|---|---|
  | **Solar** | `rostoparaosite2_3.png` (lifestyle) | `/collections/solar` |
  | **Performance** | `Novosprodutossite_6.png` | `/collections/performance` |
  | **Óculos de Grau** | `fotosparaosite_4.png` | `/collections/grau` |
  | **Novidades** | `ModelosAtualizado.png` | `/collections/novidades` |
- **Heading:** "Navegue pelas coleções e descubra o seu Pipa ideal" (copy real do site atual).

### 6. Bloco "tecnologia da lente"  *(Sunski destaca materiais; Pipa já tem o asset)*
- **Asset:** `assets/images/lente_polarizada_5_….svg` (gráfico explicativo de lente polarizada).
- **Layout:** seção de benefício (ícone + título + texto curto): proteção UV, polarização, leveza.
- ⚠️ SVG pesado (~14 MB) → exportar versão otimizada/WebP.

### 7. Manifesto da marca  *(Sunski "Humans were not born to scroll" → Pipa equivalente)*
- **Layout:** texto editorial sobre imagem de natureza/praia, **assinado pelos fundadores**.
- **Copy:** o **manifesto oficial** da §1 (texto real). Fundo sugerido: `fotosparaosite_7.png`
  ou `rostoparaosite_10.png`. Divisores "✦" entre blocos (como no site atual).

### 8. Prova social / feed do Instagram
- **Layout:** grade estilo feed + selo de avaliações.
- **Assets:** `InstaFeed.png`, `InstaFeed_1/2/4/5/6/7.png`, `rbpipafeed_1.png`.
- ⚠️ **Avaliações reais:** não existem no acervo → integrar fonte (ver §5).

### 9. Newsletter  *(Sunski "Future Deals + Early Access")*
- **Layout:** captura de e-mail com copy de acesso antecipado.
- **Heading:** "Receba novidades e acesso antecipado". (Site atual já tinha banner "Receba…".)

### 10. Footer completo  *(padrão Sunski, 3 colunas)*
- **Colunas:** Institucional (Sobre, Blog) · Atendimento (Trocas, Garantia, FAQ, Lojas) · Legal (Privacidade).
- **Social:** Instagram (+ TikTok se houver). **Logo + selo de pagamento.**

---

## 3. Sistema de design (roupagem moderna)

- **Layout:** grid amplo, respiro generoso (whitespace), full-bleed em hero/banners.
- **Cards de produto:** cantos suaves, sombra leve, hover com troca de cor (swatches).
- **Tipografia:** uma display marcante p/ headings + sans legível p/ corpo (definir).
- **Paleta:** base areia/quente do tema atual (`#fff9f4`, marrom `#9e8770`) + alto contraste nos CTAs.
- **Botões:** primário sólido (CTA), secundário outline — consistente com Sunski.
- **Movimento:** vídeo no hero; parallax/reveal sutis nos banners; carrosséis com setas
  (`icon--nav-arrow-left/right`).
- **Ícones:** set próprio (ex.: Lucide/Phosphor); `assets/icons/` só como referência funcional.

---

## 4. Performance e técnica

- **Hero:** servir `hero_background_v1.mp4` (~15 MB) com **poster**, `preload="metadata"`,
  e versão comprimida; desligar autoplay em "data saver"/`prefers-reduced-motion`.
- **Imagens:** converter o acervo (~451 MB) para **WebP/AVIF**, com `srcset` + lazy-load.
- **SVGs com raster embutido** (`lente_polarizada_*`, banners) → reexportar otimizados.
- **Stack:** decidir Shopify (storefront) vs. headless/estático + checkout *(definição do cliente)*.
- **SEO/social:** Open Graph com `Design_sem_nome_9.png`; gerar favicon a partir de `favicon.webp`.

---

## 5. Lacunas a resolver (bloqueiam partes do site)

- [ ] **`products.json`** — versionar p/ alimentar cards (preço, cores, fit, mapear 263 fotos).
- [ ] **Avaliações / prova social** — não existem no acervo; definir fonte (ex.: Judge.me, Trustvox).
- [ ] **Políticas** — frete, **garantia**, trocas (Sunski usa como pilar; Pipa precisa definir).
- [ ] **Copy** — headline do hero, descrições de fit por modelo, microcopy dos CTAs.
- [ ] **Logo em alta** — confirmar se `logo_svg.svg` é o vetor definitivo.
- [ ] **Coleções/URLs** — confirmar slugs reais (`/collections/novidades`, `/collections/grau`).

---

## 6. Mapa rápido: seção → assets reais

| Seção | Assets principais |
|---|---|
| Hero | `assets/videos/hero_background_v1.mp4` (+ poster de `rostoparaosite_2.png`) |
| Best Sellers | `assets/images/produtos/1_*.png` (capas) |
| Banner editorial | `Banner_site_pc_1_13f1e3cc-….svg`, `BANNER_SITE_MOBILE_10.svg` |
| Performance | `assets/images/produtos/*` + `Novosprodutossite_6.png` |
| Coleções | `rostoparaosite2_3.png`, `Novosprodutossite_6.png`, `fotosparaosite_4.png`, `ModelosAtualizado.png` |
| Tecnologia da lente | `lente_polarizada_5_….svg` |
| Manifesto | `fotosparaosite_7.png` / `rostoparaosite_10.png` |
| Feed/social | `InstaFeed*.png`, `rbpipafeed_1.png` |
| Logo/OG/favicon | `logo_svg.svg`, `Design_sem_nome_9.png`, `favicon.webp` |

---

### Apêndice — fontes
- Acervo e estrutura do site atual: `BRIEFING_NOVO_SITE.md`
- Referência de UX/roupagem: `BRIEFING_REFERENCIA_SUNSKI.md` (sunski.com)
- Assets reais: `assets/` · catálogo: `assets/inventory.md` · log: `assets/download-log.csv`
- Sunski é referência de **estrutura e padrões**, não de arte/copy literal. Identidade = Vista Pipa.
