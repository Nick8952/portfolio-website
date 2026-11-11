/**
 * Datenschutzerklaerung nach revDSG (Art. 19 ff.). Eigene Datei, weil sie
 * Rechtstext ist und nicht Werbetext — Aenderungen hier bewusst und mit Datum.
 *
 * Grundlage (Stand 11.11.2026): Diese Website setzt keine Cookies, hat keine
 * Statistik und kein Tracking, laedt die Schriften selbst gehostet. Daten fallen an
 * beim Hosting (Vercel, GitHub Pages), beim Formular (FormSubmit → Gmail) und bei
 * Anfragen ueber Meta-Werbung (Facebook/Instagram-Sofortformular).
 * Kommt etwas dazu (Meta-Pixel, Statistik, Karte, Video), MUSS dieser Text vorher
 * angepasst werden — und das Pixel braucht dann eine Einwilligung.
 */

export type DatenschutzAbschnitt = {
  titel: string
  absaetze?: readonly string[]
  liste?: readonly string[]
}

export const datenschutz = {
  titel: 'Datenschutzerklärung',
  stand: '11. November 2026',
  einleitung:
    'Hier steht, welche Personendaten ich bearbeite, wenn Sie diese Website besuchen, mir schreiben oder über eine Anzeige auf Facebook oder Instagram eine Anfrage senden. Grundlage ist das Schweizer Datenschutzgesetz (DSG).',
  abschnitte: [
    {
      titel: 'Verantwortlich',
      absaetze: [
        'Verantwortlich für die Datenbearbeitung ist Nick Holzbecher, Websites für kleine Betriebe, Schweiz. Für alle Fragen zum Datenschutz erreichen Sie mich per E-Mail an holzbechernick@gmail.com.',
      ],
    },
    {
      titel: 'Besuch der Website',
      absaetze: [
        'Die Website wird bei Vercel Inc. (USA) betrieben, eine Kopie liegt bei GitHub Inc. (USA, GitHub Pages). Beim Aufruf verarbeiten diese Anbieter technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das dient dem sicheren und stabilen Betrieb. Wie lange diese Protokolle gespeichert werden, richtet sich nach den Bedingungen der Hosting-Anbieter.',
        'Diese Website setzt keine Cookies, nutzt keine Statistik- oder Werbedienste und lädt keine Inhalte von Dritten nach. Die Schriften liegen auf dem eigenen Server.',
      ],
    },
    {
      titel: 'Anfrage über das Formular oder per E-Mail',
      absaetze: [
        'Wenn Sie das Formular ausfüllen, werden Ihre Angaben (Name, E-Mail, Telefon, Betrieb, Website-Adresse, Nachricht) über den Dienst FormSubmit (formsubmit.co) an mein E-Mail-Postfach bei Google (Gmail) weitergeleitet. FormSubmit speichert Einsendungen nach eigenen Angaben bis zu 30 Tage. Schreiben Sie mir direkt, landet Ihre Nachricht ebenfalls in Gmail.',
        'Ich verwende diese Angaben nur, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot zu erstellen.',
      ],
    },
    {
      titel: 'Anfrage über Facebook oder Instagram',
      absaetze: [
        'Ich schalte Anzeigen auf Facebook und Instagram. Wenn Sie dort das Anfrageformular ausfüllen, erhalte ich über Meta Platforms Ireland Ltd. (Irland) die Angaben, die Sie im Formular machen: Name, Firmenname, Telefonnummer, E-Mail und Ihre Antworten auf die Fragen (z. B. heutige Website, Ziel, Zeitpunkt, Budget, beste Anrufzeit).',
        'Ich nutze diese Angaben nur, um Sie wie gewünscht per Telefon, SMS oder E-Mail zu kontaktieren und Ihre Anfrage zu bearbeiten. Für die Bearbeitung Ihrer Daten durch Meta selbst gilt die Datenschutzrichtlinie von Meta.',
      ],
    },
    {
      titel: 'Wer Ihre Daten erhält',
      absaetze: [
        'Ich verkaufe Ihre Daten nicht und gebe sie nicht für Werbung weiter. Empfänger sind nur die Dienste, die ich für die beschriebenen Zwecke brauche:',
      ],
      liste: [
        'Hosting: Vercel Inc. und GitHub Inc. (USA)',
        'Formular: FormSubmit (formsubmit.co)',
        'E-Mail und Ablage von Anfragen: Google LLC (USA, Gmail und gegebenenfalls Google Tabellen)',
        'Anzeigen und Anfrageformular: Meta Platforms Ireland Ltd. (Irland); konzernintern kann auch Meta Platforms, Inc. (USA) Daten bearbeiten',
        'Telefon und SMS: mein Mobilfunkanbieter',
      ],
    },
    {
      titel: 'Bekanntgabe ins Ausland',
      absaetze: [
        'Personendaten können in Irland (EU) und in den USA bearbeitet werden. Für Irland gilt nach Entscheid des Bundesrates ein angemessenes Datenschutzniveau. Übermittlungen an US-Anbieter, die unter dem Swiss-U.S. Data Privacy Framework zertifiziert sind, stützen sich darauf; bei anderen Anbietern auf die vom EDÖB anerkannten Standardvertragsklauseln mit den für die Schweiz nötigen Anpassungen. Wo beides nicht vorliegt (etwa beim Formulardienst FormSubmit), erfolgt die Bekanntgabe nur, weil sie unmittelbar mit der von Ihnen gewünschten Anfrage und einem möglichen Vertrag zusammenhängt (Art. 17 Abs. 1 Bst. b DSG). Wer das vermeiden möchte, schreibt mir direkt per E-Mail.',
      ],
    },
    {
      titel: 'Wie lange ich Daten aufbewahre',
      absaetze: [
        'Anfragen, aus denen kein Auftrag entsteht, lösche ich spätestens 12 Monate nach dem letzten Kontakt. Entsteht ein Auftrag, bewahre ich die nötigen Unterlagen so lange auf, wie es das Gesetz verlangt (für Geschäftsunterlagen in der Regel 10 Jahre).',
      ],
    },
    {
      titel: 'Ihre Rechte',
      absaetze: [
        'Sie können jederzeit Auskunft verlangen, welche Daten ich über Sie habe, diese berichtigen lassen und ihre Löschung verlangen, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht. Sie können einer weiteren Kontaktaufnahme jederzeit widersprechen. Eine E-Mail an holzbechernick@gmail.com genügt.',
        'Wenn Sie finden, dass ich Ihre Daten nicht korrekt bearbeite, können Sie sich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden.',
      ],
    },
    {
      titel: 'Änderungen',
      absaetze: [
        'Ändert sich etwas an der Datenbearbeitung, passe ich diese Erklärung an. Es gilt die jeweils hier veröffentlichte Fassung.',
      ],
    },
  ] satisfies readonly DatenschutzAbschnitt[],
} as const
