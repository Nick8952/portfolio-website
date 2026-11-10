/** @type {import('next').NextConfig} */

// Statischer Export. Zwei Betriebsorte aus demselben Code:
//   Vercel (primaer):   https://nick-hbr.vercel.app/          Basispfad ""
//   GitHub Pages:       https://nick8952.github.io/portfolio-website/
// Vercel setzt VERCEL=1 und VERCEL_PROJECT_PRODUCTION_URL im Build; dann faellt
// der Basispfad weg und die absoluten Adressen zeigen auf die Vercel-Domain.
// Explizit gesetzte Variablen (BASE_PATH, SITE_ORIGIN) haben immer Vorrang —
// so laesst sich spaeter eine eigene Domain eintragen, ohne Code anzufassen.

const aufVercel = Boolean(process.env.VERCEL)
const BASE_PATH = process.env.BASE_PATH ?? (aufVercel ? '' : '/portfolio-website')
const SITE_ORIGIN =
  process.env.SITE_ORIGIN ??
  (aufVercel
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'nick-hbr.vercel.app'}`
    : 'https://nick8952.github.io')

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
