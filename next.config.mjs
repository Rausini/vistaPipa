/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Assets are pre-optimized into /public/assets by scripts/optimize-assets.mjs
    // so we skip Next's runtime optimizer and serve the generated WebP/AVIF directly.
    unoptimized: true,
  },
};

export default nextConfig;
