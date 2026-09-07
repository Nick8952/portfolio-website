import { cache } from 'react'

import { fallbackContent } from '@/lib/fallback'
import type {
  About,
  Experience,
  Hero,
  PageContent,
  Project,
  SectionCopy,
  Service,
  SiteSettings,
  Stat,
  Testimonial,
  Tool,
} from '@/types/content'

import { sanityFetch } from './fetch'
import {
  aboutQuery,
  experiencesQuery,
  heroQuery,
  projectsQuery,
  sectionCopyQuery,
  servicesQuery,
  settingsQuery,
  statsQuery,
  testimonialsQuery,
  toolsQuery,
} from './queries'

/**
 * `cache()` bündelt identische Aufrufe innerhalb einer Anfrage. Layout und Seite
 * brauchen beide die Grundeinstellungen — ohne das wären es zwei Abfragen für
 * dasselbe Dokument.
 */
export const getSettings = cache(
  async (): Promise<SiteSettings> => sanityFetch(settingsQuery, fallbackContent.settings),
)

export const getPageContent = cache(async (): Promise<PageContent> => {
  const [settings, hero, about, copy, stats, tools, services, experiences, projects, testimonials] =
    await Promise.all([
      getSettings(),
      sanityFetch<Hero>(heroQuery, fallbackContent.hero),
      sanityFetch<About>(aboutQuery, fallbackContent.about),
      sanityFetch<SectionCopy>(sectionCopyQuery, fallbackContent.copy),
      sanityFetch<Stat[]>(statsQuery, fallbackContent.stats),
      sanityFetch<Tool[]>(toolsQuery, fallbackContent.tools),
      sanityFetch<Service[]>(servicesQuery, fallbackContent.services),
      sanityFetch<Experience[]>(experiencesQuery, fallbackContent.experiences),
      sanityFetch<Project[]>(projectsQuery, fallbackContent.projects),
      sanityFetch<Testimonial[]>(testimonialsQuery, fallbackContent.testimonials),
    ])

  // Ein teilweise befülltes CMS darf keine halbe Seite ergeben: fehlt in einem
  // Dokument ein einzelnes Feld, tritt der Platzhalter für genau dieses Feld ein.
  return {
    settings,
    hero: { ...fallbackContent.hero, ...hero },
    about: { ...fallbackContent.about, ...about },
    copy: {
      ...fallbackContent.copy,
      ...copy,
      stats: { ...fallbackContent.copy.stats, ...copy?.stats },
      tools: { ...fallbackContent.copy.tools, ...copy?.tools },
      services: { ...fallbackContent.copy.services, ...copy?.services },
      experience: { ...fallbackContent.copy.experience, ...copy?.experience },
      projects: { ...fallbackContent.copy.projects, ...copy?.projects },
      testimonials: { ...fallbackContent.copy.testimonials, ...copy?.testimonials },
      contact: {
        ...fallbackContent.copy.contact,
        ...copy?.contact,
        // Ein leeres Tag-Array im CMS soll die Auswahl wirklich ausblenden,
        // deshalb hier kein Rückfall auf die Platzhalterliste.
        interests: copy?.contact?.interests ?? fallbackContent.copy.contact.interests,
      },
      marqueeWords: copy?.marqueeWords ?? fallbackContent.copy.marqueeWords,
    },
    stats,
    tools,
    services,
    experiences,
    projects,
    testimonials,
  }
})
