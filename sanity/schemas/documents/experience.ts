import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Station im Werdegang',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'role',
      title: 'Position',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'company',
      title: 'Firma',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'from',
      title: 'Von',
      type: 'string',
      description: 'Jahr als Text, z. B. „2019".',
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: 'to',
      title: 'Bis',
      type: 'string',
      description: 'Jahr oder „heute" für die laufende Stelle.',
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 4,
      description:
        'Woran du gearbeitet hast und was sich dadurch verändert hat. Ein konkretes Ergebnis ' +
        'wirkt stärker als eine Liste von Aufgaben.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description:
        'Kleinere Zahl steht weiter oben. Üblich ist chronologisch — die älteste Station zuerst.',
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Reihenfolge', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'role', company: 'company', from: 'from', to: 'to' },
    prepare: ({ title, company, from, to }) => ({
      title,
      subtitle: [company, from && to ? `${from} – ${to}` : null].filter(Boolean).join('  ·  '),
    }),
  },
})
