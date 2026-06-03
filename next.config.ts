import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site → export plain HTML/CSS/JS to `out/`.
  // Netlify just serves the files; no Next.js runtime needed.
  output: "export",
  // Static export can't use the default Image Optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
