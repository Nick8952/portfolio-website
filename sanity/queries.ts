/**
 * Alle GROQ-Abfragen an einem Ort. Wer ein Schemafeld umbenennt, findet hier
 * jede betroffene Stelle, ohne das components/-Verzeichnis durchsuchen zu müssen.
 */

/**
 * Bildprojektion: `@` gibt das gesamte Bildobjekt zurück, also inklusive
 * `hotspot` und `crop`. Nur die Asset-Referenz allein würde den im Studio
 * gesetzten Bildausschnitt verwerfen.
 */
const IMAGE = `{ "asset": @, alt }`

const HEADING = `label, headingLead, headingTrail, intro`

export const settingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  name,
  role,
  location,
  email,
  phone,
  shortBio,
  navLinks[]{ label, href },
  headerCta{ label, href },
  socials[]{ platform, label, url },
  "cvUrl": coalesce(cvFile.asset->url, cvUrl),
  seoTitle,
  seoDescription,
  ogImage${IMAGE}
}`

export const heroQuery = /* groq */ `
*[_type == "hero"][0]{
  eyebrow,
  displayLead,
  displayMain,
  intro,
  portrait${IMAGE},
  primaryCta{ label, href },
  secondaryCta{ label, href }
}`

export const aboutQuery = /* groq */ `
*[_type == "about"][0]{
  label,
  headingLead,
  headingTrail,
  columnOne,
  columnTwo
}`

export const sectionCopyQuery = /* groq */ `
*[_type == "sectionCopy"][0]{
  stats{ ${HEADING}, image${IMAGE} },
  tools{ ${HEADING} },
  services{ ${HEADING}, cta{ label, href } },
  experience{ ${HEADING} },
  projects{ ${HEADING} },
  testimonials{ ${HEADING} },
  contact{ ${HEADING}, interests, formNote },
  marqueeWords
}`

/** Collections sortieren durchgängig über das numerische Feld `order`. */
export const statsQuery = /* groq */ `
*[_type == "stat"] | order(order asc){ _id, value, title, description }`

export const toolsQuery = /* groq */ `
*[_type == "tool"] | order(order asc){ _id, name, category, icon${IMAGE} }`

export const servicesQuery = /* groq */ `
*[_type == "service"] | order(order asc){ _id, iconKey, title, description, href }`

export const experiencesQuery = /* groq */ `
*[_type == "experience"] | order(order asc){ _id, role, company, from, to, description }`

export const projectsQuery = /* groq */ `
*[_type == "project"] | order(order asc){
  _id, title, category, url, caseStudyUrl, image${IMAGE}
}`

export const testimonialsQuery = /* groq */ `
*[_type == "testimonial"] | order(order asc){
  _id, quote, author, role, featured, photo${IMAGE}
}`
