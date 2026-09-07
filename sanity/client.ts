import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

/**
 * Null, solange kein Sanity-Projekt konfiguriert ist. Alle Aufrufer gehen über
 * sanityFetch() und bekommen dort automatisch die Platzhalterinhalte.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Das CDN liefert schneller und günstiger aus. Aktualität sichert die
      // 60-Sekunden-Revalidierung der Seiten, nicht der Client.
      useCdn: true,
      perspective: 'published',
    })
  : null
