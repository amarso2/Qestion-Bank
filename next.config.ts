import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import { imageHosts } from './image-hosts.config.mjs';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  allowedDevOrigins: ['10.175.247.28'],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  images: {
    remotePatterns: imageHosts as RemotePattern[],
    minimumCacheTTL: 60,
  },
  webpack(config: any, { dev }: { dev: boolean }) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: '@dhiwise/component-tagger/nextLoader',
        },
      ],
    });

    if (dev) {
      const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      config.watchOptions = {
        ignored: ignoredPaths.length
          ? ignoredPaths.map((p) => `**/${p.replace(/^\/+|\/+$/g, '')}/**`)
          : undefined,
      };
    }

    return config;
  },
};

export default nextConfig;