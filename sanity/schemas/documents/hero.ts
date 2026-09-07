import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero (Startbereich)',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Zeile über der Beschreibung',
      type: 'string',
      description: 'Kurzer Gruss, z. B. „Willkommen in meinem Portfolio".',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'displayLead',
      title: 'Grosse Typo — obere Zeile',
      type: 'string',
      description:
        'Steht gesperrt über dem Riesenwort. Ein Wort funktioniert am besten, z. B. „SOFTWARE".',
      validation: (rule) => rule.required().max(18),
    }),
    defineField({
      name: 'displayMain',
      title: 'Grosse Typo — Riesenwort',
      type: 'string',
      description:
        'Das grösste Element der ganzen Seite. Maximal zehn Zeichen, sonst wird es auf dem Handy unlesbar klein. Beispiel: „ENGINEER".',
      validation: (rule) => rule.required().max(12),
    }),
    defineField({
      name: 'intro',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
      description: 'Zwei bis drei Zeilen neben dem Portrait.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'portrait',
      title: 'Portraitfoto',
      type: 'image',
      options: { hotspot: true },
      description:
        'Freigestelltes Foto wirkt hier am stärksten, weil es über die grosse Schrift ragt. ' +
        'Den Hotspot auf das Gesicht setzen — danach richtet sich der Zuschnitt auf dem Handy.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          description: 'Für Screenreader. Zum Beispiel „Portraitfoto von [Name]".',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Erste Schaltfläche',
      type: 'cta',
      description: 'Üblicherweise der Lebenslauf-Download.',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Zweite Schaltfläche',
      type: 'cta',
      description: 'Üblicherweise der Link auf dein GitHub-Profil.',
    }),
  ],
  preview: {
    select: { title: 'displayMain', subtitle: 'displayLead', media: 'portrait' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ? `${subtitle ?? ''} ${title}`.trim() : 'Hero',
      subtitle: 'Startbereich der Seite',
      media,
    }),
  },
})
