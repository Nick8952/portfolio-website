import Link from 'next/link'

export default function NichtGefunden() {
  return (
    <main className="flex min-h-[100svh] items-center">
      <div className="shell">
        <h1 className="font-display text-display-xl font-semibold">Diese Seite gibt es nicht.</h1>
        <p className="mt-6 max-w-measure text-lede text-ink/70">
          Vielleicht ein Tippfehler in der Adresse, vielleicht ein alter Link.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-13 items-center rounded-pill bg-ink px-7 text-base font-medium text-paper transition-colors duration-200 ease-out hover:bg-kobalt"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  )
}
