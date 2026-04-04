import { GuestInvitationFlow } from './GuestInvitationFlow'
import { SEED_TRIP, SEED_GUESTS, DEMO_TRIP_ID } from '@/lib/seed-data'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tripId: string; token: string } }): Promise<Metadata> {
  return {
    title: 'You\'re Invited \u2014 The South of France',
    description: 'Chloe is gathering her favourite people \u00b7 May 2026',
    openGraph: {
      title: 'You\'re Invited \u2014 The South of France',
      description: 'Chloe is gathering her favourite people \u00b7 May 2026',
      type: 'website',
      images: [{
        url: `/trip/${params.tripId}/g/${params.token}/og`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'You\'re Invited \u2014 The South of France',
      description: 'Chloe is gathering her favourite people \u00b7 May 2026',
    },
  }
}

export default function GuestInvitationPage({ params }: { params: { tripId: string; token: string } }) {
  // In demo mode, use seed data; in production, fetch from Supabase
  const trip = { ...SEED_TRIP, host_id: '', created_at: new Date().toISOString() }
  const allGuests = SEED_GUESTS.map(g => ({ ...g, created_at: new Date().toISOString() }))
  const guest = allGuests.find(g => g.token === params.token) || allGuests[1]

  return (
    <GuestInvitationFlow
      trip={trip}
      guest={guest}
      allGuests={allGuests}
      tripId={params.tripId}
    />
  )
}
