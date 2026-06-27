# Briefing — Novo site Vista Pipa (preparação de contexto)

> **Objetivo deste arquivo:** carregar contexto suficiente para um prompt de criação de um
> **novo site** para a marca **Vista Pipa** (e-commerce de óculos), reaproveitando os assets
> já extraídos do site atual (`vistapipa.com.br`).
> Gerado em 2026-06-26.

---

## 0. Status das fontes (leia antes de confiar nos detalhes)

| Fonte | Disponível? | Uso |
|---|---|---|
| `vistapipa.com.br.html` | ✅ **Baixado via `git lfs pull`** (53,7 MB) e inspecionado. | Fonte do DOM real → **ordem das seções confirmada** (ver §4). |
| `assets/inventory.md` | ✅ | Catálogo curado dos assets por categoria. |
| `assets/download-log.csv` | ✅ | Log arquivo-a-arquivo: 346 imagens (0 falhas) + ícones, com URL de origem (CDN Shopify). |
| `assets/` (pastas) | ✅ | Arquivos reais em disco. |

> ✅ **Ordem das seções confirmada** lendo o HTML real (após `git lfs pull`). Ver §4.
> O site atual é um tema **Shopify** (template `27196430975289`); as seções aparecem como
> `<div id=shopify-section-template--...__<tipo>_<hash>>`.

---

## 1. A marca em uma frase

Vista Pipa é uma marca brasileira de **óculos** (de sol / polarizados) com forte apelo de
**lifestyle** (praia/Pipa-RN, fotos de pessoas reais, feed de Instagram). O site atual é uma
loja **Shopify**. Catálogo de **39 produtos** (`products.json`), com **263 fotos de produto**.

---

## 2. Identidade / marca (`assets/logo/`)

| Arquivo | Dimensão | Uso | Observação |
|---|---|---|---|
| `Logo_17.png` | 416×339 | Logo do cabeçalho | Maior resolução disponível no CDN. |
| `logo_svg.svg` | vetor | Logo vetorial | ✅ **Preferir este** no novo site (escalável). |
| `favicon.webp` | 96×96 | Favicon | Extraído de base64 embutido no HTML. |
| `TEST.png` | 200×200 | Ícone/teste | Usado como `TEST_96x96` no tema. |

- **Recomendação:** usar `logo_svg.svg` como logo principal; manter `Logo_17.png` como fallback PNG.

---

## 3. Hero / topo da página

**Vídeo de hero (novo — já adicionado ao repositório):**
- `assets/videos/hero_background_v1.mp4` (≈14,8 MB) — vídeo de fundo da **hero section**
  (commit `13cfd03`). É a direção atual: **hero em vídeo full-bleed** em vez de banner estático.

**Banners do site atual (referência de layout do topo — `assets/images/`):**
Existem dois "andares" de banner (`pc_1` = 1º, `pc_2` = 2ª seção), cada um com versão desktop e mobile:

1. **Banner 1 (topo / 1ª dobra) — desktop:**
   - `Banner_site_pc_1_13f1e3cc-….svg`
   - `Banner_site_pc_1f5cbe40-….svg`
2. **Banner 2 (2ª seção) — desktop:**
   - `Banner_site_pc_2_2.svg`
   - `Banner_site_pc_2_6.svg`
3. **Versões mobile dos banners:**
   - `BANNER_SITE_MOBILE_10.svg`
   - `Banner_site_Cel_2_7_c4041549-….svg` (vetor)
   - `Banner_site_Cel_2_6_4328add8-….png` (raster)

> Os SVGs são vetoriais (bom ponto de partida), mas vários **contêm raster embutido** (arquivos
> grandes) — avaliar refazer limpos ou exportar WebP otimizado.

---

## 4. Ordem CONFIRMADA das seções da home

> Extraída do HTML real (tema Shopify). Cada item lista o **tipo de seção Shopify** e a
> **copy/heading** real encontrada no DOM.

| # | Seção (tipo Shopify) | Conteúdo / copy real |
|---|---|---|
| — | **Header** | Logo `PIPA` + ícones (busca, conta, carrinho, e-mail). |
| — | **Mini-cart** (drawer) | Gaveta de carrinho lateral. |
| 1 | `slideshow` (**HERO**) | **Slideshow com vídeo de fundo** (múltiplas fontes `.mp4`, `object-fit:cover`, sem overlay). É exatamente a direção do novo `hero_background_v1.mp4`. |
| 2 | `ss_parallax_banner` | Banner parallax — heading **"*Ótica Pipa*"** (itálico). |
| 3 | `featured_collections` | Vitrine **"BEST SELLERS"** → botão "Ver todos" para `/collections/solar`. |
| 4 | `ss_parallax_banner` | Banner parallax (2º). |
| 5 | `featured_collections` | Vitrine **"Performance"** → botão "Ver todos" para `/collections/performance`. |
| 6 | `custom_html` | Bloco HTML customizado. |
| 7 | `rich_text` | **"NAVEGUE PELAS COLEÇÕES E DESCUBRA O SEU PIPA IDEAL"**. |
| 8 | `collection_list` | Lista de coleções (3 blocos com overlay escuro) — inclui **"Óculos de Grau"**. |
| 9 | `custom_html` | Bloco HTML customizado. |
| 10 | `featured_collections` | Mais uma vitrine de coleção. |
| 11 | `rich_text` | Divisor **"✦"**. |
| 12 | `rich_text` | **Manifesto da marca:** *"Nós criamos óculos pensando no equilíbrio entre forma e função. Cada peça nasce de um olhar apurado sobre o design — clássico, leve e feito para acompanhar o seu movimento. Poucos enxergam como nós. E é daí que vem a nossa essência."* |
| 13 | `rich_text` | Divisor **"✦"**. |
| 14 | `ss_parallax_banner` | Banner final com **newsletter** ("Receba…"). |
| — | **Footer** | Links, contato, e-mail. |
| — | `ss_back_to_top` | Botão "voltar ao topo" (utilitário, no início do `<main>`). |

### Observações desta análise
- **Hero é um slideshow em VÍDEO** no site atual → o novo `hero_background_v1.mp4` está alinhado
  com a direção existente (não é uma mudança de conceito, é continuidade).
- A home é organizada por **coleções/vitrines** (Best Sellers, Performance, Grau, Solar), não por
  produtos avulsos — o novo site deve manter essa lógica de **navegação por coleção**.
- Coleções confirmadas via URL: `/collections/solar`, `/collections/performance` (+ "Óculos de Grau").
- O tom de marca está no `rich_text` do manifesto (item 12) — **reaproveitar essa copy**.
- Os assets `Banner_site_pc_*`, `Carrossel*`, `rostoparaosite*`, `InstaFeed*` e `lente_polarizada*`
  catalogados no acervo são as **artes que preenchem** esses banners/vitrines (ver §5).

---

## 5. Imagens anexadas / inventário por categoria (`assets/images/`)

### 5.1 Carrosséis e blocos de produto
- `Carrossel_pagina_dos_produtos_6.svg`, `_7.svg`, `_8.svg`
- `Carrosselpaginadosprodutos.png`, `Carrosselpaginadosprodutos_1_….png`, `Carrosselpaginadosprodutos_2f87….png`
- `ModelosAtualizado.png`, `Fotosdeproduto_6.png`, `Novosprodutossite_6.png`, `Novosprodutossite_7.jpg`

### 5.2 Lifestyle / rostos (referência de tom e direção de arte)
- `rostoparaosite_2,3,4,5,8,9,10,11.png` — modelos/rostos
- `rostoparaosite2.png` e `rostoparaosite2_1..8.png`
- `fotosparaosite.png` e `fotosparaosite_1,2,3,4,6,7,8,9.png`

### 5.3 Feed social / prova social
- `InstaFeed.png`, `InstaFeed_1,2,4,5,6,7.png`, `InstaFeed_b4d3….png`, `rbpipafeed_1.png`

### 5.4 Gráficos / institucional
- `lente_polarizada_5_….svg` — explicativo de lente polarizada (vetor pesado, ~14 MB)
- `Design_sem_nome_9.png` — imagem social / Open Graph (compartilhamento)

### 5.5 Avulsas de seção
- `138.png, 139.png, 141.png, 177.png, 178.png, 179.png, 180.png`

---

## 6. Fotos de produto (`assets/images/produtos/` — 263 arquivos)

- Catálogo de **39 produtos** (do `products.json` do site atual).
- Nome no padrão Shopify `<n>_<uuid>.png` (ex.: `1_a157d3e6-….png`), em resolução máxima
  (a maioria 1–2 MB).
- O prefixo `<n>` é a **posição da imagem dentro do produto** (1 = imagem principal/capa,
  2,3,… = ângulos adicionais), **não** o ID do produto.
- **Para mapear foto → produto/título:** cruzar com o `products.json` do site (campo
  `images[].src` por produto). *Recomendação: re-baixar/guardar o `products.json` no repo,
  pois ele é a chave do catálogo e ainda não está versionado aqui.*

---

## 7. Ícones de UI (`assets/icons/` — 14 SVG)

Ícones **funcionais do tema Shopify** (não são identidade da marca):
`icon--header-cart`, `icon--header-search`, `icon--header-customer`, `icon--header-email`,
`icon--check`, `icon--close`, `icon--lock`, `icon--chevron-back`,
`icon--nav-arrow-left/right`, `icon--spinner`, `icon--back-to-top-arrow`,
`icon--back-to-top-progress`, `icon--star-rating-gradient`.

> O novo site provavelmente terá seu próprio set (ex.: Lucide/Phosphor); usar estes só como
> referência funcional (carrinho, busca, conta, setas de carrossel, voltar ao topo, avaliação).

---

## 8. Direção para o novo site (recomendações)

- **Stack:** decidir entre manter Shopify (storefront) ou site headless/estático + checkout.
  *(A definir com o cliente — depende de quem gere o estoque/pagamento.)*
- **Hero:** seguir a direção de **vídeo de fundo** (`hero_background_v1.mp4`); ter fallback de
  imagem (poster) para mobile/conexões lentas; o vídeo tem ~15 MB → comprimir/oferecer versão menor.
- **Logo:** usar `logo_svg.svg`; obter o original em alta com a empresa se preciso.
- **Performance:** os assets atuais são pesados (≈451 MB total). Padronizar **WebP/AVIF**,
  `srcset`/lazy-load, e refazer os SVGs com raster embutido.
- **Identidade visual:** paleta, tipografia e tom vêm das fotos lifestyle (`rostoparaosite*`,
  `fotosparaosite*`) e dos banners — usar como referência de direção de arte.
- **SEO/social:** reaproveitar `Design_sem_nome_9.png` como base de Open Graph; gerar favicon novo.
- **Catálogo:** versionar o `products.json` e construir o mapeamento foto→produto antes de migrar.

---

## 9. Pendências antes de começar o novo site

- [x] `git lfs pull` + **ordem real das seções confirmada** (ver §4). ✅
- [ ] Extrair a **copy completa** das demais seções (`custom_html`, botões, footer) — só os headings principais foram capturados.
- [ ] Recuperar e versionar o **`products.json`** (39 produtos) para mapear as 263 fotos.
- [ ] Confirmar com o cliente: **plataforma** (Shopify vs. headless) e **logo em alta**.
- [ ] Coletar **copy** (títulos, descrições, CTAs) — não há texto extraído neste acervo.
- [ ] Definir versão **comprimida/poster** do vídeo de hero.

---

### Apêndice — propriedade
Os assets são propriedade da **Vista Pipa** (uso autorizado: redesign do próprio site).
