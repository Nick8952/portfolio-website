/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// Zwei Deploy-Ziele, ein Quellcode
// ---------------------------------------------------------------------------
//
//   • Vercel (Standard)   → voller Betrieb: Server-Rendering, ISR, und die
//                           Route /api/contact verschickt echte Mails.
//                           Hier wird NICHTS gesetzt, der Modus ist der Default.
//
//   • GitHub Pages        → STATIC_EXPORT=true (aus .github/workflows/deploy.yml).
//                           Rein statischer Export unter /portfolio-website/.
//                           GitHub Pages kann keinen Server ausfuehren, deshalb
//                           gibt es dort KEIN /api/contact — das Kontaktformular
//                           schaltet in diesem Build auf einen Mailto-Link um
//                           (siehe components/sections/Contact.tsx).
//
// Explizit gesetzte Variablen (BASE_PATH / SITE_ORIGIN) haben immer Vorrang.

const staticExport = process.env.STATIC_EXPORT === 'true'
const onVercel = Boolean(process.env.VERCEL)

const BASE_PATH = process.env.BASE_PATH ?? (staticExport ? '/portfolio-website' : '')

const SITE_ORIGIN =
  process.env.SITE_ORIGIN ??
  (onVercel && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : onVercel && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : staticExport
        ? 'https://nick8952.github.io'
        : 'http://localhost:3000')

const nextConfig = {
  reactStrictMode: true,

  // Nur im GitHub-Pages-Build. Auf Vercel bleibt der volle dynamische Betrieb.
  ...(staticExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: BASE_PATH || undefined,
        assetPrefix: BASE_PATH || undefined,
      }
    : {}),

  images: {
    // Sanity liefert alle Bilder über sein CDN aus; next/image darf nur von dort laden.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' }],
    formats: ['image/avif', 'image/webp'],
    // An den tatsächlich genutzten Layouts ausgerichtet, damit nicht unnötig
    // viele Varianten erzeugt werden (spart Build-Zeit und Vercel-Kontingent).
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    // Statischer Export hat keinen Bild-Optimierer — dort gehen Bilder unverändert raus.
    ...(staticExport ? { unoptimized: true } : {}),
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || SITE_ORIGIN + BASE_PATH,
    // Das Kontaktformular liest das aus und schaltet auf Mailto um, wenn es
    // keinen Server gibt, den es anrufen koennte.
    NEXT_PUBLIC_STATIC_EXPORT: staticExport ? 'true' : '',
    NEXT_PUBLIC_NOINDEX: process.env.NOINDEX === 'true' ? 'true' : '',
  },

  // styled-components ist Peer-Dependency des Sanity Studios. Ohne den SWC-Transform
  // liefert das Studio im Produktions-Build fehlerhafte Klassennamen.
  compiler: {
    styledComponents: true,
  },

  eslint: {
    dirs: ['app', 'components', 'lib', 'sanity', 'types'],
  },

  // Header werden beim statischen Export nicht angewandt (GitHub Pages setzt
  // eigene). Deshalb nur im Server-Betrieb definieren — sonst warnt jeder Build.
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'X-DNS-Prefetch-Control', value: 'on' },
              ],
            },
          ]
        },
      }),
}

export default nextConfig
