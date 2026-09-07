import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Stimme',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Zitat',
      type: 'text',
      rows: 4,
      description:
        'Zwei Sätze wirken hier stärker als fünf. In den Worten der Person, nicht umformuliert.',
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'author',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'role',
      title: 'Rolle und Firma',
      type: 'string',
      description: 'Zum Beispiel „Product Owner, [Firma]".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      description: 'Wird kreisrund beschnitten. Hotspot auf das Gesicht setzen.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Hervorheben',
      type: 'boolean',
      description:
        'Hervorgehobene Stimmen erscheinen in der dunklen Karte. Genau eine hervorheben — ' +
        'sonst verliert die Auszeichnung ihre Wirkung.',
      initialValue: false,
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
    select: { title: 'author', subtitle: 'role', media: 'photo', featured: 'featured' },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `${title}  ★` : title,
      subtitle,
      media,
    }),
  },
})
