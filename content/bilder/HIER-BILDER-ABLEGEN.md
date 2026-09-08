# Bilder und PDF hier ablegen

`npm run seed` lädt alles aus diesem Ordner nach Sanity hoch. In
`content/inhalte.json` wird nur der **Dateiname** eingetragen, kein Pfad.

Beispiel — Datei `portrait.png` liegt hier, in `inhalte.json` steht dann:

```json
"portrait": { "datei": "portrait.png", "alt": "Portraitfoto von Max Muster" }
```

## Was gebraucht wird

| Datei | Wofür | Format |
|---|---|---|
| Portrait | Hero | Hochformat, ab 1200 px hoch. **Freigestellt (PNG mit Transparenz) wirkt am stärksten** — es ragt dann über die grosse Schrift |
| Arbeitsbild | Zahlen-Section | Querformat 4:3, ab 1000 px breit |
| Projektbilder | Projekt-Kacheln | Querformat, ab 1200 px breit |
| Werkzeug-Logos | Tools-Reihe | Quadratisch, SVG oder PNG mit Transparenz |
| Testimonial-Fotos | Stimmen | Quadratisch, ab 400 px — wird rund beschnitten |
| Lebenslauf | Hero-Schaltfläche | PDF |
| Vorschaubild | Teilen-Vorschau | 1200 × 630 px. Ohne Datei wird automatisch eins erzeugt |

Fehlt eine Datei, bleibt das Feld leer und die Website zeigt dort ihren
Platzhalter — kaputt geht nichts.

Dieser Ordner wird **nicht** ins Git-Repository übernommen (siehe `.gitignore`):
die Bilder liegen nach dem Hochladen in Sanity, das Repo bleibt schlank.
