import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // The site is fully static. Uncomment the two lines below to emit a plain
  // HTML/CSS/JS bundle into `out/` for GitHub Pages, Netlify, S3, or any static host.
  // output: "export",
  // images: { unoptimized: true },
};

export default nextConfig;
