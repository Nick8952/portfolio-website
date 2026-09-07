import { CaseIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Leistung',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Symbol',
      type: 'string',
      description: 'Bestimmt das Icon auf der Karte.',
      options: {
        list: [
          { title: 'Code — Entwicklung', value: 'code' },
          { title: 'Datenbank', value: 'database' },
          { title: 'Testing / Qualität', value: 'testing' },
          { title: 'Cloud / Infrastruktur', value: 'cloud' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Performance', value: 'performance' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'code',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      description: 'Zwei Zeilen. Was du lieferst und woran man erkennt, dass es gut gemacht ist.',
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'href',
      title: 'Ziel des Pfeils',
      type: 'string',
      description:
        'Wohin der Pfeil unten rechts führt. Anker (#kontakt) oder vollständige Adresse. ' +
        'Ohne Wert ist die Karte nicht klickbar.',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Reihenfolge', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
