/**
 * Erzeugt die Vorschaubilder der Websites aus den Live-Adressen.
 *
 *   npm run screenshots            alle Websites
 *   ONLY=<slug> npm run screenshots   nur eine
 *
 * Die Bilder sind das Herz der Seite — echte Aufnahmen, keine Mockups. Nach
 * jeder sichtbaren Aenderung an einer Demo den Befehl erneut laufen lassen.
 *
 * Je Website vier Dateien unter public/websites/, alle WebP:
 *   <slug>-desktop.webp        1440×900, erster Bildschirm
 *   <slug>-desktop-lang.webp   1440 breit, ganze Seite bis 3600 px — scrollt
 *                              in den Referenz- und Demo-Karten beim Scrollen
 *   <slug>-mobile.webp         390×844 @2x, erster Bildschirm (iPhone-Mockup)
 *   <slug>-mobile-lang.webp    390 breit @2x, ganze Seite bis 2600 px
 *   <slug>-mobile-klein.webp   390×844 @1x, klein (~40 KB) — fuer die Schaufenster-Wand im Hero
 *
 * Braucht ein lokal installiertes Chrome und puppeteer-core aus den
 * devDependencies. Chrome-Pfad per CHROME_PATH, sonst der uebliche Ort des
 * jeweiligen Systems (Projekt laeuft auf Windows und macOS).
 */

import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

import { anonymisieren } from './anonymisieren.mjs'
import { muster } from './muster.mjs'
import { websites } from './websites-source.mjs'

const CHROME =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'C:/Program Files/Google/Chrome/Application/chrome.exe')
const OUT = path.resolve('public/websites')
mkdirSync(OUT, { recursive: true })
// JPEG-Kopien fuer die Sichtpruefung (gitignoriert): zeigen, was nach der
// Anonymisierung wirklich im Bild steht.
const PRUEF = path.resolve('pruefung/anonym')
mkdirSync(PRUEF, { recursive: true })

const ANSICHTEN = {
  desktop: { width: 1440, height: 900, dsf: 1, mobile: false, maxLang: 3600 },
  mobile: { width: 390, height: 844, dsf: 2, mobile: true, maxLang: 2600 },
}

const warten = (ms) => new Promise((r) => setTimeout(r, ms))

let browser = await starten()
async function starten() {
  return puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run'],
  })
}

/** Scrollt einmal durch die Seite, damit Lazy-Bilder und Einblendungen ausgeloest sind. */
async function durchscrollen(page, schritt) {
  const hoehe = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < hoehe; y += schritt) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y)
    await warten(140)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await warten(600)
}

/**
 * Scroll-Enthuellungen, die beim Durchscrollen nicht ausgeloest haben (opacity 0
 * per IntersectionObserver oder whileInView), sichtbar schalten — sonst bleiben
 * ganze Abschnitte im langen Bild leer. Fixierte Elemente und aria-hidden bleiben.
 */
async function enthuellen(page) {
  await page.evaluate(() => {
    document.querySelectorAll('main *, body > section *, article *').forEach((el) => {
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed' || el.getAttribute('aria-hidden') === 'true') return
      if (cs.opacity !== '0') return
      const r = el.getBoundingClientRect()
      if (r.height < 40 || r.width < 40) return
      el.style.setProperty('opacity', '1', 'important')
      el.style.setProperty('transform', 'none', 'important')
      el.style.setProperty('visibility', 'visible', 'important')
    })
  })
}

async function aufnehmen(site, name, vp, versuch = 1) {
  const page = await browser.newPage()
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  })
  // Reduzierte Bewegung: Scroll-Enthuellungen stehen dann sofort, statt dass
  // halbe Abschnitte im langen Bild leer bleiben.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])

  // Beispiele werden zum Musterbetrieb: Regelwerk aus tools/muster.mjs. Fehlt es,
  // wird NICHT aufgenommen — lieber kein Bild als ein erkennbarer Betrieb.
  const regel = site.anonym ? muster[site.slug] : null
  if (site.anonym && !regel) {
    console.error(`FEHL ${site.slug} ${name}: anonym, aber kein Regelwerk in tools/muster.mjs`)
    process.exitCode = 1
    await page.close().catch(() => {})
    return
  }
  const maskieren = async () => {
    if (!regel) return
    await anonymisieren(page, regel)
    await warten(350)
  }

  try {
    // 'load' statt networkidle: Seiten mit Canvas-Animation werden sonst nie «idle».
    await page.goto(site.url, { waitUntil: 'load', timeout: 60000 })
    await warten(2600)
    await maskieren()

    // Erster Bildschirm — unveraendert zum frueheren Verhalten.
    await page.screenshot({
      path: path.join(OUT, `${site.slug}-${name}.webp`),
      type: 'webp',
      quality: 82,
    })
    await page.screenshot({ path: path.join(PRUEF, `${site.slug}-${name}.jpg`), type: 'jpeg', quality: 70 })

    // Ganze Seite, gedeckelt. Fixierte Leisten werden oben einmal eingebrannt — das
    // ist in den Karten der Kopf der Website und soll so sein.
    await durchscrollen(page, Math.round(vp.height * 0.8))
    await enthuellen(page)
    // Lazy nachgeladene Bilder und gewechselte Texte: noch einmal maskieren.
    await maskieren()
    const hoehe = await page.evaluate(() => document.documentElement.scrollHeight)
    const lang = Math.min(hoehe, vp.maxLang)
    await page.screenshot({
      path: path.join(OUT, `${site.slug}-${name}-lang.webp`),
      type: 'webp',
      quality: 76,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: vp.width, height: lang },
    })
    await page.screenshot({
      path: path.join(PRUEF, `${site.slug}-${name}-lang.jpg`),
      type: 'jpeg',
      quality: 60,
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: vp.width, height: lang },
    })
    if (name === 'mobile') {
      // Dieselbe Ansicht in 1x fuer die Hero-Wand: dort laufen elf Bilder gleichzeitig.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
      await warten(500)
      await maskieren()
      await page.screenshot({
        path: path.join(OUT, `${site.slug}-mobile-klein.webp`),
        type: 'webp',
        quality: 70,
      })
    }
    console.log(`ok   ${site.slug} ${name} (${hoehe}px → ${lang}px)`)
  } catch (fehler) {
    // Chrome bricht unter hoher Systemlast gern mit «frame was detached» ab —
    // einmal Browser neu starten und wiederholen, dann aufgeben.
    if (versuch < 2) {
      console.warn(`neu  ${site.slug} ${name}: ${fehler.message}`)
      await page.close().catch(() => {})
      await browser.close().catch(() => {})
      browser = await starten()
      return aufnehmen(site, name, vp, versuch + 1)
    }
    console.error(`FEHL ${site.slug} ${name}: ${fehler.message}`)
    process.exitCode = 1 // alte Bilder bleiben liegen — der Aufrufer soll das sehen
  } finally {
    await page.close().catch(() => {})
  }
}

// ONLY=<slug> oder ONLY=<slug1>,<slug2> beschraenkt den Lauf.
const nur = process.env.ONLY ? process.env.ONLY.split(',').map((s) => s.trim()) : null
for (const site of websites.filter((w) => !nur || nur.includes(w.slug))) {
  for (const [name, vp] of Object.entries(ANSICHTEN)) {
    await aufnehmen(site, name, vp)
  }
}

await browser.close()
