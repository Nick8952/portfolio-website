/**
 * Die Adressen der Websites fuer das Screenshot-Skript. Bewusst getrennt von
 * lib/content.ts, damit das Node-Skript ohne TypeScript-Toolchain laeuft.
 * Slugs muessen mit lib/content.ts uebereinstimmen.
 *
 * `url` ist die Adresse, die aufgenommen wird. Sie darf von der verlinkten
 * Adresse abweichen: www.suwannaphum.ch liegt hinter dem Vercel-Sicherheits-
 * Checkpoint (403 fuer automatische Zugriffe), der vercel.app-Alias zeigt
 * dieselbe Veroeffentlichung.
 */
export const websites = [
  { slug: 'suwannaphum', url: 'https://suwannaphum-restaurant-demo.vercel.app/' },
  { slug: 'advokatur-kanonengasse', url: 'https://nick8952.github.io/advokatur-kanonengasse-demo/' },
  { slug: 'praxis-zuerichberg', url: 'https://nick8952.github.io/praxis-zuerichberg-website/' },
  { slug: 'casatex', url: 'https://nick8952.github.io/casatex-zuerich-demo/' },
  { slug: 'new-york-nails', url: 'https://nick8952.github.io/new-york-nails-schlieren-demo/' },
  { slug: 'vitis-sportcenter', url: 'https://nick8952.github.io/vitis-sportcenter-website/' },
  { slug: 'maler-attinger', url: 'https://nick8952.github.io/maler-attinger-website/' },
  { slug: 'styling-azzurro', url: 'https://nick8952.github.io/styling-azzurro-website/' },
  { slug: 'clean-express', url: 'https://nick8952.github.io/clean-express-website/' },
  { slug: 'hg-dienstleistungen', url: 'https://nick8952.github.io/hg-dienstleistungen-website/' },
  { slug: 'altec-elektro', url: 'https://nick8952.github.io/altec-elektro-demo/' },
  // Seit November 2026 nicht mehr oeffentlich (GitLab-Projekte antworten mit 403/404):
  // { slug: 'fahrschul-center', url: 'https://fahrschul-center-demo-bfeae8.gitlab.io/' },
  // { slug: 'fahrlehrer-zuerich', url: 'https://fahrlehrer-zuerich-fdb7e6.gitlab.io/' },
  // Offline seit 3.11.2026 (GitHub Pages aus, Vercel-Projekt geloescht):
  // { slug: 'gusto-campano', url: 'https://nick8952.github.io/gusto-campano-website/' },
]
