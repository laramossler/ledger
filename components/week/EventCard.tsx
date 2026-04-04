'use client'

import { useState } from 'react'
import { GoldDot } from '@/components/ui/GoldDot'
import { InitialCircle } from '@/components/ui/InitialCircle'
import { DressCode } from '@/components/ui/DressCode'
import { Tag } from '@/components/ui/Tag'
import type { Guest } from '@/lib/types'
import type { WeekEvent } from './WeekPlan'

interface EventCardProps {
  event: WeekEvent
  guests: Guest[]
  currentGuestId: string | null
  isHost: boolean
  onVote: () => void
  onUnvote: () => void
  onLock: () => void
}

export function EventCard({ event, guests, currentGuestId, isHost, onVote, onUnvote, onLock }: EventCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasVoted = event.votes.some(v => v.guest_id === currentGuestId)
  const voteCount = event.votes.length

  const voterGuests = event.votes
    .map(v => guests.find(g => g.id === v.guest_id))
    .filter(Boolean)

  return (
    <div
      className={`
        border-hair rounded-sm transition-all duration-200
        ${expanded ? 'border-borderLight bg-card' : 'border-border hover:border-borderLight'}
        ${event.locked ? 'border-l-sage/40' : ''}
      `}
      style={event.locked ? { borderLeftWidth: '1.5px' } : undefined}
    >
      {/* Collapsed row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left"
        type="button"
      >
        {/* Time */}
        <span className="font-mono text-[10px] text-stone w-10 flex-shrink-0">
          {event.time}
        </span>

        {/* Title & subtitle */}
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-cream leading-tight">
            {event.title}
          </p>
          {event.subtitle && (
            <p className="font-body text-stone italic text-[11.5px] leading-snug mt-0.5 truncate">
              {event.subtitle}
            </p>
          )}
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {event.locked && (
            <Tag color="sage" filled>Booked</Tag>
          )}
          {!event.locked && (
            <GoldDot
              active={hasVoted}
              count={voteCount}
              onClick={(e) => {
                e?.stopPropagation?.()
                hasVoted ? onUnvote() : onVote()
              }}
            />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-3.5 pb-4 pt-1 space-y-3.5 border-t border-border/50">
          {/* Detail */}
          {event.detail && (
            <p className="font-body text-creamSoft leading-editorial" style={{ fontSize: '13.5px' }}>
              {event.detail}
            </p>
          )}

          {/* Dress code */}
          {event.dress_code && (
            <DressCode code={event.dress_code} />
          )}

          {/* Vote info */}
          {voteCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-stone">{voteCount} vote{voteCount !== 1 ? 's' : ''}</span>
              <div className="flex gap-1">
                {voterGuests.map(g => g && (
                  <InitialCircle key={g.id} initial={g.initial} size="sm" />
                ))}
              </div>
            </div>
          )}

          {/* Locked state */}
          {event.locked && (
            <div className="dress-code-panel py-2 px-3" style={{ borderLeftColor: '#8E9E82' }}>
              <p className="text-sage text-xs font-sans">
                Reservation confirmed
                {event.booking_ref && <span className="text-stone ml-1"> &middot; {event.booking_ref}</span>}
              </p>
            </div>
          )}

          {/* Alternatives */}
          {event.alternatives.length > 0 && !event.locked && (
            <div>
              <p className="section-label mb-2" style={{ fontSize: '8px' }}>Or Instead</p>
              <div className="space-y-1.5">
                {event.alternatives.map(alt => (
                  <div
                    key={alt.id}
                    className="border-hair border-border rounded-sm px-3 py-2 hover:border-borderLight transition-colors"
                  >
                    <p className="font-display text-xs text-cream">{alt.title}</p>
                    {alt.detail && (
                      <p className="font-body text-stone italic text-[11px] mt-0.5 leading-snug">{alt.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host: Lock & Book */}
          {isHost && !event.locked && (
            <div className="pt-1">
              <button
                onClick={onLock}
                className="section-label px-4 py-2 bg-sage/10 border-hair border-sage/30 text-sage hover:bg-sage/20 transition-all duration-200 rounded-sm"
                style={{ fontSize: '8px' }}
              >
                Lock & Book
              </button>
            </div>
          )}

          {/* Guest: Vote button */}
          {!isHost && !event.locked && (
            <button
              onClick={hasVoted ? onUnvote : onVote}
              className={`
                section-label px-4 py-2 rounded-sm transition-all duration-200
                ${hasVoted
                  ? 'bg-gold/10 border-hair border-gold/30 text-gold'
                  : 'border-hair border-border text-stone hover:border-goldMuted hover:text-gold'
                }
              `}
              style={{ fontSize: '8px' }}
            >
              {hasVoted ? 'Voted' : 'Vote for This'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
