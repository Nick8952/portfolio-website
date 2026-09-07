import type { SchemaTypeDefinition } from 'sanity'

import { about } from './documents/about'
import { experience } from './documents/experience'
import { hero } from './documents/hero'
import { project } from './documents/project'
import { sectionCopy } from './documents/sectionCopy'
import { service } from './documents/service'
import { siteSettings } from './documents/siteSettings'
import { stat } from './documents/stat'
import { testimonial } from './documents/testimonial'
import { tool } from './documents/tool'
import { cta } from './objects/cta'
import { navLink } from './objects/navLink'
import {
  contactHeading,
  sectionHeading,
  servicesHeading,
  statsHeading,
} from './objects/sectionHeading'
import { socialLink } from './objects/socialLink'

/** Dokumenttypen, die es genau einmal gibt. Steuert die Desk-Struktur. */
export const singletonTypes = ['siteSettings', 'hero', 'about', 'sectionCopy'] as const

export const schemaTypes: SchemaTypeDefinition[] = [
  // Wiederverwendbare Bausteine
  cta,
  navLink,
  socialLink,
  sectionHeading,
  statsHeading,
  servicesHeading,
  contactHeading,

  // Singletons
  siteSettings,
  hero,
  about,
  sectionCopy,

  // Sammlungen
  stat,
  tool,
  service,
  experience,
  project,
  testimonial,
]
