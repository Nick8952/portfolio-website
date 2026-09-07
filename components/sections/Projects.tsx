import ArrowBadge from '@/components/ui/ArrowBadge'
import Picture from '@/components/ui/Picture'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Project, SectionCopy } from '@/types/content'

type ProjectsProps = {
  copy: SectionCopy['projects']
  projects: Project[]
}

export default function Projects({ copy, projects }: ProjectsProps) {
  return (
    <section id="projekte" className="section bg-ink text-paper">
      <div className="shell">
        <SectionHeader
          label={copy.label}
          headingLead={copy.headingLead}
          headingTrail={copy.headingTrail}
          intro={copy.intro}
          tone="dark"
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {projects.map((project, index) => {
            const href = project.caseStudyUrl ?? project.url
            const CardTag = href ? 'a' : 'div'

            return (
              <li key={project._id}>
                <Reveal delay={Math.min(index * 0.06, 0.3)}>
                  <CardTag
                    {...(href
                      ? { href, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={`group block overflow-hidden rounded-card bg-paper/5 ${
                      href ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-paper/5">
                      <Picture
                        image={project.image}
                        width={800}
                        height={600}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4 p-5">
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-tight text-paper">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper/50">
                          {project.category}
                        </p>
                      </div>

                      {href && <ArrowBadge tone="onDark" />}
                    </div>
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
