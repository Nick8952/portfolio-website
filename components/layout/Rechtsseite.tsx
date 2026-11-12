import Link from 'next/link'

import type { DatenschutzAbschnitt } from '@/lib/datenschutz'
import { person, rechtliches } from '@/lib/content'

type RechtsseiteProps = {
  titel: string
  stand: string
  einleitung: string
  abschnitte: readonly DatenschutzAbschnitt[]
  /** Pfad dieser Seite — die andere Rechtsseite wird unten verlinkt. */
  pfad: string
}

/**
 * Schlichte Textseite fuer Impressum und Datenschutz. Bewusst ohne Nav und
 * Footer der Startseite: deren Ankerlinks (#preise usw.) wuerden hier ins Leere
 * zeigen. Muss ohne JavaScript vollstaendig lesbar sein (die Datenschutz-URL
 * steht im Meta-Sofortformular).
 */
export default function Rechtsseite({ titel, stand, einleitung, abschnitte, pfad }: RechtsseiteProps) {
  return (
    <main className="py-16 md:py-24">
      <div className="shell">
        <Link href="/" className="eyebrow transition-colors duration-200 ease-out hover:text-kobalt">
          ← Zur Startseite
        </Link>

        <article className="mt-10 max-w-measure">
          <h1 className="font-display text-display-lg font-semibold text-balance">{titel}</h1>
          <p className="eyebrow mt-4 normal-case tracking-[0.05em]">Stand: {stand}</p>
          <p className="mt-8 text-lede text-ink/80 text-pretty">{einleitung}</p>

          {abschnitte.map((a) => (
            <section key={a.titel} className="mt-12">
              <h2 className="font-display text-2xl font-semibold leading-tight">{a.titel}</h2>
              {a.adresse && (
                <address className="mt-4 text-base not-italic leading-relaxed text-ink/80">
                  {a.adresse.map((z) => (
                    <span key={z} className="block">
                      {z}
                    </span>
                  ))}
                </address>
              )}
              {a.absaetze?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-ink/80 text-pretty">
                  {p}
                </p>
              ))}
              {a.liste && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/80">
                  {a.liste.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <nav aria-label="Rechtliches" className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-6">
          {rechtliches
            .filter((r) => r.href !== pfad)
            .map((r) => (
              <Link key={r.href} href={r.href} className="link text-sm">
                {r.label}
              </Link>
            ))}
          <a href={`mailto:${person.email}`} className="link text-sm">
            {person.email}
          </a>
          <span className="eyebrow ml-auto tnum">© {new Date().getFullYear()} {person.name}</span>
        </nav>
      </div>
    </main>
  )
}
