'use client'

import { useState, useCallback } from 'react'
import { WeekPlan, type WeekDay } from '@/components/week/WeekPlan'
import type { Guest } from '@/lib/types'

interface Props {
  tripTitle: string
  tripDates: string
  days: WeekDay[]
  guests: Guest[]
  currentGuestId: string
}

export function GuestWeekClient({ tripTitle, tripDates, days: initialDays, guests, currentGuestId }: Props) {
  const [days, setDays] = useState<WeekDay[]>(initialDays)

  const handleVote = useCallback((eventId: string) => {
    setDays(prev => prev.map(day => ({
      ...day,
      events: day.events.map(evt => {
        if (evt.id !== eventId) return evt
        if (evt.votes.some(v => v.guest_id === currentGuestId)) return evt
        return {
          ...evt,
          votes: [...evt.votes, {
            id: `vote-${Date.now()}`,
            event_id: eventId,
            guest_id: currentGuestId,
            created_at: new Date().toISOString(),
          }],
        }
      }),
    })))
  }, [currentGuestId])

  const handleUnvote = useCallback((eventId: string) => {
    setDays(prev => prev.map(day => ({
      ...day,
      events: day.events.map(evt => {
        if (evt.id !== eventId) return evt
        return {
          ...evt,
          votes: evt.votes.filter(v => v.guest_id !== currentGuestId),
        }
      }),
    })))
  }, [currentGuestId])

  return (
    <WeekPlan
      tripTitle={tripTitle}
      tripDates={tripDates}
      days={days}
      guests={guests}
      currentGuestId={currentGuestId}
      isHost={false}
      onVote={handleVote}
      onUnvote={handleUnvote}
      onLock={() => {}}
    />
  )
}
