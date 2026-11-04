import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['192.168.1.17', '192.168.1.9', '192.168.1.10'],
    // Fotos remotas de bancos de imagens de uso livre, sem necessidade de crédito (Unsplash e Pexels)
    images: {
        // Qualidades permitidas: 75 é o padrão; 60 nas fotos de aquário, muito detalhadas e pesadas
        qualities: [60, 75],
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'images.pexels.com' },
        ],
    },
    experimental: {
        agentUpgrade: 'security',
    },
};

export default nextConfig;
