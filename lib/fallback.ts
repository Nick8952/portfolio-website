import type { PageContent } from '@/types/content'

/**
 * Platzhalterinhalte für den Fall, dass Sanity noch nicht konfiguriert oder ein
 * Dokument noch nicht angelegt ist (siehe AE-1 in CLAUDE.md).
 *
 * Zwei Regeln bei der Pflege dieser Datei:
 *
 * 1. Alles, was ein echter Fakt wäre — Name, Firmen, Jahreszahlen, Kennzahlen,
 *    Links — steht in [ECKIGEN KLAMMERN]. Es darf nie so aussehen, als stünde
 *    hier eine belastbare Angabe.
 * 2. Der Fliesstext ist trotzdem echtes Deutsch in realistischer Länge. Nur so
 *    stimmen Zeilenumbrüche, Spaltenhöhen und Kartengrössen schon vor der
 *    Befüllung.
 */
export const fallbackContent: PageContent = {
  settings: {
    name: '[DEIN NAME]',
    role: '[DEIN JOBTITEL]',
    location: '[DEIN STANDORT]',
    email: '[deine@adresse.ch]',
    phone: '[+41 00 000 00 00]',
    shortBio:
      'Kurzbeschreibung in zwei Sätzen: was du baust und für wen. Dieser Text erscheint im Footer und in den Suchergebnissen.',
    navLinks: [
      { label: 'Über mich', href: '#ueber-mich' },
      { label: 'Leistungen', href: '#leistungen' },
      { label: 'Werdegang', href: '#werdegang' },
      { label: 'Projekte', href: '#projekte' },
      { label: 'Kontakt', href: '#kontakt' },
    ],
    headerCta: { label: 'Gespräch starten', href: '#kontakt' },
    socials: [
      { platform: 'github', label: 'GitHub', url: 'https://github.com/[DEIN-HANDLE]' },
      { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/[DEIN-HANDLE]' },
      { platform: 'x', label: 'X', url: 'https://x.com/[DEIN-HANDLE]' },
    ],
    cvUrl: undefined,
    seoTitle: '[DEIN NAME] — [DEIN JOBTITEL]',
    seoDescription:
      'Portfolio von [DEIN NAME]. Ein bis zwei Sätze, die erklären, was du baust und für wen — dieser Text erscheint in Google und beim Teilen des Links.',
  },

  hero: {
    eyebrow: 'Willkommen in meinem Portfolio',
    displayLead: 'SOFTWARE',
    displayMain: 'ENGINEER',
    intro:
      'Zwei bis drei Zeilen darüber, woran du arbeitest und was dich antreibt. Kurz genug, dass es neben dem Portrait Platz hat.',
    portrait: {
      fallbackSrc: '/placeholder/portrait.svg',
      alt: 'Platzhalter für dein Portraitfoto',
    },
    primaryCta: { label: 'Lebenslauf laden', href: '#kontakt' },
    secondaryCta: { label: 'GitHub-Profil', href: 'https://github.com/[DEIN-HANDLE]' },
  },

  about: {
    label: 'Über mich',
    headingLead: 'Die Geschichte, die Haltung',
    headingTrail: 'und der Mensch hinter dem Code',
    columnOne:
      'Erste Spalte: woher du kommst und wie du zur Entwicklung gekommen bist. Ein Absatz von rund vierzig Wörtern liest sich hier am besten — genug für eine Aussage, kurz genug, dass niemand aussteigt.',
    columnTwo:
      'Zweite Spalte: wie du arbeitest und was jemand von einer Zusammenarbeit erwarten darf. Konkrete Arbeitsweise überzeugt an dieser Stelle mehr als eine Liste von Adjektiven.',
  },

  copy: {
    stats: {
      label: 'In Zahlen',
      headingLead: 'DER ANSPRUCH, DER JEDE ZEILE',
      headingTrail: 'CODE ÜBERLEBEN LÄSST',
      intro: undefined,
      image: {
        fallbackSrc: '/placeholder/workspace.svg',
        alt: 'Platzhalter für ein Bild von dir bei der Arbeit',
      },
    },
    tools: {
      label: 'Werkzeuge',
      headingLead: 'Ein bewusst kleiner Satz an Werkzeugen,',
      headingTrail: 'den ich wirklich beherrsche',
      intro:
        'Ein Satz dazu, warum genau diese Werkzeuge — und nicht die längstmögliche Liste.',
    },
    services: {
      label: 'Leistungen',
      headingLead: 'Was ich übernehme,',
      headingTrail: 'damit dein Projekt vorankommt',
      intro:
        'Ein bis zwei Sätze darüber, in welcher Rolle du am meisten beiträgst und wie eine Zusammenarbeit typischerweise beginnt.',
      cta: { label: 'Mehr erfahren', href: '#kontakt' },
    },
    experience: {
      label: 'Werdegang',
      headingLead: 'Die Stationen,',
      headingTrail: 'die mich geprägt haben',
      intro:
        'Ein Satz als Klammer über deinen Werdegang — der rote Faden, den die einzelnen Stationen sonst nicht verraten.',
    },
    projects: {
      label: 'Projekte',
      headingLead: 'Ausgewählte Arbeiten,',
      headingTrail: 'die zeigen, wie ich denke',
      intro:
        'Ein Satz dazu, wonach du ausgewählt hast — nicht die grössten Projekte, sondern die aussagekräftigsten.',
    },
    testimonials: {
      label: 'Stimmen',
      headingLead: 'Was Menschen sagen,',
      headingTrail: 'die mit mir gearbeitet haben',
    },
    contact: {
      label: 'Kontakt',
      headingLead: 'Erzähl mir von deinem Projekt,',
      headingTrail: 'ich melde mich innerhalb von zwei Tagen',
      intro: undefined,
      interests: [
        'Web-Anwendung',
        'Mobile App',
        'Backend',
        'Frontend',
        'Datenbank-Design',
        'Full-Stack-Entwicklung',
        'Wartung & Support',
      ],
      formNote: 'Deine Angaben gehen direkt an mich und werden nicht weitergegeben.',
    },
    marqueeWords: ['SAUBERER CODE', 'KLARE ARCHITEKTUR', 'MESSBARE PERFORMANCE'],
  },

  stats: [
    {
      _id: 'stat-fallback-1',
      value: '[00]+',
      title: 'Abgeschlossene Projekte',
      description:
        'Eine Zeile darüber, welche Art von Projekten das waren und für welche Branchen.',
    },
    {
      _id: 'stat-fallback-2',
      value: '[00]',
      title: 'Jahre Erfahrung',
      description:
        'Eine Zeile darüber, worauf sich diese Jahre verteilen — Rollen, Stacks, Verantwortung.',
    },
  ],

  tools: [
    { _id: 'tool-fallback-1', name: '[Werkzeug 1]', category: 'Frontend' },
    { _id: 'tool-fallback-2', name: '[Werkzeug 2]', category: 'Frontend' },
    { _id: 'tool-fallback-3', name: '[Werkzeug 3]', category: 'Backend' },
    { _id: 'tool-fallback-4', name: '[Werkzeug 4]', category: 'Backend' },
    { _id: 'tool-fallback-5', name: '[Werkzeug 5]', category: 'Datenbank' },
    { _id: 'tool-fallback-6', name: '[Werkzeug 6]', category: 'Werkzeuge' },
  ],

  services: [
    {
      _id: 'service-fallback-1',
      iconKey: 'code',
      title: 'Software-Entwicklung',
      description:
        'Beschreibe in zwei Zeilen, was du hier konkret lieferst und woran der Kunde merkt, dass es gut gemacht ist.',
      href: '#kontakt',
    },
    {
      _id: 'service-fallback-2',
      iconKey: 'database',
      title: 'Datenbank & API',
      description:
        'Beschreibe in zwei Zeilen, was du hier konkret lieferst und woran der Kunde merkt, dass es gut gemacht ist.',
      href: '#kontakt',
    },
    {
      _id: 'service-fallback-3',
      iconKey: 'testing',
      title: 'Testing & Wartung',
      description:
        'Beschreibe in zwei Zeilen, was du hier konkret lieferst und woran der Kunde merkt, dass es gut gemacht ist.',
      href: '#kontakt',
    },
  ],

  experiences: [
    {
      _id: 'exp-fallback-1',
      role: '[Position]',
      company: '[Firmenname]',
      from: '[Jahr]',
      to: '[Jahr]',
      description:
        'Woran du dort gearbeitet hast und was sich durch deine Arbeit verändert hat. Ein konkretes Ergebnis wirkt stärker als eine Aufzählung von Aufgaben.',
    },
    {
      _id: 'exp-fallback-2',
      role: '[Position]',
      company: '[Firmenname]',
      from: '[Jahr]',
      to: '[Jahr]',
      description:
        'Woran du dort gearbeitet hast und was sich durch deine Arbeit verändert hat. Ein konkretes Ergebnis wirkt stärker als eine Aufzählung von Aufgaben.',
    },
    {
      _id: 'exp-fallback-3',
      role: '[Position]',
      company: '[Firmenname]',
      from: '[Jahr]',
      to: 'heute',
      description:
        'Woran du dort gearbeitet hast und was sich durch deine Arbeit verändert hat. Ein konkretes Ergebnis wirkt stärker als eine Aufzählung von Aufgaben.',
    },
  ],

  projects: [
    {
      _id: 'project-fallback-1',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
    {
      _id: 'project-fallback-2',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
    {
      _id: 'project-fallback-3',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
    {
      _id: 'project-fallback-4',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
    {
      _id: 'project-fallback-5',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
    {
      _id: 'project-fallback-6',
      title: '[Projektname]',
      category: '[Kategorie]',
      image: { fallbackSrc: '/placeholder/project.svg', alt: 'Platzhalter für ein Projektbild' },
    },
  ],

  testimonials: [
    {
      _id: 'testimonial-fallback-1',
      quote:
        'Platz für ein echtes Zitat: was die Zusammenarbeit ausgemacht hat, in den Worten der Person selbst.',
      author: '[Name]',
      role: '[Rolle, Firma]',
      photo: { fallbackSrc: '/placeholder/avatar.svg', alt: 'Platzhalter für ein Portraitfoto' },
      featured: false,
    },
    {
      _id: 'testimonial-fallback-2',
      quote:
        'Ein zweites Zitat, das einen anderen Aspekt beleuchtet als das erste — Verlässlichkeit, Tempo oder fachliche Tiefe.',
      author: '[Name]',
      role: '[Rolle, Firma]',
      photo: { fallbackSrc: '/placeholder/avatar.svg', alt: 'Platzhalter für ein Portraitfoto' },
      featured: true,
    },
    {
      _id: 'testimonial-fallback-3',
      quote:
        'Ein drittes Zitat. Kurze Zitate wirken hier stärker als lange — zwei Sätze genügen völlig.',
      author: '[Name]',
      role: '[Rolle, Firma]',
      photo: { fallbackSrc: '/placeholder/avatar.svg', alt: 'Platzhalter für ein Portraitfoto' },
      featured: false,
    },
  ],
}
