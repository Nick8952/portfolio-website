import ReadingHeadline from '@/components/ui/ReadingHeadline'
import Reveal from '@/components/ui/Reveal'
import type { About as AboutContent } from '@/types/content'

type AboutProps = {
  about: AboutContent
}

export default function About({ about }: AboutProps) {
  return (
    <section id="ueber-mich" className="section bg-paper">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="h-px w-8 bg-hairline" />
              {about.label}
            </p>
          </Reveal>

          <ReadingHeadline
            lead={about.headingLead}
            trail={about.headingTrail}
            className="font-display text-display-sm font-bold leading-[1.05] tracking-[-0.02em]"
          />
        </div>

        <div className="grid gap-8 lg:col-span-6 lg:col-start-7 lg:pt-3 xl:grid-cols-2">
          <Reveal delay={0.05}>
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{about.columnOne}</p>
          </Reveal>
          {about.columnTwo && (
            <Reveal delay={0.12}>
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{about.columnTwo}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
