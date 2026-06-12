import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "thesvg.org",
      },
    ],
  },
  allowedDevOrigins: [
    "kasha-gutterlike-unprofessionally.ngrok-free.dev",
  ],
  async rewrites() {
    return [
      {
        source: "/:path*.pdf",
        destination: "/api/resume",
      },
    ];
  },
};

export default nextConfig;