# Nick Holzbecher — persönliche Website

> Einstieg für jede Claude-Code-Session in diesem Repo. Produktwahrheit steht in
> `PRODUCT.md`, Gestaltung in `DESIGN.md`. Diese Datei erklärt Code und Betrieb.

## Was das ist

Nicks Website als Verkaufsinstrument für seinen Website-Nebenerwerb. Zielgruppe:
Inhaber kleiner Schweizer Betriebe, die den Link vom Handy aus öffnen. Ziel der
Seite: eine Anfrage über das Formular. **Live:** https://nick8952.github.io/portfolio-website/

Version 2 (2026-09-13) — der frühere Sanity/WebGL-Stand wurde komplett ersetzt.
Git-Historie vor `v2` ist nur noch Archiv.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind 3.4 · Framer Motion 12 · Lenis.
**Statischer Export** (`output: 'export'`) auf GitHub Pages, Basispfad
`/portfolio-website`. Kein CMS, kein Backend, keine Server-Routen.

## Wo was liegt

```
lib/content.ts        ALLE Texte, Preise, Websites. Hier pflegen, sonst nirgends.
lib/utils.ts          cn(), chf(), asset() — asset() setzt den Basispfad davor.
app/                  layout (Fonts, Meta), page (Reihenfolge), robots, sitemap, icon
components/layout     Nav, Footer
components/sections   Hero, Websites, Ablauf, Preise, UeberMich, Anfrage
components/motion     SmoothScroll (Lenis), Cursor (Kobalt-Ring), Magnetic
tools/screenshots.mjs Erzeugt public/websites/*.jpg aus den Live-Demos
tools/websites-source.mjs  Adressen dafür — Slugs müssen zu content.ts passen
```

## Regeln, die nicht verhandelbar sind

- **Nur belegte Inhalte.** Keine Kundenlogos, keine Testimonials, keine Zahl
  «zufriedener Kunden», kein Lehrbetrieb, kein Standort — nichts davon ist bestätigt.
  `fahrschule-ch.ch` zeigt auf die *alte* Kundenseite und gehört nicht in die Liste.
- **Drei Farben.** Papier, Tinte, Kobalt (`#1c50be`). Grau nur als Ableitung. Kobalt
  ist auf Dunkel 2,8:1 — dort nur als Fläche; für Text `kobalt-lift`.
- **Keine Eyebrows über Headlines, keine Kartenraster, keine Sektionsnummern**
  ausser im Ablauf (dort ist die Reihenfolge Information). Siehe `DESIGN.md`.
- **Ein inszenierter Moment:** der Stapel in `Websites.tsx`. Nichts anderes bekommt
  eine Einblend-Choreografie.
- Schweizer Schreibweise, «Sie», CHF mit Apostroph (`chf()`).

## Technische Fallen

- **`asset()` für alles unter `public/`.** `next/image` ist aus (`unoptimized`), ein
  plain `<img src="/x.jpg">` würde auf GitHub Pages den Basispfad verfehlen → 404.
- **Stapel nur ≥1024px.** Auf dem Handy ist ein Panel höher als der Viewport; sticky
  würde den Screenshot zudecken. `useStapel()` schaltet es ab, ebenso bei
  `prefers-reduced-motion`.
- **`sitemap.ts` / `robots.ts` brauchen `dynamic = 'force-static'`**, sonst bricht
  der Export.
- **Screenshots mit `waitUntil: 'load'`**, nicht networkidle — Demos mit
  Canvas-Animation werden sonst nie «idle» und das Skript läuft in den Timeout.
- Formular: FormSubmit (AJAX-Endpunkt). Beim **allerersten** Versand kommt eine
  Aktivierungs-Mail an `holzbechernick@gmail.com`; erst nach dem Klick darin werden
  Anfragen zugestellt. Fallback im Fehlerfall: Mailto.

## Befehle

```
npm run dev           lokal, http://localhost:3000
npm run build         statischer Export nach out/
npm run screenshots   Vorschaubilder neu erzeugen (Chrome nötig; ONLY=<slug> für eine)
npm run lint / typecheck
```

Deploy: Push auf `main` → `.github/workflows/deploy.yml` → GitHub Pages.

## Offen

- Portraitfoto (Platz in `UeberMich.tsx` ist vorbereitet)
- FormSubmit einmalig aktivieren (erste Testanfrage schicken, Mail bestätigen)
- Fahrschule CH wieder aufnehmen, sobald die Domain auf die Demo zeigt
- Eigene Domain (Ablauf im Workflow kommentiert)
