/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: { locales: ['fr','nl','en'], defaultLocale: 'fr' },
  experimental: { staleTimes: { dynamic: 3600 } }
};
module.exports = nextConfig;
