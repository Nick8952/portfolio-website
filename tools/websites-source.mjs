/**
 * Welche Demo hinter welchem Beispiel steht — die Zuordnung ist PRIVAT.
 *
 * Die echte Liste liegt in tools/privat/websites-quellen.mjs (gitignoriert;
 * Sicherung im Brain unter 03_Knowledge/portfolio-muster/). Im oeffentlichen
 * Repo wuerde sie die Anonymisierung aufheben: aus «kanzlei» plus einer URL
 * mit Firmennamen liesse sich der Betrieb sofort ablesen (Codex-Review 12.11.2026).
 *
 * Form eines Eintrags: { slug, url, anonym } — slug muss zu lib/content.ts passen,
 * url ist die aufgenommene Adresse, anonym: true laesst tools/anonymisieren.mjs
 * mit dem Regelwerk aus tools/muster.mjs laufen (ohne Regelwerk keine Aufnahme).
 * Vorlage: tools/websites-quellen.beispiel.mjs
 */
let websites = []
try {
  ;({ websites } = await import('./privat/websites-quellen.mjs'))
} catch {
  console.error('tools/privat/websites-quellen.mjs fehlt — die Zuordnung Beispiel → Demo ist privat (Sicherung im Brain). Nichts aufzunehmen.')
}
export { websites }
