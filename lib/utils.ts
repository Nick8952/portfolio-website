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

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}
