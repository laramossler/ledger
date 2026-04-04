import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { eventId, eventTitle, eventDetail, date, guestCount } = body

  // In production, this would call the Anthropic API to draft a booking request
  // For now, return a mock draft
  const draft = {
    eventId,
    type: 'email_draft',
    subject: `Reservation Request \u2014 ${eventTitle}`,
    body: `Dear Team,\n\nI would like to request a reservation for a party of ${guestCount || 4}.\n\nDate: ${date || 'May 2026'}\nOccasion: Private group dinner\n\nPlease let me know your availability and any requirements.\n\nWith kind regards,\nChloe\n\nSent via The Ledger`,
    notes: `Drafted for ${eventTitle}. Review and personalize before sending.`,
    status: 'draft',
  }

  return NextResponse.json(draft)
}
