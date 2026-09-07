import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center bg-ink bg-hero-bloom text-paper">
      <div className="shell py-24 text-center">
        <p className="eyebrow mb-8 text-ember-lift">Fehler 404</p>

        <h1 className="display text-lit text-display-lg">404</h1>

        <p className="mx-auto mt-8 max-w-prose text-sm leading-relaxed text-paper/70">
          Diese Seite gibt es nicht — vielleicht hat sich ein Tippfehler in die Adresse
          geschlichen, vielleicht ist der Link veraltet.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex cursor-pointer items-center gap-2.5 rounded-pill bg-oxblood px-7 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-soft hover:bg-ember"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  )
}
