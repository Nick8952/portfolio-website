import Picture from '@/components/ui/Picture'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SectionCopy, Tool } from '@/types/content'

type ToolsProps = {
  copy: SectionCopy['tools']
  tools: Tool[]
}

export default function Tools({ copy, tools }: ToolsProps) {
  return (
    <section id="werkzeuge" className="section bg-paper pt-0">
      <div className="shell">
        <SectionHeader
          label={copy.label}
          headingLead={copy.headingLead}
          headingTrail={copy.headingTrail}
          intro={copy.intro}
        />

        <ul className="mt-16 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-4 lg:mt-20 lg:grid-cols-6">
          {tools.map((tool, index) => (
            <li key={tool._id}>
              <Reveal delay={index * 0.05}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="grid h-14 w-14 place-items-center text-ink">
                    {tool.icon ? (
                      <Picture
                        image={tool.icon}
                        width={112}
                        height={112}
                        sizes="56px"
                        className="object-contain"
                      />
                    ) : (
                      // Ohne hochgeladenes Logo tritt der Anfangsbuchstabe ein.
                      // Besser als ein leerer Platz und besser als ein generisches
                      // Ersatz-Icon, das nichts über das Werkzeug aussagt.
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 place-items-center rounded-2xl bg-paper-sunk font-display text-lg font-black text-chalk"
                      >
                        {tool.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-ink">{tool.name}</p>
                  {tool.category && (
                    <p className="-mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                      {tool.category}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
