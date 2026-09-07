import type { SanityImageSource } from '@sanity/image-url'

/**
 * Ein Bild kann aus zwei Quellen kommen: einem Sanity-Asset oder — solange das CMS
 * noch nicht befüllt ist — einer lokalen Platzhalterdatei. Beide Fälle laufen durch
 * dieselbe <Picture>-Komponente, damit die Sections den Unterschied nicht kennen
 * müssen.
 */
export type PortfolioImage = {
  asset?: SanityImageSource | null
  fallbackSrc?: string
  alt: string
}

export type SocialLink = {
  /** Bestimmt, welches Icon gerendert wird. */
  platform: 'github' | 'linkedin' | 'x' | 'instagram' | 'mastodon' | 'website'
  label: string
  url: string
}

export type CTA = {
  label: string
  href: string
}

export type NavLink = {
  label: string
  /** Anker auf der Startseite, z. B. "#ueber-mich". */
  href: string
}

export type SiteSettings = {
  name: string
  role: string
  location: string
  email: string
  phone?: string
  shortBio: string
  navLinks: NavLink[]
  headerCta: CTA
  socials: SocialLink[]
  /** Direktlink auf das CV-PDF (Sanity-File-Asset oder externe URL). */
  cvUrl?: string
  seoTitle: string
  seoDescription: string
  ogImage?: PortfolioImage
}

export type Hero = {
  eyebrow: string
  /** Die kleinere, gesperrte Zeile über dem Riesenwort — z. B. "SOFTWARE". */
  displayLead: string
  /** Das monumentale Wort — z. B. "ENGINEER". */
  displayMain: string
  intro: string
  portrait?: PortfolioImage
  primaryCta?: CTA
  secondaryCta?: CTA
}

/**
 * Headlines sind durchgängig zweifarbig: `lead` steht im kräftigen Ton,
 * `trail` im hellen. Die Aufteilung ist Redaktionsarbeit, deshalb liegt
 * sie im CMS und nicht im Code.
 */
export type SectionHeading = {
  label: string
  headingLead: string
  headingTrail: string
  intro?: string
}

export type About = {
  label: string
  headingLead: string
  headingTrail: string
  columnOne: string
  columnTwo: string
}

export type SectionCopy = {
  stats: SectionHeading & { image?: PortfolioImage }
  tools: SectionHeading
  services: SectionHeading & { cta?: CTA }
  experience: SectionHeading
  projects: SectionHeading
  testimonials: SectionHeading
  contact: SectionHeading & {
    /** Auswählbare Interessens-Tags unter dem Formular. */
    interests: string[]
    /** Hinweistext unter dem Absenden-Button. */
    formNote?: string
  }
  /** Wörter des Laufbands zwischen Projekten und Footer. */
  marqueeWords: string[]
}

export type Stat = {
  _id: string
  value: string
  title: string
  description?: string
}

export type Tool = {
  _id: string
  name: string
  icon?: PortfolioImage
  category?: string
}

/** Schlüssel der mitgelieferten SVG-Icons — siehe components/ui/ServiceIcon.tsx. */
export type ServiceIconKey =
  | 'code'
  | 'database'
  | 'testing'
  | 'cloud'
  | 'mobile'
  | 'performance'

export type Service = {
  _id: string
  iconKey: ServiceIconKey
  title: string
  description: string
  href?: string
}

export type Experience = {
  _id: string
  role: string
  company: string
  from: string
  to: string
  description: string
}

export type Project = {
  _id: string
  title: string
  category: string
  image?: PortfolioImage
  url?: string
  caseStudyUrl?: string
}

export type Testimonial = {
  _id: string
  quote: string
  author: string
  role: string
  photo?: PortfolioImage
  /** Hervorgehobene Zitate erscheinen in der dunklen Kreiskarte. */
  featured: boolean
}

/** Das komplette Datenpaket der Startseite — ein Fetch, eine Übergabe. */
export type PageContent = {
  settings: SiteSettings
  hero: Hero
  about: About
  copy: SectionCopy
  stats: Stat[]
  tools: Tool[]
  services: Service[]
  experiences: Experience[]
  projects: Project[]
  testimonials: Testimonial[]
}
