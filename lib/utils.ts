/**
 * Klassen zusammensetzen. Bewusst ohne clsx/tailwind-merge: die Komponenten hier
 * verketten nur Strings und bedingte Werte, ein Merge-Algorithmus für
 * kollidierende Tailwind-Utilities wird nirgends gebraucht.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Basis-URL der Seite. Auf Vercel steht VERCEL_URL ohne Protokoll bereit; lokal
 * fällt alles auf localhost zurück. Wird für Canonicals, Sitemap und OG gebraucht.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`

  return 'http://localhost:3000'
}

/** "01", "02", … für die nummerierte Werdegang-Timeline. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, '0')
}

/**
 * Zerlegt einen Satz in einzelne Wörter. Die ReadingHeadline färbt Wort für Wort
 * ein und braucht sie deshalb getrennt.
 */
export function splitWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean)
}
