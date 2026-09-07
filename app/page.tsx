import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import Tools from '@/components/sections/Tools'
import { siteUrl } from '@/lib/utils'
import { getPageContent } from '@/sanity/content'

/**
 * Inhalte werden höchstens 60 Sekunden alt (AE-4 in CLAUDE.md). Bewusst ISR
 * statt Webhook: der Betreiber soll nach dem Vercel-Import nichts mehr
 * einrichten müssen.
 */
export const revalidate = 60

export default async function HomePage() {
  const { settings, hero, about, copy, stats, tools, services, experiences, projects, testimonials } =
    await getPageContent()

  // Strukturierte Daten für Suchmaschinen. Beschreibt dieselbe Person wie die
  // Seite selbst — deshalb aus denselben Feldern gespeist, nicht separat gepflegt.
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.role,
    email: `mailto:${settings.email}`,
    url: siteUrl(),
    description: settings.seoDescription,
    ...(settings.location ? { address: { '@type': 'PostalAddress', addressLocality: settings.location } } : {}),
    ...(settings.socials.length > 0 ? { sameAs: settings.socials.map((social) => social.url) } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Header settings={settings} />

      <main id="inhalt">
        <Hero hero={hero} settings={settings} />

        {/* Hell: wer dahintersteht. */}
        <About about={about} />
        <Stats copy={copy.stats} stats={stats} />
        <Tools copy={copy.tools} tools={tools} />

        {/* Dunkel: was der Besucher bekommt. */}
        <Services copy={copy.services} services={services} />

        <Experience copy={copy.experience} experiences={experiences} />

        <Projects copy={copy.projects} projects={projects} />

        <Marquee words={copy.marqueeWords} />

        <Testimonials copy={copy.testimonials} testimonials={testimonials} />
        <Contact copy={copy.contact} />
      </main>

      <Footer settings={settings} />
    </>
  )
}
