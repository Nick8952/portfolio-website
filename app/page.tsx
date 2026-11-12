import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import Ablauf from '@/components/sections/Ablauf'
import Anfrage from '@/components/sections/Anfrage'
import Erkennen from '@/components/sections/Erkennen'
import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import Laufband from '@/components/sections/Laufband'
import Preise from '@/components/sections/Preise'
import Referenz from '@/components/sections/Referenz'
import UeberMich from '@/components/sections/UeberMich'
import Vergleich from '@/components/sections/Vergleich'
import Websites from '@/components/sections/Websites'
import { faq, person, referenz, seo } from '@/lib/content'
import { siteUrl } from '@/lib/utils'

/**
 * Die Dramaturgie: Hero → die echte Referenz (bekommt den meisten Raum) →
 * woran man das Problem erkennt → die Beispiele → wie es ablaeuft → was es kostet →
 * der Unterschied → wer das baut → Fragen → Anfrage. Alles fuehrt zum Formular.
 */
export default function Startseite() {
  // Strukturierte Daten aus denselben Inhalten wie die Seite selbst. Als
  // Arbeitsbeispiel nur die Referenz — die Beispiele haben bewusst keine Adresse.
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      jobTitle: `Lernender ${person.ausbildung.titel}, Fachrichtung ${person.ausbildung.fachrichtung}`,
      description: seo.beschreibung,
      email: `mailto:${person.email}`,
      url: siteUrl(),
      sameAs: [person.linkedin],
      address: {
        '@type': 'PostalAddress',
        postalCode: person.adresse.plz,
        addressLocality: person.adresse.ort,
        addressCountry: 'CH',
      },
      knowsAbout: ['Webentwicklung', 'Next.js', 'Websites für KMU'],
      hasOccupation: { '@type': 'Occupation', name: 'Webentwickler im Nebenerwerb' },
      workExample: [{ '@type': 'WebSite', name: referenz.name, url: referenz.url }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.eintraege.map((e) => ({
        '@type': 'Question',
        name: e.frage,
        acceptedAnswer: { '@type': 'Answer', text: e.antwort },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main id="inhalt">
        <Hero />
        <Laufband />
        <Referenz />
        <Erkennen />
        <Websites />
        <Ablauf />
        <Preise />
        <Vergleich />
        <UeberMich />
        <Faq />
        <Anfrage />
      </main>
      <Footer />
    </>
  )
}
