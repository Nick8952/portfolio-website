# Nick Holzbecher — persönliche Website

> Einstieg für jede Claude-Code-Session in diesem Repo. Produktwahrheit steht in
> `PRODUCT.md`, Gestaltung in `DESIGN.md`. Diese Datei erklärt Code und Betrieb.

## Was das ist

Nicks Website als Verkaufsinstrument für seinen Website-Nebenerwerb. Zielgruppe:
Inhaber kleiner Schweizer Betriebe, die den Link vom Handy aus öffnen. Ziel der
Seite: eine Anfrage über das Formular.

**Live (primär):** https://nick-hbr.vercel.app/ · Spiegel: https://nick8952.github.io/portfolio-website/
(der Spiegel ist `noindex` und zeigt per Canonical auf Vercel — `istSpiegel()` in `lib/utils.ts`).

Version 3 (2026-11-10): Umbau «wie kingofon.ch» — Dramaturgie, Effekte und
Darstellungsformen einer Premium-Agenturseite, aber hell, mit belegten Inhalten
und der ersten echten Referenz (Thai Restaurant Suwannaphum). Version 2
(2026-09-13, Glas-Pille + Dock/Sheet) ist Git-Historie; v1 (Sanity/WebGL) = Tag `v1-archiv`.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind 3.4 · Framer Motion 12. **Kein Lenis** —
natives Scrollen, Ankerlinks per CSS `scroll-behavior: smooth`.
**Statischer Export** (`output: 'export'`), derselbe Code für zwei Ziele:
Vercel (Basispfad leer, erkannt an `process.env.VERCEL`) und GitHub Pages
(Basispfad `/portfolio-website`, gesetzt im Workflow). Kein CMS, kein Backend.

## Wo was liegt

```
lib/content.ts        ALLE Texte, Preise, Referenz, Demos, FAQ, Vergleich, Kennzahlen.
lib/utils.ts          cn(), chf(), asset() — asset() setzt den Basispfad davor.
app/                  layout (3 Fonts, Meta), page (Reihenfolge + JSON-LD), robots, sitemap, icon
components/layout     Nav (vollbreite Leiste, Uhr, Menü-Dialog), Footer
components/sections   Hero (Schaufenster-Wand) · Laufband · Referenz (Scroll-Scrub) ·
                      Erkennen (Ringe + Pillen) · Websites (Demo-Karten) · Ablauf · Preise ·
                      Vergleich · UeberMich (+ Kennzahlen) · Faq · Anfrage
components/motion     Cursor (Kobalt-Ring), Magnetic, Reveal, useSichtbar/useMedia
components/ui         IPhone (Geometrie), Browser (Fensterrahmen), AnfrageKarte
tools/screenshots.mjs Erzeugt public/websites/<slug>-{desktop,desktop-lang,mobile,mobile-lang,mobile-klein}.webp
tools/websites-source.mjs  Adressen dafür — Slugs müssen zu content.ts passen
tools/vorschau.mjs    Fotografiert den Build (Desktop/Mobil in Scroll-Schritten) nach pruefung/
```

## Regeln, die nicht verhandelbar sind

- **Nur belegte Inhalte.** Keine Kundenlogos, keine Testimonials, keine Zahl
  «zufriedener Kunden», kein Lehrbetrieb, kein Standort. Jede Kennzahl hat eine
  Fussnote, worauf sie sich bezieht. `fahrschule-ch.ch` zeigt weiterhin auf die
  *alte* Kundenseite (Weblication CMS, geprüft 10.11.2026) und gehört nicht in die Liste.
- **Drei Farben.** Papier, Tinte, Kobalt (`#1c50be`). Grau nur als Ableitung. Kobalt
  ist auf Dunkel 2,8:1 — dort nur als Fläche; für Text `kobalt-lift`.
- **Hell.** Nicks Entscheid vom 10.11.2026: kingofon ist dunkel, diese Seite bleibt
  weiss. Schwarz nur als Karte (Regelfall-Preis) und Schaltfläche.
- **Etiketten in Geist Mono** (`.eyebrow`): ein Schrägstrich-Eyebrow über jeder Section,
  Meta-Zeilen in Karten, Uhr, Kennzahl-Labels. Nie Fliesstext, nie als Terminal-Kostüm.
- **Die Referenz wiegt mehr als die Demos.** Suwannaphum bekommt die grosse Bühne;
  die Demos stehen als Karten (sechs sofort, Rest nach Klick) und sind als «ohne
  Auftrag gebaut» gekennzeichnet. Kein Stapel aus Vollbild-Panels.
- **Bewegung nur, wo sie Compositor-Arbeit ist** (transform/opacity) und nur, wo
  Bedeutung drin ist. Alles steht unter `prefers-reduced-motion` sofort im Endzustand.
- Schweizer Schreibweise, «Sie», CHF mit Apostroph (`chf()`).

## Technische Fallen

- **`asset()` für alles unter `public/`.** `next/image` ist aus (`unoptimized`), ein
  plain `<img src="/x.webp">` würde auf GitHub Pages den Basispfad verfehlen → 404.
- **Tailwind-Utility-Namen nicht als eigene Klassen verwenden.** `.ring` war Tailwinds
  `ring` (3px blauer box-shadow) und zeichnete blaue Rechtecke um die SVG-Ringe → heisst
  jetzt `.orbit`. Vor neuen Klassennamen kurz prüfen (`ring`, `shadow`, `border`, `grid`…).
- **`contain-intrinsic-size: auto 34rem` setzt auch die Breite.** Mit `content-visibility:
  auto` wurden die Demo-Karten auf Mobil 34rem breit (174px Überlauf). Nur
  `contain-intrinsic-height` setzen.
- **Scroll-Ruckeln (14.09.2026, von Nick gemeldet).** Ursachen, alle entfernt — nicht
  wieder einbauen: Lenis; SVG-`feDisplacementMap` als `backdrop-filter`; `filter: blur(80px)`
  auf grossen animierten Flächen; `backdrop-filter` auf statischen Kacheln. Heute hat nur
  die Navigationsleiste und das Mobil-Menü `backdrop-filter`. Hero-Wand, Laufband und
  Ringe laufen als CSS-Keyframes auf `transform`, pausieren per IntersectionObserver
  (`data-pausiert`) und bei verborgenem Tab (`useSichtbar`).
- **Tailwind-Utilities schlagen eigene Komponenten-Klassen.** `@layer components` liegt unter
  `@layer utilities`: ein `relative` oder `flex` im Markup überstimmt `position: sticky` bzw.
  `display: none` aus einer eigenen Media-Query-Regel (Erkennen-Bühne, 10.11.). Eigenschaften, die
  eine eigene Regel per Media Query umschaltet, gehören ganz ins CSS — nicht halb in Tailwind.
- **`useReducedMotion()` nie direkt für Markup verwenden.** Framer liefert auf dem Server `null`, im
  Browser sofort den echten Wert → Hydration-Abweichung bei `initial`-Props und Startwerten. Immer
  `useReduziert()` (`components/motion/useSichtbar.ts`, sagt bis nach dem Mount «nein») plus
  `<MotionConfig reducedMotion="user">` (`BewegungsKonfig.tsx`), das die Transform-Animationen abschaltet.
- **Eigene Klassennamen vs. Tailwind:** `.ring` → siehe oben; Laufband und Wand schleifen über EINE Spur
  (-50 % = eine Liste) bzw. `calc(-50% - halbe Lücke)` — sonst springt die Schleife.
- **Framer Motion überschreibt `transform`.** Ein Element mit `style={{ x, y, scale }}`
  verliert Tailwind-Translate-Klassen → Zentrierung über `x: '-50%'` im style.
- **Hero-Wort-Wechsel ohne `mode="wait"`** — sonst steht für 0,5 s eine leere Zeile.
- **Container-Einheiten in den Demo-Karten:** `.rahmen { container-type: size }` liefert
  `100cqh`, damit das lange Bild beim Hover exakt am unteren Rand hält.
- **`@supports (backdrop-filter: url(#x))` ist in Safari eine Falle** (SVG-Linse ist raus).
- **Prozent-Insets sind nicht quadratisch** — beim iPhone `inset-x-[2.4%] inset-y-[1.165%]`.
- **Tailwind-Deckkraft nur in 5er-Schritten.** `bg-ink/6` erzeugt stillschweigend keine Klasse.
- **`sitemap.ts` / `robots.ts` brauchen `dynamic = 'force-static'`**, sonst bricht der Export.
- **Screenshots mit `waitUntil: 'load'`**, nicht networkidle. `www.suwannaphum.ch` liegt
  hinter dem Vercel-Sicherheits-Checkpoint → aufgenommen wird der vercel.app-Alias
  (gleiche Veröffentlichung), verlinkt die echte Domain.
- Formular: FormSubmit (AJAX-Endpunkt). Beim **allerersten** Versand kommt eine
  Aktivierungs-Mail an `holzbechernick@gmail.com`; erst nach dem Klick darin werden
  Anfragen zugestellt. Fallback im Fehlerfall: Mailto.

## Befehle

```
npm run dev           lokal, http://localhost:3000 (Basispfad /portfolio-website!)
npm run build         statischer Export nach out/ (GitHub-Pages-Variante)
BASE_PATH= SITE_ORIGIN=http://localhost:4173 npm run build && npm run vorschau
                      Vercel-Variante bauen und nach pruefung/ fotografieren (klickt «Weitere anzeigen»,
                      misst Überlauf und Konsolenfehler)
npm run screenshots   Vorschaubilder neu erzeugen (Chrome nötig; ONLY=<slug> für eine)
npm run lint / typecheck
```

Deploy: Push auf `main` → Vercel baut automatisch (Projekt `nick-hbr`, Scope nick-3488,
GitHub verbunden) **und** `.github/workflows/deploy.yml` → GitHub Pages.

## Offen

- FormSubmit: Aktivierungs-Mail in holzbechernick@gmail.com bestätigen (Testanfrage 14.09.2026)
- Eigene Domain (dann `SITE_ORIGIN` + `SITE_KANONISCH` als Vercel-Env setzen; der GitHub-Pages-Spiegel
  ist bereits noindex)
- Offline gegangene Demos: Gusto Campano (GitHub Pages aus, Vercel-Projekt am 3.11. gelöscht),
  Fahrschul-Center und FKM Fahrschule (GitLab-Projekte nicht mehr öffentlich) — wieder
  aufnehmen, sobald sie erreichbar sind (Eintrag in content.ts + websites-source.mjs,
  `ONLY=<slug> npm run screenshots`)
- Suwannaphum als Referenz: das Restaurant wollte Nick auf *seiner* Website nicht als
  Gestalter nennen (22.10.2026) — ob es mit der Nennung *hier* einverstanden ist, hat Nick
  zu klären
