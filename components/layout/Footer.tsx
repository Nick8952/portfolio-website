import { navigation, person } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-[1.0625rem] font-semibold">{person.name}</p>
          <p className="mt-1 text-sm text-muted">
            {person.ausbildung.titel}, {person.ausbildung.fachrichtung} · {person.rolle}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navigation.map((e) => (
            <li key={e.href}>
              <a href={e.href} className="text-ink/70 transition-colors duration-200 ease-out hover:text-ink">
                {e.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${person.email}`} className="text-ink/70 transition-colors duration-200 ease-out hover:text-ink">
              E-Mail
            </a>
          </li>
          <li>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 transition-colors duration-200 ease-out hover:text-ink"
            >
              GitHub
            </a>
          </li>
        </ul>

        <p className="text-sm text-muted tnum">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
