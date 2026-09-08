# Portfolio-Website

Persönliche Portfolio-Website auf Basis von **Next.js 15** (App Router, TypeScript),
**Tailwind CSS**, **Framer Motion** und **Sanity CMS** mit eingebettetem Studio
unter `/studio`. Ausgelegt auf Deployment über **Vercel**.

> **Die Seite läuft sofort — auch ohne Sanity und ohne Mailversand.**
> Fehlt die Sanity-Konfiguration, rendert sie mit klar erkennbaren Platzhaltern
> (alles in `[ECKIGEN KLAMMERN]`). Ein GitHub-Import in Vercel funktioniert
> deshalb ohne jede Vorarbeit.

---

## Inhalt

- [Schnellstart](#schnellstart)
- [Sanity einrichten](#sanity-einrichten)
- [Inhalte auf einen Schlag einspielen](#inhalte-auf-einen-schlag-einspielen)
- [Kontaktformular einrichten](#kontaktformular-einrichten)
- [Umgebungsvariablen](#umgebungsvariablen)
- [Deployment auf Vercel](#deployment-auf-vercel)
- [Inhalte pflegen](#inhalte-pflegen)
- [Projektstruktur](#projektstruktur)
- [Skripte](#skripte)
- [Bekannte Versionsabhängigkeiten](#bekannte-versionsabhängigkeiten)

---

## Schnellstart

Vorausgesetzt wird **Node.js 20 oder neuer**.

```bash
npm install
cp .env.example .env.local     # optional, siehe unten
npm run dev
```

- Website: <http://localhost:3000>
- Studio: <http://localhost:3000/studio>

Ohne `.env.local` zeigt die Seite Platzhalterinhalte, und `/studio` erklärt in drei
Schritten, wie das CMS angebunden wird.

---

## Sanity einrichten

Einmalig, dauert etwa fünf Minuten.

**1. Anmelden** (Google, GitHub oder E-Mail):

```bash
npx sanity login
```

**2. Projekt anlegen.** Der Befehl schreibt Projekt-ID und Dataset direkt in
`.env.local`:

```bash
npx sanity init --env .env.local
```

Bei den Rückfragen: *„Create new project"* wählen, einen Projektnamen vergeben,
als Dataset **`production`** (Default-Konfiguration bestätigen).

**3. Entwicklungsserver neu starten**, damit die neuen Variablen greifen:

```bash
npm run dev
```

Unter <http://localhost:3000/studio> steht jetzt das Studio.

**4. CORS-Freigabe eintragen.** Auf <https://sanity.io/manage> das Projekt öffnen,
dann **API → CORS origins → Add CORS origin**. Diese Adressen eintragen, jeweils
mit **Allow credentials**:

| Adresse | Wofür |
|---|---|
| `http://localhost:3000` | lokale Entwicklung |
| `https://<dein-projekt>.vercel.app` | Vercel-Produktion |
| `https://<deine-domain>.ch` | eigene Domain, falls vorhanden |

Ohne diesen Schritt lädt das Studio auf der jeweiligen Adresse nicht.

**5. Inhalte anlegen.** Entweder von Hand im Studio — oder auf einen Schlag,
siehe nächster Abschnitt.

---

## Inhalte auf einen Schlag einspielen

Rund zwei Dutzend Dokumente einzeln im Studio anzuklicken ist stumpfe Arbeit.
Stattdessen: **eine Datei ausfüllen, ein Befehl.**

**1.** [`content/inhalte.json`](./content/inhalte.json) im Editor öffnen und
ausfüllen. Alle Felder sind bereits mit Platzhaltern vorbelegt — du ersetzt nur
die Werte.

**2.** Bilder, Logos und den Lebenslauf nach `content/bilder/` legen. In der JSON
steht jeweils nur der **Dateiname**:

```json
"portrait": { "datei": "portrait.png", "alt": "Portraitfoto von Max Muster" }
```

**3.** Einen Schreib-Token anlegen — sanity.io/manage → *API → Tokens →
Add API token*, Berechtigung **Editor** — und in `.env.local` eintragen:

```env
SANITY_API_WRITE_TOKEN=sk...
```

**4.** Erst trocken prüfen, dann schreiben:

```bash
npm run seed -- --dry-run   # zeigt, was passieren würde; schreibt nichts
npm run seed                # schreibt wirklich
```

Gut zu wissen:

- **Beliebig oft wiederholbar.** Dokumente haben feste IDs und werden ersetzt,
  nicht dupliziert. Bilder werden über ihre Prüfsumme erkannt und nicht doppelt
  hochgeladen.
- **Alles oder nichts.** Der Schreibvorgang läuft in einer Transaktion — ein
  halb befülltes CMS kann nicht entstehen.
- **Fehlende Dateien sind kein Fehler.** Das Feld bleibt leer und die Website
  zeigt dort ihren Platzhalter.
- **Ab dann im Studio pflegen.** Ein erneuter Seed-Lauf würde Änderungen
  überschreiben, die du im Studio gemacht hast. Das Skript ist zum Befüllen
  gedacht, nicht zum Pflegen.

Welches Feld was bedeutet, steht in [`INHALTE-BENOETIGT.md`](./INHALTE-BENOETIGT.md).

---

## Kontaktformular einrichten

Das Formular verschickt über [Resend](https://resend.com) (kostenlos bis 3'000
Mails/Monat).

**Ohne Konfiguration** nimmt das Formular Anfragen an, protokolliert sie in den
Server-Logs und antwortet dem Absender mit einem ehrlichen Hinweis. Es geht also
nichts verloren und nichts kaputt — nur zugestellt wird noch nichts.

**Zum Scharfschalten:**

1. Auf <https://resend.com/api-keys> einen API-Key erzeugen.
2. In `.env.local` eintragen:

   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_TO_EMAIL=deine@adresse.ch
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   ```

3. **Für den Produktivbetrieb** die eigene Domain unter
   <https://resend.com/domains> verifizieren und `CONTACT_FROM_EMAIL` darauf
   umstellen, z. B. `kontakt@deine-domain.ch`.

   Die Adresse `onboarding@resend.dev` funktioniert nur zum Testen: Mails davon
   erreichen ausschliesslich die eigene Resend-Kontoadresse.

**Spam-Schutz** läuft über ein für Menschen unsichtbares Zusatzfeld
(„Honigtopf"). Füllt ein Bot es aus, wird die Anfrage verworfen — ohne CAPTCHA
und ohne Drittanbieter.

---

## Umgebungsvariablen

Alle Variablen sind optional; keine davon blockiert den Build.

| Variable | Zweck | Ohne Wert |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity-Projekt-ID | Platzhalterinhalte |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API-Datum | `2024-10-01` |
| `SANITY_API_READ_TOKEN` | Token für Entwurfsvorschau | nur veröffentlichte Inhalte |
| `SANITY_API_WRITE_TOKEN` | nur für `npm run seed`, rein lokal | Seed-Lauf bricht mit Hinweis ab |
| `RESEND_API_KEY` | Mailversand | Formular protokolliert nur |
| `CONTACT_TO_EMAIL` | Empfänger der Formularmails | Formular protokolliert nur |
| `CONTACT_FROM_EMAIL` | Absenderadresse | `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | Basis für Canonicals, Sitemap, OG | Vercel-URL, lokal `localhost:3000` |

`SANITY_API_READ_TOKEN` und `RESEND_API_KEY` sind **Geheimnisse** — niemals mit
`NEXT_PUBLIC_` präfixen und nie committen. `.env.local` ist in `.gitignore`.

---

## Deployment auf Vercel

1. Auf <https://vercel.com/new> das GitHub-Repository importieren.
   Vercel erkennt Next.js automatisch — Build-Command und Output-Verzeichnis
   müssen **nicht** angepasst werden.
2. Unter **Settings → Environment Variables** die Werte aus der Tabelle oben
   eintragen, jeweils für **Production** *und* **Preview**.
3. **Deploy** drücken.
4. Nach dem ersten Deployment die Vercel-Adresse in Sanity als CORS-Origin
   nachtragen (siehe Schritt 4 oben), sonst lädt `/studio` in Produktion nicht.

Inhaltsänderungen im Studio sind nach spätestens **60 Sekunden** live
(Incremental Static Regeneration). Ein Webhook ist bewusst nicht nötig.

---

## Inhalte pflegen

Alles läuft über <https://deine-adresse/studio>. Code-Kenntnisse braucht es nicht.

Die Seitenleiste ist in der Reihenfolge der Website sortiert:

| Eintrag | Was drinsteht |
|---|---|
| **Grundeinstellungen** | Name, Jobtitel, Kontakt, Social Links, Lebenslauf-PDF, SEO |
| **Hero** | Die grosse Typo, Portrait, die zwei Schaltflächen |
| **Über mich** | Headline und die beiden Textspalten |
| **Section-Texte** | Labels, Headlines und Einleitungen aller übrigen Abschnitte |
| **Kennzahlen** | Die grossen Zahlen |
| **Werkzeuge** | Technologien mit Logo |
| **Leistungen** | Die drei Karten |
| **Werdegang** | Stationen der Timeline |
| **Projekte** | Projektkacheln |
| **Stimmen** | Testimonials |

Zwei Dinge, die beim Pflegen helfen:

- **Headlines sind zweigeteilt.** Der erste Teil steht im kräftigen Ton, der
  zweite im hellen und wird beim Scrollen Wort für Wort eingefärbt. Wo die Grenze
  liegt, entscheidest du.
- **Reihenfolge** steuert überall das Feld *Reihenfolge* — kleinere Zahl steht
  weiter oben bzw. weiter links.

---

## Projektstruktur

```
app/                    Routen, Layout, globale Styles
  api/contact/          Kontaktformular → Resend
  studio/[[...tool]]/   Eingebettetes Sanity Studio
components/
  layout/               Header (mit Mobilmenü), Footer
  sections/             Die zehn Abschnitte der Startseite
  ui/                   Wiederverwendbare Bausteine
sanity/
  schemas/              Inhaltsmodell
  structure.ts          Aufbau der Studio-Seitenleiste
  queries.ts            Alle GROQ-Abfragen
  fetch.ts              Lesezugriff mit Platzhalter-Fallback
lib/fallback.ts         Die Platzhalterinhalte
types/content.ts        Typen aller Inhalte
```

Ausführlich — inklusive Architekturentscheidungen und Designsystem — in
[`CLAUDE.md`](./CLAUDE.md).

---

## Skripte

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Entwicklungsserver auf Port 3000 |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktions-Build lokal ausliefern |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript ohne Ausgabe prüfen |
| `npm run sanity:init` | Sanity-Projekt anlegen, schreibt in `.env.local` |
| `npm run seed` | `content/inhalte.json` ins CMS schreiben, inkl. Bild-Uploads |
| `npm run seed -- --dry-run` | Dasselbe trocken — zeigt nur, was passieren würde |

---

## Bekannte Versionsabhängigkeiten

Zwei Pakete sind bewusst festgehalten, weil dieses Projekt auf **Next 15** läuft:

- **`sanity` ist exakt auf `4.22.1` gepinnt.** Ab Sanity 5 wird `useEffectEvent`
  direkt aus `react` importiert; das von Next 15.5 gebündelte React kennt diesen
  Hook nicht, und der Build bricht ab. Sanity 4.22.1 nutzt dafür das Ponyfill
  `use-effect-event`.
- **`next-sanity` bleibt auf `^11.6.13`.** Version 12 und 13 verlangen Next 16.

Für einen Wechsel auf Next 16 müssen `next`, `next-sanity` und `sanity`
**gemeinsam** hochgezogen werden.

---

## Qualität

- Responsiv geprüft auf 375 / 768 / 1024 / 1440 px — ohne horizontales Scrollen
- Alle Textfarben erfüllen WCAG AA (4,5:1 im Fliesstext, 3:1 in Grossschrift)
- Vollständig mit der Tastatur bedienbar, Skip-Link als erster Tabstopp,
  sichtbarer Fokusring
- `prefers-reduced-motion` wird durchgängig respektiert
- Bilder über `next/image` mit AVIF/WebP, Sanity-Hotspot wird berücksichtigt
- SEO: Meta-Tags, OpenGraph, Twitter Cards, JSON-LD (`Person`), Sitemap, robots.txt
