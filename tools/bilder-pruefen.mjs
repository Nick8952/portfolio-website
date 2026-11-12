/**
 * Prebuild-Pruefung: fuer jeden Slug in lib/content.ts muessen die fuenf
 * Aufnahmen in public/websites liegen. Sonst stuenden im Hero und in den
 * Karten kaputte Bilder — ein normaler Build merkt das nicht (plain <img>).
 */
import { existsSync, readFileSync } from 'node:fs'

const quelle = readFileSync(new URL('../lib/content.ts', import.meta.url), 'utf8')
const slugs = [...quelle.matchAll(/^\s+slug: '([a-z0-9-]+)',/gm)].map((m) => m[1])
const varianten = ['desktop', 'desktop-lang', 'mobile', 'mobile-lang', 'mobile-klein']
const fehlend = []
for (const slug of new Set(slugs)) {
  for (const v of varianten) {
    const pfad = new URL(`../public/websites/${slug}-${v}.webp`, import.meta.url)
    if (!existsSync(pfad)) fehlend.push(`${slug}-${v}.webp`)
  }
}
if (fehlend.length) {
  console.error(`Fehlende Aufnahmen (${fehlend.length}):\n  ${fehlend.join('\n  ')}\n→ ONLY=<slug> npm run screenshots, oder den Eintrag in lib/content.ts entfernen.`)
  process.exit(1)
}
console.log(`Aufnahmen vollstaendig fuer ${new Set(slugs).size} Websites.`)
