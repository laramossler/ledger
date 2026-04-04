'use client'

import { Monogram } from '@/components/ui/Monogram'
import { CornerMarks } from '@/components/ui/CornerMarks'
import { InitialCircle } from '@/components/ui/InitialCircle'
import type { Guest, Trip } from '@/lib/types'

interface InvitationProps {
  trip: Trip
  guest: Guest
  allGuests: Guest[]
  onBegin: () => void
}

export function Invitation({ trip, guest, allGuests, onBegin }: InvitationProps) {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-12 relative">
      <CornerMarks />

      <div className="text-center max-w-sm w-full">
        {/* Monogram */}
        <div className="opacity-0 animate-fade-in-delay-1">
          <Monogram size="md" />
        </div>

        {/* YOU ARE INVITED */}
        <div className="mt-8 opacity-0 animate-fade-in-delay-2">
          <p className="section-label mb-4">You Are Invited</p>
          <h1 className="font-display text-[32px] italic text-cream leading-tight text-balance">
            {trip.title}
          </h1>
          <p className="font-body text-creamSoft mt-2" style={{ fontSize: '16px' }}>
            {trip.subtitle}
          </p>
        </div>

        {/* Gold rule */}
        <div className="my-8 opacity-0 animate-fade-in-delay-3">
          <div className="gold-rule" />
        </div>

        {/* Description */}
        <div className="opacity-0 animate-fade-in-delay-3">
          <p className="editorial-text max-w-[320px] mx-auto text-balance">
            Chloe is gathering her favourite people for something extraordinary on the French Riviera.
            Five days of sun, long tables, and the kind of beauty that makes you forget the rest of the world.
          </p>
        </div>

        {/* Guest initials */}
        <div className="mt-8 opacity-0 animate-fade-in-delay-3">
          <div className="flex items-center justify-center gap-3">
            {allGuests.map((g) => (
              <div key={g.id} className="flex flex-col items-center gap-1.5">
                <InitialCircle initial={g.initial} />
                <span className="text-[9px] text-stone font-sans tracking-wide">
                  {g.id === guest.id ? 'You' : g.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BEGIN button */}
        <div className="mt-10 opacity-0 animate-fade-in-delay-4">
          <button
            onClick={onBegin}
            className="section-label px-10 py-3.5 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300 active:scale-[0.97]"
          >
            Begin
          </button>
        </div>

        {/* Subtle guest personalization */}
        <p className="mt-6 text-[10px] text-stone/50 font-sans tracking-wide opacity-0 animate-fade-in-delay-4">
          This invitation is for {guest.name}
        </p>
      </div>
    </div>
  )
}
