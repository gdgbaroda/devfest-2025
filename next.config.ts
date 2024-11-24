import type { NextConfig } from "next";
import {setupDevPlatform} from '@cloudflare/next-on-pages/next-dev';

const nextConfig: NextConfig = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        formats: ['image/webp'],
    },
};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}
export default nextConfig;
