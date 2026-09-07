export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-10-01'
export const readToken = process.env.SANITY_API_READ_TOKEN?.trim() ?? ''

/**
 * Sanity akzeptiert als Projekt-ID nur Kleinbuchstaben, Ziffern und Bindestriche.
 * Wir prüfen das hier mit, damit ein versehentlich falsch kopierter Wert nicht
 * erst tief im Client-Konstruktor als kryptischer Fehler auftaucht.
 */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)

/**
 * Platzhalter-ID für sanity.config.ts. Die Konfiguration muss sich definieren
 * lassen, auch wenn noch kein Projekt existiert — gerendert wird das Studio in
 * dem Fall ohnehin nicht (siehe app/studio/[[...tool]]/page.tsx).
 */
export const studioProjectId = isSanityConfigured ? projectId : 'nicht-konfiguriert'
