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

**3.1 (2026-11-12, Recht):** Die Beispiel-Websites erscheinen nur noch als
**Musterbetrieb** (kein Name, Logo, Foto, Kontakt, kein Link — Nicks Regel: kein
Einverständnis der Betriebe), dazu Impressum, erweiterte Datenschutzerklärung,
Dark Mode, LinkedIn statt GitHub, keine Aussagen zu «Vorabkosten» und
«Werktagen bis zur Antwort», Hero-Wort passt sich der Spaltenbreite an.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind 3.4 · Framer Motion 12. **Kein Lenis** —
natives Scrollen, Ankerlinks per CSS `scroll-behavior: smooth`.
**Statischer Export** (`output: 'export'`), derselbe Code für zwei Ziele:
Vercel (Basispfad leer, erkannt an `process.env.VERCEL`) und GitHub Pages
(Basispfad `/portfolio-website`, gesetzt im Workflow). Kein CMS, kein Backend.

## Wo was liegt

```
lib/content.ts        ALLE Texte, Preise, Referenz, Beispiele, FAQ, Vergleich, Kennzahlen, Adresse, LinkedIn.
lib/utils.ts          cn(), chf(), asset() — asset() setzt den Basispfad davor; kanonischeUrl(), istSpiegel().
lib/datenschutz.ts    Datenschutzerklärung (revDSG), gerendert unter /datenschutz/ — URL steht im Meta-Sofortformular.
                      Neuer Dienst (Pixel, Statistik, Karte, anderer Formulardienst) → Text VORHER anpassen.
lib/impressum.ts      Impressum (UWG 3 Abs. 1 lit. s), gerendert unter /impressum/. Postadresse: nur PLZ/Ort (s. Offen).
components/layout/Rechtsseite.tsx  Gemeinsame Textseite für beide Rechtsseiten (ohne Nav/Footer, ohne JS lesbar).
components/ui/ThemeToggle.tsx      Hell/dunkel; Inline-Skript in layout.tsx setzt data-theme vor dem ersten Rendern.
tools/anonymisieren.mjs  Macht eine Demo vor dem Screenshot zum Musterbetrieb (Textersatz, Logo-Wortmarke,
                      Banner weg, Fotos weichgezeichnet, Telefon/E-Mail/UID-Sweeps).
tools/muster.mjs      GITIGNORIERT: Regelwerk je Beispiel-Slug (Namensvarianten, Personen, Adressen, Selektoren,
                      Textstellen). Erzeugt von tools/privat/muster-erzeugen.py aus tools/privat/inventar/*.json
                      (beides gitignoriert; Sicherung im Brain unter 03_Knowledge/portfolio-muster/).
app/                  layout (3 Fonts, Meta), page (Reihenfolge + JSON-LD), robots, sitemap, icon
components/layout     Nav (vollbreite Leiste, Uhr, Menü-Dialog), Footer
components/sections   Hero (Schaufenster-Wand) · Laufband · Referenz (Scroll-Scrub) ·
                      Erkennen (Ringe + Pillen) · Websites (Demo-Karten) · Ablauf · Preise ·
                      Vergleich · UeberMich (+ Kennzahlen) · Faq · Anfrage
components/motion     Cursor (Kobalt-Ring), Magnetic, Reveal, useSichtbar/useMedia
components/ui         IPhone (Geometrie), Browser (Fensterrahmen), AnfrageKarte
tools/screenshots.mjs Erzeugt public/websites/<slug>-{desktop,desktop-lang,mobile,mobile-lang,mobile-klein}.webp
tools/websites-source.mjs  Welche Demo hinter welchem neutralen Slug steht (+ anonym-Flag) — Slugs müssen zu content.ts passen
tools/vorschau.mjs    Fotografiert den Build (Desktop/Mobil in Scroll-Schritten) nach pruefung/
```

## Regeln, die nicht verhandelbar sind

- **Nur belegte Inhalte.** Keine Kundenlogos, keine Testimonials, keine Zahl
  «zufriedener Kunden», kein Lehrbetrieb. Jede Kennzahl hat eine Fussnote, worauf
  sie sich bezieht. `fahrschule-ch.ch` zeigt weiterhin auf die *alte* Kundenseite
  (Weblication CMS, geprüft 10.11.2026) und gehört nicht in die Liste.
- **Beispiele nur als Musterbetrieb (Nick, 11.11.2026).** Unverkaufte Demos haben kein
  Einverständnis des Betriebs. Auf dieser Seite deshalb: neutraler Slug (steht in den
  Bild-URLs!), beschreibender Titel statt Firmenname, «Region Zürich» statt Ort, kein Link,
  Screenshots nur über `npm run screenshots` mit Regelwerk (Name/Logo/Kontakt ersetzt,
  Fotos weichgezeichnet, Entwurfsbanner entfernt). Fehlt das Regelwerk, nimmt das Skript
  NICHT auf. Die Referenz Suwannaphum zeigt Nick auf eigenen Entscheid (11.11.2026) mit
  Namen und Link.
- **Keine Aussagen zu «Vorabkosten» und «Werktagen bis zur Antwort»** (Nick, 11.11.2026);
  stattdessen «unverbindlich» und «eine Demo ist oft nach ein bis zwei Tagen online».
  Kein GitHub-Link auf der Seite — Besucher sind Betriebsinhaber; LinkedIn statt dessen.
- **Rechtsseiten:** /impressum/ und /datenschutz/ (beide im Footer und in der Sitemap, die
  Datenschutz-URL auch im Meta-Sofortformular und unter dem Formular). Preise ohne MwSt.,
  weil Nick nicht MwSt-pflichtig ist (Auskunft 11.11.2026).
- **Drei Farben.** Papier, Tinte, Kobalt (`#1c50be`). Grau nur als Ableitung. Kobalt
  ist auf Dunkel 2,8:1 — dort nur als Fläche; für Text `kobalt-lift`.
- **Hell als Standard, dunkel per Schalter (12.11.2026).** Dark Mode = Papier und Tinte
  getauscht, Kobalt wird zur Lift-Stufe (`html[data-theme='dark']` in globals.css). Folgt der
  Systemeinstellung, der Schalter in der Nav überschreibt sie (localStorage «design»).
  Komponenten, die über Screenshots liegen (iPhone-Statusleiste), benutzen feste
  Schwarz/Weiss-Werte, nicht paper/ink.
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
- **Hero-Wort-Wechsel ohne `mode="wait"`** — sonst steht für 0,5 s eine leere Zeile. Das Wort
  darf nie umbrechen (zweite Zeile wäre im 1,02em-Fenster unsichtbar → nur «Ihre» stand da):
  Hero.tsx misst alle Wörter unsichtbar und verkleinert die Zeile per `fontSize: <skala>em`.
  Kurze Wörter in `branchen` halten die Skala nahe 1.
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
npm run screenshots   Vorschaubilder neu erzeugen (Chrome nötig; ONLY=<slug>[,<slug>] für einzelne);
                      Beispiele nur mit tools/muster.mjs — JPEG-Kontrollbilder landen in pruefung/anonym/
THEME=dark npm run vorschau   dunkles Design fotografieren (Dateien dunkel-*.jpg)
npm run lint / typecheck
```

Deploy: Push auf `main` → Vercel baut automatisch (Projekt `nick-hbr`, Scope nick-3488,
GitHub verbunden) **und** `.github/workflows/deploy.yml` → GitHub Pages.

## Offen

- **Impressum: Strasse und Hausnummer fehlen.** Nick hat am 11.11.2026 nur «8952 Schlieren»
  genannt; UWG 3 Abs. 1 lit. s verlangt eine vollständige Anschrift → in `lib/impressum.ts`
  (Kontaktadresse) und `lib/datenschutz.ts` (Verantwortlich) ergänzen, `person.adresse` in content.ts.
- FormSubmit legt Sitz/Bearbeitungsort nicht offen (Codex-Review 11.11.2026; PDF geprüft 12.11.) →
  mittelfristig durch CH/EU-Formulardienst ersetzen und `lib/datenschutz.ts` nachziehen
- FormSubmit: Aktivierungs-Mail in holzbechernick@gmail.com bestätigen (Testanfrage 14.09.2026)
- Eigene Domain (dann `SITE_ORIGIN` + `SITE_KANONISCH` als Vercel-Env setzen; der GitHub-Pages-Spiegel
  ist bereits noindex)
- Offline gegangene Demos: Gusto Campano (GitHub Pages aus, Vercel-Projekt am 3.11. gelöscht),
  Fahrschul-Center und FKM Fahrschule (GitLab-Projekte nicht mehr öffentlich) — wieder
  aufnehmen, sobald sie erreichbar sind (Eintrag in content.ts + websites-source.mjs,
  `ONLY=<slug> npm run screenshots`)
- Suwannaphum als Referenz: das Restaurant wollte Nick auf *seiner* Website nicht als
  Gestalter nennen (22.10.2026). Nick hat am 11.11.2026 entschieden, die Referenz mit Namen und
  Link zu zeigen — ein schriftliches Einverständnis des Restaurants wäre trotzdem sinnvoll.
- Beispiele Hauswartung, Reinigung, Elektro: Regelwerk nachziehen, sobald das Inventar da ist
  (tools/privat/inventar/), dann `ONLY=hauswartung,reinigung,elektro npm run screenshots`
