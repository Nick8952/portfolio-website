/**
 * Alle Inhalte der Seite. Eine Datei, keine Datenbank.
 *
 * Regeln:
 * - Nur, was stimmt. Keine Kundenlogos, keine Testimonials, keine Zahlen, die
 *   nicht belegt sind. Fehlt etwas, fehlt es — statt erfunden zu werden.
 * - Schweizer Schreibweise («ss»), Preise in CHF, Anrede «Sie».
 * - Websites: nur oeffentlich erreichbare, und nur eigene. fahrschule-ch.ch zeigt
 *   noch auf die alte Kundenseite und gehoert deshalb NICHT hierher, solange die
 *   Domain nicht umgestellt ist. Adressen werden beim Build nicht geprueft —
 *   nach dem Abschalten einer Demo den Eintrag hier entfernen.
 */

export const person = {
  name: 'Nick Holzbecher',
  vorname: 'Nick',
  rolle: 'Websites für kleine Betriebe',
  email: 'holzbechernick@gmail.com',
  ausbildung: {
    titel: 'Informatiker EFZ',
    fachrichtung: 'Plattformentwicklung',
    stand: '3. Lehrjahr',
  },
  github: 'https://github.com/Nick8952',
} as const

/** Branchen, fuer die bereits Websites gebaut wurden — genau diese laufen im Hero durch. */
export const branchen = [
  'Fahrschule',
  'Elektrobetrieb',
  'Restaurant',
  'Reinigungsfirma',
  'Hauswartung',
] as const

export const hero = {
  titelVor: 'Die neue Website für Ihre',
  /** Wird als erster, fetter Satz der Unterzeile gesetzt — nicht in der Headline. */
  versprechen: 'Gebaut, bevor Sie sich entscheiden.',
  text:
    'Ich baue Ihre bestehende Website als moderne Version neu und schicke Ihnen den Link. Sie sehen das Ergebnis, dann reden wir. Keine Vorabkosten, kein Pflichtenheft.',
  cta: 'Demo anfragen',
  ctaSekundaer: 'Websites ansehen',
} as const

export type Website = {
  slug: string
  name: string
  branche: string
  ort: string
  url: string
  /** Was an dieser Website bemerkenswert ist — ein Satz, keine Feature-Liste. */
  satz: string
}

export const websites: Website[] = [
  {
    slug: 'gusto-campano',
    name: 'Gusto Campano',
    branche: 'Ristorante Pizzeria',
    ort: 'Zürich-Affoltern',
    url: 'https://nick8952.github.io/gusto-campano-website/',
    satz: 'Die Speisekarte ist das Herz: filterbar, mit Preisen, vom Handy aus in Sekunden lesbar.',
  },
  {
    slug: 'clean-express',
    name: 'Clean-Express',
    branche: 'Reinigung',
    ort: 'Birmensdorf ZH',
    url: 'https://nick8952.github.io/clean-express-website/',
    satz: 'Leistungen klar getrennt, Offertanfrage in drei Feldern — für Kunden, die schnell entscheiden.',
  },
  {
    slug: 'hg-dienstleistungen',
    name: 'H&G Dienstleistungen',
    branche: 'Hauswartung & Garten',
    ort: 'Zufikon AG',
    url: 'https://nick8952.github.io/hg-dienstleistungen-website/',
    satz: 'Drei Geschäftsbereiche auf einer Seite, ohne dass einer den anderen erdrückt.',
  },
  {
    slug: 'altec-elektro',
    name: 'Altec Elektro',
    branche: 'Elektro-Installationen',
    ort: 'Zürich',
    url: 'https://altec-elektro-website-ae0768.gitlab.io/',
    satz: 'Notfallnummer immer sichtbar, Referenzen als Belege statt als Galerie.',
  },
  {
    slug: 'fahrschul-center',
    name: 'Fahrschul-Center',
    branche: 'Fahrschule',
    ort: 'Zürich-Oerlikon',
    url: 'https://fahrschul-center-demo-bfeae8.gitlab.io/',
    satz: 'Rund hundert Seiten für alle Kategorien und Kurse — jede einzeln über Google auffindbar.',
  },
  {
    slug: 'fahrlehrer-zuerich',
    name: 'FKM Fahrschule',
    branche: 'Fahrschule',
    ort: 'Zürich',
    url: 'https://fahrlehrer-zuerich-fdb7e6.gitlab.io/',
    satz: 'Die erste Demo. Reduziert auf das, was ein Fahrschüler wissen will: Preis, Ablauf, Anmeldung.',
  },
]

export const ablauf = [
  {
    titel: 'Ich baue zuerst',
    text: 'Sie schicken mir die Adresse Ihrer heutigen Website. Ich baue daraus eine neue Version — unaufgefordert und auf mein Risiko.',
  },
  {
    titel: 'Sie sehen das Ergebnis',
    text: 'Sie bekommen einen Link. Auf dem Handy, am Computer, ohne Installation. Gefällt es nicht, war es das — Sie schulden mir nichts.',
  },
  {
    titel: 'Wir reden über Details',
    text: 'Texte, Fotos, Preise, Öffnungszeiten: alles, was noch fehlt, klären wir in einem Gespräch. Danach steht der Preis schriftlich fest.',
  },
  {
    titel: 'Die Seite geht live',
    text: 'Eigene Domain, Kontaktformular, Google-Sichtbarkeit. Auf Wunsch pflegen Sie Inhalte danach selbst — ohne mich zu fragen.',
  },
] as const

export type Preis = {
  name: string
  ab: number
  umfang: string
  fuer: string
  punkte: readonly string[]
  hervorheben?: boolean
}

export const preise: readonly Preis[] = [
  {
    name: 'Start',
    ab: 1200,
    umfang: '1 – 3 Seiten',
    fuer: 'Für Betriebe, die bisher keine Website haben oder nur eine Visitenkarte brauchen.',
    punkte: ['Startseite, Leistungen, Kontakt', 'Eigene Domain und E-Mail-Adresse', 'Für Handy gebaut', 'Google-Grundlagen'],
  },
  {
    name: 'Website',
    ab: 2900,
    umfang: '5 – 10 Seiten',
    fuer: 'Der Regelfall: eine vollständige Website, deren Inhalte Sie selbst pflegen.',
    punkte: [
      'Alle Seiten, die Ihr Betrieb braucht',
      'Inhalte selbst bearbeiten, ohne Technik',
      'Kontaktformular mit Spam-Schutz',
      'Karte, Öffnungszeiten, Preise',
      'Auffindbar bei Google',
    ],
    hervorheben: true,
  },
  {
    name: 'Website+',
    ab: 4200,
    umfang: 'Mit Sonderfunktion',
    fuer: 'Wenn etwas dazukommt: eine zweite Sprache, Online-Anmeldung, Reservation, Kurskalender.',
    punkte: ['Alles aus «Website»', 'Eine Sonderfunktion nach Absprache', 'Zweite Sprache möglich'],
  },
]

export const betrieb = {
  satz: 'Hosting, Sicherheitsupdates und kleine Anpassungen: ab CHF 19 pro Monat. Ohne Abo CHF 90 pro Stunde. Keine Mindestlaufzeit über zwölf Monate.',
  hinweis: 'Alle Preise ohne MwSt. Der genaue Betrag steht nach dem Gespräch schriftlich fest, bevor Sie etwas zahlen.',
} as const

export const ueberMich = {
  titel: 'Wer das baut',
  absaetze: [
    'Ich bin Nick, im dritten Lehrjahr zum Informatiker EFZ mit Fachrichtung Plattformentwicklung. Websites für kleine Betriebe baue ich nebenbei — abends und am Wochenende, seit ich gemerkt habe, wie viele gute Betriebe eine Website haben, die ihnen nicht gerecht wird.',
    'Deshalb der Ablauf mit der Demo zuerst: Ein Fahrschulinhaber hat keine Zeit für Konzeptgespräche. Er will sehen, was er bekommt. Also zeige ich es ihm.',
    'Meine Preise liegen unter dem, was Agenturen verlangen. Nicht, weil die Arbeit weniger wert ist, sondern weil ich am Anfang stehe und das nicht verstecke. Wer mir eine Referenz erlaubt, bekommt einen Nachlass.',
  ],
  ausbildungTitel: 'Ausbildung',
  ausbildung: [
    { was: 'Informatiker EFZ, Plattformentwicklung', detail: '3. Lehrjahr, laufend' },
  ],
  werkzeugeTitel: 'Womit ich baue',
  werkzeuge: [
    'Next.js & TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Sanity & Sveltia CMS',
    'GitHub Pages, GitLab Pages, Vercel',
    'Cloudflare',
  ],
} as const

export const anfrage = {
  titel: 'Schicken Sie mir Ihre Website.',
  text: 'Adresse Ihrer heutigen Seite genügt. Ich melde mich innerhalb von zwei Werktagen — mit einem Link zur Demo oder mit Rückfragen.',
  senden: 'Anfrage senden',
  erfolg: 'Angekommen. Ich melde mich innerhalb von zwei Werktagen.',
  fehler: 'Das hat nicht geklappt. Schreiben Sie mir direkt:',
} as const

export const navigation = [
  { label: 'Websites', href: '#websites' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Preise', href: '#preise' },
  { label: 'Über mich', href: '#ueber-mich' },
] as const

export const seo = {
  titel: 'Nick Holzbecher — Websites für kleine Betriebe',
  beschreibung:
    'Ich baue Ihre bestehende Website als moderne Version neu, bevor Sie sich entscheiden. Fahrschulen, Handwerk, Gastronomie. Websites ab CHF 1\'200.',
} as const
