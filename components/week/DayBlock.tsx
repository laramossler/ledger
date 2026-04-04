'use client'

import { EventCard } from './EventCard'
import type { Guest } from '@/lib/types'
import type { WeekDay } from './WeekPlan'

interface DayBlockProps {
  day: WeekDay
  guests: Guest[]
  currentGuestId: string | null
  isHost: boolean
  onVote: (eventId: string) => void
  onUnvote: (eventId: string) => void
  onLock: (eventId: string) => void
}

export function DayBlock({ day, guests, currentGuestId, isHost, onVote, onUnvote, onLock }: DayBlockProps) {
  return (
    <div className="py-6">
      {/* Day header */}
      <div className="flex items-start gap-4 mb-4 px-1">
        <span className="font-display text-[40px] text-gold/25 leading-none -mt-1 select-none">
          {day.day_number}
        </span>
        <div>
          <h2 className="font-display text-lg text-cream">{day.title}</h2>
          {day.theme && (
            <p className="section-label mt-0.5" style={{ fontSize: '8px', letterSpacing: '3px' }}>
              {day.theme}
            </p>
          )}
        </div>
      </div>

      {/* Events */}
      <div className="space-y-2">
        {day.events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            guests={guests}
            currentGuestId={currentGuestId}
            isHost={isHost}
            onVote={() => onVote(event.id)}
            onUnvote={() => onUnvote(event.id)}
            onLock={() => onLock(event.id)}
          />
        ))}
      </div>
    </div>
  )
}
