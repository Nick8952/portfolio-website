import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Grundeinstellungen',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'identity', title: 'Person', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'contact', title: 'Kontakt & Social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'identity',
      description: 'Erscheint in der Navigation, im Footer und im Seitentitel.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Jobtitel',
      type: 'string',
      group: 'identity',
      description: 'Zum Beispiel „Softwareentwickler" oder „Full-Stack-Entwicklerin".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Standort',
      type: 'string',
      group: 'identity',
      description: 'Wird im Footer angezeigt, z. B. „Zürich, Schweiz".',
    }),
    defineField({
      name: 'shortBio',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Zwei Sätze für den Footer. Was du baust und für wen.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'cvFile',
      title: 'Lebenslauf (PDF)',
      type: 'file',
      group: 'identity',
      description:
        'Wird über die Schaltfläche im Hero heruntergeladen. Alternativ unten eine externe Adresse eintragen.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'cvUrl',
      title: 'Lebenslauf — externe Adresse',
      type: 'url',
      group: 'identity',
      description: 'Nur nötig, wenn kein PDF hochgeladen wird. Das Upload-Feld hat Vorrang.',
    }),

    defineField({
      name: 'navLinks',
      title: 'Navigationslinks',
      type: 'array',
      group: 'navigation',
      of: [{ type: 'navLink' }],
      description: 'Reihenfolge per Drag-and-drop. Vier bis sechs Einträge lesen sich am besten.',
      validation: (rule) => rule.max(7),
    }),
    defineField({
      name: 'headerCta',
      title: 'Schaltfläche in der Navigation',
      type: 'cta',
      group: 'navigation',
    }),

    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      group: 'contact',
      description: 'Wird im Footer verlinkt und als Absender im Kontaktformular angezeigt.',
      validation: (rule) =>
        rule.required().custom((value) =>
          typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
            ? true
            : 'Bitte eine gültige E-Mail-Adresse eintragen.',
        ),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
      group: 'contact',
      description: 'Optional. Bleibt das Feld leer, wird die Nummer nirgends angezeigt.',
    }),
    defineField({
      name: 'socials',
      title: 'Social-Media-Links',
      type: 'array',
      group: 'contact',
      of: [{ type: 'socialLink' }],
    }),

    defineField({
      name: 'seoTitle',
      title: 'Seitentitel',
      type: 'string',
      group: 'seo',
      description:
        'Steht im Browser-Tab und als Überschrift in den Suchergebnissen. Bis 60 Zeichen werden vollständig angezeigt.',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta-Beschreibung',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Der Text unter dem Titel in den Suchergebnissen. 120 bis 160 Zeichen sind ideal.',
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'ogImage',
      title: 'Vorschaubild beim Teilen',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      description:
        'Erscheint, wenn jemand den Link in WhatsApp, LinkedIn oder Slack teilt. 1200 × 630 Pixel. ' +
        'Ohne Bild wird automatisch eines aus deinem Namen und Jobtitel erzeugt.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Grundeinstellungen',
      subtitle: subtitle || 'Name, Kontakt, Navigation, SEO',
    }),
  },
})
