/**
 * Alle Inhalte der Seite. Eine Datei, keine Datenbank.
 *
 * Regeln:
 * - Nur, was stimmt. Keine Kundenlogos, keine Testimonials, keine Zahlen, die
 *   nicht belegt sind. Fehlt etwas, fehlt es — statt erfunden zu werden.
 * - Schweizer Schreibweise («ss»), Preise in CHF, Anrede «Sie».
 * - Websites: nur oeffentlich erreichbare, und nur eigene. fahrschule-ch.ch zeigt
 *   weiterhin auf die alte Kundenseite und gehoert deshalb NICHT hierher.
 *   Adressen werden beim Build nicht geprueft — nach dem Abschalten einer Demo
 *   den Eintrag hier UND in tools/websites-source.mjs entfernen.
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
  /** Liegt unter public/portrait.jpg. Fehlt die Datei, zeigt UeberMich den Platzhalter. */
  portrait: '/portrait.jpg',
} as const

export type Website = {
  slug: string
  name: string
  branche: string
  ort: string
  jahr: number
  /** Echter Kunde mit eigener Domain — oder Demo, die ohne Auftrag entstand. */
  status: 'kunde' | 'demo'
  url: string
  /** Was an dieser Website bemerkenswert ist — ein Satz, keine Feature-Liste. */
  satz: string
  /** Oberer Rand der Website ist hell → dunkle Glyphen in der iPhone-Statusleiste. */
  hellerKopf?: boolean
  /** Angezeigte Adresse ohne Protokoll, fuer die Browser-Zeile im Rahmen. */
  anzeigeUrl: string
}

/** Die Referenz: der erste Kunde, dessen Website live ist. Steht gesondert vor den Demos. */
export const referenz = {
  slug: 'suwannaphum',
  eyebrow: '2026 · Restaurant · Schlieren',
  name: 'Thai Restaurant Suwannaphum',
  titel: 'Vom Demo-Link zur eigenen Domain in fünf Tagen.',
  text:
    'Die Speisekarte gab es nur als Fotos; jetzt steht sie vollständig online, lesbar vom Handy aus. Die Demo entstand ohne Auftrag — fünf Tage nachdem das Restaurant sie gesehen hatte, war die Website unter der eigenen Domain live.',
  fakten: ['Live seit 21. Oktober 2026', 'Eigene Domain suwannaphum.ch', 'Speisekarte vollständig online', 'Inhalte selbst pflegbar'],
  url: 'https://www.suwannaphum.ch/',
  anzeigeUrl: 'suwannaphum.ch',
  hellerKopf: true,
  linkLabel: 'suwannaphum.ch öffnen',
  kennzahlen: [
    { wert: '5', einheit: 'Tage', label: 'Demo bis Veröffentlichung' },
    { wert: '0', einheit: 'Cookies', label: 'kein Banner nötig' },
    { wert: '0', einheit: 'CHF', label: 'Vorabkosten im Projekt' },
  ],
} as const

/**
 * Die Demos — alle ohne Auftrag gebaut, alle oeffentlich erreichbar (geprueft
 * 10.11.2026). Reihenfolge: die staerksten zuerst.
 */
export const websites: Website[] = [
  {
    slug: 'suwannaphum',
    name: 'Suwannaphum',
    branche: 'Thai Restaurant',
    ort: 'Schlieren',
    jahr: 2026,
    status: 'kunde',
    url: 'https://www.suwannaphum.ch/',
    anzeigeUrl: 'suwannaphum.ch',
    satz: 'Die Speisekarte vollständig online, lesbar vom Handy aus — live fünf Tage nach der Demo.',
    hellerKopf: true,
  },
  {
    slug: 'advokatur-kanonengasse',
    name: 'Advokatur Kanonengasse',
    branche: 'Anwaltskanzlei',
    ort: 'Zürich, Kreis 4',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/advokatur-kanonengasse-demo/',
    anzeigeUrl: 'advokatur-kanonengasse-demo',
    satz: 'Sechs Sprachen, Arabisch von rechts nach links — für eine Bürogemeinschaft mitten im Kreis 4.',
    hellerKopf: true,
  },
  {
    slug: 'praxis-zuerichberg',
    name: 'Praxis am Zürichberg',
    branche: 'Zahnarztpraxis',
    ort: 'Zürich',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/praxis-zuerichberg-website/',
    anzeigeUrl: 'praxis-zuerichberg-website',
    satz: 'Zweisprachig Deutsch und Englisch; jede medizinische Angabe im Wortlaut der Praxis.',
    hellerKopf: true,
  },
  {
    slug: 'casatex',
    name: 'Casatex Zürich',
    branche: 'Bodenleger',
    ort: 'Zürich-Altstetten',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/casatex-zuerich-demo/',
    anzeigeUrl: 'casatex-zuerich-demo',
    satz: 'Die alte Adresse zeigte nur eine Wartungsseite — hier steht der ganze Betrieb auf einer Seite.',
    hellerKopf: true,
  },
  {
    slug: 'new-york-nails',
    name: 'New York Nails',
    branche: 'Nagelstudio',
    ort: 'Schlieren',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/new-york-nails-schlieren-demo/',
    anzeigeUrl: 'new-york-nails-schlieren-demo',
    satz: '31 Behandlungen mit Preisen, direkt aus dem Buchungssystem des Studios übernommen.',
  },
  {
    slug: 'vitis-sportcenter',
    name: 'VITIS SportCenter',
    branche: 'Racketsport-Center',
    ort: 'Schlieren',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/vitis-sportcenter-website/',
    anzeigeUrl: 'vitis-sportcenter-website',
    satz: 'Massstäbliche Spielfeld-Grafiken je Sportart; die Reservation führt ins bestehende Buchungssystem.',
  },
  {
    slug: 'maler-attinger',
    name: 'Maler Attinger',
    branche: 'Malerbetrieb',
    ort: 'Zürich',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/maler-attinger-website/',
    anzeigeUrl: 'maler-attinger-website',
    satz: 'Eine Farbkarte als Gestaltungsidee: jede Leistung hat ihren Ton, der Auftritt bleibt ruhig.',
    hellerKopf: true,
  },
  {
    slug: 'styling-azzurro',
    name: 'Styling Azzurro',
    branche: 'Coiffeursalon',
    ort: 'Zürich-Schwamendingen',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/styling-azzurro-website/',
    anzeigeUrl: 'styling-azzurro-website',
    satz: 'Karte erst nach einem Klick, keine Drittanbieter beim Laden — und deshalb kein Cookie-Banner.',
    hellerKopf: true,
  },
  {
    slug: 'clean-express',
    name: 'Clean-Express',
    branche: 'Reinigung',
    ort: 'Birmensdorf ZH',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/clean-express-website/',
    anzeigeUrl: 'clean-express-website',
    satz: 'Leistungen klar getrennt, Offertanfrage in drei Feldern — für Kunden, die schnell entscheiden.',
    hellerKopf: true,
  },
  {
    slug: 'hg-dienstleistungen',
    name: 'H&G Dienstleistungen',
    branche: 'Hauswartung & Garten',
    ort: 'Zufikon AG',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/hg-dienstleistungen-website/',
    anzeigeUrl: 'hg-dienstleistungen-website',
    satz: 'Drei Geschäftsbereiche auf einer Seite, ohne dass einer den anderen erdrückt.',
    hellerKopf: true,
  },
  {
    slug: 'altec-elektro',
    name: 'Altec Elektro',
    branche: 'Elektro-Installationen',
    ort: 'Zürich',
    jahr: 2026,
    status: 'demo',
    url: 'https://nick8952.github.io/altec-elektro-demo/',
    anzeigeUrl: 'altec-elektro-demo',
    satz: 'Notfallnummer immer sichtbar, Referenzen als Belege statt als Galerie.',
    hellerKopf: true,
  },
]

/** Die Demos ohne die Referenz — fuer das Raster. */
export const demos = websites.filter((w) => w.status === 'demo')

/**
 * Das Wort, das im Hero wechselt — mit Artikel, damit der Satz stimmt
 * («für Ihr Restaurant», «für Ihren Elektrobetrieb»). Nur Branchen, fuer die
 * eine Website oeffentlich zu sehen ist.
 */
export const branchen = [
  'Ihr Restaurant',
  'Ihre Kanzlei',
  'Ihre Zahnarztpraxis',
  'Ihren Elektrobetrieb',
  'Ihren Coiffeursalon',
  'Ihr Nagelstudio',
  'Ihre Reinigungsfirma',
  'Ihr Sportcenter',
  'Ihren Malerbetrieb',
  'Ihre Hauswartung',
] as const

export const hero = {
  eyebrows: ['Websites für kleine Betriebe', 'Demo zuerst, Entscheidung danach', 'Schweiz · ab CHF 1’200'],
  titelVor: 'Die neue Website für',
  /** Wird als erster, fetter Satz der Unterzeile gesetzt — nicht in der Headline. */
  versprechen: 'Gebaut, bevor Sie sich entscheiden.',
  text:
    'Ich baue Ihre bestehende Website als moderne Version neu und schicke Ihnen den Link. Sie sehen das Ergebnis, dann reden wir. Keine Vorabkosten, kein Pflichtenheft.',
  cta: 'Demo anfragen',
  ctaSekundaer: 'Referenz ansehen',
  /** Die kleine Karte unten rechts — wie eine Terminbuchung, nur ohne Termin. */
  karte: {
    titel: 'Demo anfragen',
    meta: 'Kostenlos · auf mein Risiko',
    text: 'Antwort innert zwei Werktagen.',
  },
  /** Beschriftung der Schaufenster-Wand, fuer Screenreader und als Bildlegende. */
  wandLabel: 'Elf Websites, die ich gebaut habe — laufen als Schaufenster durch.',
} as const

export const erkennen = {
  eyebrow: 'Der Ausgangspunkt',
  titel: 'Woran man eine veraltete Website erkennt.',
  text: 'Fünf Dinge, die Ihre Kunden sofort sehen. Genau die behebt eine Demo zuerst — bevor Sie etwas entscheiden.',
  punkte: [
    'Auf dem Handy muss man zoomen',
    'Öffnungszeiten stimmen nicht mehr',
    'Kontakt nur per Telefon, kein Formular',
    'Baukasten-Vorlage, die jeder kennt',
    'Bei Google kaum zu finden',
  ],
} as const

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
    text: 'Eigene Domain, Kontaktformular, technische Google-Grundlagen. Auf Wunsch pflegen Sie Inhalte danach selbst — ohne mich zu fragen.',
  },
] as const

/** Das Laufband unter dem Hero: fuer wen schon gebaut wurde. Eine Reihe, Text statt Logos. */
export const laufband = {
  label: 'Bisher gebaut für',
  eintraege: [
    'Restaurant',
    'Anwaltskanzlei',
    'Zahnarztpraxis',
    'Bodenleger',
    'Nagelstudio',
    'Sportcenter',
    'Malerbetrieb',
    'Coiffeursalon',
    'Reinigungsfirma',
    'Hauswartung',
    'Elektrobetrieb',
    'Fahrschule',
  ],
} as const

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
    ab: 2500,
    umfang: '5 – 10 Seiten',
    fuer: 'Der Regelfall: eine vollständige Website, deren Inhalte Sie selbst pflegen.',
    punkte: [
      'Alle Seiten, die Ihr Betrieb braucht',
      'Inhalte selbst bearbeiten, ohne Technik',
      'Kontaktformular mit Spam-Schutz',
      'Karte, Öffnungszeiten, Preise',
      'Technische Grundlagen für Google',
    ],
    hervorheben: true,
  },
  {
    name: 'Website+',
    ab: 3600,
    umfang: 'Mit Sonderfunktion',
    fuer: 'Wenn etwas dazukommt: eine zweite Sprache, Online-Anmeldung, Reservation, Kurskalender.',
    punkte: ['Alles aus «Website»', 'Eine Sonderfunktion nach Absprache', 'Zweite Sprache möglich'],
  },
]

export const betrieb = {
  satz: 'Hosting, Sicherheitsupdates und kleine Anpassungen: ab CHF 19 pro Monat. Ohne Abo CHF 90 pro Stunde. Keine Mindestlaufzeit über zwölf Monate.',
  hinweis: 'Alle Preise ohne MwSt. Der genaue Betrag steht nach dem Gespräch schriftlich fest, bevor Sie etwas zahlen.',
} as const

/**
 * Der Vergleich. Nur Aussagen, die allgemein gelten; keine Behauptungen ueber
 * einzelne Anbieter. Erste Spalte = dieses Angebot.
 */
export const vergleich = {
  eyebrow: 'Der Unterschied',
  titel: 'Demo zuerst — oder Offerte zuerst.',
  text: 'Was Sie sehen, bevor Sie etwas zahlen, unterscheidet die drei Wege am deutlichsten. Wo Angebote variieren, steht es so da.',
  spalten: ['Demo zuerst', 'Agentur', 'Baukasten'],
  zeilen: [
    {
      merkmal: 'Startpunkt',
      werte: ['Die Adresse Ihrer heutigen Website', 'Briefing und Angebot', 'Meist eine Vorlage, die Sie selbst füllen'],
    },
    {
      merkmal: 'Erste sichtbare Vorschau',
      werte: ['Die fertige Demo, bevor Sie zahlen', 'Nach Konzept und Entwurf, je nach Anbieter', 'Sobald Sie selbst gebaut haben'],
    },
    {
      merkmal: 'Anpassungen später',
      werte: ['Selbst, ohne Technik — oder durch mich', 'Je nach Vertrag', 'Selbst, innerhalb der Vorlage'],
    },
    {
      merkmal: 'Laufende Pflege',
      werte: ['Ab CHF 19 pro Monat, höchstens zwölf Monate Laufzeit', 'Abhängig vom Anbieter', 'Je nach Anbieter im Abo enthalten'],
    },
    {
      merkmal: 'Kostenmodell',
      werte: ['Einmalig ab CHF 1’200, Betrag vorher schriftlich', 'Nach Offerte', 'Meist laufendes Abo, je nach Anbieter'],
    },
  ],
} as const

/** Zaehler. Jede Zahl ist belegt: Repos, Projektablauf Suwannaphum, dieses Angebot. */
export const kennzahlen = [
  { wert: 20, suffix: '+', prefix: '', label: 'Websites gebaut', fussnote: 'Demos und Kundenprojekte' },
  { wert: 5, suffix: '', prefix: '', label: 'Tage von der Demo bis live', fussnote: 'Suwannaphum, 16.–21.10.2026' },
  { wert: 0, suffix: '', prefix: 'CHF ', label: 'Vorabkosten', fussnote: 'bei jeder Demo' },
  { wert: 2, suffix: '', prefix: '', label: 'Werktage bis zur Antwort', fussnote: 'auf jede Anfrage' },
] as const

export const faq = {
  eyebrow: 'Fragen',
  titel: 'Was Betriebe mich vor der Demo fragen.',
  eintraege: [
    {
      frage: 'Was passiert, wenn mir die Demo nicht gefällt?',
      antwort: 'Nichts. Sie schulden mir nichts, die Demo verschwindet wieder. Das Risiko liegt bewusst bei mir — deshalb baue ich zuerst.',
    },
    {
      frage: 'Warum bauen Sie, bevor ein Auftrag da ist?',
      antwort: 'Weil ein Betriebsinhaber keine Zeit für Konzeptgespräche hat. Er will sehen, was er bekommt. Also zeige ich es ihm — auf dem Handy, in zwei Minuten.',
    },
    {
      frage: 'Was kostet es wirklich?',
      antwort: 'Richtwerte stehen oben: ab CHF 1’200, der Regelfall ab CHF 2’500. Der genaue Betrag steht nach dem Gespräch schriftlich fest, bevor Sie etwas zahlen. Alle Preise ohne MwSt.',
    },
    {
      frage: 'Kann ich Texte, Preise und Öffnungszeiten später selbst ändern?',
      antwort: 'Ja. Ab der Stufe «Website» bearbeiten Sie Inhalte selbst, ohne Technik. Hosting, Sicherheitsupdates und kleine Anpassungen übernehme ich ab CHF 19 pro Monat — keine Laufzeit über zwölf Monate.',
    },
    {
      frage: 'Wie lange dauert es bis zur fertigen Website?',
      antwort: 'Auf Ihre Anfrage antworte ich innert zwei Werktagen — mit einem Link zur Demo oder mit Rückfragen. Von der Demo bis live hängt es davon ab, wie schnell Texte, Fotos und Freigaben kommen: bei Suwannaphum waren es fünf Tage.',
    },
    {
      frage: 'Wer sind Sie — und warum so günstig?',
      antwort: 'Ich bin im dritten Lehrjahr zum Informatiker EFZ, Fachrichtung Plattformentwicklung, und baue Websites nebenbei. Meine Preise liegen unter Agenturniveau, weil ich am Anfang stehe und das nicht verstecke. Wer mir eine Referenz erlaubt, bekommt einen Nachlass.',
    },
  ],
} as const

export const ueberMich = {
  eyebrow: 'Wer das baut',
  titel: 'Ein Lernender, der zuerst liefert.',
  absaetze: [
    'Ich bin Nick, im dritten Lehrjahr zum Informatiker EFZ mit Fachrichtung Plattformentwicklung. Websites für kleine Betriebe baue ich nebenbei — abends und am Wochenende, seit ich gemerkt habe, wie viele gute Betriebe eine Website haben, die ihnen nicht gerecht wird.',
    'Deshalb der Ablauf mit der Demo zuerst: Ein Betriebsinhaber hat keine Zeit für Konzeptgespräche. Er will sehen, was er bekommt. Also zeige ich es ihm.',
    'Meine Preise liegen unter dem, was Agenturen verlangen. Nicht, weil die Arbeit weniger wert ist, sondern weil ich am Anfang stehe und das nicht verstecke. Wer mir eine Referenz erlaubt, bekommt einen Nachlass.',
  ],
  ausbildungTitel: 'Ausbildung',
  ausbildung: [{ was: 'Informatiker EFZ, Plattformentwicklung', detail: '3. Lehrjahr, laufend' }],
  werkzeugeTitel: 'Womit ich baue',
  werkzeuge: ['Next.js & TypeScript', 'Tailwind CSS', 'Framer Motion', 'Sanity & Sveltia CMS', 'GitHub Pages, Vercel', 'Cloudflare'],
} as const

export const anfrage = {
  eyebrow: 'Anfrage',
  titel: 'Schicken Sie mir Ihre Website.',
  text: 'Adresse Ihrer heutigen Seite genügt. Ich melde mich innerhalb von zwei Werktagen — mit einem Link zur Demo oder mit Rückfragen.',
  senden: 'Anfrage senden',
  erfolg: 'Angekommen. Ich melde mich innerhalb von zwei Werktagen.',
  fehler: 'Das hat nicht geklappt. Schreiben Sie mir direkt:',
} as const

export const navigation = [
  { label: 'Referenz', href: '#referenz' },
  { label: 'Websites', href: '#websites' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Preise', href: '#preise' },
  { label: 'Fragen', href: '#fragen' },
  { label: 'Über mich', href: '#ueber-mich' },
] as const

export const footer = {
  slogan: 'Gebaut, bevor Sie sich entscheiden.',
  technik: 'Diese Seite: Next.js, statisch gebaut, gehostet auf Vercel. Keine Cookies, kein Tracking.',
} as const

export const seo = {
  titel: 'Nick Holzbecher — Websites für kleine Betriebe',
  beschreibung:
    'Ich baue Ihre bestehende Website als Demo neu, bevor Sie sich entscheiden. Referenz: Thai Restaurant Suwannaphum, live in fünf Tagen. Restaurants, Praxen, Handwerk, Kanzleien. Websites ab CHF 1’200.',
} as const
