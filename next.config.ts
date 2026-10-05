import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The sandbox preview is served from a proxied *.e2b.app origin.
  allowedDevOrigins: ["*.e2b.app"],
};

export default nextConfig;
