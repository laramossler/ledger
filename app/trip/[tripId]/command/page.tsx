import { CommandClient } from './CommandClient'
import { SEED_TRIP, SEED_GUESTS, SEED_DAYS, SEED_EVENTS, SEED_ALTERNATIVES } from '@/lib/seed-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Command Center \u2014 The Ledger',
}

function buildDemoData() {
  const trip = { ...SEED_TRIP, host_id: '', created_at: new Date().toISOString() }
  const guests = SEED_GUESTS.map(g => ({ ...g, created_at: new Date().toISOString() }))

  // Generate some demo votes for realism
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

      // Demo votes: some events have votes from multiple guests
      const demoVotes: { id: string; event_id: string; guest_id: string; created_at: string }[] = []
      const voteChance = [0.7, 0.5, 0.3, 0.2]
      guests.slice(1).forEach((g, i) => {
        // Use deterministic "random" based on event and guest index
        const hash = (eventCounter * 7 + i * 13) % 10
        if (hash < voteChance[i] * 10) {
          demoVotes.push({
            id: `vote-${eventId}-${g.id}`,
            event_id: eventId,
            guest_id: g.id,
            created_at: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          })
        }
      })

      return { ...evt, id: eventId, trip_day_id: dayId, votes: demoVotes, alternatives: alts }
    })

    return { ...d, id: dayId, events: dayEvents }
  })

  // Demo activity log
  const activityLog = [
    { id: 'a1', guest: guests[1], action: 'voted' as const, target: 'La Vague d\'Or', time: '2 hours ago' },
    { id: 'a2', guest: guests[2], action: 'responded' as const, target: 'vibe capture', time: '5 hours ago' },
    { id: 'a3', guest: guests[3], action: 'voted' as const, target: 'Boat Day', time: '8 hours ago' },
    { id: 'a4', guest: guests[1], action: 'voted' as const, target: 'Club 55', time: '1 day ago' },
    { id: 'a5', guest: guests[2], action: 'voted' as const, target: 'Wine Tasting at Ch\u00e2teau Minuty', time: '1 day ago' },
  ]

  return { trip, guests, days, activityLog }
}

export default function CommandPage({ params }: { params: { tripId: string } }) {
  const { trip, guests, days, activityLog } = buildDemoData()

  return (
    <CommandClient
      trip={trip}
      guests={guests}
      days={days}
      activityLog={activityLog}
      tripId={params.tripId}
    />
  )
}
