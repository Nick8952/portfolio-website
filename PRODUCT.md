# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router, TypeScript), Tailwind CSS, Framer Motion. Statischer Export,
primär auf **Vercel** (`nick-hbr.vercel.app`, Nutzerentscheid 2026-11-10), gespiegelt auf
GitHub Pages (`nick8952.github.io/portfolio-website`). Kein CMS: Inhalte liegen als
typisierte Datendatei im Repo; Nick pflegt sie selbst.

## Users

**Primär:** Inhaberinnen und Inhaber kleiner Schweizer Betriebe — Fahrschulen,
Handwerk, Gastronomie, Reinigung, Hauswartung — mit einer veralteten oder
fehlenden Website. Sie landen hier über einen Demo-Link, den Nick ihnen geschickt
hat, oder über eine Empfehlung. Sie sind keine Technikerinnen; sie wollen wissen,
ob sie diesem jungen Anbieter vertrauen können, was es kostet und wie es abläuft.
Ihr Job auf der Seite: **entscheiden, ob sie eine Anfrage schicken.**

Sekundär (nicht gestalterisch bedient): Arbeitgeber, die den Namen googeln.

## Product Purpose

Nicks persönliche Website als Verkaufsinstrument für seinen Website-Nebenerwerb.
Sie zeigt, wer er ist, wie er ausgebildet ist, welche Websites er gebaut hat, und
nimmt Anfragen entgegen. Erfolg = eine Anfrage über das Formular.

## Positioning

**Demo zuerst, Entscheidung danach.** Nick baut die bestehende Website eines
Betriebs auf eigenes Risiko als moderne Demo neu und schickt den Link — der Kunde
sieht das Ergebnis, bevor er etwas zahlt. Kein Konzeptgespräch, kein Pflichtenheft,
unverbindlich. Dazu bewusste Einstiegspreise (rund ein Viertel bis ein Drittel
unter Agenturniveau), offen begründet mit seiner Ausbildungssituation.

## Operating Context

- Nick ist Lernender im **3. Lehrjahr, Informatiker EFZ, Fachrichtung
  Plattformentwicklung** (Lehrbetrieb und Schule: nicht bestätigt, nicht nennen).
- Nebenerwerb neben der Lehre; Arbeit abends/Wochenende.
- Ablauf mit Kunden: Demo bauen → Link schicken → Gespräch → Umsetzung → Betrieb.
- Über zwanzig Websites gebaut (Demos und Kundenprojekte), zehn Demos öffentlich
  erreichbar, **ein bezahlter Abschluss: Thai Restaurant Suwannaphum, Schlieren**
  (Demo 16.10.2026, live 21.10.2026 auf suwannaphum.ch, Stand 2026-11-10). Das ist
  ehrlich zu behandeln: keine Kundenlogos, keine erfundenen Testimonials, keine
  „zufriedene Kunden"-Zahl; jede Kennzahl mit Fussnote.

## Capabilities and Constraints

- Sections: Hero, Laufband, Referenz, Erkennen, Demos, Ablauf, Preise, Vergleich,
  Über mich mit Kennzahlen, Fragen, Anfrage (Formular).
- Formular sendet an **holzbechernick@gmail.com** (Nutzerentscheid). Da die Seite
  statisch gehostet ist, läuft der Versand über einen Formular-Dienst ohne Backend;
  Fallback ist Mailto.
- Sprache: Deutsch (Schweiz) — «ss» statt «ß», Preise in CHF.
- Statisches Hosting: keine Server-Routen, keine Bildoptimierung zur Laufzeit.
- Preise öffentlich als Richtwerte: Start ab CHF 1'200, Website ab 2'500, Website+
  ab 3'600, Betrieb ab 19 pro Monat (Nutzerentscheid 2026-09-14, von 2'900/4'200 gesenkt).
- Muss auf Handy einwandfrei funktionieren — Kunden öffnen den Link vom Telefon.
- Schweizer Recht: Impressum (UWG), Datenschutzerklärung (revDSG, EU-tauglich formuliert),
  keine Werbung mit fremden Namen/Logos ohne Einverständnis, keine Versprechen zu Vorleistung
  oder Antwortfristen (Nick, 11.11.2026).

## Brand Commitments

- Name: Nick Holzbecher. Kein Firmenname, kein Logo — die Person ist die Marke.
- Bindende visuelle Vorgabe (Nutzer): **hauptsächlich Weiss und Schwarz mit genau
  einer Akzentfarbe**, professionell, clean, mit hochwertigen Effekten. Vorbild für
  Effekte und Darstellungsformen seit 2026-11-10: kingofon.ch — aber hell (Nutzerentscheid).
- Bestehende Preislisten-Artefakte nutzen Kobalt `#1c50be` als Akzent; eine
  gemeinsame Akzentfarbe würde Website und Preisliste als ein Auftritt lesen.
- Ton: direkt, ehrlich, ohne Agentur-Floskeln. Ein Lernender, der gut ist und das
  nicht versteckt — aber auch nicht so tut, als hätte er zwanzig Jahre Erfahrung.

## Evidence on Hand

**Referenz (Kunde, live):** Thai Restaurant Suwannaphum, Zürcherstrasse 31, 8952 Schlieren —
www.suwannaphum.ch. Demo am 16.10.2026 ohne Auftrag gebaut, Website am 21.10.2026 unter
der eigenen Domain live; keine Cookies, kein Banner; unverbindlich für das Restaurant.
Das Restaurant wollte Nick auf *seiner* Website nicht als Gestalter nennen (22.10.2026) —
die Nennung *hier* als Referenz ist Nicks Entscheid und mit dem Restaurant zu klären.

Beispiele (ohne Auftrag entworfen, geprüft 2026-11-10) — auf der Seite **nur als Musterbetrieb**
(Nicks Regel 11.11.2026: kein Einverständnis der Betriebe → kein Name, Logo, Foto, Kontakt, Link;
neutrale Slugs in den Bild-URLs). Welche Demo hinter welchem Beispiel steht, weiss nur
`tools/websites-source.mjs`; das Regelwerk zur Anonymisierung liegt gitignoriert in `tools/muster.mjs`.

| Slug | Branche | Region |
|---|---|---|
| kanzlei | Anwaltskanzlei (sechs Sprachen) | Region Zürich |
| zahnarzt | Zahnarztpraxis (zweisprachig) | Region Zürich |
| bodenleger | Bodenleger | Region Zürich |
| nagelstudio | Nagelstudio | Region Zürich |
| sportcenter | Racketsport-Center | Region Zürich |
| maler | Malerbetrieb | Region Zürich |
| coiffeur | Coiffeursalon | Region Zürich |
| reinigung | Reinigungsfirma | Region Zürich |
| hauswartung | Hauswartung & Garten | Aargau |
| elektro | Elektrobetrieb | Region Zürich |

**Derzeit offline, nicht zeigen:** Gusto Campano (GitHub Pages aus, Vercel-Projekt gelöscht),
Fahrschul-Center und FKM Fahrschule (GitLab-Projekte nicht mehr öffentlich). Nicht öffentlich:
Fahrschule Gimenez, fahrschule-barbara, -deck, -genial, Garage Klausner, Letzistübli u. a.
**Fahrschule CH:** `fahrschule-ch.ch` zeigt weiterhin auf die alte Kundenseite (Weblication
CMS, geprüft 2026-11-10). Nicht zeigen, bis die Domain umgestellt ist.

**Vorhanden:** Portraitfoto (`public/portrait.jpg`). Aufnahmen aller Websites (fünf WebP je
Website, erzeugt mit `npm run screenshots`; Beispiele anonymisiert). Postadresse laut Nick:
8952 Schlieren (Strasse fehlt). Nicht MwSt-pflichtig (Auskunft 11.11.2026). LinkedIn-Profil.
**Fehlt, darf nicht erfunden werden:** Testimonials, Kundenlogos, Lehrbetrieb, Abschlussjahr.

## Product Principles

1. **Die Referenz ist das Argument, die Demos der Beleg.** Nichts auf der Seite
   behauptet Qualität — Suwannaphum zeigt sie als echtes Projekt, die zehn Demos
   zeigen die Bandbreite. Die Referenz bekommt den grössten Raum.
2. **Ehrlich über die Ausgangslage.** Lernender, Nebenerwerb, Einstiegspreise: das
   wird als Stärke erzählt, nicht versteckt. Kunden merken Bluff.
3. **Ein Weg, ein Ziel.** Alles führt zur Anfrage. Keine Nebenausgänge, kein Blog,
   keine Social-Wall.
4. **Vom Handy aus gedacht.** Der Link wird auf dem Telefon geöffnet, oft in einem
   Chat. Der erste Eindruck muss dort sitzen.
5. **Effekte tragen, nicht schmücken.** Bewegung nur da, wo sie Bedeutung hat.

## Accessibility & Inclusion

Zielgruppe schliesst ältere Betriebsinhaber ein: Kontraste AA, Schriftgrössen
grosszügig, Formular mit klaren Fehlermeldungen, keine reine Hover-Funktionalität.
`prefers-reduced-motion` wird respektiert.
