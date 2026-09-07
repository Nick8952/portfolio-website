import { WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const tool = defineType({
  name: 'tool',
  title: 'Werkzeug / Technologie',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Zum Beispiel „React" oder „PostgreSQL".',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'icon',
      title: 'Logo',
      type: 'image',
      description:
        'Am besten ein SVG oder ein PNG mit transparentem Hintergrund, quadratisch. ' +
        'Ohne Logo wird der Anfangsbuchstabe angezeigt.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          description: 'Leer lassen, wenn der Name daneben steht — dann ist das Logo dekorativ.',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description: 'Optional, z. B. „Frontend" oder „Datenbank". Wird als Untertitel angezeigt.',
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl steht weiter links.',
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Reihenfolge', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'icon' },
  },
})
