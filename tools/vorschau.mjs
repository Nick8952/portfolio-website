/**
 * Fotografiert den gebauten Export (out/) wie ein Besucher: Desktop 1440×900 in
 * Scroll-Schritten, Handy 390×844 in Scroll-Schritten, dazu Konsolenfehler und
 * ein Test auf seitlichen Ueberlauf. Fuer die Pruefung nach dem Build.
 *
 *   BASE_PATH= npm run build && node tools/vorschau.mjs <zielordner>
 *
 * Startet selbst einen kleinen Server auf Port 4173 und beendet ihn wieder.
 */
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'C:/Program Files/Google/Chrome/Application/chrome.exe')
const OUT = path.resolve(process.argv[2] ?? 'pruefung')
mkdirSync(OUT, { recursive: true })
const PORT = 4173
const BASE = process.env.BASE ?? `http://localhost:${PORT}/`

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', 'out'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1200))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--disable-gpu'] })
const warten = (ms) => new Promise((r) => setTimeout(r, ms))

async function lauf(name, vp, schritte) {
  const page = await browser.newPage()
  const fehler = []
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && fehler.push(`${m.type()}: ${m.text().slice(0, 160)}`))
  page.on('pageerror', (e) => fehler.push(`pageerror: ${e.message.slice(0, 160)}`))
  page.on('requestfailed', (r) => fehler.push(`requestfailed: ${r.url().slice(-80)}`))
  page.on('response', (r) => r.status() >= 400 && fehler.push(`${r.status()}: ${r.url().slice(-80)}`))
  await page.setViewport(vp)
  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 })
  await warten(1800)
  // Die ausgeblendeten Demo-Karten gehoeren mit zur Pruefung.
  const mehr = await page.$('button[aria-controls="demo-raster"]')
  if (mehr) {
    await mehr.evaluate((b) => b.scrollIntoView({ block: 'center' }))
    await mehr.click()
    await warten(800)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await warten(400)
  }
  const ueberlauf = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  const hoehe = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let i = 0; i < schritte; i++) {
    const y = Math.round((hoehe - vp.height) * (i / (schritte - 1)))
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y)
    await warten(900)
    await page.screenshot({ path: path.join(OUT, `${name}-${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 70 })
  }
  console.log(`${name}: hoehe ${hoehe}px, ueberlauf ${ueberlauf}px, meldungen ${fehler.length}`)
  for (const f of [...new Set(fehler)].slice(0, 12)) console.log('   ', f)
  await page.close()
}

try {
  await lauf('desktop', { width: 1440, height: 900, deviceScaleFactor: 1 }, 14)
  await lauf('mobil', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, 12)
} finally {
  await browser.close()
  server.kill()
}
