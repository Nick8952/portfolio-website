import { isSanityConfigured } from '@/sanity/env'

import Studio from './Studio'

export const dynamic = 'force-static'

/**
 * Nötig für den statischen GitHub-Pages-Export: ein Catch-all-Segment braucht
 * in `output: 'export'` mindestens einen Parametersatz. Ein leeres Array
 * prärendert genau `/studio` selbst — die einzige Route, die ohne angebundenes
 * Sanity-Projekt ohnehin sinnvoll ist (siehe SetupNotice unten).
 * Auf Vercel schadet das nicht: dort bleiben Unterpfade wie /studio/desk
 * weiterhin dynamisch, das hier kommt nur als zusätzliche statische Route dazu.
 */
export function generateStaticParams() {
  return [{ tool: [] }]
}

export { metadata, viewport } from 'next-sanity/studio'

/**
 * Ohne konfiguriertes Sanity-Projekt würde das Studio beim Start mit einem
 * unverständlichen Fehler abbrechen. Stattdessen steht hier, was zu tun ist.
 */
function SetupNotice() {
  return (
    <main className="flex min-h-[100svh] items-center bg-ink text-paper">
      <div className="shell max-w-3xl py-24">
        <p className="eyebrow mb-6 text-ember-lift">Studio</p>

        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Noch kein Sanity-Projekt verbunden
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-paper/70">
          Die Website läuft bereits — sie zeigt so lange Platzhalterinhalte an. Damit du
          Texte und Bilder hier bearbeiten kannst, fehlt nur noch das Sanity-Projekt.
        </p>

        <ol className="mt-10 flex flex-col gap-6">
          {[
            {
              command: 'npx sanity login',
              text: 'Bei Sanity anmelden (Google, GitHub oder E-Mail).',
            },
            {
              command: 'npx sanity init --env .env.local',
              text: '„Create new project" wählen, als Dataset „production". Projekt-ID und Dataset werden automatisch in .env.local geschrieben.',
            },
            {
              command: 'npm run dev',
              text: 'Entwicklungsserver neu starten — danach ist diese Seite das Studio.',
            },
          ].map((step, index) => (
            <li key={step.command} className="border-t border-paper/10 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-paper/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <code className="font-mono text-sm text-ember-lift">{step.command}</code>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm leading-relaxed text-paper/50">
          Danach in sanity.io/manage unter <span className="text-paper/70">API → CORS origins</span>{' '}
          noch die Adressen <span className="text-paper/70">http://localhost:3000</span> und die
          Vercel-Adresse mit <span className="text-paper/70">Allow credentials</span> eintragen.
          Die ausführliche Anleitung steht in der README.
        </p>
      </div>
    </main>
  )
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SetupNotice />

  return <Studio />
}
