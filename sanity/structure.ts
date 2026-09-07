import {
  BarChartIcon,
  BlockContentIcon,
  CalendarIcon,
  CaseIcon,
  CogIcon,
  CommentIcon,
  HomeIcon,
  ImagesIcon,
  UserIcon,
  WrenchIcon,
} from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

/**
 * Die Seitenleiste des Studios. Zwei Gründe für die eigene Struktur statt der
 * automatischen Liste:
 *
 * 1. Singletons bekommen keinen „Neues Dokument"-Knopf. Zwei Hero-Dokumente
 *    hätten sonst niemand gebraucht, aber jeder hätte sie anlegen können.
 * 2. Die Reihenfolge folgt der Seite von oben nach unten. Wer den Hero sucht,
 *    findet ihn dort, wo er auf der Website auch steht.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem()
        .title('Grundeinstellungen')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem()
        .title('Hero (Startbereich)')
        .icon(HomeIcon)
        .child(S.document().schemaType('hero').documentId('hero')),

      S.listItem()
        .title('Über mich')
        .icon(UserIcon)
        .child(S.document().schemaType('about').documentId('about')),

      S.listItem()
        .title('Section-Texte')
        .icon(BlockContentIcon)
        .child(S.document().schemaType('sectionCopy').documentId('sectionCopy')),

      S.divider(),

      S.documentTypeListItem('stat').title('Kennzahlen').icon(BarChartIcon),
      S.documentTypeListItem('tool').title('Werkzeuge').icon(WrenchIcon),
      S.documentTypeListItem('service').title('Leistungen').icon(CaseIcon),
      S.documentTypeListItem('experience').title('Werdegang').icon(CalendarIcon),
      S.documentTypeListItem('project').title('Projekte').icon(ImagesIcon),
      S.documentTypeListItem('testimonial').title('Stimmen').icon(CommentIcon),
    ])
