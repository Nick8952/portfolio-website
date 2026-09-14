# Nick Holzbecher — persönliche Website

> Einstieg für jede Claude-Code-Session in diesem Repo. Produktwahrheit steht in
> `PRODUCT.md`, Gestaltung in `DESIGN.md`. Diese Datei erklärt Code und Betrieb.

## Was das ist

Nicks Website als Verkaufsinstrument für seinen Website-Nebenerwerb. Zielgruppe:
Inhaber kleiner Schweizer Betriebe, die den Link vom Handy aus öffnen. Ziel der
Seite: eine Anfrage über das Formular. **Live:** https://nick8952.github.io/portfolio-website/

Version 2 (2026-09-13) — der frühere Sanity/WebGL-Stand wurde komplett ersetzt.
Glasoptik und Dock statt Stapel: 2026-09-13, zweite Runde.
Git-Historie vor `v2` ist nur noch Archiv.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind 3.4 · Framer Motion 12. **Kein Lenis mehr** —
natives Scrollen, Ankerlinks per CSS `scroll-behavior: smooth`.
**Statischer Export** (`output: 'export'`) auf GitHub Pages, Basispfad
`/portfolio-website`. Kein CMS, kein Backend, keine Server-Routen.

## Wo was liegt

```
lib/content.ts        ALLE Texte, Preise, Websites. Hier pflegen, sonst nirgends.
lib/utils.ts          cn(), chf(), asset() — asset() setzt den Basispfad davor.
app/                  layout (Fonts, Meta), page (Reihenfolge), robots, sitemap, icon
components/layout     Nav, Footer
components/sections   Hero, Websites, Ablauf, Preise, UeberMich, Anfrage
components/motion     Cursor (Kobalt-Ring), Magnetic
components/ui/IPhone  Das iPhone aus Geometrie — Hero und Sheet nutzen dasselbe
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
- **Websites nur auf Wunsch.** Das Dock in `Websites.tsx` ist eine Reihe kleiner
  Kacheln; die grosse Ansicht kommt erst im Sheet nach dem Antippen. Ein Stapel aus
  Vollbild-Panels, an dem man nicht vorbeikommt, war Nicks ausdrücklicher Einwand —
  nicht wieder einbauen.
- **Glas nur auf der schwebenden Schicht:** Navigation, Sekundär-Buttons, Dock-Kacheln,
  Sheet, das Regelfall-Panel in den Preisen. Nie als Füllung ganzer Sections.
  Klassen `glass`, `glass-strong`, `glass-dark` in `globals.css`; das Umgebungslicht
  (`.ambient`) im Hero ist der Grund, warum das Glas überhaupt als Glas lesbar ist.
- Schweizer Schreibweise, «Sie», CHF mit Apostroph (`chf()`).

## Technische Fallen

- **`asset()` für alles unter `public/`.** `next/image` ist aus (`unoptimized`), ein
  plain `<img src="/x.jpg">` würde auf GitHub Pages den Basispfad verfehlen → 404.
- **Scroll-Ruckeln (14.09.2026, von Nick gemeldet).** Ursachen, alle entfernt — nicht
  wieder einbauen: Lenis-Smooth-Scroll (fühlt sich auf dem Trackpad verzögert an);
  SVG-`feDisplacementMap` als `backdrop-filter` auf der fixierten Nav (verzerrt bei jedem
  Frame den Hintergrund neu); `filter: blur(80px)` auf grossen, dauerhaft animierten
  Flächen (jetzt statischer `radial-gradient`); `backdrop-filter` auf Dock-Kacheln und
  Preis-Panel (über einfarbigem Grund wirkungslos → `glass-lite`). Dazu: Hero-Wechsel
  pausiert ausserhalb des Viewports, Cursor-rAF läuft nur, solange der Ring unterwegs ist.
  `backdrop-filter` bleibt nur auf Nav, Sheet, Menü.
- **`@supports (backdrop-filter: url(#x))` ist in Safari eine Falle.** Safari 18+ besteht
  den Test, rendert aber keine SVG-Backdrop-Filter und verwirft dabei die ganze Kette
  samt Blur. (Die SVG-Linse ist inzwischen ganz raus — wegen Ruckeln.) Fund von Codex.
- **Glas über Schwarz braucht Füllung.** 38 % Papier ergibt 2,6:1; die gescrollte Nav
  hat 70 %, weil sie über der Preis-Section liegt. Fund von Codex.
- **Prozent-Insets sind nicht quadratisch.** `inset-[2.4%]` misst oben/unten an der
  Höhe, seitlich an der Breite — beim iPhone (2,06:1) wäre der Rand oben doppelt so
  dick. Deshalb `inset-x-[2.4%] inset-y-[1.165%]`. Fund von Codex.
- **Tailwind-Deckkraft nur in 5er-Schritten.** `bg-ink/6` erzeugt stillschweigend keine
  Klasse. Zweimal hineingelaufen.
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
- FormSubmit: Testanfrage am 14.09.2026 gesendet (HTTP 200) → **Aktivierungs-Mail in
  holzbechernick@gmail.com bestätigen**, sonst werden Anfragen nicht zugestellt
- Fahrschule CH wieder aufnehmen, sobald die Domain auf die Demo zeigt
- Eigene Domain (Ablauf im Workflow kommentiert)
