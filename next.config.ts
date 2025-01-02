import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eygkig4amp0bnl5v.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
