
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config: { resolve: { alias: { canvas: boolean; encoding: boolean; }; }; }) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
}

module.exports = nextConfig


