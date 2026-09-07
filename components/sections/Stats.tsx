import Picture from '@/components/ui/Picture'
import ReadingHeadline from '@/components/ui/ReadingHeadline'
import Reveal from '@/components/ui/Reveal'
import type { SectionCopy, Stat } from '@/types/content'

type StatsProps = {
  copy: SectionCopy['stats']
  stats: Stat[]
}

/**
 * Die Manifest-Zeile der Seite: eine Aussage im grössten Grad ausserhalb des
 * Heros, darunter die Zahlen, die sie belegen. Genau hier lohnt sich die
 * mitlesende Einfärbung am meisten — der Satz ist lang genug, dass die
 * wandernde Tongrenze zum Weiterlesen zieht.
 */
export default function Stats({ copy, stats }: StatsProps) {
  return (
    <section id="zahlen" className="section bg-paper pt-0">
      <div className="shell">
        <ReadingHeadline
          lead={copy.headingLead}
          trail={copy.headingTrail}
          className="display max-w-[20ch] text-display-md"
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <dl className="flex flex-col gap-12 lg:col-span-5">
            {stats.map((stat, index) => (
              <Reveal key={stat._id} delay={index * 0.08}>
                <div>
                  <dt className="sr-only">{stat.title}</dt>
                  <dd>
                    <p className="display text-[clamp(3rem,7vw,4.75rem)] leading-[0.85] text-ink">
                      {stat.value}
                    </p>
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                      {stat.title}
                    </p>
                    {stat.description && (
                      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
                        {stat.description}
                      </p>
                    )}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          {copy.image && (
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="aspect-[4/3] overflow-hidden rounded-card bg-paper-sunk">
                <Picture
                  image={copy.image}
                  width={1000}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
