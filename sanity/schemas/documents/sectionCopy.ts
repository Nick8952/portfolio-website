import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Sammelt die Kopfzeilen aller übrigen Sections in einem Dokument. Der Betreiber
 * soll Labels und Headlines an einer Stelle finden, statt sie über acht
 * Dokumenttypen zu suchen. Die Gruppen oben im Studio entsprechen der
 * Reihenfolge der Sections auf der Seite.
 */
export const sectionCopy = defineType({
  name: 'sectionCopy',
  title: 'Section-Texte',
  type: 'document',
  icon: BlockContentIcon,
  groups: [
    { name: 'stats', title: 'Zahlen', default: true },
    { name: 'tools', title: 'Werkzeuge' },
    { name: 'services', title: 'Leistungen' },
    { name: 'experience', title: 'Werdegang' },
    { name: 'projects', title: 'Projekte' },
    { name: 'testimonials', title: 'Stimmen' },
    { name: 'contact', title: 'Kontakt' },
    { name: 'marquee', title: 'Laufband' },
  ],
  fields: [
    defineField({ name: 'stats', title: 'Zahlen', type: 'statsHeading', group: 'stats' }),
    defineField({ name: 'tools', title: 'Werkzeuge', type: 'sectionHeading', group: 'tools' }),
    defineField({ name: 'services', title: 'Leistungen', type: 'servicesHeading', group: 'services' }),
    defineField({ name: 'experience', title: 'Werdegang', type: 'sectionHeading', group: 'experience' }),
    defineField({ name: 'projects', title: 'Projekte', type: 'sectionHeading', group: 'projects' }),
    defineField({ name: 'testimonials', title: 'Stimmen', type: 'sectionHeading', group: 'testimonials' }),
    defineField({ name: 'contact', title: 'Kontakt', type: 'contactHeading', group: 'contact' }),
    defineField({
      name: 'marqueeWords',
      title: 'Wörter im Laufband',
      type: 'array',
      group: 'marquee',
      of: [{ type: 'string' }],
      description:
        'Laufen zwischen Projekten und Footer durchs Bild. Zwei bis vier kurze Begriffe, gross geschrieben.',
      options: { layout: 'tags' },
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Section-Texte',
      subtitle: 'Labels, Headlines und Einleitungen aller Abschnitte',
    }),
  },
})
