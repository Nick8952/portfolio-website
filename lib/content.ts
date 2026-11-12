/**
 * Alle Inhalte der Seite. Eine Datei, keine Datenbank.
 *
 * Regeln:
 * - Nur, was stimmt. Keine Kundenlogos, keine Testimonials, keine Zahlen, die
 *   nicht belegt sind. Fehlt etwas, fehlt es — statt erfunden zu werden.
 * - Schweizer Schreibweise («ss»), Preise in CHF, Anrede «Sie».
 * - Beispiel-Websites (status 'beispiel'): ohne Auftrag entworfen, der Betrieb
 *   dahinter hat NICHT zugestimmt, damit geworben zu werden. Deshalb erscheinen
 *   sie nur als Musterbetrieb: neutraler Slug (steht in den Bild-URLs!), kein
 *   Name, kein Link, Screenshots mit ersetzten Namen/Logos/Kontaktdaten und
 *   weichgezeichneten Fotos (tools/anonymisieren.mjs). Nicks Regel vom 11.11.2026.
 * - Die Referenz (status 'kunde') ist ein abgeschlossener Auftrag und wird auf
 *   Nicks Entscheid (11.11.2026) mit Namen und Link gezeigt.
 */

export const person = {
  name: 'Nick Holzbecher',
  vorname: 'Nick',
  rolle: 'Websites für kleine Betriebe',
  email: 'holzbechernick@gmail.com',
  /** Postadresse laut Nick (11.11.2026): nur PLZ und Ort — Strasse siehe CLAUDE.md «Offen». */
  adresse: { plz: '8952', ort: 'Schlieren', land: 'Schweiz' },
  linkedin: 'https://www.linkedin.com/in/nick-h-134b5436a/',
  ausbildung: {
    titel: 'Informatiker EFZ',
    fachrichtung: 'Plattformentwicklung',
    stand: '3. Lehrjahr',
  },
  /** Liegt unter public/portrait.jpg. Fehlt die Datei, zeigt UeberMich den Platzhalter. */
  portrait: '/portrait.jpg',
} as const

export type Website = {
  /** Neutraler Slug — er steht in den Bild-URLs und darf keinen Betrieb verraten. */
  slug: string
  /** Anzeigetitel: beim Kunden der Name, bei Beispielen eine Beschreibung. */
  name: string
  branche: string
  ort: string
  jahr: number
  /** Echter Kunde mit eigener Domain — oder Beispiel, das ohne Auftrag entstand. */
  status: 'kunde' | 'beispiel'
  /** Nur beim Kunden: die echte Adresse. Beispiele haben keinen Link. */
  url?: string
  /** Angezeigte Adresse in der Browser-Zeile des Rahmens; bei Beispielen eine .example-Adresse. */
  anzeigeUrl: string
  /** Was an dieser Website bemerkenswert ist — ein Satz, keine Feature-Liste. */
  satz: string
  /** Oberer Rand der Website ist hell → dunkle Glyphen in der iPhone-Statusleiste. */
  hellerKopf?: boolean
}

/** Die Referenz: der erste Kunde, dessen Website live ist. Steht gesondert vor den Beispielen. */
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
    { wert: '0', einheit: 'Cookies', label: 'kein Tracking, kein Banner' },
    { wert: '11', einheit: 'Bilder', label: 'der Karte wurden eine Speisekarte' },
  ],
} as const

/**
 * Referenz und Beispiele. Reihenfolge: die staerksten zuerst. Die Beispiele
 * tragen neutrale Slugs; welche Demo dahintersteht, weiss nur
 * tools/websites-source.mjs (fuer die anonymisierten Aufnahmen).
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
    slug: 'kanzlei',
    name: 'Mehrsprachige Kanzlei',
    branche: 'Anwaltskanzlei',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'kanzlei-muster.example',
    satz: 'Mehrsprachiger Auftritt, auch für Schriften von rechts nach links — jede Sprache führt gleich klar zum Kontakt.',
    hellerKopf: true,
  },
  {
    slug: 'zahnarzt',
    name: 'Zweisprachige Praxis',
    branche: 'Zahnarztpraxis',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'praxis-muster.example',
    satz: 'Deutsche und englische Fassung mit identischer Struktur; Behandlungen übersichtlich gegliedert.',
    hellerKopf: true,
  },
  {
    slug: 'bodenleger',
    name: 'Bodenleger mit Materialregister',
    branche: 'Bodenleger',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'boeden-muster.example',
    satz: 'Materialien zum Durchklicken statt Prospekt — Parkett, Teppich und Beläge auf einen Blick.',
    hellerKopf: true,
  },
  {
    slug: 'nagelstudio',
    name: 'Nagelstudio mit Preisliste',
    branche: 'Nagelstudio',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'nails-muster.example',
    satz: 'Übersichtliche Leistungs- und Preisdarstellung mit direktem Weg zur Online-Terminbuchung.',
  },
  {
    slug: 'sportcenter',
    name: 'Racketsport-Center',
    branche: 'Sportcenter',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'sportcenter-muster.example',
    satz: 'Massstäbliche Spielfeld-Grafiken je Sportart; die Reservation läuft über ein externes Buchungssystem.',
  },
  {
    slug: 'maler',
    name: 'Malerbetrieb mit Farbkarte',
    branche: 'Malerbetrieb',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'maler-muster.example',
    satz: 'Eine Farbkarte als Gestaltungsidee: jede Leistung hat ihren Ton, der Auftritt bleibt ruhig.',
    hellerKopf: true,
  },
  {
    slug: 'coiffeur',
    name: 'Coiffeursalon',
    branche: 'Coiffeursalon',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'coiffeur-muster.example',
    satz: 'Karte erst nach einem Klick, keine Drittanbieter beim Laden — ohne Cookie-Banner.',
    hellerKopf: true,
  },
  {
    slug: 'reinigung',
    name: 'Reinigungsfirma',
    branche: 'Reinigung',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'reinigung-muster.example',
    satz: 'Leistungen klar getrennt, Offertanfrage in drei Feldern — für Kunden, die schnell entscheiden.',
    hellerKopf: true,
  },
  {
    slug: 'hauswartung',
    name: 'Hauswartung & Garten',
    branche: 'Hauswartung',
    ort: 'Aargau',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'hauswartung-muster.example',
    satz: 'Drei Geschäftsbereiche auf einer Seite, ohne dass einer den anderen erdrückt.',
    hellerKopf: true,
  },
  {
    slug: 'elektro',
    name: 'Elektrobetrieb mit Notfallnummer',
    branche: 'Elektro-Installationen',
    ort: 'Region Zürich',
    jahr: 2026,
    status: 'beispiel',
    anzeigeUrl: 'elektro-muster.example',
    satz: 'Notfallnummer immer sichtbar, Referenzen als Belege statt als Galerie.',
    hellerKopf: true,
  },
]

/** Die Beispiele ohne die Referenz — fuer das Raster. */
export const beispiele = websites.filter((w) => w.status === 'beispiel')

export const beispieleSektion = {
  eyebrow: 'Beispiele · ohne Auftrag entworfen',
  titel: 'Zehn Beispiele, wie Ihre Website aussehen könnte.',
  text:
    'Jedes entstand als Vorschlag für einen echten Betrieb. Damit niemand ohne sein Einverständnis gezeigt wird, sind Namen, Logos, Fotos und Kontaktdaten durch Musterangaben ersetzt — Aufbau, Typografie und Gestaltung sind echt.',
  hinweis: 'Mit der Maus darüber oder antippen: die Website scrollt durch.',
  knopf: 'Beispiel durchscrollen',
} as const

/**
 * Das Wort, das im Hero wechselt — mit Artikel, damit der Satz stimmt
 * («für Ihr Restaurant», «für Ihren Betrieb»). Kurz gehalten: die Zeile
 * passt sich zwar automatisch an (Hero.tsx misst das laengste Wort), aber
 * je kuerzer die Woerter, desto weniger muss sie schrumpfen.
 */
export const branchen = [
  'Ihr Restaurant',
  'Ihre Kanzlei',
  'Ihre Praxis',
  'Ihren Betrieb',
  'Ihr Nagelstudio',
  'Ihren Salon',
  'Ihr Sportcenter',
  'Ihre Reinigung',
  'Ihr Handwerk',
  'Ihre Hauswartung',
] as const

export const hero = {
  eyebrows: ['Websites für kleine Betriebe', 'Demo zuerst, Entscheidung danach', 'Schweiz · ab CHF 1’200'],
  titelVor: 'Die neue Website für',
  /** Wird als erster, fetter Satz der Unterzeile gesetzt — nicht in der Headline. */
  versprechen: 'Gebaut, bevor Sie sich entscheiden.',
  text:
    'Ich baue Ihre bestehende Website als moderne Version neu und schicke Ihnen den Link. Sie sehen das Ergebnis, dann reden wir. Unverbindlich, ohne Pflichtenheft.',
  cta: 'Demo anfragen',
  ctaSekundaer: 'Referenz ansehen',
  /** Die kleine Karte unten rechts — wie eine Terminbuchung, nur ohne Termin. */
  karte: {
    titel: 'Demo anfragen',
    meta: 'Unverbindlich · auf mein Risiko',
    text: 'Eine Demo kann nach ein bis zwei Tagen online sein.',
  },
  /** Beschriftung der Schaufenster-Wand, fuer Screenreader und als Bildlegende. */
  wandLabel: 'Elf Websites, die ich gebaut habe — laufen als Schaufenster durch. Beispiele mit Musterangaben.',
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
    text: 'Sie schicken mir die Adresse Ihrer heutigen Website. Ich baue daraus eine neue Version — unaufgefordert und auf mein Risiko. Sie kann nach ein bis zwei Tagen online sein.',
  },
  {
    titel: 'Sie sehen das Ergebnis',
    text: 'Sie bekommen einen Link. Auf dem Handy, am Computer, ohne Installation. Gefällt es nicht, war es das — die Demo ist unverbindlich.',
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
  satz: 'Hosting, Sicherheitsupdates und kleine Anpassungen: ab CHF 19 pro Monat. Ohne Abo CHF 90 pro Stunde. Laufzeit höchstens zwölf Monate.',
  /** Nick ist nicht im MwSt-Register (Auskunft 11.11.2026). */
  hinweis:
    'Preise in CHF. Ich bin nicht mehrwertsteuerpflichtig; es wird keine MwSt. verrechnet. Der genaue Betrag steht nach dem Gespräch schriftlich fest.',
} as const

/**
 * Der Vergleich. Nur Aussagen, die allgemein gelten; keine Behauptungen ueber
 * einzelne Anbieter. Erste Spalte = dieses Angebot.
 */
export const vergleich = {
  eyebrow: 'Der Unterschied',
  titel: 'Demo zuerst — oder Offerte zuerst.',
  text: 'Was Sie sehen, bevor Sie sich entscheiden, unterscheidet die drei Wege am deutlichsten. Wo Angebote variieren, steht es so da.',
  spalten: ['Demo zuerst', 'Agentur', 'Baukasten'],
  zeilen: [
    {
      merkmal: 'Startpunkt',
      werte: ['Die Adresse Ihrer heutigen Website', 'Briefing und Angebot', 'Meist eine Vorlage, die Sie selbst füllen'],
    },
    {
      merkmal: 'Erste sichtbare Vorschau',
      werte: ['Die fertige Demo, unverbindlich', 'Nach Konzept und Entwurf, je nach Anbieter', 'Sobald Sie selbst gebaut haben'],
    },
    {
      merkmal: 'Anpassungen später',
      werte: ['Selbst, ohne Technik — oder durch mich', 'Je nach Vertrag', 'Selbst, innerhalb der Vorlage'],
    },
    {
      merkmal: 'Laufende Pflege',
      werte: ['Ab CHF 19 pro Monat, Laufzeit höchstens zwölf Monate', 'Abhängig vom Anbieter', 'Je nach Anbieter im Abo enthalten'],
    },
    {
      merkmal: 'Kostenmodell',
      werte: ['Einmalig ab CHF 1’200, Betrag vorher schriftlich', 'Nach Offerte', 'Meist laufendes Abo, je nach Anbieter'],
    },
  ],
} as const

/** Zaehler. Jede Zahl ist belegt: Repos, Projektablauf Suwannaphum, Nicks Erfahrungswert. */
export const kennzahlen = [
  { wert: 20, suffix: '+', prefix: '', label: 'Websites gebaut', fussnote: 'Demos und Kundenprojekte' },
  { wert: 15, suffix: '+', prefix: '', label: 'Branchen', fussnote: 'vom Restaurant bis zur Kanzlei' },
  { wert: 5, suffix: '', prefix: '', label: 'Tage von der Demo bis live', fussnote: 'Suwannaphum, 16.–21.10.2026' },
  { wert: 2, suffix: '', prefix: '', label: 'Tage, bis eine Demo online sein kann', fussnote: 'ein bis zwei Tage sind möglich' },
] as const

export const faq = {
  eyebrow: 'Fragen',
  titel: 'Was Betriebe mich vor der Demo fragen.',
  eintraege: [
    {
      frage: 'Was passiert, wenn mir die Demo nicht gefällt?',
      antwort: 'Nichts. Die Demo ist unverbindlich — gefällt sie nicht, verschwindet sie wieder. Das Risiko liegt bewusst bei mir, deshalb baue ich zuerst.',
    },
    {
      frage: 'Warum bauen Sie, bevor ein Auftrag da ist?',
      antwort: 'Weil ein Betriebsinhaber keine Zeit für Konzeptgespräche hat. Er will sehen, was er bekommt. Also zeige ich es ihm — auf dem Handy, in zwei Minuten.',
    },
    {
      frage: 'Was kostet es wirklich?',
      antwort: 'Richtwerte stehen oben: ab CHF 1’200, der Regelfall ab CHF 2’500. Der genaue Betrag steht nach dem Gespräch schriftlich fest. Preise in CHF; ich bin nicht mehrwertsteuerpflichtig, es kommt keine MwSt. dazu.',
    },
    {
      frage: 'Kann ich Texte, Preise und Öffnungszeiten später selbst ändern?',
      antwort: 'Ja. Ab der Stufe «Website» bearbeiten Sie Inhalte selbst, ohne Technik. Hosting, Sicherheitsupdates und kleine Anpassungen übernehme ich ab CHF 19 pro Monat — Laufzeit höchstens zwölf Monate.',
    },
    {
      frage: 'Wie lange dauert es bis zur fertigen Website?',
      antwort: 'Eine Demo kann nach ein bis zwei Tagen online sein. Von der Demo bis zur fertigen Website hängt es davon ab, wie schnell Texte, Fotos und Freigaben kommen: bei Suwannaphum waren es fünf Tage.',
    },
    {
      frage: 'Wer sind Sie — und warum so günstig?',
      antwort: 'Ich bin im dritten Lehrjahr zum Informatiker EFZ, Fachrichtung Plattformentwicklung, und baue Websites nebenbei. Meine Preise sind bewusst Einstiegspreise, weil ich am Anfang stehe und das nicht verstecke. Wer mir eine Referenz erlaubt, bekommt einen Nachlass.',
    },
  ],
} as const

export const ueberMich = {
  eyebrow: 'Wer das baut',
  titel: 'Ein Lernender, der zuerst liefert.',
  absaetze: [
    'Ich bin Nick, im dritten Lehrjahr zum Informatiker EFZ mit Fachrichtung Plattformentwicklung. Websites für kleine Betriebe baue ich nebenbei — abends und am Wochenende, seit ich gemerkt habe, wie viele gute Betriebe eine Website haben, die ihnen nicht gerecht wird.',
    'Deshalb der Ablauf mit der Demo zuerst: Ein Betriebsinhaber hat keine Zeit für Konzeptgespräche. Er will sehen, was er bekommt. Also zeige ich es ihm.',
    'Meine Preise sind bewusst Einstiegspreise: Ich stehe am Anfang und verstecke das nicht. Wer mir eine Referenz erlaubt, bekommt einen Nachlass.',
  ],
  linkedinLabel: 'Profil auf LinkedIn',
  ausbildungTitel: 'Ausbildung',
  ausbildung: [{ was: 'Informatiker EFZ, Plattformentwicklung', detail: '3. Lehrjahr, laufend' }],
  werkzeugeTitel: 'Womit ich baue',
  werkzeuge: ['Next.js & TypeScript', 'Tailwind CSS', 'Framer Motion', 'Sanity & Sveltia CMS', 'GitHub Pages, Vercel', 'Cloudflare'],
} as const

export const anfrage = {
  eyebrow: 'Anfrage',
  titel: 'Schicken Sie mir Ihre Website.',
  text: 'Adresse Ihrer heutigen Seite genügt. Ich melde mich mit einem Link zur Demo oder mit Rückfragen — eine Demo kann nach ein bis zwei Tagen online sein.',
  senden: 'Anfrage senden',
  erfolg: 'Gesendet. Falls Sie keine Antwort erhalten, schreiben Sie mir bitte direkt an holzbechernick@gmail.com.',
  einwilligung:
    'Ich bin einverstanden, dass meine Angaben über den Formulardienst FormSubmit (Sitz und Speicherort des Anbieters nicht bekannt) an das Postfach von Nick Holzbecher weitergeleitet werden. Alternativ schreibe ich direkt per E-Mail.',
  fehler: 'Das hat nicht geklappt. Schreiben Sie mir direkt:',
} as const

export const navigation = [
  { label: 'Referenz', href: '#referenz' },
  { label: 'Beispiele', href: '#websites' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Preise', href: '#preise' },
  { label: 'Fragen', href: '#fragen' },
  { label: 'Über mich', href: '#ueber-mich' },
] as const

export const rechtliches = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
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
