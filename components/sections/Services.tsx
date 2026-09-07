import ArrowBadge from '@/components/ui/ArrowBadge'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceIcon from '@/components/ui/ServiceIcon'
import type { SectionCopy, Service } from '@/types/content'

type ServicesProps = {
  copy: SectionCopy['services']
  services: Service[]
}

/**
 * Erster dunkler Abschnitt nach dem Hero. Der Wechsel ist nicht dekorativ:
 * dunkle Sections sind die, in denen es um den Besucher geht — was er bekommt.
 * Helle Sections erzählen, wer dahintersteht.
 */
export default function Services({ copy, services }: ServicesProps) {
  return (
    <section id="leistungen" className="section relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(55%_100%_at_50%_0%,rgb(var(--c-wine)/0.55),transparent_72%)]"
      />

      <div className="shell relative">
        <SectionHeader
          label={copy.label}
          headingLead={copy.headingLead}
          headingTrail={copy.headingTrail}
          intro={copy.intro}
          tone="dark"
          action={
            copy.cta ? (
              <Button href={copy.cta.href} variant="primary" withArrow>
                {copy.cta.label}
              </Button>
            ) : undefined
          }
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, index) => {
            const CardTag = service.href ? 'a' : 'div'

            return (
              <li key={service._id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <CardTag
                    {...(service.href
                      ? {
                          href: service.href,
                          ...(/^https?:\/\//.test(service.href)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {}),
                        }
                      : {})}
                    className={`group flex h-full flex-col rounded-card bg-paper p-7 transition-transform duration-300 ease-soft ${
                      service.href ? 'cursor-pointer hover:-translate-y-1' : ''
                    }`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper-sunk text-ink">
                      <ServiceIcon name={service.iconKey} className="h-6 w-6" />
                    </span>

                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

                    {service.href && (
                      <span className="mt-8 flex justify-end">
                        <ArrowBadge tone="onLight" />
                      </span>
                    )}
                  </CardTag>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
