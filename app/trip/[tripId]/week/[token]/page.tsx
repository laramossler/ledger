import { GuestWeekClient } from './GuestWeekClient'
import { SEED_TRIP, SEED_GUESTS, SEED_DAYS, SEED_EVENTS, SEED_ALTERNATIVES } from '@/lib/seed-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Week \u2014 The South of France',
  description: 'The week plan for your trip \u00b7 May 2026',
}

function buildDemoData(token: string) {
  const trip = { ...SEED_TRIP, host_id: '', created_at: new Date().toISOString() }
  const guests = SEED_GUESTS.map(g => ({ ...g, created_at: new Date().toISOString() }))
  const guest = guests.find(g => g.token === token) || guests[1]

  let eventCounter = 0
  const days = SEED_DAYS.map((d, dayIdx) => {
    const dayId = `day-${dayIdx}`
    const dayEvents = (SEED_EVENTS[dayIdx] || []).map((evt, evtIdx) => {
      const eventId = `event-${eventCounter++}`
      const altKey = `day-${dayIdx}-event-${evtIdx}`
      const alts = (SEED_ALTERNATIVES[altKey] || []).map((a, aIdx) => ({
        ...a,
        id: `alt-${eventId}-${aIdx}`,
        event_id: eventId,
      }))

      return {
        ...evt,
        id: eventId,
        trip_day_id: dayId,
        votes: [] as { id: string; event_id: string; guest_id: string; created_at: string }[],
        alternatives: alts,
      }
    })

    return {
      ...d,
      id: dayId,
      events: dayEvents,
    }
  })

  return { trip, guests, guest, days }
}

export default function GuestWeekPage({ params }: { params: { tripId: string; token: string } }) {
  const { trip, guests, guest, days } = buildDemoData(params.token)

  return (
    <GuestWeekClient
      tripTitle={trip.title}
      tripDates={trip.subtitle || 'May 2026'}
      days={days}
      guests={guests}
      currentGuestId={guest.id}
    />
  )
}
