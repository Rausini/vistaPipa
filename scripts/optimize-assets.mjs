// Pipeline de otimização de assets da Vista Pipa.
// Lê os originais de ./assets e escreve derivados otimizados em ./public/assets.
//   - Imagens (PNG/SVG) -> WebP (+ AVIF p/ fotos) com redimensionamento.
//   - SVGs pesados c/ raster embutido -> rasterizados p/ WebP.
//   - Vídeo do hero -> MP4 (H.264) + WebM (VP9) comprimidos + poster WebP.
// Uso: npm run optimize
import { promises as fs } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileP = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "assets");
const OUT = path.join(ROOT, "public", "assets");

sharp.cache(false);
sharp.concurrency(2);

const IMAGES = path.join(SRC, "images");

// --- Lista de conversões de imagem (src relativo a ./assets, out relativo a ./public/assets) ---
const imageJobs = [
  // Grade de coleções
  { src: "images/rostoparaosite2_3.png", out: "images/colecao-solar", width: 900, avif: true },
  { src: "images/Novosprodutossite_6.png", out: "images/colecao-performance", width: 900, avif: true },
  { src: "images/fotosparaosite_4.png", out: "images/colecao-grau", width: 900, avif: true },
  { src: "images/ModelosAtualizado.png", out: "images/colecao-novidades", width: 900, avif: true },
  // Manifesto (fundo)
  { src: "images/fotosparaosite_7.png", out: "images/manifesto-bg", width: 1600, avif: true },
  // Banner editorial (SVG c/ raster -> rasteriza)
  { src: "images/Banner_site_pc_1_13f1e3cc-a49c-469d-8b88-70646509f940.svg", out: "images/banner-editorial-desktop", width: 2000, density: 200 },
  { src: "images/BANNER_SITE_MOBILE_10.svg", out: "images/banner-editorial-mobile", width: 900, density: 200 },
  // Tecnologia da lente (SVG pesado ~14MB -> rasteriza)
  { src: "images/lente_polarizada_5_7406c75e-6905-41f3-8af0-ede0f53cb239.svg", out: "images/lente-polarizada", width: 1200, density: 150 },
  // Open Graph
  { src: "images/Design_sem_nome_9.png", out: "images/og-image", width: 1200, height: 630, fit: "cover" },
];

// Feed do Instagram (quadrados)
for (const f of ["InstaFeed", "InstaFeed_1", "InstaFeed_2", "InstaFeed_4", "InstaFeed_5", "InstaFeed_6", "InstaFeed_7", "rbpipafeed_1"]) {
  imageJobs.push({ src: `images/${f}.png`, out: `images/feed/${f}`, width: 600, height: 600, fit: "cover", avif: true });
}

const PRODUCT_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

async function ensureDir(file) {
  await fs.mkdir(path.dirname(file), { recursive: true });
}

// Carrega a imagem de origem. SVGs da Shopify frequentemente são apenas um
// invólucro com um raster base64 embutido — grande demais p/ o parser de XML do
// libvips. Nesse caso extraímos o maior blob base64 e o decodificamos direto.
async function loadInput(srcPath, job) {
  if (srcPath.toLowerCase().endsWith(".svg")) {
    const raw = await fs.readFile(srcPath, "utf8");
    const matches = [...raw.matchAll(/data:image\/(?:png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)/g)];
    if (matches.length) {
      let best = matches[0][1];
      for (const m of matches) if (m[1].length > best.length) best = m[1];
      return sharp(Buffer.from(best, "base64"), { limitInputPixels: false });
    }
    return sharp(srcPath, { density: job.density ?? 150, limitInputPixels: false });
  }
  return job.density
    ? sharp(srcPath, { density: job.density, limitInputPixels: false })
    : sharp(srcPath, { limitInputPixels: false });
}

async function convertImage(job) {
  const srcPath = path.join(SRC, job.src);
  if (!existsSync(srcPath)) {
    console.warn(`  ⚠ origem ausente: ${job.src}`);
    return;
  }
  const outBase = path.join(OUT, job.out);
  await ensureDir(outBase);

  const load = await loadInput(srcPath, job);

  const resized = load.resize({
    width: job.width,
    height: job.height,
    fit: job.fit ?? (job.height ? "cover" : "inside"),
    withoutEnlargement: true,
  });

  await resized.clone().webp({ quality: 78 }).toFile(`${outBase}.webp`);
  if (job.avif) {
    await resized.clone().avif({ quality: 52 }).toFile(`${outBase}.avif`);
  }
  console.log(`  ✓ ${job.out}.webp${job.avif ? " (+avif)" : ""}`);
}

async function convertProducts() {
  const dir = path.join(IMAGES, "produtos");
  const all = (await fs.readdir(dir)).filter((f) => f.endsWith(".png"));
  await fs.mkdir(path.join(OUT, "images", "produtos"), { recursive: true });

  for (const id of PRODUCT_IDS) {
    const photos = all
      .filter((f) => f.startsWith(`${id}_`))
      .sort();
    if (photos.length === 0) {
      console.warn(`  ⚠ produto ${id}: sem fotos`);
      continue;
    }
    const targets = [
      { file: photos[0], suffix: "" },
      ...(photos[1] ? [{ file: photos[1], suffix: "-alt" }] : []),
    ];
    for (const t of targets) {
      const base = path.join(OUT, "images", "produtos", `product-${id}${t.suffix}`);
      const img = sharp(path.join(dir, t.file)).resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true,
      });
      await img.clone().webp({ quality: 80 }).toFile(`${base}.webp`);
      await img.clone().avif({ quality: 55 }).toFile(`${base}.avif`);
    }
    console.log(`  ✓ produto ${id} (${targets.length} foto(s))`);
  }
}

async function copyStatic() {
  const copies = [
    ["logo/logo_svg.svg", "logo/logo_svg.svg"],
    ["logo/favicon.webp", "logo/favicon.webp"],
    // Lockups horizontais (ícone + wordmark) usados no header e no rodapé.
    ["logo/pipa-lockup-horizontal-white.svg", "logo/pipa-lockup-horizontal-white.svg"],
    ["logo/pipa-lockup-horizontal-dark.svg", "logo/pipa-lockup-horizontal-dark.svg"],
  ];
  for (const [from, to] of copies) {
    const fromPath = path.join(SRC, from);
    const toPath = path.join(OUT, to);
    if (!existsSync(fromPath)) {
      console.warn(`  ⚠ origem ausente: ${from}`);
      continue;
    }
    await ensureDir(toPath);
    await fs.copyFile(fromPath, toPath);
    console.log(`  ✓ ${to}`);
  }
}

async function hasFfmpeg() {
  try {
    await execFileP("ffmpeg", ["-version"]);
    return true;
  } catch {
    return false;
  }
}

async function convertVideo() {
  const src = path.join(SRC, "videos", "hero_background_v1.mp4");
  if (!existsSync(src)) {
    console.warn("  ⚠ vídeo do hero ausente");
    return;
  }
  if (!(await hasFfmpeg())) {
    console.warn("  ⚠ ffmpeg não encontrado no PATH — pulando vídeo");
    return;
  }
  const outDir = path.join(OUT, "videos");
  await fs.mkdir(outDir, { recursive: true });
  const scale = "scale='min(1920,iw)':-2";

  // MP4 H.264
  await execFileP("ffmpeg", [
    "-y", "-i", src,
    "-vf", scale,
    "-an",
    "-c:v", "libx264", "-profile:v", "high", "-crf", "28", "-preset", "slow",
    "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    path.join(outDir, "hero_background_v1.mp4"),
  ]);
  console.log("  ✓ videos/hero_background_v1.mp4 (H.264)");

  // WebM VP9
  await execFileP("ffmpeg", [
    "-y", "-i", src,
    "-vf", scale,
    "-an",
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1",
    path.join(outDir, "hero_background_v1.webm"),
  ]);
  console.log("  ✓ videos/hero_background_v1.webm (VP9)");

  // Poster (frame ~1s) -> WebP
  const posterPng = path.join(outDir, "_poster.png");
  await execFileP("ffmpeg", [
    "-y", "-ss", "00:00:01", "-i", src,
    "-frames:v", "1", "-vf", scale,
    posterPng,
  ]);
  await sharp(posterPng).webp({ quality: 72 }).toFile(path.join(OUT, "images", "hero-poster.webp"));
  await fs.rm(posterPng, { force: true });
  console.log("  ✓ images/hero-poster.webp");
}

async function main() {
  console.log("→ Limpando saída anterior…");
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  console.log("→ Copiando estáticos (logo/favicon)…");
  await copyStatic();

  console.log("→ Convertendo imagens das seções…");
  for (const job of imageJobs) {
    await convertImage(job);
  }

  console.log("→ Convertendo fotos de produto…");
  await convertProducts();

  console.log("→ Processando vídeo do hero…");
  await convertVideo();

  console.log("✓ Otimização concluída.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
