import type { Metadata } from 'next'
import Link from 'next/link'

import { datenschutz } from '@/lib/datenschutz'
import { kanonischeUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: `${datenschutz.titel} · Nick Holzbecher`,
  description: 'Welche Personendaten Nick Holzbecher bearbeitet und wofür.',
  alternates: { canonical: `${kanonischeUrl()}/datenschutz/` },
}

/**
 * Schlichte Textseite. Bewusst ohne Nav und Footer der Startseite: deren Ankerlinks
 * (#preise usw.) wuerden hier ins Leere zeigen. Wird als URL im Meta-Sofortformular
 * hinterlegt — darum muss sie ohne JavaScript vollstaendig lesbar sein.
 */
export default function Datenschutz() {
  return (
    <main className="py-16 md:py-24">
      <div className="shell">
        <Link href="/" className="eyebrow transition-colors duration-200 ease-out hover:text-kobalt">
          ← Zur Startseite
        </Link>

        <article className="mt-10 max-w-measure">
          <h1 className="font-display text-display-lg font-semibold text-balance">{datenschutz.titel}</h1>
          <p className="eyebrow mt-4 normal-case tracking-[0.05em]">Stand: {datenschutz.stand}</p>
          <p className="mt-8 text-lede text-ink/80 text-pretty">{datenschutz.einleitung}</p>

          {datenschutz.abschnitte.map((a) => (
            <section key={a.titel} className="mt-12">
              <h2 className="font-display text-2xl font-semibold leading-tight">{a.titel}</h2>
              {a.absaetze?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-ink/80 text-pretty">
                  {p}
                </p>
              ))}
              {'liste' in a && a.liste && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/80">
                  {a.liste.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
