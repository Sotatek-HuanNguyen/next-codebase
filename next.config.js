/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');
const nextConfig = {
  reactStrictMode: false,
  i18n,
  // experimental: { appDir: true },
};

module.exports = nextConfig;
