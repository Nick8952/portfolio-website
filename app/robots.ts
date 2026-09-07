import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
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
