import { defineField, defineType } from 'sanity'

/**
 * Jede Section trägt dieselbe Kopfstruktur. Die Headline ist zweigeteilt, weil
 * die beiden Hälften unterschiedlich eingefärbt werden — wo genau die Grenze
 * verläuft, ist eine redaktionelle Entscheidung und gehört deshalb ins CMS.
 *
 * Sanity lässt benannte Object-Typen nicht per `fields` erweitern (das können nur
 * `image` und `file`). Die Basisfelder liegen deshalb als Funktion vor, aus der
 * sich sowohl der schlichte Kopf als auch die drei Varianten mit Zusatzfeldern
 * zusammensetzen.
 */
export const headingFields = () => [
  defineField({
    name: 'label',
    title: 'Kleines Label',
    type: 'string',
    description: 'Das kurze Wort über der Headline, z. B. „Werkzeuge".',
    validation: (rule) => rule.required().max(30),
  }),
  defineField({
    name: 'headingLead',
    title: 'Headline — erster Teil (kräftig)',
    type: 'string',
    description: 'Dieser Teil steht im dunklen Ton. Hier gehört die Kernaussage hin.',
    validation: (rule) => rule.required().max(90),
  }),
  defineField({
    name: 'headingTrail',
    title: 'Headline — zweiter Teil (hell)',
    type: 'string',
    description:
      'Dieser Teil steht im hellen Ton und wird beim Scrollen Wort für Wort eingefärbt.',
    validation: (rule) => rule.max(90),
  }),
  defineField({
    name: 'intro',
    title: 'Einleitungstext',
    type: 'text',
    rows: 3,
    description: 'Optionaler Absatz rechts neben der Headline. Ein bis zwei Sätze.',
    validation: (rule) => rule.max(320),
  }),
]

const headingPreview = {
  select: { title: 'label', subtitle: 'headingLead' },
} as const

export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section-Kopf',
  type: 'object',
  fields: headingFields(),
  preview: headingPreview,
})

/** Kopf der Zahlen-Section — trägt zusätzlich das Begleitbild. */
export const statsHeading = defineType({
  name: 'statsHeading',
  title: 'Kopf der Zahlen-Section',
  type: 'object',
  fields: [
    ...headingFields(),
    defineField({
      name: 'image',
      title: 'Begleitbild',
      type: 'image',
      options: { hotspot: true },
      description: 'Querformat wirkt hier am besten, etwa 4:3.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: headingPreview,
})

/** Kopf der Leistungs-Section — trägt zusätzlich die Schaltfläche. */
export const servicesHeading = defineType({
  name: 'servicesHeading',
  title: 'Kopf der Leistungs-Section',
  type: 'object',
  fields: [
    ...headingFields(),
    defineField({
      name: 'cta',
      title: 'Schaltfläche',
      type: 'cta',
    }),
  ],
  preview: headingPreview,
})

/** Kopf der Kontakt-Section — trägt zusätzlich die Themen-Tags und den Hinweis. */
export const contactHeading = defineType({
  name: 'contactHeading',
  title: 'Kopf der Kontakt-Section',
  type: 'object',
  fields: [
    ...headingFields(),
    defineField({
      name: 'interests',
      title: 'Auswählbare Themen',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Erscheinen als anklickbare Schaltflächen unter dem Formular. Fünf bis sieben sind ideal.',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'formNote',
      title: 'Hinweis unter dem Absenden-Knopf',
      type: 'string',
      description: 'Ein Satz, z. B. zum Datenschutz oder zur Antwortzeit.',
      validation: (rule) => rule.max(140),
    }),
  ],
  preview: headingPreview,
})
