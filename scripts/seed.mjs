/**
 * Befüllt Sanity aus content/inhalte.json.
 *
 *   npm run seed
 *
 * Warum es das gibt: rund dreissig Dokumente einzeln im Studio anzulegen ist
 * stumpfe Arbeit. Hier wird eine Datei ausgefüllt, der Rest passiert von selbst.
 *
 * Der Befehl ist beliebig oft wiederholbar. Dokumente bekommen feste IDs und
 * werden ersetzt statt neu angelegt — es entstehen also keine Duplikate, egal
 * wie oft er läuft. Bilder werden anhand ihres Inhalts erkannt: dieselbe Datei
 * wird nicht zweimal hochgeladen.
 *
 * ACHTUNG: Der Lauf überschreibt Felder, die im Studio von Hand geändert
 * wurden. Wer im Studio pflegt, braucht dieses Skript nicht mehr.
 */

import { createClient } from '@sanity/client'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const CONTENT_FILE = path.join(ROOT, 'content', 'inhalte.json')
const IMAGE_DIR = path.join(ROOT, 'content', 'bilder')

// ---------------------------------------------------------------------------
// .env.local einlesen. Ein Node-Skript bekommt nicht, was Next automatisch lädt,
// und eine Extra-Abhängigkeit nur für zehn Zeilen Parser lohnt nicht.
// ---------------------------------------------------------------------------
function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const full = path.join(ROOT, file)
    if (!existsSync(full)) continue

    for (const rawLine of readFileSync(full, 'utf8').split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue

      const eq = line.indexOf('=')
      if (eq === -1) continue

      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = value
    }
  }
}

function abbruch(nachricht, hinweis) {
  console.error(`\n  Abbruch: ${nachricht}\n`)
  if (hinweis) console.error(`${hinweis}\n`)
  process.exit(1)
}

loadEnv()

/**
 * Trockenlauf: `npm run seed -- --dry-run`
 * Baut alle Dokumente und meldet, was passieren würde — ohne Sanity-Projekt,
 * ohne Token, ohne Netz. Gut, um content/inhalte.json zu prüfen, bevor
 * irgendetwas geschrieben wird.
 */
const dryRun = process.argv.includes('--dry-run')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN?.trim()

if (!projectId && !dryRun) {
  abbruch(
    'Keine Sanity-Projekt-ID gefunden.',
    `  Lege zuerst das Projekt an:

    npx sanity login
    npx sanity init --env .env.local

  Danach steht NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.`,
  )
}

if (!token && !dryRun) {
  abbruch(
    'Kein Schreib-Token gefunden (SANITY_API_WRITE_TOKEN).',
    `  So kommst du an einen:

    1. sanity.io/manage oeffnen, dein Projekt waehlen
    2. API -> Tokens -> Add API token
    3. Name frei waehlen, Berechtigung "Editor"
    4. In .env.local eintragen:

       SANITY_API_WRITE_TOKEN=sk...

  Das Token hat Schreibrechte - niemals committen und niemals mit
  NEXT_PUBLIC_ praefixen. .env.local steht bereits in .gitignore.`,
  )
}

if (!existsSync(CONTENT_FILE)) {
  abbruch(`content/inhalte.json fehlt.`, '  Die Datei gehoert ins Repo — bitte wiederherstellen.')
}

let inhalte
try {
  inhalte = JSON.parse(readFileSync(CONTENT_FILE, 'utf8'))
} catch (fehler) {
  abbruch(
    `content/inhalte.json ist kein gueltiges JSON.`,
    `  ${fehler.message}\n\n  Haeufigste Ursache: ein Komma zu viel hinter dem letzten Eintrag.`,
  )
}

const client = dryRun
  ? null
  : createClient({
      projectId,
      dataset,
      token,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-10-01',
      useCdn: false,
    })

// ---------------------------------------------------------------------------
// Datei-Uploads
// ---------------------------------------------------------------------------
const uploadCache = new Map()
let uploadCount = 0

function findeDatei(dateiname) {
  const direkt = path.join(IMAGE_DIR, dateiname)
  if (existsSync(direkt)) return direkt

  // Gross-/Kleinschreibung verzeihen — unter Windows getippt, unter Linux gebaut.
  if (!existsSync(IMAGE_DIR)) return null
  const treffer = readdirSync(IMAGE_DIR).find(
    (eintrag) => eintrag.toLowerCase() === dateiname.toLowerCase(),
  )
  return treffer ? path.join(IMAGE_DIR, treffer) : null
}

/**
 * Lädt eine Datei hoch und gibt die Asset-Referenz zurück.
 * `null`, wenn kein Dateiname gesetzt ist — dann bleibt das Feld im CMS leer
 * und die Website nutzt an dieser Stelle ihren Platzhalter.
 */
async function ladeDatei(dateiname, typ = 'image') {
  if (!dateiname || !dateiname.trim()) return null

  const cacheKey = `${typ}:${dateiname}`
  if (uploadCache.has(cacheKey)) return uploadCache.get(cacheKey)

  const vollerPfad = findeDatei(dateiname)
  if (!vollerPfad) {
    console.warn(
      `  ! Datei nicht gefunden: content/bilder/${dateiname} — Feld bleibt leer, Website zeigt dort den Platzhalter.`,
    )
    uploadCache.set(cacheKey, null)
    return null
  }

  const daten = readFileSync(vollerPfad)
  const pruefsumme = createHash('sha1').update(daten).digest('hex')

  if (dryRun) {
    const platzhalterId = `${typ}-${pruefsumme}-dry`
    uploadCache.set(cacheKey, platzhalterId)
    console.log(`  ~ ${dateiname} wuerde hochgeladen (${(daten.length / 1024).toFixed(0)} kB)`)
    return platzhalterId
  }

  // Schon einmal hochgeladen? Sanity indiziert Assets nach sha1, damit wird
  // ein wiederholter Lauf nicht zur Bildermüllhalde.
  const vorhanden = await client.fetch(
    `*[_type == $typ && sha1hash == $hash][0]._id`,
    { typ: typ === 'image' ? 'sanity.imageAsset' : 'sanity.fileAsset', hash: pruefsumme },
  )

  if (vorhanden) {
    uploadCache.set(cacheKey, vorhanden)
    console.log(`  = ${dateiname} (bereits vorhanden)`)
    return vorhanden
  }

  const asset = await client.assets.upload(typ, daten, {
    filename: path.basename(vollerPfad),
  })

  uploadCount += 1
  uploadCache.set(cacheKey, asset._id)
  console.log(`  + ${dateiname} hochgeladen`)
  return asset._id
}

/** Baut ein Sanity-Bildfeld aus { datei, alt }. */
async function bildFeld(quelle) {
  if (!quelle?.datei) return undefined

  const assetId = await ladeDatei(quelle.datei, 'image')
  if (!assetId) return undefined

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt: quelle.alt || '',
  }
}

/** Setzt den _type auf ein optionales Objekt, ohne bei undefined zu stolpern. */
function withType(objekt, typ) {
  return objekt ? { _type: typ, ...objekt } : undefined
}

/** Entfernt leere Felder, damit im Studio keine leeren Strings stehen. */
function ohneLeere(objekt) {
  const ergebnis = {}
  for (const [schluessel, wert] of Object.entries(objekt)) {
    if (wert === undefined || wert === null) continue
    if (typeof wert === 'string' && wert.trim() === '') continue
    if (Array.isArray(wert) && wert.length === 0) continue
    ergebnis[schluessel] = wert
  }
  return ergebnis
}

/**
 * Array-Einträge in Sanity brauchen einen stabilen _key. Der _type macht
 * zusätzlich eindeutig, welchen Editor das Studio für den Eintrag öffnet.
 */
function mitKeys(liste, praefix, typ) {
  return (liste ?? []).map((eintrag, index) => ({
    _type: typ,
    ...eintrag,
    _key: `${praefix}-${index}`,
  }))
}

function kopf(typ, abschnitt, zusatz = {}) {
  return ohneLeere({
    _type: typ,
    label: abschnitt?.label,
    headingLead: abschnitt?.headingLead,
    headingTrail: abschnitt?.headingTrail,
    intro: abschnitt?.intro,
    ...zusatz,
  })
}

// ---------------------------------------------------------------------------
// Dokumente bauen
// ---------------------------------------------------------------------------
async function baueDokumente() {
  const dokumente = []
  const s = inhalte.siteSettings ?? {}

  const cvAsset = await ladeDatei(s.cvDatei, 'file')

  dokumente.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...ohneLeere({
      name: s.name,
      role: s.role,
      location: s.location,
      email: s.email,
      phone: s.phone,
      shortBio: s.shortBio,
      navLinks: mitKeys(s.navLinks, 'nav', 'navLink'),
      headerCta: withType(s.headerCta, 'cta'),
      socials: mitKeys(s.socials, 'social', 'socialLink'),
      cvFile: cvAsset
        ? { _type: 'file', asset: { _type: 'reference', _ref: cvAsset } }
        : undefined,
      seoTitle: s.seoTitle,
      seoDescription: s.seoDescription,
      ogImage: await bildFeld(s.ogImage),
    }),
  })

  const h = inhalte.hero ?? {}
  dokumente.push({
    _id: 'hero',
    _type: 'hero',
    ...ohneLeere({
      eyebrow: h.eyebrow,
      displayLead: h.displayLead,
      displayMain: h.displayMain,
      intro: h.intro,
      portrait: await bildFeld(h.portrait),
      primaryCta: withType(h.primaryCta, 'cta'),
      secondaryCta: withType(h.secondaryCta, 'cta'),
    }),
  })

  dokumente.push({ _id: 'about', _type: 'about', ...ohneLeere(inhalte.about ?? {}) })

  const c = inhalte.sectionCopy ?? {}
  dokumente.push({
    _id: 'sectionCopy',
    _type: 'sectionCopy',
    ...ohneLeere({
      stats: kopf('statsHeading', c.stats, { image: await bildFeld(c.stats?.image) }),
      tools: kopf('sectionHeading', c.tools),
      services: kopf('servicesHeading', c.services, { cta: withType(c.services?.cta, 'cta') }),
      experience: kopf('sectionHeading', c.experience),
      projects: kopf('sectionHeading', c.projects),
      testimonials: kopf('sectionHeading', c.testimonials),
      contact: kopf('contactHeading', c.contact, {
        interests: c.contact?.interests,
        formNote: c.contact?.formNote,
      }),
      marqueeWords: c.marqueeWords,
    }),
  })

  ;(inhalte.stats ?? []).forEach((eintrag, index) => {
    dokumente.push({
      _id: `stat-${index + 1}`,
      _type: 'stat',
      order: index,
      ...ohneLeere({
        value: eintrag.value,
        title: eintrag.title,
        description: eintrag.description,
      }),
    })
  })

  for (const [index, eintrag] of (inhalte.tools ?? []).entries()) {
    dokumente.push({
      _id: `tool-${index + 1}`,
      _type: 'tool',
      order: index,
      ...ohneLeere({
        name: eintrag.name,
        category: eintrag.category,
        icon: await bildFeld(eintrag.icon),
      }),
    })
  }

  ;(inhalte.services ?? []).forEach((eintrag, index) => {
    dokumente.push({
      _id: `service-${index + 1}`,
      _type: 'service',
      order: index,
      ...ohneLeere({
        iconKey: eintrag.iconKey || 'code',
        title: eintrag.title,
        description: eintrag.description,
        href: eintrag.href,
      }),
    })
  })

  ;(inhalte.experiences ?? []).forEach((eintrag, index) => {
    dokumente.push({
      _id: `experience-${index + 1}`,
      _type: 'experience',
      order: index,
      ...ohneLeere({
        role: eintrag.role,
        company: eintrag.company,
        from: eintrag.from,
        to: eintrag.to,
        description: eintrag.description,
      }),
    })
  })

  for (const [index, eintrag] of (inhalte.projects ?? []).entries()) {
    dokumente.push({
      _id: `project-${index + 1}`,
      _type: 'project',
      order: index,
      ...ohneLeere({
        title: eintrag.title,
        category: eintrag.category,
        url: eintrag.url,
        caseStudyUrl: eintrag.caseStudyUrl,
        image: await bildFeld(eintrag.image),
      }),
    })
  }

  for (const [index, eintrag] of (inhalte.testimonials ?? []).entries()) {
    dokumente.push({
      _id: `testimonial-${index + 1}`,
      _type: 'testimonial',
      order: index,
      featured: Boolean(eintrag.featured),
      ...ohneLeere({
        quote: eintrag.quote,
        author: eintrag.author,
        role: eintrag.role,
        photo: await bildFeld(eintrag.photo),
      }),
    })
  }

  return dokumente
}

// ---------------------------------------------------------------------------
// Lauf
// ---------------------------------------------------------------------------
console.log(dryRun ? `\n  Trockenlauf — es wird nichts geschrieben` : `\n  Sanity befuellen`)
console.log(`  Projekt ${projectId ?? '(nicht gesetzt)'} · Dataset ${dataset}\n`)

const dokumente = await baueDokumente()

if (!dryRun) {
  // Alles in einer Transaktion: entweder es landet vollstaendig, oder gar nichts.
  // Ein halb befuelltes CMS waere schlimmer als ein leeres.
  const transaktion = client.transaction()
  for (const dokument of dokumente) transaktion.createOrReplace(dokument)

  try {
    await transaktion.commit()
  } catch (fehler) {
    abbruch(
      `Schreiben fehlgeschlagen: ${fehler.message}`,
      `  Haeufigste Ursachen:
    - Das Token hat nur Leserechte (es braucht "Editor")
    - Falsches Dataset in .env.local
    - Ein Pflichtfeld ist in content/inhalte.json leer geblieben`,
    )
  }
}

const nachTyp = dokumente.reduce((zaehler, dokument) => {
  zaehler[dokument._type] = (zaehler[dokument._type] ?? 0) + 1
  return zaehler
}, {})

console.log(
  dryRun
    ? `\n  Trockenlauf fertig. ${dokumente.length} Dokumente wuerden geschrieben:`
    : `\n  Fertig. ${dokumente.length} Dokumente geschrieben:`,
)
for (const [typ, anzahl] of Object.entries(nachTyp)) {
  console.log(`    ${String(anzahl).padStart(3)} x ${typ}`)
}
if (uploadCount > 0) console.log(`    ${String(uploadCount).padStart(3)} Datei-Uploads`)

// Nur echte Platzhalter der Form [WORT] erkennen. Ein naives [^\]]* würde auch
// die öffnenden Klammern der JSON-Arrays einsammeln und Unsinn melden.
const nochPlatzhalter = JSON.stringify(inhalte).match(/\[[A-Za-zÄÖÜäöüß0-9 .@_-]{2,30}\]/g)
if (nochPlatzhalter?.length) {
  const einmalig = [...new Set(nochPlatzhalter)]
  console.log(`\n  Hinweis: ${einmalig.length} Platzhalter stehen noch in content/inhalte.json:`)
  console.log(`    ${einmalig.slice(0, 8).join('   ')}${einmalig.length > 8 ? '   …' : ''}`)
  console.log(`  Ausfuellen und 'npm run seed' erneut laufen lassen.`)
}

if (dryRun) {
  // Zum Nachsehen, was tatsächlich geschrieben würde.
  const vorschau = path.join(ROOT, 'content', '.seed-vorschau.json')
  writeFileSync(vorschau, JSON.stringify(dokumente, null, 2), 'utf8')
  console.log(`\n  Vorschau der Dokumente: content/.seed-vorschau.json`)
}

console.log(`\n  Studio: http://localhost:3000/studio\n`)
