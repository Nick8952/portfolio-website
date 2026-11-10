import Reveal from '@/components/motion/Reveal'
import { vergleich } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Drei Wege zur Website, nebeneinander. Keine Haekchen und Kreuze — die
 * Zeilen sprechen fuer sich, und wo Angebote variieren, steht es so da.
 * Auf schmalen Bildschirmen scrollt die Tabelle seitlich, die Merkmalspalte
 * bleibt stehen.
 */
export default function Vergleich() {
  return (
    <section id="vergleich" className="section border-t border-hairline">
      <div className="shell">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">{vergleich.eyebrow}</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">{vergleich.titel}</h2>
            </div>
            <p className="max-w-measure text-lede text-ink/70 text-pretty md:col-span-5 md:pb-1">{vergleich.text}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="overflow-x-auto rounded-card border border-hairline">
            <table className="vergleich w-full min-w-[44rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">
                Vergleich der drei Wege: Demo zuerst, Agentur, Baukasten — nach Startpunkt, erster Vorschau,
                Anpassungen, Pflege und Kostenmodell
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-[1] bg-paper px-5 py-4 font-normal sm:px-6">
                    <span className="eyebrow">Merkmal</span>
                  </th>
                  {vergleich.spalten.map((s, i) => (
                    <th
                      key={s}
                      scope="col"
                      className={cn(
                        'px-5 py-4 font-display text-lg font-semibold tracking-[-0.01em] sm:px-6',
                        i === 0 && 'spalte--ich border-t-2 border-t-kobalt',
                      )}
                    >
                      {s}
                      {i === 0 && <span className="eyebrow ml-2 text-kobalt">dieses Angebot</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vergleich.zeilen.map((zeile) => (
                  <tr key={zeile.merkmal}>
                    <th scope="row" className="sticky left-0 z-[1] bg-paper px-5 py-5 font-medium text-ink sm:px-6">
                      {zeile.merkmal}
                    </th>
                    {zeile.werte.map((wert, i) => (
                      <td
                        key={wert}
                        className={cn(
                          'px-5 py-5 leading-relaxed sm:px-6',
                          i === 0 ? 'spalte--ich font-medium text-ink' : 'text-ink/70',
                        )}
                      >
                        {wert}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
