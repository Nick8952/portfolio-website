import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description: 'Kurze Einordnung, z. B. „Web-Anwendung" oder „Mobile App".',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'image',
      title: 'Vorschaubild',
      type: 'image',
      options: { hotspot: true },
      description:
        'Querformat, mindestens 1200 Pixel breit. Den Hotspot auf den wichtigsten Bildteil setzen — ' +
        'in der Kachel wird beschnitten.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          description: 'Was auf dem Bild zu sehen ist. Für Screenreader und Suchmaschinen.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link zum Projekt',
      type: 'url',
      description: 'Die Live-Adresse. Öffnet sich in einem neuen Tab.',
    }),
    defineField({
      name: 'caseStudyUrl',
      title: 'Link zur Fallstudie',
      type: 'url',
      description: 'Optional — ein ausführlicher Beitrag über das Projekt.',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl steht weiter vorne. Die stärkste Arbeit gehört nach oben.',
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Reihenfolge', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
