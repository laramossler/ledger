'use client'

import { useState } from 'react'
import { Monogram } from '@/components/ui/Monogram'
import { InitialCircle } from '@/components/ui/InitialCircle'
import type { Trip, Guest } from '@/lib/types'

interface Props {
  trip: Trip
  guests: Guest[]
  tripId: string
}

export function SetupClient({ trip, guests, tripId }: Props) {
  const [sent, setSent] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://privateledger.app'
  const invitableGuests = guests.filter(g => g.token !== 'chloe-host')

  function getInviteUrl(guest: Guest) {
    return `${baseUrl}/trip/${tripId}/g/${guest.token}`
  }

  function getWhatsAppLink(guest: Guest) {
    const message = encodeURIComponent(
      `I've been planning something for us in May. The South of France \u2014 just the four of us. I'd love your input before I lock anything in.\n\n${getInviteUrl(guest)}`
    )
    return `https://wa.me/${guest.phone?.replace(/[^0-9+]/g, '')}?text=${message}`
  }

  function markSent(guestId: string) {
    setSent(prev => [...prev, guestId])
  }

  return (
    <div className="min-h-dvh bg-bg pb-20">
      {/* Header */}
      <header className="pt-10 pb-8 px-6 text-center border-b border-border/50">
        <div className="mb-6"><Monogram size="sm" /></div>
        <p className="section-label mb-3">Setup & Send</p>
        <h1 className="font-display text-[26px] italic text-cream mb-1">{trip.title}</h1>
        <p className="font-body text-stone text-sm">{trip.subtitle}</p>
      </header>

      <div className="max-w-md mx-auto px-5 pt-8">
        {/* Guest list */}
        <div className="mb-8">
          <p className="section-label mb-4">Your Guests</p>
          <div className="space-y-2">
            {invitableGuests.map(guest => (
              <div
                key={guest.id}
                className="flex items-center gap-3 border-hair border-border rounded-sm px-4 py-3"
              >
                <InitialCircle initial={guest.initial} />
                <div className="flex-1">
                  <p className="font-display text-sm text-cream">{guest.name}</p>
                  <p className="text-[10px] text-stone font-sans">{guest.city}</p>
                </div>
                {sent.includes(guest.id) ? (
                  <span className="text-sage text-[9px] font-sans tracking-wide uppercase">Sent</span>
                ) : (
                  <button
                    onClick={() => {
                      window.open(getWhatsAppLink(guest), '_blank')
                      markSent(guest.id)
                    }}
                    className="section-label px-3 py-1.5 border-hair border-gold/40 text-gold hover:bg-gold/10 transition-all rounded-sm"
                    style={{ fontSize: '8px' }}
                  >
                    Send
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="section-label text-stone hover:text-cream transition-colors"
            style={{ fontSize: '9px' }}
          >
            {showPreview ? 'Hide Preview' : 'Preview Message'}
          </button>

          {showPreview && (
            <div className="mt-4 rounded-lg overflow-hidden" style={{ background: '#1A2E1A' }}>
              <div className="p-3">
                {/* WhatsApp message bubble */}
                <div className="bg-[#005C4B] rounded-lg px-3 py-2 max-w-[85%] ml-auto">
                  <p className="text-white text-[13px] leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                    I've been planning something for us in May. The South of France — just the four of us. I'd love your input before I lock anything in.
                  </p>
                  {/* Link preview card */}
                  <div className="mt-2 bg-[#025144] rounded overflow-hidden">
                    <div className="px-3 py-2">
                      <p className="text-[10px] text-[#8FBBAB]">privateledger.app</p>
                      <p className="text-white text-xs font-medium mt-0.5">You're Invited — The South of France</p>
                      <p className="text-[#8FBBAB] text-[11px] mt-0.5">Chloe is gathering her favourite people · May 2026</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8FBBAB] text-right mt-1">now</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Send all */}
        {sent.length < invitableGuests.length && (
          <div className="text-center">
            <button
              onClick={() => {
                invitableGuests.forEach((g, i) => {
                  setTimeout(() => {
                    window.open(getWhatsAppLink(g), '_blank')
                    markSent(g.id)
                  }, i * 1500)
                })
              }}
              className="section-label px-8 py-3.5 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300"
            >
              Send to {invitableGuests.length - sent.length}
            </button>
          </div>
        )}

        {/* All sent state */}
        {sent.length === invitableGuests.length && (
          <div className="text-center py-8">
            <p className="font-display text-xl italic text-cream mb-2">All sent.</p>
            <p className="font-body text-stone text-sm">Your invitations are on their way.</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              {invitableGuests.map((g, i) => (
                <div
                  key={g.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${i * 300}ms` }}
                >
                  <InitialCircle initial={g.initial} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite links for copying */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="section-label mb-4">Direct Links</p>
          <div className="space-y-2">
            {invitableGuests.map(guest => (
              <div key={guest.id} className="flex items-center gap-2 border-hair border-border rounded-sm px-3 py-2">
                <span className="section-label w-12 flex-shrink-0" style={{ fontSize: '8px' }}>{guest.name}</span>
                <span className="text-stone text-[11px] flex-1 truncate font-mono">{getInviteUrl(guest)}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getInviteUrl(guest))
                  }}
                  className="text-gold text-[9px] font-sans tracking-wide hover:text-cream transition-colors flex-shrink-0"
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
