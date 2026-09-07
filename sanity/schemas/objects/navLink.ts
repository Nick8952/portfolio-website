import { defineField, defineType } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigationslink',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Beschriftung',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: 'href',
      title: 'Ziel',
      type: 'string',
      description:
        'Sprungmarke auf dieser Seite. Verfügbar sind: #ueber-mich, #zahlen, #werkzeuge, ' +
        '#leistungen, #werdegang, #projekte, #stimmen, #kontakt',
      initialValue: '#',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
