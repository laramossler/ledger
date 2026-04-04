'use client'

import { useState } from 'react'
import { Monogram } from '@/components/ui/Monogram'
import { DayBlock } from './DayBlock'
import type { TripDay, Event, EventAlternative, Vote, Guest } from '@/lib/types'

export interface WeekEvent extends Event {
  votes: Vote[]
  alternatives: EventAlternative[]
}

export interface WeekDay extends TripDay {
  events: WeekEvent[]
}

interface WeekPlanProps {
  tripTitle: string
  tripDates: string
  days: WeekDay[]
  guests: Guest[]
  currentGuestId: string | null
  isHost: boolean
  onVote: (eventId: string) => void
  onUnvote: (eventId: string) => void
  onLock: (eventId: string) => void
}

export function WeekPlan({
  tripTitle,
  tripDates,
  days,
  guests,
  currentGuestId,
  isHost,
  onVote,
  onUnvote,
  onLock,
}: WeekPlanProps) {
  return (
    <div className="min-h-dvh bg-bg pb-20">
      {/* Header */}
      <header className="pt-10 pb-8 px-6 text-center">
        <div className="mb-6">
          <Monogram size="sm" />
        </div>
        <p className="section-label mb-3">
          {isHost ? 'The Week Ahead' : 'Your Week'}
        </p>
        <h1 className="font-display text-[26px] italic text-cream mb-1">
          {tripTitle}
        </h1>
        <p className="font-body text-stone text-sm">{tripDates}</p>
        <div className="gold-rule mt-6" />
      </header>

      {/* Days */}
      <div className="max-w-lg mx-auto px-4 space-y-1">
        {days.map(day => (
          <DayBlock
            key={day.id || day.day_number}
            day={day}
            guests={guests}
            currentGuestId={currentGuestId}
            isHost={isHost}
            onVote={onVote}
            onUnvote={onUnvote}
            onLock={onLock}
          />
        ))}
      </div>
    </div>
  )
}
