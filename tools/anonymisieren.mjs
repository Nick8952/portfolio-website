/**
 * Macht eine geladene Demo-Seite zum Musterbetrieb — VOR dem Screenshot, im
 * Browser (puppeteer page.evaluate). Nichts davon beruehrt die Demo selbst.
 *
 * Reihenfolge je Regelwerk (tools/muster.mjs):
 *   1. Hinweisbanner entfernen (sie nennen den Betrieb)
 *   2. Logos durch eine schlichte Wortmarke mit dem Musternamen ersetzen
 *   3. Rasterbilder, Hintergrundfotos, Videos und iframes durch neutrale
 *      Flaechen in der Durchschnittsfarbe des Bildes ersetzen (Fotos gehoeren
 *      dem Betrieb; Weichzeichnen allein vervielfaeltigt sie weiterhin) —
 *      eigene Grafiken (eigeneGrafikSelektoren) bleiben
 *   4. Texte ersetzen: Textstellen, Personen, Adressen, Telefone, E-Mails,
 *      weitere Kennungen, zuletzt alle Namensvarianten (laengste zuerst) —
 *      in Textknoten UND in alt/title/aria-label/placeholder
 *   5. Generische Sweeps: Schweizer Telefonnummern, E-Mail-Adressen, UID-Nummern
 *
 * Idempotent: darf vor jeder Aufnahme erneut laufen (Lazy-Bilder, wechselnde
 * Hero-Texte). Elemente, die schon behandelt sind, tragen data-anonym.
 */

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function ersatzPerson(p) {
  return p.trim().split(/\s+/).length > 1 ? 'Alex Muster' : 'Muster'
}

function ersatzAdresse(a) {
  if (/^\d{4}\s/.test(a.trim())) return '8000 Musterstadt'
  if (/\d/.test(a)) return 'Musterstrasse 1'
  return 'Musterstadt'
}

/** Baut aus dem Regelwerk die geordnete Ersetzungsliste [regexQuelle, flags, ersatz]. */
export function ersetzungen(regel) {
  const paare = []
  // Innerhalb jeder Gruppe die laengsten zuerst: «Antonella Rullo» vor «Antonella».
  const lang = (xs, f = (x) => x) => [...(xs || [])].filter((x) => f(x)?.trim()).sort((a, b) => f(b).length - f(a).length)
  for (const t of lang(regel.textstellen, (t) => t.original)) paare.push([esc(t.original), 'g', t.ersatz ?? ''])
  for (const p of lang(regel.personen)) paare.push([`(?<![\\p{L}])${esc(p)}(?![\\p{L}])`, 'gu', ersatzPerson(p)])
  for (const a of lang(regel.adressen)) paare.push([esc(a), 'gi', ersatzAdresse(a)])
  for (const t of lang(regel.telefon)) paare.push([esc(t), 'g', '044 000 00 00'])
  for (const e of lang(regel.emails)) paare.push([esc(e), 'gi', 'info@muster.example'])
  for (const k of lang(regel.weitereKennungen)) paare.push([esc(k), 'gi', 'Muster'])
  const namen = [...new Set([...(regel.namensvarianten || []), regel.firmenname].filter(Boolean))].sort((a, b) => b.length - a.length)
  for (const n of namen) paare.push([esc(n), 'gi', regel.mustername || 'Musterbetrieb'])
  return paare
}

export async function anonymisieren(page, regel) {
  const paare = ersetzungen(regel)
  await page.evaluate(
    ({ regel, paare }) => {
      // Nur Elemente im Body — <link>/<meta> im Head treffen manche Selektoren auch.
      const alle = (sel) => {
        try {
          return [...document.querySelectorAll(sel)].filter((el) => document.body.contains(el))
        } catch {
          return []
        }
      }

      // 1. Banner
      for (const sel of regel.bannerSelektoren || []) alle(sel).forEach((el) => el.remove())

      // 2. Logos → Wortmarke. Jedes Element nur einmal, und nur das innerste:
      //    ein <img> wird zur SVG-Wortmarke, ein Inline-<svg> zu einem Text-Span
      //    an derselben Stelle, ein Text-Element bekommt den Musternamen. Container
      //    (a, picture, div) werden uebersprungen — ihr Inhalt ist schon behandelt
      //    oder wird vom Textersatz erfasst. Keine Overlays: die hatten Wortmarken
      //    doppelt und an falschen Orten gezeichnet.
      const name = regel.mustername || 'Musterbetrieb'
      const wortmarke = (el) => {
        if (el.dataset.anonym || el.closest('[data-anonym="logo"]')) return
        if (['PICTURE', 'A', 'DIV', 'HEADER', 'NAV', 'FOOTER', 'LI', 'UL', 'FIGURE', 'BUTTON'].includes(el.tagName)) {
          el.querySelectorAll('img, svg').forEach(wortmarke)
          return
        }
        const r = el.getBoundingClientRect()
        if (r.width < 8 || r.height < 8) return
        const w = Math.round(r.width)
        const h = Math.round(r.height)
        const farbe = getComputedStyle(el.parentElement || el).color || '#111'
        const fs = Math.max(10, Math.min(h * 0.62, (w / (name.length * 0.58)) | 0))
        if (el.tagName === 'IMG') {
          el.dataset.anonym = 'logo'
          // Winzige Signets (Favicon-Grösse) bekommen keinen Text — nur ausblenden.
          if (w < 56) {
            el.style.visibility = 'hidden'
            return
          }
          const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><text x='0' y='${h / 2}' dominant-baseline='central' font-family='system-ui,-apple-system,Segoe UI,sans-serif' font-weight='700' font-size='${fs}' letter-spacing='-0.3' fill='${farbe}'>${name}</text></svg>`
          el.removeAttribute('srcset')
          el.removeAttribute('sizes')
          const quelle = el.closest('picture')
          if (quelle) quelle.querySelectorAll('source').forEach((q) => q.remove())
          el.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
          el.style.objectFit = 'contain'
          el.style.objectPosition = 'left center'
          el.style.filter = 'none'
          return
        }
        if (el.tagName.toLowerCase() === 'svg') {
          const span = document.createElement('span')
          span.dataset.anonym = 'logo'
          span.textContent = name
          span.style.cssText = `display:inline-flex;align-items:center;width:${w}px;height:${h}px;font:700 ${Math.min(h * 0.55, 26)}px/1 system-ui,-apple-system,"Segoe UI",sans-serif;color:${farbe};white-space:nowrap;letter-spacing:-0.01em;overflow:hidden`
          el.replaceWith(span)
          return
        }
        // Text-Wortmarke (p, span, h1 …): nur den Text tauschen.
        el.dataset.anonym = 'logo'
        el.textContent = name
      }
      for (const sel of regel.logoSelektoren || []) alle(sel).forEach(wortmarke)

      // 3. Fotos → neutrale Flaeche. Die Durchschnittsfarbe des Bildes bleibt
      //    (Canvas, gleicher Ursprung), das Motiv verschwindet ganz: kein
      //    Weichzeichnen, keine Kopie des Originals im Screenshot.
      const eigene = new Set((regel.eigeneGrafikSelektoren || []).flatMap(alle))
      const istEigen = (el) => eigene.has(el) || [...eigene].some((e) => e.contains(el))
      const istRaster = (img) => {
        const src = img.currentSrc || img.src || ''
        return !/\.svg(\?|$)/i.test(src) && !src.startsWith('data:image/svg')
      }
      const mittelfarbe = (img) => {
        try {
          const c = document.createElement('canvas')
          c.width = 8
          c.height = 8
          const ctx = c.getContext('2d')
          ctx.drawImage(img, 0, 0, 8, 8)
          const d = ctx.getImageData(0, 0, 8, 8).data
          let r = 0, g = 0, b = 0, n = 0
          for (let i = 0; i < d.length; i += 4) {
            if (d[i + 3] < 40) continue
            r += d[i]; g += d[i + 1]; b += d[i + 2]; n++
          }
          if (!n) return null
          return [r / n, g / n, b / n].map((v) => Math.round(v))
        } catch {
          return null
        }
      }
      const flaeche = (w, h, farbe) => {
        const [r, g, b] = farbe || [200, 204, 212]
        const hell = (v) => Math.min(255, Math.round(v + (255 - v) * 0.28))
        const dunkel = (v) => Math.round(v * 0.86)
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='rgb(${hell(r)},${hell(g)},${hell(b)})'/><stop offset='1' stop-color='rgb(${dunkel(r)},${dunkel(g)},${dunkel(b)})'/></linearGradient></defs><rect width='${w}' height='${h}' fill='url(#g)'/></svg>`
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
      }
      const bildErsetzen = (img) => {
        if (img.dataset.anonym || istEigen(img)) return
        const r = img.getBoundingClientRect()
        if (r.width < 48 || r.height < 48) return
        if (!istRaster(img)) return
        img.dataset.anonym = 'foto'
        const farbe = mittelfarbe(img)
        const quelle = img.closest('picture')
        if (quelle) quelle.querySelectorAll('source').forEach((q) => q.remove())
        img.removeAttribute('srcset')
        img.removeAttribute('sizes')
        img.src = flaeche(Math.max(2, Math.round(r.width)), Math.max(2, Math.round(r.height)), farbe)
        img.style.filter = 'none'
        img.style.objectFit = 'cover'
      }
      document.querySelectorAll('img').forEach(bildErsetzen)
      for (const sel of regel.fotoSelektoren || [])
        alle(sel).forEach((el) => {
          if (el.tagName === 'IMG') return bildErsetzen(el)
          if (el.dataset.anonym) return
          el.dataset.anonym = 'foto'
          el.style.backgroundImage = 'linear-gradient(135deg, rgb(203 213 225), rgb(148 163 184))'
        })
      // Hintergrundbilder, Videos, iframes, Canvas ohne Selektor.
      document.querySelectorAll('body *').forEach((el) => {
        if (el.dataset.anonym || istEigen(el)) return
        const tag = el.tagName
        if (tag === 'VIDEO' || tag === 'IFRAME' || tag === 'CANVAS' || tag === 'OBJECT' || tag === 'EMBED') {
          const r = el.getBoundingClientRect()
          el.dataset.anonym = 'medium'
          if (tag === 'VIDEO') {
            try { el.pause() } catch {}
            el.removeAttribute('poster')
            el.querySelectorAll('source').forEach((q) => q.remove())
            el.removeAttribute('src')
            try { el.load() } catch {}
          }
          el.style.visibility = 'hidden'
          const ersatz = document.createElement('div')
          ersatz.dataset.anonym = 'medium'
          ersatz.style.cssText = `position:absolute;left:0;top:0;width:${Math.round(r.width)}px;height:${Math.round(r.height)}px;background:linear-gradient(135deg, rgb(203 213 225), rgb(148 163 184));border-radius:inherit`
          const wrap = el.parentElement
          if (wrap && r.width > 0) {
            if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative'
            wrap.appendChild(ersatz)
          }
          return
        }
        const bg = getComputedStyle(el).backgroundImage
        if (bg && bg.includes('url(') && !/\.svg/i.test(bg) && !bg.includes('data:image/svg')) {
          const r = el.getBoundingClientRect()
          if (r.width >= 48 && r.height >= 48) {
            el.dataset.anonym = 'hintergrund'
            el.style.backgroundImage = 'linear-gradient(135deg, rgb(203 213 225), rgb(148 163 184))'
          }
        }
      })
      for (const sel of regel.ausblendenSelektoren || []) alle(sel).forEach((el) => (el.style.visibility = 'hidden'))

      // 4. + 5. Texte
      const generisch = [
        ['(?:\\+41|0041)[\\s.\\-]?\\(?0?\\)?\\s?\\d{2}[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{2}[\\s.\\-]?\\d{2}', 'g', '044 000 00 00'],
        ['\\b0\\d{2}[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{2}[\\s.\\-]?\\d{2}\\b', 'g', '044 000 00 00'],
        ['[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+', 'gi', 'info@muster.example'],
        ['CHE-\\d{3}\\.\\d{3}\\.\\d{3}(?:\\s?MWST)?', 'g', 'CHE-000.000.000'],
      ]
      const regexe = [...paare, ...generisch].map(([q, f, e]) => [new RegExp(q, f), e])
      const ersetze = (v) => {
        let n = v
        for (const [re, e] of regexe) n = n.replace(re, e)
        return n
      }
      const knoten = []
      const sammeln = (wurzel) => {
        const walker = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) knoten.push(walker.currentNode)
        wurzel.querySelectorAll('*').forEach((el) => el.shadowRoot && sammeln(el.shadowRoot))
      }
      sammeln(document.body)
      for (const k of knoten) {
        const p = k.parentElement
        if (!p || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(p.tagName)) continue
        if (p.dataset.anonym === 'logo') continue
        const v = k.nodeValue
        if (!v || !v.trim()) continue
        const n = ersetze(v)
        if (n !== v) k.nodeValue = n
      }
      document.querySelectorAll('[alt],[title],[aria-label],[placeholder],input[value]').forEach((el) => {
        for (const a of ['alt', 'title', 'aria-label', 'placeholder', 'value']) {
          const v = el.getAttribute(a)
          if (!v) continue
          const n = ersetze(v)
          if (n !== v) el.setAttribute(a, n)
        }
      })
      document.querySelectorAll('input, textarea').forEach((el) => {
        if (el.value) {
          const n = ersetze(el.value)
          if (n !== el.value) el.value = n
        }
      })
      // Links auf die Originaldomain entschaerfen (nur Attribut, nicht sichtbar).
      document.querySelectorAll('a[href^="tel:"],a[href^="mailto:"]').forEach((a) => a.setAttribute('href', '#'))
    },
    { regel, paare },
  )
}
