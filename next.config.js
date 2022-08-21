const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');
module.exports = withBundleAnalyzer({
  i18n,
  reactStrictMode: false,
  experimental: {
    swcPlugins: [
      'next-superjson-plugin', {
        excluded: [],
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
