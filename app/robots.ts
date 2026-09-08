export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/utils'

/**
 * Solange die Seite mit Platzhaltern laeuft, soll sie nicht in den Suchindex.
 * Der GitHub-Pages-Workflow setzt dafuer NOINDEX=true; auf Vercel bleibt die
 * Variable leer und die Seite ist normal auffindbar.
 */
const nichtIndexieren = process.env.NOINDEX === 'true'

export default function robots(): MetadataRoute.Robots {
  if (nichtIndexieren) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Das Studio ist die Redaktionsoberfläche und gehört nicht in den Index.
      disallow: ['/studio', '/studio/', '/api/'],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
