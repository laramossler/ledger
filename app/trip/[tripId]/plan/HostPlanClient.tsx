'use client'

import { useState, useCallback } from 'react'
import { WeekPlan, type WeekDay } from '@/components/week/WeekPlan'
import type { Guest } from '@/lib/types'

interface Props {
  tripTitle: string
  tripDates: string
  days: WeekDay[]
  guests: Guest[]
  tripId: string
}

export function HostPlanClient({ tripTitle, tripDates, days: initialDays, guests, tripId }: Props) {
  const [days, setDays] = useState<WeekDay[]>(initialDays)

  const handleLock = useCallback((eventId: string) => {
    setDays(prev => prev.map(day => ({
      ...day,
      events: day.events.map(evt => {
        if (evt.id !== eventId) return evt
        return {
          ...evt,
          locked: true,
          booking_status: 'pending',
        }
      }),
    })))
  }, [])

  return (
    <WeekPlan
      tripTitle={tripTitle}
      tripDates={tripDates}
      days={days}
      guests={guests}
      currentGuestId={guests[0]?.id || null}
      isHost={true}
      onVote={() => {}}
      onUnvote={() => {}}
      onLock={handleLock}
    />
  )
}
