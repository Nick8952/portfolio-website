import Reveal from '@/components/motion/Reveal'
import { ablauf } from '@/lib/content'
import { cn } from '@/lib/utils'

/** Die vier Spalten treppen sich nach rechts ab — die Reihenfolge ist hier Information. */
const VERSATZ = ['lg:mt-0', 'lg:mt-10', 'lg:mt-20', 'lg:mt-[7.5rem]']

export default function Ablauf() {
  return (
    <section id="ablauf" className="section border-t border-hairline">
      <div className="shell">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">Ablauf</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">So läuft es.</h2>
            </div>
            <p className="max-w-measure text-lede text-ink/70 text-pretty md:col-span-5 md:pb-1">
              Vier Schritte. Der erste kostet Sie nichts ausser der Adresse Ihrer heutigen Website.
            </p>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-6">
          {ablauf.map((schritt, i) => (
            <li key={schritt.titel} className={cn(VERSATZ[i])}>
              <Reveal delay={i * 0.08}>
                <div className="border-t border-ink pt-6">
                  <p className="eyebrow eyebrow--slash tnum">Schritt {String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-6 font-display text-[4rem] font-semibold leading-none tracking-[-0.04em] text-kobalt tnum sm:text-[4.5rem]">
                    {i + 1}
                  </p>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.015em]">{schritt.titel}</h3>
                  <p className="mt-3 max-w-[38ch] text-base leading-relaxed text-ink/75 text-pretty">{schritt.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
