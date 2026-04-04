import { HostPlanClient } from './HostPlanClient'
import { SEED_TRIP, SEED_GUESTS, SEED_DAYS, SEED_EVENTS, SEED_ALTERNATIVES } from '@/lib/seed-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Week Plan \u2014 The Ledger',
}

function buildDemoData() {
  const trip = { ...SEED_TRIP, host_id: '', created_at: new Date().toISOString() }
  const guests = SEED_GUESTS.map(g => ({ ...g, created_at: new Date().toISOString() }))

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

      // Demo votes
      const demoVotes: { id: string; event_id: string; guest_id: string; created_at: string }[] = []
      guests.slice(1).forEach((g, i) => {
        const hash = (eventCounter * 7 + i * 13) % 10
        if (hash < [7, 5, 3][i] || 0) {
          demoVotes.push({
            id: `vote-${eventId}-${g.id}`,
            event_id: eventId,
            guest_id: g.id,
            created_at: new Date().toISOString(),
          })
        }
      })

      return { ...evt, id: eventId, trip_day_id: dayId, votes: demoVotes, alternatives: alts }
    })

    return { ...d, id: dayId, events: dayEvents }
  })

  return { trip, guests, days }
}

export default function PlanPage({ params }: { params: { tripId: string } }) {
  const { trip, guests, days } = buildDemoData()

  return (
    <HostPlanClient
      tripTitle={trip.title}
      tripDates={trip.subtitle || 'May 2026'}
      days={days}
      guests={guests}
      tripId={params.tripId}
    />
  )
}
