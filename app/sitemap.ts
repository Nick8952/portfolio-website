export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/utils'

// Ohne lastModified: ein Datum, das sich bei jedem Build aendert, ist kein Signal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl()}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl()}/datenschutz/`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
