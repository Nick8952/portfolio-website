import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { ordinal } from '@/lib/utils'
import type { Experience as ExperienceItem, SectionCopy } from '@/types/content'

type ExperienceProps = {
  copy: SectionCopy['experience']
  experiences: ExperienceItem[]
}

/**
 * Die einzige Stelle der Seite, an der nummeriert wird. Ein Werdegang ist eine
 * echte Abfolge — die Zahl trägt hier Information. In den Leistungs- und
 * Projektkarten wäre sie blosse Dekoration und fehlt deshalb dort.
 */
export default function Experience({ copy, experiences }: ExperienceProps) {
  return (
    <section id="werdegang" className="section bg-paper">
      <div className="shell">
        <SectionHeader
          label={copy.label}
          headingLead={copy.headingLead}
          headingTrail={copy.headingTrail}
          intro={copy.intro}
        />

        <ol className="mt-16 lg:mt-20">
          {experiences.map((item, index) => (
            <li key={item._id} className="border-t border-hairline last:border-b">
              <Reveal delay={Math.min(index * 0.06, 0.24)}>
                <article className="grid gap-4 py-8 md:grid-cols-12 md:gap-6 lg:py-10">
                  <p
                    aria-hidden="true"
                    className="font-display text-2xl font-black leading-none text-chalk md:col-span-1 lg:text-3xl"
                  >
                    {ordinal(index)}
                  </p>

                  <div className="md:col-span-7 lg:col-span-7">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink lg:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-oxblood">{item.company}</p>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>

                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-3 md:col-start-10 md:text-right">
                    <time>{item.from}</time>
                    <span aria-hidden="true"> – </span>
                    <time>{item.to}</time>
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
