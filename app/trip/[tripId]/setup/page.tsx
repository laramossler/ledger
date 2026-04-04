import { SetupClient } from './SetupClient'
import { SEED_TRIP, SEED_GUESTS } from '@/lib/seed-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setup & Send \u2014 The Ledger',
}

export default function SetupPage({ params }: { params: { tripId: string } }) {
  const trip = { ...SEED_TRIP, host_id: '', created_at: new Date().toISOString() }
  const guests = SEED_GUESTS.map(g => ({ ...g, created_at: new Date().toISOString() }))

  return <SetupClient trip={trip} guests={guests} tripId={params.tripId} />
}
