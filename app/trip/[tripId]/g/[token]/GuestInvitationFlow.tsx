'use client'

import { useState } from 'react'
import { Invitation } from '@/components/guest/Invitation'
import { VibeCapture } from '@/components/guest/VibeCapture'
import { Confirmation } from '@/components/guest/Confirmation'
import type { Trip, Guest } from '@/lib/types'

type FlowStep = 'invitation' | 'capture' | 'confirmation'

interface Props {
  trip: Trip
  guest: Guest
  allGuests: Guest[]
  tripId: string
}

export function GuestInvitationFlow({ trip, guest, allGuests, tripId }: Props) {
  const [step, setStep] = useState<FlowStep>('invitation')
  const [visible, setVisible] = useState(true)

  function transitionTo(nextStep: FlowStep) {
    setVisible(false)
    setTimeout(() => {
      setStep(nextStep)
      setVisible(true)
    }, 500)
  }

  async function handleVibeSubmit(data: { vibes: string[]; wildcard: string; datePreference: string }) {
    // Save response — in demo mode, save to localStorage; in production, POST to API
    try {
      const response = {
        guest_id: guest.id,
        trip_id: tripId,
        vibes: data.vibes,
        wildcard: data.wildcard,
        date_preference: data.datePreference,
        created_at: new Date().toISOString(),
      }
      localStorage.setItem(`ledger_response_${guest.token}`, JSON.stringify(response))
    } catch {
      // localStorage may be unavailable
    }

    transitionTo('confirmation')
  }

  return (
    <main
      className={`min-h-dvh bg-bg transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {step === 'invitation' && (
        <Invitation
          trip={trip}
          guest={guest}
          allGuests={allGuests}
          onBegin={() => transitionTo('capture')}
        />
      )}

      {step === 'capture' && (
        <VibeCapture onSubmit={handleVibeSubmit} />
      )}

      {step === 'confirmation' && (
        <Confirmation />
      )}
    </main>
  )
}
