'use client'

import { useId, useState, type FormEvent } from 'react'

import ReadingHeadline from '@/components/ui/ReadingHeadline'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import type { SectionCopy } from '@/types/content'

type ContactProps = {
  copy: SectionCopy['contact']
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD =
  'w-full border-0 border-b border-hairline bg-transparent px-0 pb-3 pt-2 text-[0.9375rem] ' +
  'text-ink placeholder:text-chalk transition-colors duration-200 ease-soft ' +
  'focus:border-oxblood focus:outline-none focus:ring-0'

export default function Contact({ copy }: ContactProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const formId = useId()

  function toggleInterest(topic: string) {
    setInterests((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic],
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          interests,
          // Honigtopf: ein für Menschen unsichtbares Feld. Füllt ein Bot es aus,
          // verwirft die Route die Anfrage — ohne CAPTCHA und ohne Drittanbieter.
          company: data.get('company'),
        }),
      })

      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        setStatus('error')
        setMessage(result.message ?? 'Das hat nicht geklappt. Bitte später noch einmal versuchen.')
        return
      }

      setStatus('sent')
      setMessage(result.message ?? 'Danke — die Nachricht ist angekommen.')
      form.reset()
      setInterests([])
    } catch {
      setStatus('error')
      setMessage(
        'Die Nachricht liess sich nicht senden. Prüf die Internetverbindung oder schreib mir direkt per E-Mail.',
      )
    }
  }

  return (
    <section id="kontakt" className="section bg-paper">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-6 text-muted">{copy.label}</p>
          </Reveal>

          <ReadingHeadline
            lead={copy.headingLead}
            trail={copy.headingTrail}
            className="font-display text-display-sm font-bold leading-[1.05] tracking-[-0.02em]"
          />

          {copy.intro && (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-prose text-sm leading-relaxed text-muted">
                {copy.intro}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-3xl" noValidate={false}>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
              <div>
                <label htmlFor={`${formId}-name`} className="eyebrow text-muted">
                  Name <span className="text-oxblood">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={cn(FIELD, 'mt-3')}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="eyebrow text-muted">
                  E-Mail <span className="text-oxblood">*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={cn(FIELD, 'mt-3')}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-subject`} className="eyebrow text-muted">
                  Betreff
                </label>
                <input
                  id={`${formId}-subject`}
                  name="subject"
                  type="text"
                  className={cn(FIELD, 'mt-3')}
                />
              </div>
            </div>

            <div className="mt-10">
              <label htmlFor={`${formId}-message`} className="eyebrow text-muted">
                Deine Nachricht <span className="text-oxblood">*</span>
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                required
                rows={4}
                className={cn(FIELD, 'mt-3 resize-y')}
              />
            </div>

            {/* Für Menschen unsichtbar, für Bots verlockend. `tabIndex={-1}` und
                `aria-hidden` halten das Feld aus Tastatur- und Screenreader-Weg. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor={`${formId}-company`}>Firma (bitte frei lassen)</label>
              <input
                id={`${formId}-company`}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {copy.interests.length > 0 && (
              <fieldset className="mt-12">
                <legend className="eyebrow mb-5 text-muted">Worum geht es?</legend>
                <div className="flex flex-wrap gap-2.5">
                  {copy.interests.map((topic) => {
                    const active = interests.includes(topic)

                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleInterest(topic)}
                        aria-pressed={active}
                        className={cn(
                          'cursor-pointer rounded-pill border px-4 py-2 text-sm transition-colors duration-200 ease-soft',
                          active
                            ? 'border-oxblood bg-oxblood text-paper'
                            : 'border-hairline text-ink-soft hover:border-ink/40 hover:text-ink',
                        )}
                      >
                        {topic}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )}

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-pill bg-ink px-7 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-soft hover:bg-oxblood disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8h11" />
                  <path d="M9.5 4 13.5 8l-4 4" />
                </svg>
              </button>

              {copy.formNote && status === 'idle' && (
                <p className="text-xs leading-relaxed text-muted">{copy.formNote}</p>
              )}

              {/* `role="status"` meldet das Ergebnis, ohne den Fokus zu stehlen. */}
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  'text-sm leading-relaxed',
                  status === 'error' && 'text-oxblood',
                  status === 'sent' && 'text-ink',
                )}
              >
                {status === 'sent' || status === 'error' ? message : ''}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
