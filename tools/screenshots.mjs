/**
 * Erzeugt die Vorschaubilder der Websites aus den Live-Adressen.
 *
 *   npm run screenshots
 *
 * Die Bilder sind das Herz der Seite — echte Aufnahmen, keine Mockups. Nach
 * jeder sichtbaren Aenderung an einer Demo den Befehl erneut laufen lassen.
 *
 * Braucht ein lokal installiertes Chrome (Pfad unten) und puppeteer-core aus
 * den devDependencies. Schreibt nach public/websites/<slug>-desktop.jpg und
 * <slug>-mobile.jpg.
 */

import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

import { websites } from './websites-source.mjs'

const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = path.resolve('public/websites')
mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu'],
})

// ONLY=<slug> erneuert nur eine Website.
const nur = process.env.ONLY
for (const site of websites.filter((w) => !nur || w.slug === nur)) {
  for (const [name, vp] of Object.entries({
    desktop: { width: 1440, height: 900, dsf: 1, mobile: false },
    mobile: { width: 390, height: 844, dsf: 2, mobile: true },
  })) {
    const page = await browser.newPage()
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    })

    try {
      await page.goto(site.url, { waitUntil: 'load', timeout: 60000 })
      // 'load' statt networkidle: Seiten mit Canvas-Animation werden sonst nie «idle».
      // Danach Einblend-Animationen und Lazy-Bildern Zeit geben.
      await new Promise((r) => setTimeout(r, 2600))
      await page.screenshot({
        path: path.join(OUT, `${site.slug}-${name}.jpg`),
        type: 'jpeg',
        quality: 84,
      })
      console.log(`ok   ${site.slug} ${name}`)
    } catch (fehler) {
      console.error(`FEHL ${site.slug} ${name}: ${fehler.message}`)
    } finally {
      await page.close()
    }
  }
}

await browser.close()
