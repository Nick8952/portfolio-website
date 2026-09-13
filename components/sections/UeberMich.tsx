import { person, ueberMich } from '@/lib/content'

export default function UeberMich() {
  return (
    <section id="ueber-mich" className="section">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          {/* Das Foto fehlt noch. Ein ehrlicher leerer Platz statt eines
              Stock-Bildes — sobald ein Portrait da ist, kommt es hierher. */}
          <div className="flex aspect-[4/5] w-full max-w-[26rem] items-end rounded-card bg-sunk p-6">
            <p className="text-sm text-muted">Portrait folgt.</p>
          </div>

          <dl className="mt-10 max-w-[26rem]">
            <dt className="text-sm text-muted">{ueberMich.ausbildungTitel}</dt>
            {ueberMich.ausbildung.map((e) => (
              <dd key={e.was} className="mt-2 border-t border-hairline pt-3">
                <p className="font-medium">{e.was}</p>
                <p className="text-ink/70">{e.detail}</p>
              </dd>
            ))}

            <dt className="mt-8 text-sm text-muted">{ueberMich.werkzeugeTitel}</dt>
            <dd className="mt-2 border-t border-hairline pt-3">
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-ink/80">
                {ueberMich.werkzeuge.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="font-display text-display-lg font-semibold text-balance">{ueberMich.titel}</h2>
          <div className="mt-8 space-y-6 max-w-measure text-lede text-ink/80 text-pretty">
            {ueberMich.absaetze.map((a) => (
              <p key={a.slice(0, 24)}>{a}</p>
            ))}
          </div>
          <p className="mt-10 text-base">
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="link">
              Code auf GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
