/** @type {import('next').NextConfig} */

// Statischer Export fuer GitHub Pages. Betrieb unter
//   https://nick8952.github.io/portfolio-website/
// Beim Umzug auf eine eigene Domain: public/CNAME anlegen, Custom Domain in
// Settings -> Pages setzen, dann BASE_PATH="" und SITE_ORIGIN=https://… im
// Workflow eintragen. Explizit gesetzte Variablen haben Vorrang.

const BASE_PATH = process.env.BASE_PATH ?? '/portfolio-website'
const SITE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://nick8952.github.io'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  reactStrictMode: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN + BASE_PATH,
  },
}

export default nextConfig
