'use client'

import { useState } from 'react'
import { Monogram } from '@/components/ui/Monogram'
import { InitialCircle } from '@/components/ui/InitialCircle'
import { Tag } from '@/components/ui/Tag'
import type { Trip, Guest } from '@/lib/types'
import type { WeekDay } from '@/components/week/WeekPlan'
import Link from 'next/link'

interface ActivityEntry {
  id: string
  guest: Guest
  action: 'voted' | 'responded' | 'locked' | 'booking_confirmed'
  target: string
  time: string
}

interface Props {
  trip: Trip
  guests: Guest[]
  days: WeekDay[]
  activityLog: ActivityEntry[]
  tripId: string
}

export function CommandClient({ trip, guests, days, activityLog, tripId }: Props) {
  const allEvents = days.flatMap(d => d.events)

  const booked = allEvents.filter(e => e.locked)
  const readyToLock = allEvents.filter(e => !e.locked && e.votes.length >= 3)
  const gatheringVotes = allEvents.filter(e => !e.locked && e.votes.length > 0 && e.votes.length < 3)
  const noVotes = allEvents.filter(e => !e.locked && e.votes.length === 0)

  const [lockedIds, setLockedIds] = useState<string[]>(booked.map(e => e.id))

  function handleLock(eventId: string) {
    setLockedIds(prev => [...prev, eventId])
  }

  return (
    <div className="min-h-dvh bg-bg pb-20">
      {/* Header */}
      <header className="pt-10 pb-6 px-6 text-center border-b border-border/50">
        <div className="mb-5"><Monogram size="sm" /></div>
        <p className="section-label mb-3">Command Center</p>
        <h1 className="font-display text-[26px] italic text-cream mb-1">{trip.title}</h1>
        <p className="font-body text-stone text-sm">{trip.subtitle}</p>

        {/* Nav */}
        <nav className="flex items-center justify-center gap-6 mt-6">
          <Link href={`/trip/${tripId}/setup`} className="nav-item hover:text-cream transition-colors pb-2">
            Setup
          </Link>
          <span className="nav-item-active pb-2">
            Command
          </span>
          <Link href={`/trip/${tripId}/plan`} className="nav-item hover:text-cream transition-colors pb-2">
            Plan
          </Link>
        </nav>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Summary bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { label: 'Booked', count: booked.length, color: 'text-sage' },
            { label: 'Ready', count: readyToLock.length, color: 'text-gold' },
            { label: 'Gathering', count: gatheringVotes.length, color: 'text-stone' },
            { label: 'No votes', count: noVotes.length, color: 'text-red' },
          ].map(item => (
            <div key={item.label} className="border-hair border-border rounded-sm px-3 py-3 text-center">
              <p className={`font-mono text-lg ${item.color}`}>{item.count}</p>
              <p className="text-[8px] font-sans tracking-wider uppercase text-stone mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Ready to Lock */}
        {readyToLock.length > 0 && (
          <section className="mb-8">
            <p className="section-label mb-3">Ready to Lock</p>
            <div className="space-y-1.5">
              {readyToLock.map(event => {
                const day = days.find(d => d.events.some(e => e.id === event.id))
                const isLocked = lockedIds.includes(event.id)
                return (
                  <div key={event.id} className="flex items-center gap-3 border-hair border-border rounded-sm px-3.5 py-2.5">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <span className="font-mono text-[10px] text-stone w-6">{day?.day_number}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-cream truncate">{event.title}</p>
                      <p className="font-body text-stone italic text-[11px] truncate">{event.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mr-2">
                      {event.votes.map(v => {
                        const g = guests.find(g => g.id === v.guest_id)
                        return g ? <InitialCircle key={v.id} initial={g.initial} size="sm" /> : null
                      })}
                    </div>
                    {isLocked ? (
                      <Tag color="sage" filled>Booked</Tag>
                    ) : (
                      <button
                        onClick={() => handleLock(event.id)}
                        className="section-label px-3 py-1.5 bg-gold/10 border-hair border-gold/30 text-gold hover:bg-gold/20 transition-all rounded-sm flex-shrink-0"
                        style={{ fontSize: '8px' }}
                      >
                        Lock
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Confirmed / Booked */}
        {booked.length > 0 && (
          <section className="mb-8">
            <p className="section-label mb-3">Confirmed</p>
            <div className="space-y-1.5">
              {booked.map(event => {
                const day = days.find(d => d.events.some(e => e.id === event.id))
                return (
                  <div key={event.id} className="flex items-center gap-3 border-hair border-border rounded-sm px-3.5 py-2.5">
                    <span className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />
                    <span className="font-mono text-[10px] text-stone w-6">{day?.day_number}</span>
                    <p className="font-display text-sm text-cream flex-1 truncate">{event.title}</p>
                    <Tag color="sage" filled>Booked</Tag>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Gathering Votes */}
        {gatheringVotes.length > 0 && (
          <section className="mb-8">
            <p className="section-label mb-3">Gathering Votes</p>
            <div className="space-y-1.5">
              {gatheringVotes.map(event => {
                const day = days.find(d => d.events.some(e => e.id === event.id))
                return (
                  <div key={event.id} className="flex items-center gap-3 border-hair border-border rounded-sm px-3.5 py-2.5">
                    <span className="w-2 h-2 rounded-full bg-stone/40 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-stone w-6">{day?.day_number}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-cream truncate">{event.title}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {event.votes.map(v => {
                        const g = guests.find(g => g.id === v.guest_id)
                        return g ? <InitialCircle key={v.id} initial={g.initial} size="sm" /> : null
                      })}
                    </div>
                    <span className="font-mono text-[10px] text-stone">{event.votes.length}/4</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Needs Attention */}
        {noVotes.length > 0 && (
          <section className="mb-8">
            <p className="section-label mb-3">Needs Attention</p>
            <p className="text-stone text-xs mb-3">Consider nudging or reconsidering</p>
            <div className="space-y-1.5">
              {noVotes.map(event => {
                const day = days.find(d => d.events.some(e => e.id === event.id))
                return (
                  <div key={event.id} className="flex items-center gap-3 border-hair border-border/50 rounded-sm px-3.5 py-2.5 opacity-60">
                    <span className="w-2 h-2 rounded-full border-hair border-red/40 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-stone w-6">{day?.day_number}</span>
                    <p className="font-display text-sm text-cream/70 flex-1 truncate">{event.title}</p>
                    <span className="font-mono text-[10px] text-red/60">0</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Activity Feed */}
        <section className="mt-10 pt-8 border-t border-border/50">
          <p className="section-label mb-4">Activity</p>
          <div className="space-y-3">
            {activityLog.map(entry => (
              <div key={entry.id} className="flex items-start gap-2.5">
                <InitialCircle initial={entry.guest.initial} size="sm" className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-cream text-xs">
                    <span className="text-creamSoft">{entry.guest.name}</span>
                    {' '}
                    <span className="text-stone">
                      {entry.action === 'voted' ? 'voted for' : entry.action === 'responded' ? 'completed' : entry.action}
                    </span>
                    {' '}
                    <span className="text-creamSoft font-display italic">{entry.target}</span>
                  </p>
                  <p className="font-mono text-[9px] text-stone/60 mt-0.5">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
