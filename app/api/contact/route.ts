import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Route Handler des Kontaktformulars.
 *
 * Zwei Dinge sind hier bewusst so gebaut (AE-5 in CLAUDE.md):
 *
 * 1. Ohne RESEND_API_KEY wird die Anfrage angenommen und serverseitig
 *    protokolliert, statt einen 500er zu werfen. Ein frisch importiertes
 *    Vercel-Projekt hat den Key noch nicht — das Formular soll trotzdem nicht
 *    mit einem Fehler antworten.
 * 2. Validiert wird auf dem Server noch einmal vollständig. Die Prüfungen im
 *    Browser sind Bequemlichkeit, kein Schutz.
 */

export const runtime = 'nodejs'

type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  interests?: unknown
  company?: unknown
}

const LIMITS = { name: 100, email: 160, subject: 160, message: 4000 } as const

function asTrimmedString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isValidEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value)
}

/** Schützt die Kopfzeilen der Mail vor eingeschleusten Zeilenumbrüchen. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json(
      { message: 'Die Anfrage war nicht lesbar. Bitte das Formular neu ausfüllen.' },
      { status: 400 },
    )
  }

  // Der Honigtopf. Menschen sehen das Feld nicht, Bots füllen es aus.
  // Wir antworten bewusst mit 200, damit ein Bot nicht lernt, was ihn verraten hat.
  if (asTrimmedString(payload.company, 100).length > 0) {
    return NextResponse.json({ message: 'Danke — die Nachricht ist angekommen.' }, { status: 200 })
  }

  const name = asTrimmedString(payload.name, LIMITS.name)
  const email = asTrimmedString(payload.email, LIMITS.email)
  const subject = asTrimmedString(payload.subject, LIMITS.subject)
  const message = asTrimmedString(payload.message, LIMITS.message)

  const interests = Array.isArray(payload.interests)
    ? payload.interests
        .filter((item): item is string => typeof item === 'string')
        .slice(0, 12)
        .map((item) => item.trim().slice(0, 60))
    : []

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'Bitte Name, E-Mail-Adresse und Nachricht ausfüllen.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Diese E-Mail-Adresse sieht nicht gültig aus. Bitte noch einmal prüfen.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  const mailSubject = singleLine(
    subject ? `Portfolio-Anfrage: ${subject}` : `Portfolio-Anfrage von ${name}`,
  )

  const lines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    subject ? `Betreff: ${subject}` : null,
    interests.length > 0 ? `Themen: ${interests.join(', ')}` : null,
    '',
    message,
  ].filter((line): line is string => line !== null)

  if (!apiKey || !to) {
    // Kein Versand möglich — aber die Anfrage geht nicht verloren, sie steht in
    // den Vercel-Logs. Der Absender bekommt eine ehrliche Antwort.
    console.warn(
      '[kontakt] Kein RESEND_API_KEY oder CONTACT_TO_EMAIL gesetzt. Anfrage nur protokolliert:\n' +
        lines.join('\n'),
    )

    return NextResponse.json(
      {
        message:
          'Danke für deine Nachricht. Der Mailversand ist noch nicht eingerichtet — bitte melde dich vorerst direkt per E-Mail.',
      },
      { status: 200 },
    )
  }

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from,
      to,
      // Damit ein Klick auf „Antworten" direkt beim Absender landet.
      replyTo: email,
      subject: mailSubject,
      text: lines.join('\n'),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#140A0C">
          <h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(mailSubject)}</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px"><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
          ${subject ? `<p style="margin:0 0 4px"><strong>Betreff:</strong> ${escapeHtml(subject)}</p>` : ''}
          ${
            interests.length > 0
              ? `<p style="margin:0 0 4px"><strong>Themen:</strong> ${escapeHtml(interests.join(', '))}</p>`
              : ''
          }
          <hr style="margin:20px 0;border:none;border-top:1px solid #D8D4CF" />
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    })

    if (error) {
      console.error('[kontakt] Resend meldet einen Fehler:', error)
      return NextResponse.json(
        {
          message:
            'Die Nachricht konnte nicht zugestellt werden. Bitte später noch einmal versuchen oder direkt per E-Mail schreiben.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json(
      { message: 'Danke — die Nachricht ist angekommen. Ich melde mich in Kürze.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('[kontakt] Versand fehlgeschlagen:', error)
    return NextResponse.json(
      {
        message:
          'Beim Senden ist etwas schiefgelaufen. Bitte später noch einmal versuchen oder direkt per E-Mail schreiben.',
      },
      { status: 500 },
    )
  }
}
