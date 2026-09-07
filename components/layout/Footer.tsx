import Button from '@/components/ui/Button'
import SocialIcon from '@/components/ui/SocialIcon'
import type { SiteSettings } from '@/types/content'

type FooterProps = {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Derselbe Lichtschein wie im Hero, nur von unten — die Seite schliesst
          mit demselben Licht, mit dem sie beginnt. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26rem] bg-[radial-gradient(60%_100%_at_50%_100%,rgb(var(--c-oxblood)/0.5),transparent_70%)]"
      />

      <div className="shell relative py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-paper/40">Navigation</p>
            <ul className="flex flex-col gap-3">
              {settings.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="cursor-pointer text-sm text-paper/70 transition-colors duration-200 ease-soft hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-paper/40">{settings.role}</p>
            <p className="max-w-prose text-sm leading-relaxed text-paper/70">{settings.shortBio}</p>
            {settings.location && (
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-paper/50">
                {settings.location}
              </p>
            )}
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow mb-5 text-paper/40">Kontakt</p>
            <a
              href={`mailto:${settings.email}`}
              className="cursor-pointer break-words text-sm text-paper transition-colors duration-200 ease-soft hover:text-ember-lift"
            >
              {settings.email}
            </a>
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="mt-2 block cursor-pointer text-sm text-paper/70 transition-colors duration-200 ease-soft hover:text-paper"
              >
                {settings.phone}
              </a>
            )}

            <Button href="#kontakt" variant="primary" className="mt-6" withArrow>
              Zusammenarbeiten
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-paper/45">
            © {year} {settings.name}. Alle Rechte vorbehalten.
          </p>

          {settings.socials.length > 0 && (
            <ul className="flex items-center gap-2">
              {settings.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors duration-200 ease-soft hover:border-ember hover:bg-ember hover:text-paper"
                  >
                    <span className="sr-only">{social.label}</span>
                    <SocialIcon platform={social.platform} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
