# Inventário de assets — site atual Vista Pipa (vistapipa.com.br)

Acervo extraído do site atual para análise e reaproveitamento no **novo site**.
Gerado em 2026-06-25. Fonte: site ao vivo (homepage + `products.json`) e o HTML salvo
`vistapipa.com.br.html` (favicon e ícones).

> Lista completa, arquivo por arquivo, com URL de origem e tamanho: **`download-log.csv`**.
> Total: **346 imagens baixadas (0 falhas) + 14 ícones SVG + favicon ≈ 451 MB**.

## Estrutura
```
assets/
├── logo/        identidade da marca
├── icons/       14 ícones SVG de UI (do tema Shopify)
├── images/      banners, carrosséis, lifestyle e gráficos de marca
│   └── produtos/ 263 fotos de produto (óculos)
├── inventory.md (este arquivo)
└── download-log.csv (log completo: nome, status, bytes, URL)
```

---

## 1. Marca / identidade  (`logo/`)
| Arquivo | Dimensão | Uso | Observação |
|---|---|---|---|
| `Logo_17.png` | 416×339 | Logo do cabeçalho | **Maior resolução disponível** no CDN — o site não tem versão maior. Para o novo site, ideal recriar/vetorizar o logo em alta. |
| `favicon.webp` | 96×96 | Favicon | Estava embutido em base64 no HTML (extraído offline). |
| `TEST.png` | 200×200 | Ícone/teste | Usado como `TEST_96x96` em pontos do tema. |

## 2. Banners de hero  (`images/`)
SVGs vetoriais (escaláveis — recomendados como referência de layout do topo):
- `Banner_site_pc_1_13f1e3cc-….svg`, `Banner_site_pc_1f5cbe40-….svg` — banners desktop
- `Banner_site_pc_2_2.svg`, `Banner_site_pc_2_6.svg` — banners desktop (2ª seção)
- `BANNER_SITE_MOBILE_10.svg`, `Banner_site_Cel_2_7_c4041549-….svg` — banners mobile
- `Banner_site_Cel_2_6_4328add8-….png` — banner mobile (raster)

## 3. Carrosséis e blocos de produto  (`images/`)
- `Carrossel_pagina_dos_produtos_6/7/8.svg` — carrossel da página de produto (vetor)
- `Carrosselpaginadosprodutos.png`, `Carrosselpaginadosprodutos_1_….png`, `Carrosselpaginadosprodutos_2f87….png`
- `ModelosAtualizado.png`, `Fotosdeproduto_6.png`, `Novosprodutossite_6.png`, `Novosprodutossite_7.jpg`

## 4. Lifestyle / feed / rostos  (`images/`)
Fotos de pessoas usando os óculos e feed de Instagram (referência de tom/estilo da marca):
- `rostoparaosite_2…11.png` e `rostoparaosite2(_1…8).png` — modelos/rostos
- `fotosparaosite(_1…9).png` — lifestyle
- `InstaFeed(_1…7).png`, `InstaFeed_b4d3….png`, `rbpipafeed_1.png` — feed social
- `138.png, 139.png, 141.png, 177.png, 178.png, 179.png, 180.png` — imagens avulsas de seção

## 5. Gráficos / institucional  (`images/`)
- `lente_polarizada_5_….svg` — gráfico explicativo "lente polarizada" (14 MB, vetor com raster embutido)
- `Design_sem_nome_9.png` — imagem social / Open Graph (compartilhamento)

## 6. Fotos de produto  (`images/produtos/` — 263 arquivos)
Fotos dos modelos de óculos do catálogo (39 produtos via `products.json`), em resolução máxima.
Nomeadas no padrão Shopify `<n>_<uuid>.png` (ex.: `1_a157d3e6-….png`). Para mapear cada foto
ao produto/título, cruzar com `products.json` do site (campo `images[].src` por produto).

## 7. Ícones de UI  (`icons/` — 14 SVG)
Ícones **funcionais do tema Shopify** (não são identidade da marca). Úteis como referência,
mas o novo site provavelmente terá seu próprio set:
`icon--header-cart`, `icon--header-search`, `icon--header-customer`, `icon--header-email`,
`icon--check`, `icon--close`, `icon--lock`, `icon--chevron-back`, `icon--nav-arrow-left/right`,
`icon--spinner`, `icon--back-to-top-arrow`, `icon--back-to-top-progress`, `icon--star-rating-gradient`.

---

## Notas para o novo site
- **Logo:** só existe em 416px. Recomendo obter/vetorizar o original em alta com a empresa.
- **Banners e carrosséis em SVG** já são vetoriais — bom ponto de partida, mas vários SVGs
  contêm raster embutido (arquivos grandes); avaliar refazer como vetor limpo ou WebP otimizado.
- **Identidade visual:** paleta, tipografia e tom vêm das fotos lifestyle (`rostoparaosite*`,
  `fotosparaosite*`) e dos banners — use-as como referência de direção de arte.
- Os assets são propriedade da Vista Pipa (uso autorizado: redesign do próprio site).
