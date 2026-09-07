type MarqueeProps = {
  words: string[]
}

/**
 * Laufband zwischen Projekten und Kontakt. Rein per CSS animiert — kein
 * JavaScript, kein Layout-Thrashing, und `prefers-reduced-motion` hält es über
 * die globale Regel in globals.css automatisch an.
 *
 * Die Wortliste wird zweimal gerendert und um genau 50 % verschoben; dadurch
 * schliesst der Lauf nahtlos, egal wie lang die Wörter sind.
 */
export default function Marquee({ words }: MarqueeProps) {
  if (words.length === 0) return null

  const track = [...words, ...words]

  return (
    <div
      className="mask-fade-x overflow-hidden border-y border-hairline bg-paper py-6"
      // Ein dekoratives Band. Screenreader würden die doppelte Wortliste sonst
      // zweimal vorlesen, ohne dass es etwas beiträgt.
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-8 will-change-transform">
        {track.map((word, index) => (
          <span key={`${word}-${index}`} className="flex shrink-0 items-center gap-8">
            <span className="display whitespace-nowrap text-lg tracking-[0.08em] text-ink lg:text-xl">
              {word}
            </span>
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
