# Design

Visuelle Welt der Website. Produktwahrheit: `PRODUCT.md`. Code: `CLAUDE.md`.

## Modus

**Persuade.** Der Besucher soll eine Anfrage schicken. Die Websites (der Beweis)
kommen deshalb vor allem anderen; jede Section führt zum Formular.

## Palette

| Token | Wert | Rolle |
|---|---|---|
| paper | `#FFFFFF` | Grund |
| ink | `#0A0A0A` | Text, dunkle Section (Preise), Buttons |
| kobalt | `#1C50BE` | *Der eine Akzent.* Wechselndes Hero-Wort, Haupt-CTA, Cursor-Ring, Fokus, Selektion, Caret. 7,1:1 auf Papier. |
| kobalt-lift | `#6B8FF0` | Kobalt für Text auf Tinte (6,4:1). Nie auf Papier. |
| muted | `#6B6B6B` | Nebentext, 5,7:1 |
| hairline | `#E5E5E5` | Linien, Rahmen |
| sunk | `#F5F5F5` | Eingelassene Flächen (Browserrahmen-Kopf, Foto-Platzhalter) |

Die Screenshots der Demos sind die einzige weitere Farbe. Das ist Absicht: die
Arbeit bringt die Farbe, das Layout nicht.

## Typografie

- **Bricolage Grotesque** (variabel, `opsz`) — alle Headlines, `font-semibold`,
  Laufweite −0,02 bis −0,03em. Display max. 6rem.
- **Instrument Sans** — Fliesstext, `font-feature-settings: 'ss01','cv11'`.
- Zeilenlänge Fliesstext ≤ 38rem (`max-w-measure`). Preise mit Tabellenziffern.
- Beide selbst gehostet über `next/font`.

## Struktur

Hero → Websites (Dock) → Ablauf → Preise (dunkel) → Über mich → Anfrage → Footer.
Eine Seite, Ankerlinks. Keine Eyebrows, Sektionsnummern nur im Ablauf und als
Positionszähler im Sheet («02 / 06»).

**Preise als drei Karten** (Nicks Vorlage, 14.09.): Mitte erhöht mit Kobalt-Rand und
Badge «Der Regelfall», Aussenkarten 94 % und 10° nach innen gedreht, federnder Einzug
(spring 100/30). Ohne Monatlich/Jährlich-Schalter — die Preise sind einmalig. Das ist die
eine bewusste Ausnahme von «keine Kartenraster».

## Liquid Glass (iOS 26)

Drei Merkmale, die es vom Milchglas unterscheiden: **fast durchsichtig** (38 %
Papierfüllung, blur 18px, saturate 1.9, brightness 1.06), ein **brechender Rand**
(1,5px-Ring aus Verlauf — hell oben links, dunkel in der Mitte, hell unten rechts —
per Maske ausgeschnitten, z-index −1 unter dem Inhalt) und ein **Glanz oben links**.
Keine SVG-Linsenverzerrung: auf einem fixierten Element muss sie bei jedem Scroll-Frame
den Hintergrund neu verzerren — das hat sichtbar geruckelt. `backdrop-filter` nur auf
Nav, Sheet und Menü; Dock, Preis-Panel und Sekundär-Buttons nutzen `glass-lite`
(Füllung, Rand, Glanz — ohne Weichzeichnung, über einfarbigem Grund gleichwertig).

**Kontrast:** 38 % über Schwarz ergibt 2,6:1. Die gescrollte Nav liegt über der
Preis-Section und bekommt deshalb 70 % Füllung (≥4,5:1). Glas als Section-Füllung
bleibt tabu. **Nur auf der schwebenden Schicht:** Nav-Pille,
Sekundär-Buttons, Dock-Kacheln, Sheet, Regelfall-Panel (dunkle Variante). Damit es
etwas zu brechen gibt, liegt im Hero ein weiches Umgebungslicht (Kobalt 16 %,
Tinte 6 %, blur 80px, treibt langsam). Ohne `backdrop-filter`-Unterstützung wird
das Glas undurchsichtig, damit Text lesbar bleibt.

## Das iPhone

`components/ui/IPhone.tsx` — reine Geometrie im Gehäuse-Verhältnis 716:1476:
Titanrahmen mit Lichtkante, Dynamic Island, Aktions- und Lautstärketasten links,
Seitentaste rechts, Statusleiste mit 9:41 und Glyphen. Die Website beginnt *unter*
der Statusleiste; dahinter liegt ihr eigener oberer Rand weichgezeichnet, damit die
Leiste die Farbe der Website trägt. Alle inneren Masse in `cqi` — dasselbe Gerät
funktioniert bei 19rem im Hero und bei 7rem im Sheet. Websites mit hellem Kopf
bekommen dunkle Glyphen (`hellerKopf` in `content.ts`).

## Websites: Dock und Sheet

Die Websites sind ein Angebot, kein Zwang. Eine Reihe aus sechs kleinen Glas-Kacheln
(2 / 3 / 6 Spalten); Antippen öffnet ein Sheet — auf dem Handy von unten wie iOS, am
Desktop zentriert — mit Desktop- und Handy-Screenshot, einem Satz, dem Link.
Esc schliesst, Pfeiltasten blättern, Fokus bleibt drin, Seite dahinter dunkel und
weichgezeichnet.

## Bewegung

- **Der eine Moment:** das Sheet — steigt auf, die Seite dahinter tritt zurück.
- **Nav-Pille:** oben 768px kompakt, gescrollt volle Spaltenbreite und 64px hoch;
  1,2 s mit `cubic-bezier(0.32,0.72,0,1)` — langsam und weich, nicht zackig.
- Hero: gestaffelte Einblendung einmalig beim Laden; das Branchen-Wort wechselt
  alle 2,6 s zusammen mit dem Telefon-Screenshot. Das ist Inhalt, nicht Deko.
- Cursor: Kobalt-Ring, der dem Zeiger nachläuft; über Links weitet er sich, über
  Websites wird er zum Etikett «Ansehen». Nur feiner Zeiger.
- Magnetische Buttons: Haupt-CTAs ziehen leicht zum Zeiger.
- Natives Scrollen (kein Lenis — fühlte sich verzögert an); Anker per CSS `scroll-behavior`.
- Alles Übrige: keine Einblendungen. Inhalt steht.

## Browser-Oberflächen

Selektion Kobalt/Papier, Fokusring Kobalt 2px mit 3px Versatz, Caret Kobalt,
Scrollbar dünn in Tinte/22 %, Link-Unterstrich aus `hairline` mit 0,22em Versatz.

## Nicht tun

Gradient-Text, Glas als Section-Füllung, farbige Linksbalken, Grain-Overlays, Monospace als
Kostüm, Emoji als Icons, System-Display-Schriften, mehr als eine Akzentfarbe.
