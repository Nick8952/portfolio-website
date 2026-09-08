# Inhalte, die noch gebraucht werden

Die Website steht und ist deploybar. Was noch fehlt, sind **deine** Inhalte.
Zwei Wege führen dorthin: einzeln im Studio unter `/studio`, oder alles auf
einmal über eine Datei (siehe unten). Programmieren musst du in beiden Fällen
nichts.

Solange etwas fehlt, zeigt die Seite einen Platzhalter in `[ECKIGEN KLAMMERN]`.
Nichts davon ist erfunden: es stehen bewusst keine falschen Jahreszahlen,
Firmennamen oder Kennzahlen drin.

---

## Der schnelle Weg

Statt alles im Studio anzuklicken: **[`content/inhalte.json`](./content/inhalte.json)
ausfüllen, Bilder nach `content/bilder/` legen, dann**

```bash
npm run seed -- --dry-run   # prüfen
npm run seed                # schreiben
```

Das legt alle Dokumente auf einmal an und lädt die Bilder hoch. Der Befehl ist
beliebig oft wiederholbar. Details in der
[README](./README.md#inhalte-auf-einen-schlag-einspielen).

Die Abschnitte unten erklären, **was** in die jeweiligen Felder gehört — egal ob
du sie in der JSON oder im Studio ausfüllst. Die Feldnamen sind dieselben.

**Tipp zur Reihenfolge:** Grundeinstellungen und Hero zuerst — danach ist die
Seite bereits vorzeigbar. Der Rest lässt sich nachziehen.

---

## 1. Grundeinstellungen  ·  *Studio → Grundeinstellungen*

| Feld | Was du brauchst |
|---|---|
| Name | Dein voller Name, so wie er in der Navigation stehen soll |
| Jobtitel | z. B. „Softwareentwickler" oder „Full-Stack-Entwicklerin" |
| Standort | z. B. „Zürich, Schweiz" |
| Kurzbeschreibung | Zwei Sätze für den Footer: was du baust und für wen |
| E-Mail-Adresse | Wird im Footer verlinkt |
| Telefonnummer | Optional — leer lassen blendet sie aus |
| Lebenslauf | Dein CV als **PDF** zum Hochladen |
| Social Links | GitHub, LinkedIn, X … jeweils vollständige Adresse |
| Seitentitel | Für Browser-Tab und Google, bis 60 Zeichen |
| Meta-Beschreibung | Der Text unter dem Titel bei Google, 120–160 Zeichen |
| Vorschaubild | 1200 × 630 px, erscheint beim Teilen des Links. Ohne Upload wird automatisch eins erzeugt |

---

## 2. Hero  ·  *Studio → Hero*

| Feld | Was du brauchst |
|---|---|
| Zeile über der Beschreibung | Kurzer Gruss, z. B. „Willkommen in meinem Portfolio" |
| Grosse Typo, obere Zeile | **Ein Wort**, z. B. `SOFTWARE` |
| Grosse Typo, Riesenwort | **Ein Wort, max. 12 Zeichen**, z. B. `ENGINEER` |
| Kurzbeschreibung | Zwei bis drei Zeilen neben dem Portrait |
| **Portraitfoto** | Siehe Hinweis unten |
| Schaltfläche 1 | Beschriftung, üblicherweise „Lebenslauf laden" |
| Schaltfläche 2 | Beschriftung + Adresse deines GitHub-Profils |

> **Zum Portraitfoto.** Am stärksten wirkt ein **freigestelltes** Foto (Hintergrund
> entfernt, PNG mit Transparenz) — es ragt dann über die grosse Schrift, so wie es
> das Design vorsieht. Ein normales Foto funktioniert auch, wirkt aber flacher.
> Hochformat, mindestens 1200 px hoch. Den Hotspot im Studio auf das Gesicht
> setzen, danach richtet sich der Zuschnitt auf dem Handy.

---

## 3. Über mich  ·  *Studio → Über mich*

| Feld | Was du brauchst |
|---|---|
| Headline, Teil 1 (kräftig) | Die Kernaussage |
| Headline, Teil 2 (hell) | Der Rest des Satzes |
| Textspalte links | ~40 Wörter: woher du kommst, wie du zur Entwicklung gekommen bist |
| Textspalte rechts | ~40 Wörter: wie du arbeitest, was eine Zusammenarbeit ausmacht |

---

## 4. Kennzahlen  ·  *Studio → Kennzahlen*

Zwei Einträge sind angelegt. Pro Eintrag:

- **Zahl** — als Text, damit Zusätze möglich sind: `320+`, `12`, `5 Mio.`
- **Bezeichnung** — was die Zahl zählt
- **Erläuterung** — ein Satz, der sie einordnet

Dazu unter *Section-Texte → Zahlen* ein **Begleitbild** im Querformat (4:3),
mindestens 1000 px breit — z. B. du bei der Arbeit.

> Nur eintragen, was stimmt. Eine ehrliche `12` wirkt besser als eine `320+`,
> die bei Nachfrage auseinanderfällt.

---

## 5. Werkzeuge  ·  *Studio → Werkzeuge*

Sechs Platzhalter sind angelegt. Pro Werkzeug:

- **Name** — z. B. „React"
- **Logo** — SVG oder PNG mit transparentem Hintergrund, quadratisch.
  Ohne Logo wird der Anfangsbuchstabe angezeigt.
- **Kategorie** — optional, z. B. „Frontend"

Logos findest du meist auf der jeweiligen Projektseite unter „Brand" oder
„Press Kit". Sechs bis acht Einträge sehen am besten aus.

---

## 6. Leistungen  ·  *Studio → Leistungen*

Drei Karten sind angelegt. Pro Karte:

- **Symbol** — aus der Liste wählen (Code, Datenbank, Testing, Cloud, Mobile, Performance)
- **Titel** — max. 40 Zeichen
- **Beschreibung** — zwei Zeilen: was du lieferst und woran man erkennt, dass es gut ist
- **Ziel des Pfeils** — wohin der Pfeil führt, z. B. `#kontakt`

---

## 7. Werdegang  ·  *Studio → Werdegang*

Pro Station:

- **Position** und **Firma**
- **Von** / **Bis** — Jahr als Text, für die laufende Stelle `heute`
- **Beschreibung** — woran du gearbeitet hast und was sich dadurch verändert hat
- **Reihenfolge** — üblich ist chronologisch, älteste Station zuerst

> Ein konkretes Ergebnis überzeugt mehr als eine Liste von Aufgaben.

---

## 8. Projekte  ·  *Studio → Projekte*

Sechs Kacheln sind angelegt. Pro Projekt:

- **Titel** und **Kategorie**
- **Vorschaubild** — Querformat, mindestens 1200 px breit, mit Bildbeschreibung
- **Link zum Projekt** — die Live-Adresse
- **Link zur Fallstudie** — optional, ein ausführlicher Beitrag

> Drei starke Projekte wirken besser als sechs mittelmässige. Überzählige Einträge
> im Studio einfach löschen — das Raster passt sich an.

---

## 9. Stimmen  ·  *Studio → Stimmen*

Pro Testimonial:

- **Zitat** — zwei Sätze genügen. In den Worten der Person, nicht umformuliert
- **Name** und **Rolle mit Firma**
- **Foto** — wird kreisrund beschnitten, Hotspot auf das Gesicht
- **Hervorheben** — genau *eine* Stimme hervorheben (sie erscheint in der dunklen Karte)

> Vorher fragen, ob Name und Foto verwendet werden dürfen.

---

## 10. Section-Texte  ·  *Studio → Section-Texte*

Labels, Headlines und Einleitungen der übrigen Abschnitte an einem Ort.
Die Platzhalter sind bereits sinnvolle deutsche Sätze — du kannst sie
übernehmen und nur dort anpassen, wo es persönlicher werden soll.

Hier stehen auch:

- die **auswählbaren Themen** unter dem Kontaktformular
- die **Wörter im Laufband** zwischen Projekten und Kontakt

---

## Technisches, das noch fehlt

- [ ] Sanity-Projekt anlegen — siehe [README](./README.md#sanity-einrichten)
- [ ] CORS-Origins in Sanity eintragen (localhost + Vercel-Adresse)
- [ ] Resend-Key setzen, damit das Kontaktformular wirklich versendet
- [ ] Eigene Domain bei Resend verifizieren, sonst bleibt der Absender `onboarding@resend.dev`
- [ ] Eigene Domain in Vercel verbinden und `NEXT_PUBLIC_SITE_URL` darauf setzen
