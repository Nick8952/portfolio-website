/**
 * Impressum nach Schweizer Recht (UWG Art. 3 Abs. 1 lit. s: Identitaet und
 * Kontaktadresse des Anbieters). Rechtstext, nicht Werbetext — Aenderungen
 * bewusst und mit Datum. Die Postadresse ist Nicks Angabe vom 11.11.2026
 * (PLZ und Ort); eine Strasse mit Hausnummer fehlt noch (CLAUDE.md «Offen»).
 */

import type { DatenschutzAbschnitt } from '@/lib/datenschutz'

export const impressum = {
  titel: 'Impressum',
  stand: '12. November 2026',
  einleitung: 'Angaben zum Betreiber dieser Website nach Schweizer Recht.',
  abschnitte: [
    {
      titel: 'Kontaktadresse',
      adresse: ['Nick Holzbecher', '8952 Schlieren', 'Schweiz'],
      absaetze: ['E-Mail: holzbechernick@gmail.com'],
    },
    {
      titel: 'Verantwortlich für den Inhalt',
      absaetze: ['Nick Holzbecher, Einzelperson. Websites für kleine Betriebe im Nebenerwerb.'],
    },
    {
      titel: 'Mehrwertsteuer',
      absaetze: ['Ich bin nicht mehrwertsteuerpflichtig. Preise verstehen sich in Schweizer Franken; es wird keine MwSt. verrechnet.'],
    },
    {
      titel: 'Haftung für Inhalte',
      absaetze: [
        'Ich erstelle die Inhalte dieser Website sorgfältig. Für Richtigkeit, Vollständigkeit und Aktualität übernehme ich keine Gewähr. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf diese Website, ihrer Nutzung oder Nichtnutzung entstehen, sind ausgeschlossen, soweit das Gesetz es zulässt.',
      ],
    },
    {
      titel: 'Haftung für Links',
      absaetze: [
        'Links auf Websites Dritter — etwa auf mein LinkedIn-Profil oder auf die Website eines Kunden — liegen ausserhalb meines Verantwortungsbereichs. Für deren Inhalte sind allein die jeweiligen Betreiber verantwortlich.',
      ],
    },
    {
      titel: 'Beispiel-Websites',
      absaetze: [
        'Die unter «Beispiele» gezeigten Websites sind Gestaltungsentwürfe von Nick Holzbecher, die ohne Auftrag entstanden sind. Sie werden als Musterbetrieb gezeigt: Namen, Logos, Fotos und Kontaktangaben sind durch Musterangaben ersetzt. Keiner dieser Entwürfe ist die Website eines bestehenden Betriebs. Die als Referenz gezeigte Website ist ein abgeschlossener Auftrag.',
      ],
    },
    {
      titel: 'Urheberrecht',
      absaetze: [
        'Soweit nicht anders gekennzeichnet, stammen die eigenen Texte, Gestaltungen und Codebeiträge dieser Website und der gezeigten Entwürfe von Nick Holzbecher. Rechte an übernommenen Inhalten, Bildern, Namen, Marken und eingesetzten Drittbibliotheken verbleiben bei den jeweiligen Rechteinhabern. Eine darüber hinausgehende Verwendung eigener Inhalte bedarf meiner schriftlichen Zustimmung; vorbehalten bleiben gesetzlich erlaubte Nutzungen, insbesondere Eigengebrauch und Zitate (Art. 19 und 25 URG).',
      ],
    },
  ] satisfies readonly DatenschutzAbschnitt[],
} as const
