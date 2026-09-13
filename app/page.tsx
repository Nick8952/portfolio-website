import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import Ablauf from '@/components/sections/Ablauf'
import Anfrage from '@/components/sections/Anfrage'
import Hero from '@/components/sections/Hero'
import Preise from '@/components/sections/Preise'
import UeberMich from '@/components/sections/UeberMich'
import Websites from '@/components/sections/Websites'
import { person, seo, websites } from '@/lib/content'
import { siteUrl } from '@/lib/utils'

export default function Startseite() {
  // Strukturierte Daten aus denselben Inhalten wie die Seite selbst.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: `${person.ausbildung.titel} (${person.ausbildung.fachrichtung})`,
    description: seo.beschreibung,
    email: `mailto:${person.email}`,
    url: siteUrl(),
    sameAs: [person.github],
    knowsAbout: ['Webentwicklung', 'Next.js', 'Websites für KMU'],
    hasOccupation: { '@type': 'Occupation', name: 'Webentwickler' },
    workExample: websites.map((w) => ({ '@type': 'WebSite', name: w.name, url: w.url })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main id="inhalt">
        <Hero />
        <Websites />
        <Ablauf />
        <Preise />
        <UeberMich />
        <Anfrage />
      </main>
      <Footer />
    </>
  )
}
