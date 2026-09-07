import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Schaltfläche',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Beschriftung',
      type: 'string',
      description: 'Was auf der Schaltfläche steht. Kurz und als Handlung formuliert.',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'href',
      title: 'Ziel',
      type: 'string',
      description:
        'Anker auf dieser Seite (z. B. #kontakt) oder vollständige Adresse (https://…).',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
