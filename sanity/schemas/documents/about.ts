import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Über mich',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Kleines Label',
      type: 'string',
      initialValue: 'Über mich',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'headingLead',
      title: 'Headline — erster Teil (kräftig)',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'headingTrail',
      title: 'Headline — zweiter Teil (hell)',
      type: 'string',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'columnOne',
      title: 'Textspalte links',
      type: 'text',
      rows: 5,
      description: 'Rund vierzig Wörter. Woher du kommst und wie du hierher gekommen bist.',
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'columnTwo',
      title: 'Textspalte rechts',
      type: 'text',
      rows: 5,
      description: 'Rund vierzig Wörter. Wie du arbeitest und was eine Zusammenarbeit ausmacht.',
      validation: (rule) => rule.max(600),
    }),
  ],
  preview: {
    select: { subtitle: 'headingLead' },
    prepare: ({ subtitle }) => ({ title: 'Über mich', subtitle }),
  },
})
