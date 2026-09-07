/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Sanity liefert alle Bilder über sein CDN aus; next/image darf nur von dort laden.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' }],
    formats: ['image/avif', 'image/webp'],
    // An den tatsächlich genutzten Layouts ausgerichtet, damit nicht unnötig
    // viele Varianten erzeugt werden (spart Build-Zeit und Vercel-Kontingent).
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
  },

  // styled-components ist Peer-Dependency des Sanity Studios. Ohne den SWC-Transform
  // liefert das Studio im Produktions-Build fehlerhafte Klassennamen.
  compiler: {
    styledComponents: true,
  },

  eslint: {
    dirs: ['app', 'components', 'lib', 'sanity', 'types'],
  },

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
}

export default nextConfig
