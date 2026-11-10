export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Schweizer Zahlenformat: Apostroph als Tausendertrenner, kein Rappen bei Rundbetraegen. */
export function chf(betrag: number): string {
  return betrag.toLocaleString('de-CH', { maximumFractionDigits: 0 })
}

/** Basispfad fuer statische Dateien unter public/ — auf GitHub Pages ein Unterordner. */
export function asset(pfad: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${pfad}`
}

/** Die Adresse, unter der dieser Build laeuft (Vercel oder GitHub-Pages-Spiegel). */
export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

/** Die eine Adresse, die Suchmaschinen kennen sollen — auch der Spiegel zeigt dorthin. */
export function kanonischeUrl(): string {
  return process.env.NEXT_PUBLIC_KANONISCH ?? siteUrl()
}

/** Ob dieser Build der GitHub-Pages-Spiegel ist: dann noindex, Canonical auf Vercel. */
export function istSpiegel(): boolean {
  return process.env.NEXT_PUBLIC_SPIEGEL === '1'
}
