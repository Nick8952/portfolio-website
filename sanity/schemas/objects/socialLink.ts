import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social-Media-Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plattform',
      type: 'string',
      description: 'Bestimmt, welches Icon angezeigt wird.',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'X (Twitter)', value: 'x' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Mastodon', value: 'mastodon' },
          { title: 'Eigene Website', value: 'website' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Beschriftung',
      type: 'string',
      description: 'Wird Screenreadern vorgelesen und als Tooltip angezeigt.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Adresse',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' },
  },
})
