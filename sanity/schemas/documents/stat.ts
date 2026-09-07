import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Kennzahl',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Zahl',
      type: 'string',
      description:
        'Wird sehr gross gesetzt. Als Text, damit Zusätze wie „+" oder „Mio." möglich sind. Beispiel: 320+',
      validation: (rule) => rule.required().max(8),
    }),
    defineField({
      name: 'title',
      title: 'Bezeichnung',
      type: 'string',
      description: 'Was die Zahl zählt, z. B. „Abgeschlossene Projekte".',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'description',
      title: 'Erläuterung',
      type: 'text',
      rows: 2,
      description: 'Ein Satz, der die Zahl einordnet.',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl steht weiter oben.',
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    { name: 'manual', title: 'Reihenfolge', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'value', subtitle: 'title', order: 'order' },
    prepare: ({ title, subtitle, order }) => ({
      title: `${title ?? '—'}  ${subtitle ?? ''}`.trim(),
      subtitle: `Position ${order ?? 0}`,
    }),
  },
})
