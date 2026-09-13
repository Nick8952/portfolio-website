import { betrieb, preise } from '@/lib/content'
import { chf, cn } from '@/lib/utils'

/**
 * Der dunkle Abschnitt der Seite — der Moment, in dem es konkret wird.
 * Preise als Zeilen, nicht als Karten: drei Zeilen lassen sich vergleichen,
 * drei Karten wollen jede fuer sich gelesen werden.
 */
export default function Preise() {
  return (
    <section id="preise" className="section bg-ink text-paper">
      <div className="shell">
        <h2 className="font-display text-display-lg font-semibold text-balance max-w-[20ch]">
          Preise, die ich vorher sage.
        </h2>
        <p className="mt-5 max-w-measure text-lede text-paper/70 text-pretty">
          Richtwerte. Was Ihr Betrieb genau braucht, sehen wir nach der Demo — und dann steht die
          Zahl schriftlich fest, bevor Sie etwas zahlen.
        </p>

        <div className="mt-14 border-t border-paper/15 md:mt-20">
          {preise.map((stufe) => (
            <div
              key={stufe.name}
              className="grid gap-6 border-b border-paper/15 py-9 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <div className="md:col-span-3">
                <h3
                  className={cn(
                    'font-display text-display-md font-semibold',
                    stufe.hervorheben && 'text-kobalt-lift',
                  )}
                >
                  {stufe.name}
                </h3>
                <p className="mt-1.5 text-base text-paper/60">
                  {stufe.umfang}
                  {stufe.hervorheben && <span className="text-paper/40"> · der Regelfall</span>}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="text-sm text-paper/60">ab</p>
                <p className="font-display text-display-md font-semibold tnum">
                  <span className="text-paper/60 text-[0.55em] font-medium align-top mr-1.5">CHF</span>
                  {chf(stufe.ab)}
                </p>
              </div>

              <div className="md:col-span-6">
                <p className="text-base leading-relaxed text-paper/80 text-pretty">{stufe.fuer}</p>
                <ul className="mt-5 grid gap-2 text-[0.9375rem] text-paper/70 sm:grid-cols-2">
                  {stufe.punkte.map((punkt) => (
                    <li key={punkt} className="flex items-start gap-2.5">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-kobalt-lift"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      {punkt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="max-w-[60ch] text-base leading-relaxed text-paper/80 md:col-span-8 text-pretty">
            {betrieb.satz}
          </p>
          <p className="text-sm leading-relaxed text-paper/55 md:col-span-4 text-pretty">{betrieb.hinweis}</p>
        </div>
      </div>
    </section>
  )
}
