import { client } from './client'

/**
 * Zentraler Lesezugriff (AE-1 in CLAUDE.md).
 *
 * Die Seite darf aus drei Gründen nicht kaputtgehen: kein Sanity-Projekt
 * konfiguriert, das Dokument noch nicht angelegt, oder die API gerade nicht
 * erreichbar. In allen drei Fällen kommt der übergebene Platzhalter zurück.
 *
 * Der Fehlerfall wird protokolliert statt verschluckt — sonst debuggt man später
 * stundenlang eine Seite, die "einfach die falschen Texte zeigt".
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!client) return fallback

  try {
    const result = await client.fetch<T | null>(query, params, {
      next: { revalidate: 60 },
    })

    if (result === null || result === undefined) return fallback
    if (Array.isArray(result) && result.length === 0) return fallback

    return result
  } catch (error) {
    console.error(`[sanity] Abfrage fehlgeschlagen, nutze Platzhalter.\n${query}\n`, error)
    return fallback
  }
}

/**
 * Führt mehrere Abfragen parallel aus. Einzelne Fehlschläge bleiben lokal —
 * ein fehlendes Testimonial darf nicht den Hero mitreissen.
 */
export async function sanityFetchAll<T extends Record<string, unknown>>(
  entries: { [K in keyof T]: { query: string; fallback: T[K] } },
): Promise<T> {
  const keys = Object.keys(entries) as Array<keyof T>

  const values = await Promise.all(
    keys.map((key) => sanityFetch(entries[key].query, entries[key].fallback)),
  )

  return keys.reduce((acc, key, index) => {
    acc[key] = values[index] as T[keyof T]
    return acc
  }, {} as T)
}
