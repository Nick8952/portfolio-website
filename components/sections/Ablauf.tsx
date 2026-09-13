import { ablauf } from '@/lib/content'

/**
 * Die Nummern sind hier Information: Der Ablauf ist eine Reihenfolge, und
 * genau die soll der Leser mitnehmen — zuerst die Demo, dann das Gespraech.
 */
export default function Ablauf() {
  return (
    <section id="ablauf" className="section">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-display-lg font-semibold text-balance">So läuft es.</h2>
            <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">
              Vier Schritte. Der erste kostet Sie nichts ausser der Adresse Ihrer heutigen Website.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-7">
          {ablauf.map((schritt, i) => (
            <li
              key={schritt.titel}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-hairline py-8 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:py-10"
            >
              <span className="font-display text-display-md font-semibold leading-none text-kobalt tnum">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.015em] md:text-[1.75rem]">
                  {schritt.titel}
                </h3>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink/75 text-pretty">
                  {schritt.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
