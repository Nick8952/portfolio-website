import Link from 'next/link'

import { footer, navigation, person, rechtliches, ueberMich } from '@/lib/content'

/**
 * Der Fuss: links der Satz, der die Seite zusammenfasst, daneben die Ziele und
 * der Kontakt (E-Mail, LinkedIn), unten Impressum, Datenschutz und die
 * Mono-Zeile. Kein GitHub-Link: Besucher sind Betriebsinhaber, keine Entwickler.
 */
export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-sunk/60">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-6">
          <p className="font-display text-display-md font-semibold text-balance">{footer.slogan}</p>
          <p className="mt-6 max-w-[40ch] text-base text-ink/70 text-pretty">
            {person.name} · {person.ausbildung.titel}, {person.ausbildung.fachrichtung} · {person.rolle}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-base">
            {navigation.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="text-ink/80 transition-colors duration-200 ease-out hover:text-kobalt">
                  {e.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#anfrage" className="text-ink/80 transition-colors duration-200 ease-out hover:text-kobalt">
                Anfrage
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Kontakt</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-base">
            <li>
              <a href={`mailto:${person.email}`} className="link break-all">
                {person.email}
              </a>
            </li>
            <li>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/80 transition-colors duration-200 ease-out hover:text-kobalt"
              >
                {ueberMich.linkedinLabel}
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </li>
            <li className="text-ink/70">
              {person.adresse.plz} {person.adresse.ort}, {person.adresse.land}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow normal-case tracking-[0.05em]">{footer.technik}</p>
          <p className="eyebrow tnum flex flex-wrap items-center gap-x-3">
            {rechtliches.map((r) => (
              <Link key={r.href} href={r.href} className="transition-colors duration-200 ease-out hover:text-kobalt">
                {r.label}
              </Link>
            ))}
            <span aria-hidden="true">·</span>
            <span>
              © {new Date().getFullYear()} {person.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
