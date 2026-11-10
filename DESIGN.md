# Design

Visuelle Welt der Website. Produktwahrheit: `PRODUCT.md`. Code: `CLAUDE.md`.

## Modus

**Persuade.** Der Besucher soll eine Anfrage schicken. Vorbild für Rhythmus,
Inszenierung und Darstellungsformen ist kingofon.ch (Zürcher Agentur, Framer,
dunkel) — übernommen wurde die **Dramaturgie**, nicht die Oberfläche: Die Seite
bleibt hell, zeigt nur Belegtes und hat statt eines Stock-Videos die eigene Arbeit.

## Palette

| Token | Wert | Rolle |
|---|---|---|
| paper | `#FFFFFF` | Grund |
| ink | `#0A0A0A` | Text, Buttons, die Regelfall-Karte in den Preisen |
| kobalt | `#1C50BE` | *Der eine Akzent.* Wechselndes Hero-Wort, Haupt-CTA, Schrägstrich der Eyebrows, Punkte, Häkchen, Cursor-Ring, Fokus, Selektion. 7,1:1 auf Papier. |
| kobalt-lift | `#6B8FF0` | Kobalt für Text auf Tinte (6,4:1). Nie auf Papier. |
| muted | `#6B6B6B` | Nebentext, Mono-Etiketten, 5,7:1 |
| hairline | `#E5E5E5` | Linien, Rahmen, Section-Grenzen |
| sunk | `#F5F5F5` | Eingelassene Flächen (Bühnen der Browserfenster, Footer) |

Die Screenshots der Websites sind die einzige weitere Farbe. Das ist Absicht:
die Arbeit bringt die Farbe, das Layout nicht.

## Typografie

- **Bricolage Grotesque** (variabel, `opsz`) — Headlines, `font-semibold`,
  Laufweite −0,02 bis −0,035em. Display max. 6rem. Grosse Zahlen (Preise,
  Kennzahlen, Schritt-Nummern) ebenfalls Bricolage mit Tabellenziffern.
- **Instrument Sans** — Fliesstext, `font-feature-settings: 'ss01','cv11'`.
- **Geist Mono** — das Etikett-System (`.eyebrow`): 0,75rem, Versalien, +0,14em.
  Varianten: `--slash` (Kobalt-Schrägstrich davor, Section-Anfang), `--box`
  (eingelassene Box mit Kobalt-Punkt, Meta in Karten), `--live` (Punkt mit Hof).
  Dazu Uhr, Adresszeile im Browserfenster, Kennzahl-Fussnoten. **Nie Fliesstext,
  nie dekorative Terminal-Zitate.**
- Zeilenlänge Fliesstext ≤ 38rem (`max-w-measure`). Alle Schriften via `next/font`.

## Struktur (die Dramaturgie)

Hero → Laufband → **Referenz** → Erkennen → Demos → Ablauf → Preise → Vergleich →
Über mich (+ Kennzahlen) → Fragen → Anfrage → Footer. Eine Seite, Ankerlinks.
Jede Section: Schrägstrich-Eyebrow, Headline links, Lede rechts (12er-Raster),
Hairline darüber. Section-Abstand `clamp(6rem, 12vw, 11rem)`.

## Die Darstellungsformen

- **Schaufenster-Wand (Hero):** drei perspektivisch gekippte Spalten
  (`perspective(1600px) rotateX(8°) rotateY(−14°) rotateZ(4°)`) aus den
  Handy-Aufnahmen aller elf Websites, die langsam laufen (58/72/64 s, Mitte
  gegenläufig), oben/unten/seitlich ins Papier maskiert. Antippen führt zu den
  Websites. Unter 768px und bei reduzierter Bewegung steht sie.
- **Browserfenster** (`components/ui/Browser`): drei Punkte, Adresszeile in Mono,
  darunter die Aufnahme. Trägt die Referenz gross und jede Demo-Karte klein.
- **Referenz-Bühne:** Karte mit Hairline und grossem Schatten; links Browserfenster
  mit der *ganzen* Startseite (bis 3600px), die beim Scrollen der Seite im Fenster
  mitfährt (`useScroll` → `translateY`), dazu das iPhone; rechts Meta-Box, Titel,
  Text, vier Fakten mit Häkchen, Link, Hairline, drei Kennzahlen (Zahl Bricolage,
  Einheit muted, Etikett Mono).
- **Demo-Karten:** Browserfenster auf eingelassener Bühne, iPhone unten links,
  Mono-Meta «Branche · Ort · Jahr», Name, ein Satz, «Website öffnen ↗». Hover
  (nur Maus): die Website scrollt im Fenster in 6,5 s nach unten (`100cqh`), beim
  Verlassen zurück. Sechs sichtbar, «Weitere 4 anzeigen».
- **Erkennen:** drei dünne Ringe (`.orbit`, zwei drehen sich in 110/150 s),
  Headline mittig, fünf Glas-Pillen, die auf grossen Bildschirmen beim Scrollen
  (Section 170vh, Bühne klebt) nacheinander erscheinen; sonst im Fluss.
- **Ablauf:** vier Spalten, nach rechts abgetreppt (0/2,5/5/7,5rem), Hairline oben,
  Mono «Schritt 01», grosse Kobalt-Ziffer.
- **Preise:** drei Karten, der Regelfall schwarz und 2rem höher gesetzt, Zahlen
  3,5rem, Mono-Meta, Hover mit Kobalt-Saum und Glanzlicht.
- **Vergleich:** Tabelle mit Hairlines, erste Datenspalte eingelassen mit Kobalt-Kopf.
- **Kennzahlen:** vier Kacheln im 1px-Raster, kurzer Count-up beim ersten
  Hereinscrollen, Fussnote sagt, worauf sich die Zahl bezieht.
- **Fragen:** klebende Headline mit Anfrage-Karte links, Akkordeon rechts.

## Glas

`glass-lite` (Füllung, brechender Rand, Glanz — ohne Weichzeichnung) auf
Pillen, Sekundär-Buttons, Anfrage-Karte, Preiskarten aussen, Formular-Karte.
`backdrop-filter` nur auf der Navigationsleiste (`.navleiste`) und dem
Mobil-Menü. Nie als Füllung ganzer Sections.

## Bewegung

- Natives Scrollen (kein Lenis — fühlte sich verzögert an).
- Dauerbewegungen (Wand, Laufband, Ringe, Hero-Wort) pausieren ausserhalb des
  Viewports und bei verborgenem Tab.
- Einblendungen: eine (`Reveal`): 22px von unten, 0,7 s, einmalig, ab 20 % Sichtbarkeit.
- Scroll-gekoppelt nur zweimal: die Referenz-Aufnahme und die fünf Pillen.
- Cursor: Kobalt-Ring, über Links weiter, über Karten als Etikett («Öffnen», «Ansehen»).
- Magnetische Haupt-CTAs. Preiskarten federn hoch.
- `prefers-reduced-motion`: alles steht sofort im Endzustand, Wand flach.

## Browser-Oberflächen

Selektion Kobalt/Papier, Fokusring Kobalt 2px mit 3px Versatz, Caret Kobalt,
Scrollbar dünn in Tinte/22 %, Link-Unterstrich aus `hairline` mit 0,22em Versatz.

## Nicht tun

Dunkler Grund als Section (Nicks Entscheid), Gradient-Text, Glas als Section-Füllung,
Grain-Overlays, Mono als Fliesstext oder Terminal-Kostüm, Emoji als Icons,
System-Display-Schriften, mehr als eine Akzentfarbe, Logo-Wände, Testimonials ohne
Zitatgeber, Zahlen ohne Fussnote, Stock-Fotos/-Videos.
