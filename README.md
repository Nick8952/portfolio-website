# Nick Holzbecher — Website

Persönliche Website und Anfrageseite für Websites.
**Live:** https://nick-hbr.vercel.app/ (Vercel) · Spiegel: https://nick8952.github.io/portfolio-website/

Next.js 15 · Tailwind · Framer Motion · statischer Export, derselbe Code auf Vercel
und GitHub Pages. Kein CMS: alle Inhalte stehen in einer Datei.

## Inhalte ändern

Alles — Texte, Preise, Referenz, Demos, Fragen, Vergleich, Kennzahlen — steht in
**`lib/content.ts`**. Ändern, speichern, auf `main` pushen. Vercel und GitHub Pages
bauen selbst; nach etwa zwei Minuten ist beides aktualisiert.

**Ein Beispiel hinzufügen (Demo ohne Auftrag → nur als Musterbetrieb):**

1. Eintrag in `lib/content.ts` unter `websites` mit **neutralem Slug** (z. B. `garage`), Status
   `beispiel`, beschreibendem Titel, Branche, Region, `.example`-Adresse, ein Satz — kein Firmenname,
   kein Link.
2. Denselben Slug mit der Demo-Adresse und `anonym: true` in `tools/websites-source.mjs` eintragen.
3. Regelwerk in `tools/muster.mjs` ergänzen (Namensvarianten, Personen, Adressen, Telefone,
   E-Mails, Logo-/Banner-/Foto-Selektoren, Textstellen mit Ersatz) — Vorlage: die anderen Einträge;
   die Datei ist gitignoriert, Sicherung im Brain.
4. `ONLY=<slug> npm run screenshots` und die Kontrollbilder in `pruefung/anonym/` anschauen: darf
   nichts mehr auf den Betrieb hinweisen.

**Einen Kunden hinzufügen (mit Einverständnis):** Status `kunde`, Name und `url`, in
`tools/websites-source.mjs` `anonym: false`.

Für beides danach:
5. `npm run screenshots` — erzeugt die fünf WebP-Bilder in `public/websites/`
   (erster Bildschirm und ganze Seite, Desktop und Handy, plus eine kleine
   Handy-Aufnahme für die Wand im Hero). Nur eine Website: `ONLY=<slug> npm run screenshots`.
   Hat die Website oben einen hellen Kopf, in `content.ts` `hellerKopf: true` setzen
   (dunkle Glyphen in der iPhone-Statusleiste).
6. Committen und pushen.

## Dark Mode

Folgt der Systemeinstellung; der Schalter in der Navigation überschreibt sie (localStorage
`design`). Farben sind Variablen in `app/globals.css` (`html[data-theme='dark']`).

## Rechtsseiten

`/impressum/` (`lib/impressum.ts`) und `/datenschutz/` (`lib/datenschutz.ts`). Bei neuen Diensten
(Formular, Statistik, Karte) zuerst die Datenschutzerklärung anpassen. Die Postadresse im Impressum
ist noch unvollständig (nur PLZ/Ort).

Voraussetzung für Schritt 3: Google Chrome ist installiert. Das Skript kennt die
üblichen Orte auf Windows und macOS; liegt Chrome woanders, den Pfad als `CHROME_PATH` setzen.

**Prüfen vor dem Push:** `BASE_PATH= SITE_ORIGIN=http://localhost:4173 npm run build && npm run vorschau`
fotografiert die Seite nach `pruefung/` (Desktop und Handy, in Scroll-Schritten) und meldet
Konsolenfehler und seitlichen Überlauf.

## Formular

Das Anfrageformular sendet über [FormSubmit](https://formsubmit.co) an
`holzbechernick@gmail.com` — ohne Konto, ohne Backend, darum läuft es auf GitHub Pages.

**Einmalig aktivieren:** Beim allerersten Versand schickt FormSubmit eine
Aktivierungs-Mail an diese Adresse. Erst nach dem Klick auf den Link darin werden
Anfragen zugestellt. Also: Formular einmal selbst ausfüllen, Mail bestätigen, fertig.

Schlägt der Versand fehl, zeigt die Seite die E-Mail-Adresse zum direkten
Anschreiben. Spam-Schutz über ein unsichtbares Feld, ohne CAPTCHA.

Andere Empfängeradresse: `email` in `lib/content.ts` ändern — und die Aktivierung
für die neue Adresse einmal wiederholen.

## Lokal arbeiten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statischer Export nach out/
```

## Eigene Domain

1. `public/CNAME` mit der Domain anlegen (eine Zeile, z. B. `nickholzbecher.ch`).
2. In GitHub: Settings → Pages → Custom domain eintragen, DNS beim Registrar wie dort beschrieben.
3. In `.github/workflows/deploy.yml`: `SITE_ORIGIN` auf die Domain, `BASE_PATH` auf `''`.

## Struktur

```
app/               Layout, Startseite, robots, sitemap, Favicon
components/        layout (Nav, Footer) · sections · motion (Lenis, Cursor, Magnetic)
lib/content.ts     Alle Inhalte
lib/utils.ts       Helfer
public/websites/   Screenshots der Demos (erzeugt, nicht von Hand)
tools/             Screenshot-Skript
PRODUCT.md         Wer die Seite wofür braucht
DESIGN.md          Farben, Typografie, Bewegung
CLAUDE.md          Kontext für Claude-Code-Sessions
```
