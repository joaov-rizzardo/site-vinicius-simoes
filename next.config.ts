import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['192.168.1.17'],
    // Fotos remotas de bancos de imagens de uso livre, sem necessidade de crédito (Unsplash e Pexels)
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'images.pexels.com' },
        ],
    },
};

export default nextConfig;
