export interface Trip {
  id: string
  host_id: string
  title: string
  subtitle: string | null
  destination: string | null
  start_date: string | null
  end_date: string | null
  tone: 'effortless' | 'glamorous' | 'adventurous'
  status: 'draft' | 'sent' | 'active' | 'completed'
  created_at: string
}

export interface Guest {
  id: string
  trip_id: string
  name: string
  initial: string
  city: string | null
  phone: string | null
  email: string | null
  token: string
  responded: boolean
  created_at: string
}

export interface GuestResponse {
  id: string
  guest_id: string
  trip_id: string
  vibes: string[]
  wildcard: string | null
  date_preference: 'early' | 'mid' | 'late' | 'flex' | null
  created_at: string
}

export interface TripDay {
  id: string
  trip_id: string
  day_number: number
  title: string
  theme: string | null
  sort_order: number
}

export interface Event {
  id: string
  trip_day_id: string
  trip_id: string
  time: string
  title: string
  subtitle: string | null
  detail: string | null
  dress_code: string | null
  event_type: string | null
  locked: boolean
  booking_status: string | null
  booking_ref: string | null
  sort_order: number
}

export interface EventAlternative {
  id: string
  event_id: string
  title: string
  detail: string | null
  sort_order: number
}

export interface Vote {
  id: string
  event_id: string
  guest_id: string
  created_at: string
}

export interface ActivityLogEntry {
  id: string
  trip_id: string
  guest_id: string | null
  action: 'voted' | 'responded' | 'locked' | 'booking_confirmed' | 'booking_failed'
  target_type: 'event' | 'response' | null
  target_id: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

// Joined types for UI
export interface EventWithVotes extends Event {
  votes: Vote[]
  alternatives: EventAlternative[]
}

export interface TripDayWithEvents extends TripDay {
  events: EventWithVotes[]
}

export interface TripWithGuests extends Trip {
  guests: Guest[]
}

export interface GuestWithResponse extends Guest {
  response: GuestResponse | null
}

// Vibe definitions
export interface VibeOption {
  id: string
  word: string
  description: string
  color: string
}

export const VIBES: VibeOption[] = [
  { id: 'restore', word: 'Restore', description: 'Stillness, sea air, white linen mornings', color: '#D4CFC4' },
  { id: 'explore', word: 'Explore', description: 'Cobblestone light, hidden doors, the unknown corner', color: '#C4B898' },
  { id: 'indulge', word: 'Indulge', description: 'Long tables, candlelight, the sommelier\'s quiet suggestion', color: '#B8A07A' },
  { id: 'escape', word: 'Escape', description: 'Private coves, no itinerary, nowhere you need to be', color: '#7A9BA0' },
  { id: 'adventure', word: 'Adventure', description: 'Open water, a sunrise you earned, salt on skin', color: '#8E9E82' },
  { id: 'celebrate', word: 'Celebrate', description: 'Terraces at night, the right dress, that feeling', color: '#C4A89A' },
]

export const DATE_OPTIONS = [
  { id: 'early', label: 'May 1\u201310', description: 'First week' },
  { id: 'mid', label: 'May 10\u201320', description: 'Mid month' },
  { id: 'late', label: 'May 18\u201328', description: 'Late month' },
  { id: 'flex', label: 'I\'m flexible', description: 'Any dates work' },
]
