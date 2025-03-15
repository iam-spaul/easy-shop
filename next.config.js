/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return []
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  assetPrefix: '/',
};

module.exports = nextConfig;