import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // O prédio se chamava Royal quando o site foi publicado. Se esse link
      // chegou a ser compartilhado, continua funcionando.
      { source: "/royal", destination: "/boulevard", permanent: true },
    ];
  },
};

export default nextConfig;
