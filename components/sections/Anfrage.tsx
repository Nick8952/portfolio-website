'use client'

import { useId, useState, type FormEvent } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import { anfrage, person } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Versand ueber FormSubmit — ein Dienst, der ohne Konto und ohne Backend
 * funktioniert und deshalb auf GitHub Pages laeuft. Beim allerersten Versand
 * schickt FormSubmit eine Aktivierungs-Mail an die Empfaengeradresse; erst
 * nach dem Klick darin werden Anfragen zugestellt (siehe README).
 *
 * Schlaegt der Versand fehl, steht die E-Mail-Adresse direkt da. Niemand soll
 * an einem kaputten Formular scheitern.
 */
const ENDPUNKT = `https://formsubmit.co/ajax/${person.email}`

type Zustand = 'bereit' | 'sendet' | 'gesendet' | 'fehler'

const FELD =
  'w-full rounded-[10px] border border-hairline bg-paper px-4 py-3.5 text-base text-ink ' +
  'placeholder:text-muted transition-[border-color,box-shadow] duration-200 ease-out ' +
  'hover:border-ink/40 focus:border-kobalt focus:outline-none focus:ring-4 focus:ring-kobalt/15'

export default function Anfrage() {
  const [zustand, setZustand] = useState<Zustand>('bereit')
  const id = useId()

  async function senden(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const daten = new FormData(form)

    // Honigtopf: ein Feld, das Menschen nicht sehen. Ist es gefuellt, war es
    // ein Bot — wir tun so, als waere gesendet worden.
    if (daten.get('_honey')) {
      setZustand('gesendet')
      return
    }

    setZustand('sendet')
    try {
      const antwort = await fetch(ENDPUNKT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: daten.get('name'),
          betrieb: daten.get('betrieb'),
          email: daten.get('email'),
          telefon: daten.get('telefon') || '—',
          website: daten.get('website') || '—',
          nachricht: daten.get('nachricht') || '—',
          _subject: `Website-Anfrage von ${daten.get('betrieb') || daten.get('name')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!antwort.ok) throw new Error(String(antwort.status))
      setZustand('gesendet')
      form.reset()
    } catch {
      setZustand('fehler')
    }
  }

  return (
    <section id="anfrage" className="section border-t border-hairline">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-display-lg font-semibold text-balance">{anfrage.titel}</h2>
            <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">{anfrage.text}</p>
            <p className="mt-8 text-base text-ink/70">
              Oder direkt:{' '}
              <a href={`mailto:${person.email}`} className="link">
                {person.email}
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={senden} className="lg:col-span-6 lg:col-start-7" noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Feld id={`${id}-name`} label="Name" name="name" autoComplete="name" required />
            <Feld id={`${id}-betrieb`} label="Betrieb" name="betrieb" autoComplete="organization" required />
            <Feld id={`${id}-email`} label="E-Mail" name="email" type="email" autoComplete="email" required />
            <Feld id={`${id}-telefon`} label="Telefon" name="telefon" type="tel" autoComplete="tel" optional />
            <div className="sm:col-span-2">
              <Feld
                id={`${id}-website`}
                label="Ihre heutige Website"
                name="website"
                type="url"
                placeholder="https://"
                optional
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-nachricht`} className="mb-2 block text-sm font-medium">
                Nachricht <span className="font-normal text-muted">optional</span>
              </label>
              <textarea id={`${id}-nachricht`} name="nachricht" rows={4} className={cn(FELD, 'resize-y')} />
            </div>
          </div>

          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor={`${id}-honey`}>Bitte frei lassen</label>
            <input id={`${id}-honey`} name="_honey" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Magnetic staerke={0.25}>
              <button
                type="submit"
                disabled={zustand === 'sendet'}
                className="inline-flex h-13 items-center rounded-pill bg-kobalt px-7 text-base font-medium text-paper transition-colors duration-200 ease-out hover:bg-ink disabled:cursor-progress disabled:opacity-70"
              >
                {zustand === 'sendet' ? 'Wird gesendet …' : anfrage.senden}
              </button>
            </Magnetic>

            <p role="status" aria-live="polite" className="text-base text-ink/80">
              {zustand === 'gesendet' && anfrage.erfolg}
              {zustand === 'fehler' && (
                <>
                  {anfrage.fehler}{' '}
                  <a href={`mailto:${person.email}`} className="link">
                    {person.email}
                  </a>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Feld({
  id,
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  required,
  optional,
}: {
  id: string
  label: string
  name: string
  type?: string
  autoComplete?: string
  placeholder?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">optional</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className={FELD}
      />
    </div>
  )
}
