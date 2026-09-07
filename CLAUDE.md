# Portfolio-Website — Projektkontext

> Diese Datei ist der Einstiegspunkt für jede Claude-Code-Session in diesem Repo.
> Sie wird bei strukturellen Änderungen mitgepflegt.

## 1. Projektüberblick

Persönliche Portfolio-Website für einen Softwareentwickler. **Sprache: Deutsch**
(Fliesstext, Formulare, Studio-Labels). Einzelne Display-Wörter und Section-Labels
dürfen englisch bleiben, wo sie als Typo-Statement funktionieren.

**Das Ziel der Seite:** jemanden davon überzeugen, dass sich ein Gespräch lohnt —
und ihn zum Kontaktformular bringen. Jede Section zahlt darauf ein.

Sämtliche Inhalte sind über ein **eingebettetes Sanity Studio unter `/studio`**
pflegbar. Ohne Code-Kenntnisse.

**Wichtig:** Die Seite baut und läuft auch **ohne konfiguriertes Sanity**.
Fehlt `NEXT_PUBLIC_SANITY_PROJECT_ID`, greift automatisch der Platzhalter-Datensatz
aus `lib/fallback.ts`. Damit funktioniert der Vercel-Import ohne Vorarbeit, und die
Seite ist nie kaputt, nur weil ein Dokument im CMS noch fehlt.

## 2. Tech-Stack

| Bereich | Wahl | Warum |
|---|---|---|
| Framework | Next.js 15.5 (App Router, RSC) | Vorgabe der übergeordneten CLAUDE.md |
| Sprache | TypeScript (strict) | — |
| Styling | Tailwind CSS 3.4 + CSS-Variablen | Hauskonvention der anderen Projekte |
| Animation | Framer Motion 12 | Scroll-Reveals, Signature-Headline |
| CMS | Sanity 4.22.1 + next-sanity 11 | Embedded Studio unter `/studio` |
| Mailversand | Resend 6 via Route Handler | Läuft nativ auf Vercel |
| Deployment | Vercel | GitHub-Import ohne Nacharbeit |

### Versions-Fallstrick (bitte nicht blind aktualisieren)

Zwei Versionen sind bewusst festgehalten. Beide hängen daran, dass dieses Projekt
auf **Next 15** läuft:

**1. `sanity` ist exakt auf `4.22.1` gepinnt** (nicht `^4.22.1`).
Ab **Sanity 5** wird `useEffectEvent` direkt aus `react` importiert. Das in
Next 15.5 mitgelieferte React exportiert diesen Hook nicht — der Build bricht mit
`Attempted import error: 'useEffectEvent' is not exported from 'react'` ab.
Sanity 4.22.1 bezieht denselben Hook aus dem Ponyfill-Paket `use-effect-event`
und ist damit unabhängig von der React-Version, die Next bündelt.

**2. `next-sanity` bleibt auf `^11.6.13`.**
`next-sanity@12` und `@13` verlangen als Peer zwingend Next 16. Version 11 ist die
letzte mit `next: ^15.1 || ^16` und `sanity: ^4.22.0 || ^5`.

**Wer auf Next 16 wechseln will**, zieht alle drei zusammen hoch: `next@16`,
`next-sanity@13`, `sanity@6`. Einzeln aktualisiert bricht der Build.

## 3. Architekturentscheidungen

**AE-1 — Fallback-Content-Layer.** Alle Sanity-Zugriffe laufen über
`sanity/fetch.ts`. Die Funktion prüft, ob ein Projekt konfiguriert ist, fängt
Netzwerkfehler ab und liefert bei leerem Ergebnis den passenden Platzhalter aus
`lib/fallback.ts`. Konsequenz: Sections rendern immer, nie ein leeres `<section>`.
Platzhalter sind an `[ECKIGEN KLAMMERN]` erkennbar.

**AE-2 — Server Components als Default.** Datenholen passiert ausschliesslich in
Server Components. `"use client"` steht nur dort, wo Interaktion oder Motion nötig
ist (`components/ui/*`, `components/layout/Header.tsx`, Kontaktformular).
Sections sind Server Components, die Client-Bausteine einbetten.

**AE-3 — Singletons vs. Collections.** `siteSettings`, `hero`, `about` und
`sectionCopy` sind Singletons (genau ein Dokument, feste ID, im Studio ohne
"Neu"-Button). `stat`, `tool`, `service`, `experience`, `project`, `testimonial`
sind Collections mit `order`-Feld für die Sortierung. Siehe `sanity/structure.ts`.

**AE-4 — ISR statt Webhooks.** Seiten nutzen `revalidate = 60`. Bewusst gewählt
gegen einen Webhook-Setup-Schritt, den der Betreiber sonst manuell machen müsste.
Änderungen im Studio sind nach spätestens 60 s live.

**AE-5 — Resend mit weichem Fallback.** Fehlt `RESEND_API_KEY`, antwortet
`/api/contact` mit einer freundlichen Meldung statt einem 500er, und loggt die
Anfrage serverseitig. Der Build bricht nie an einer fehlenden Env-Var ab.

**AE-6 — Bilder.** Sanity Image Assets mit Hotspot/Crop, ausgeliefert über
`next/image` mit `remotePatterns` auf `cdn.sanity.io` (siehe `next.config.mjs`).
Platzhalterbilder liegen als lokale SVGs in `public/placeholder/`.

## 4. Ordnerstruktur

```
app/
  layout.tsx              Fonts, <html lang="de">, globale Metadata
  page.tsx                Startseite — komponiert alle Sections, holt Daten
  globals.css             Design-Tokens als CSS-Variablen + Tailwind-Layer
  not-found.tsx           404
  robots.ts / sitemap.ts  SEO
  opengraph-image.tsx     Dynamisches OG-Bild (next/og)
  api/contact/route.ts    Kontaktformular -> Resend
  studio/[[...tool]]/     Eingebettetes Sanity Studio
components/
  layout/     Header (inkl. Mobilmenü), Footer
  sections/   Hero, About, Stats, Tools, Services, Experience,
              Projects, Testimonials, Contact, Marquee
  ui/         Wiederverwendbare Primitive — siehe unten
sanity/
  env.ts        Env-Vars + isSanityConfigured()
  client.ts     Sanity-Client
  image.ts      urlForImage() Helper
  fetch.ts      sanityFetch() mit Fallback (AE-1)
  queries.ts    Alle GROQ-Queries an einem Ort
  structure.ts  Studio-Desk-Struktur (Singletons)
  schemas/      Ein Schema pro Datei + index.ts
lib/
  fallback.ts   Platzhalter-Datensatz
  utils.ts      cn(), Formatierungshelfer
types/
  content.ts    TypeScript-Typen für alle Inhalte
```

## 5. Sanity-Schemas

| Schema | Typ | Inhalt |
|---|---|---|
| `siteSettings` | Singleton | Name, Rolle, Standort, E-Mail, Telefon, Social Links, CV-Datei, SEO-Defaults, OG-Bild |
| `hero` | Singleton | Eyebrow, Display-Zeilen (klein/gross), Beschreibung, Portrait, 2 CTAs |
| `about` | Singleton | Label, zweifarbige Headline, zwei Textspalten |
| `sectionCopy` | Singleton | Labels/Headlines/Intros aller übrigen Sections an einem Ort |
| `stat` | Collection | Wert (`320+`), Titel, Beschreibung, Bild, Reihenfolge |
| `tool` | Collection | Name, Icon-Bild, Kategorie, Reihenfolge |
| `service` | Collection | Icon-Key, Titel, Beschreibung, Link, Reihenfolge |
| `experience` | Collection | Jobtitel, Firma, Zeitraum von/bis, Beschreibung, Reihenfolge |
| `project` | Collection | Titel, Kategorie, Vorschaubild, externer Link, Case-Study-Link, Reihenfolge |
| `testimonial` | Collection | Zitat, Foto, Name, Rolle, Hervorhebung (ja/nein), Reihenfolge |

Jedes Schema hat eine `preview`-Konfiguration mit Titel, Untertitel und Bild,
damit die Listen im Studio ohne Rätselraten lesbar sind.

## 6. Designsystem

Abgeleitet aus `design-reference.png`. Tokens leben als CSS-Variablen in
`app/globals.css` und werden in `tailwind.config.ts` gespiegelt.

**Farbe** — Bordeaux ist die *einzige* gesättigte Farbe der Seite. Alles andere
ist neutral. Genau dadurch trifft der Akzent.

| Token | Hex | Rolle |
|---|---|---|
| `wine` | `#4A0E1C` | Kern-Bordeaux, Hero-Grund |
| `oxblood` | `#7B1023` | Glow, CTA-Füllung |
| `ember` | `#C2364B` | Links, Pfeile, Signal auf Dunkel |
| `ink` | `#140A0C` | Fast-Schwarz mit Rotstich (nie `#000`) |
| `paper` | `#F2F0ED` | Heller Sectiongrund |
| `chalk` | `#9A9490` | Zweiter Ton der Headlines, Muted-Text |

**Typografie** — drei Rollen:
- `font-display` **Archivo** (700/800/900) — Riesen-Headlines, `tracking-tight`
- `font-sans` **Inter** — Fliesstext
- `font-mono` **JetBrains Mono** — Eyebrows, Jahreszahlen, Marquee, Stat-Labels.
  Monospace ist bei einem Entwickler-Portfolio Vernakular, keine Dekoration.

**Signature-Element — die sich selbst lesende Headline.**
`components/ui/ReadingHeadline.tsx`. Die zweifarbige Headline aus der Vorlage ist
hier nicht statisch: Die Tongrenze wandert beim Scrollen wortweise durch den Satz
(`chalk` -> `ink`), wie mitgelesener Text. Unter `prefers-reduced-motion` fällt sie
auf die statische Zweifarbigkeit zurück. Das ist das eine auffällige Element —
alles drumherum bleibt bewusst ruhig.

**Riesenwörter binden sich an die Spaltenbreite.**
Die Klasse `.fit-word` in `globals.css` rechnet die Schriftgrösse aus der
Innenbreite der Spalte (`100cqi`) und der Zeichenzahl (`--chars`), gedeckelt durch
`--cap`. Nötig, weil die Wortlänge im CMS steht: mit einem festen `clamp()`-Deckel
lief „ENGINEER" bei 1440 px seitlich aus der Spalte. Genutzt vom Hero-Wort und vom
Hintergrundwort der Stimmen-Section.

**Zeilenhöhen sind weniger eng als in der englischen Vorlage.**
Deutsche Umlaute brauchen Kopfraum, und Archivos Versal-J reicht unter die
Grundlinie. Bei `line-height: 0.92` stossen die Ü-Punkte einer Zeile in das J der
Zeile darüber. Die Display-Grade in `tailwind.config.ts` liegen deshalb zwischen
0.9 und 1.02 — nicht tiefer setzen.

**Rhythmus** — hell/dunkel wechseln sich ab, und der Wechsel bedeutet etwas:
dunkel = *was ich für dich mache* (Hero, Services, Projekte, Footer),
hell = *wer ich bin* (Über mich, Zahlen, Tools, Werdegang, Testimonials, Kontakt).

## 7. Coding-Konventionen

- **Deutsch** in UI-Text, Kommentaren und Studio-Labels. **Englisch** für Code-Bezeichner.
- Kommentare erklären *warum*, nicht *was*. Keine Kommentare, die den Code nacherzählen.
- Komponenten: benannte Props-Typen (`type XProps = {...}`), Default-Export.
- Kein `any`. Inhalts-Typen kommen aus `types/content.ts`.
- Klassen werden mit `cn()` aus `lib/utils.ts` zusammengesetzt.
- `"use client"` so spät wie möglich im Baum — siehe AE-2.
- Jede interaktive Fläche: `cursor-pointer`, sichtbarer `:focus-visible`-Ring,
  Hover-Transition 150–300 ms.
- Animationen respektieren immer `prefers-reduced-motion`.
- Breakpoints getestet auf 375 / 768 / 1024 / 1440 px.

## 8. Umgebungsvariablen

| Variable | Pflicht | Zweck |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | nein* | Sanity-Projekt-ID. Fehlt sie -> Platzhalterinhalte. |
| `NEXT_PUBLIC_SANITY_DATASET` | nein | Default `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | nein | Default `2024-10-01` |
| `SANITY_API_READ_TOKEN` | nein | Nur für Draft-Vorschau nötig |
| `RESEND_API_KEY` | nein* | Ohne Key nimmt das Formular an und loggt nur |
| `CONTACT_TO_EMAIL` | nein | Empfängeradresse der Formularmails |
| `CONTACT_FROM_EMAIL` | nein | Default `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | nein | Für Canonicals/Sitemap/OG. Default = Vercel-URL |

\* Nicht build-blockierend, aber für den Produktivbetrieb gewollt.

## 9. Deployment

**Lokal**

```bash
npm install
cp .env.example .env.local     # Werte eintragen (optional)
npm run dev                    # http://localhost:3000, Studio: /studio
```

**Sanity anlegen (einmalig)**

```bash
npx sanity login
npx sanity init --env .env.local   # "Create new project", Dataset: production
```

Danach in `sanity.io/manage` unter *API -> CORS origins* die Domains
`http://localhost:3000` und die Vercel-URL mit *Allow credentials* eintragen.

**Vercel**

1. Repo auf vercel.com importieren — Framework wird als Next.js erkannt.
2. Env-Vars aus Abschnitt 8 eintragen (Production + Preview).
3. Deploy. Kein Build-Command-Override nötig.

## 10. Offene Punkte

- [ ] Echte Inhalte einpflegen — Checkliste in `INHALTE-BENOETIGT.md`
- [ ] Sanity-Projekt anlegen und CORS-Origins setzen
- [ ] Resend-Domain verifizieren (bis dahin läuft `onboarding@resend.dev`)
- [ ] Portrait, Projektbilder, CV-PDF hochladen
