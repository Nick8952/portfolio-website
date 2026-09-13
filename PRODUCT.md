# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router, TypeScript), Tailwind CSS, Framer Motion. Statischer Export
auf GitHub Pages (`nick8952.github.io/portfolio-website`), gleiches Repo und gleiche
URL wie zuvor — der alte Code wird vollständig ersetzt (Nutzerentscheid 2026-09-12).
Kein CMS: Inhalte liegen als typisierte Datendatei im Repo; Nick pflegt sie selbst.

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
keine Vorabkosten. Dazu bewusste Einstiegspreise (rund ein Viertel bis ein Drittel
unter Agenturniveau), offen begründet mit seiner Ausbildungssituation.

## Operating Context

- Nick ist Lernender im **3. Lehrjahr, Informatiker EFZ, Fachrichtung
  Plattformentwicklung** (Lehrbetrieb und Schule: nicht bestätigt, nicht nennen).
- Nebenerwerb neben der Lehre; Arbeit abends/Wochenende.
- Ablauf mit Kunden: Demo bauen → Link schicken → Gespräch → Umsetzung → Betrieb.
- Bisher rund elf Demos gebaut, sechs davon öffentlich erreichbar, noch kein
  bezahlter Abschluss (Stand 2026-09-12). Das ist ehrlich zu behandeln: keine
  Kundenlogos, keine erfundenen Testimonials, keine „zufriedene Kunden"-Zahl.

## Capabilities and Constraints

- Sections: Über mich, Ausbildung, Websites (Portfolio), Anfrage (Formular).
- Formular sendet an **holzbechernick@gmail.com** (Nutzerentscheid). Da die Seite
  statisch gehostet ist, läuft der Versand über einen Formular-Dienst ohne Backend;
  Fallback ist Mailto.
- Sprache: Deutsch (Schweiz) — «ss» statt «ß», Preise in CHF.
- Statisches Hosting: keine Server-Routen, keine Bildoptimierung zur Laufzeit.
- Preise: Richtwerte existieren (Start ab CHF 1'200, Website ab 2'900, Website+
  ab 4'200, Betrieb 19/39 pro Monat). **Ob sie öffentlich stehen: offen.**
- Muss auf Handy einwandfrei funktionieren — Kunden öffnen den Link vom Telefon.

## Brand Commitments

- Name: Nick Holzbecher. Kein Firmenname, kein Logo — die Person ist die Marke.
- Bindende visuelle Vorgabe (Nutzer): **hauptsächlich Weiss und Schwarz mit genau
  einer Akzentfarbe**, professionell, clean, mit hochwertigen Effekten.
- Bestehende Preislisten-Artefakte nutzen Kobalt `#1c50be` als Akzent; eine
  gemeinsame Akzentfarbe würde Website und Preisliste als ein Auftritt lesen.
- Ton: direkt, ehrlich, ohne Agentur-Floskeln. Ein Lernender, der gut ist und das
  nicht versteckt — aber auch nicht so tut, als hätte er zwanzig Jahre Erfahrung.

## Evidence on Hand

Öffentlich erreichbare eigene Websites (geprüft 2026-09-13):

| Projekt | Branche | Ort | URL |
|---|---|---|---|
| FKM Fahrschule Klaus Müller | Fahrschule | Zürich | fahrlehrer-zuerich-fdb7e6.gitlab.io |
| Altec Elektro | Elektro-Handwerk | Zürich | altec-elektro-website-ae0768.gitlab.io |
| Fahrschul-Center | Fahrschule | Zürich-Oerlikon | fahrschul-center-demo-bfeae8.gitlab.io |
| Gusto Campano | Ristorante Pizzeria | Zürich-Affoltern | nick8952.github.io/gusto-campano-website |
| H&G Dienstleistungen | Hauswartung/Garten | Zufikon AG | nick8952.github.io/hg-dienstleistungen-website |
| Clean-Express | Reinigung | Birmensdorf ZH | nick8952.github.io/clean-express-website |

Nicht öffentlich (nicht zeigen): Fahrschule Gimenez, fahrschule-barbara, -deck, -genial.
**Fahrschule CH:** Domain `fahrschule-ch.ch` zeigt noch auf die alte Kundenseite (geprüft
2026-09-13 per Screenshot — Jimdo-Cookie-Banner); die Demo ist nicht öffentlich. Nicht zeigen,
bis die Domain umgestellt ist.

**Fehlt, darf nicht erfunden werden:** Portraitfoto, Testimonials, Kundenlogos,
Lehrbetrieb, Abschlussjahr, Screenshots der Demos (werden beim Build erzeugt).

## Product Principles

1. **Die Demo ist das Argument.** Nichts auf der Seite behauptet Qualität — die
   sechs Websites belegen sie. Jede bekommt Raum, keine wird zur Kachel degradiert.
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
