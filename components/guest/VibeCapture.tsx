'use client'

import { useState } from 'react'
import { VIBES, DATE_OPTIONS } from '@/lib/types'

interface VibeCaptureProps {
  onSubmit: (data: { vibes: string[]; wildcard: string; datePreference: string }) => void
}

type Step = 'vibes' | 'wildcard' | 'dates'

export function VibeCapture({ onSubmit }: VibeCaptureProps) {
  const [step, setStep] = useState<Step>('vibes')
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [wildcard, setWildcard] = useState('')
  const [datePreference, setDatePreference] = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const [visible, setVisible] = useState(true)

  function transitionTo(nextStep: Step) {
    setTransitioning(true)
    setVisible(false)
    setTimeout(() => {
      setStep(nextStep)
      setVisible(true)
      setTransitioning(false)
    }, 400)
  }

  function toggleVibe(id: string) {
    setSelectedVibes(prev => {
      if (prev.includes(id)) return prev.filter(v => v !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  function handleSubmit() {
    onSubmit({ vibes: selectedVibes, wildcard, datePreference })
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-5 py-12">
      <div
        className={`max-w-md w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {/* STEP 1: Vibes */}
        {step === 'vibes' && (
          <div>
            <p className="section-label text-center mb-2">Step 1 of 3</p>
            <h2 className="font-display text-2xl italic text-cream text-center mb-1">
              What are you drawn to?
            </h2>
            <p className="text-stone text-xs text-center mb-8">Select up to three</p>

            <div className="space-y-2.5">
              {VIBES.map(vibe => {
                const isSelected = selectedVibes.includes(vibe.id)
                return (
                  <button
                    key={vibe.id}
                    onClick={() => toggleVibe(vibe.id)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3.5 rounded-sm
                      border-hair transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-gold/30'
                        : 'border-border hover:border-borderLight'
                      }
                    `}
                    style={isSelected ? { background: `${vibe.color}09` } : undefined}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-display text-xl italic text-cream">
                        {vibe.word}
                      </span>
                      <span className="font-body text-stone text-xs ml-3" style={{ fontSize: '12.5px' }}>
                        {vibe.description}
                      </span>
                    </div>
                    <span
                      className={`
                        w-[9px] h-[9px] rounded-full flex-shrink-0 ml-3 transition-all duration-200
                        ${isSelected
                          ? 'bg-gold shadow-[0_0_6px_rgba(184,160,122,0.4)]'
                          : 'border-hair border-borderLight'
                        }
                      `}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => transitionTo('wildcard')}
                disabled={selectedVibes.length === 0}
                className="section-label px-10 py-3.5 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Wildcard */}
        {step === 'wildcard' && (
          <div>
            <p className="section-label text-center mb-2">Step 2 of 3</p>
            <h2 className="font-display text-2xl italic text-cream text-center mb-2">
              Anything you've been dreaming about?
            </h2>
            <p className="text-stone text-xs text-center mb-8">Optional — skip if nothing comes to mind</p>

            <textarea
              value={wildcard}
              onChange={(e) => setWildcard(e.target.value.slice(0, 150))}
              placeholder="A hidden cove. A particular wine. That restaurant someone whispered about..."
              className="w-full bg-transparent border-hair border-border rounded-sm px-4 py-3.5 font-body text-cream text-base leading-relaxed placeholder:text-stone/40 focus:border-goldMuted focus:outline-none resize-none transition-colors duration-200"
              rows={3}
            />
            <p className="text-right text-[10px] text-stone/50 font-mono mt-1">
              {wildcard.length}/150
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={() => transitionTo('dates')}
                className="section-label px-10 py-3.5 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300"
              >
                Continue
              </button>
              <button
                onClick={() => { setWildcard(''); transitionTo('dates') }}
                className="text-stone text-xs hover:text-creamSoft transition-colors"
              >
                Skip this
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Dates */}
        {step === 'dates' && (
          <div>
            <p className="section-label text-center mb-2">Step 3 of 3</p>
            <h2 className="font-display text-2xl italic text-cream text-center mb-2">
              When works?
            </h2>
            <p className="text-stone text-xs text-center mb-8">Select the window that suits you best</p>

            <div className="space-y-2.5">
              {DATE_OPTIONS.map(option => {
                const isSelected = datePreference === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => setDatePreference(option.id)}
                    className={`
                      w-full flex items-center justify-between px-4 py-4 rounded-sm
                      border-hair transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-gold/30 bg-gold/[0.04]'
                        : 'border-border hover:border-borderLight'
                      }
                    `}
                  >
                    <div>
                      <span className="font-display text-lg text-cream">{option.label}</span>
                      <span className="text-stone text-xs ml-2">{option.description}</span>
                    </div>
                    <span
                      className={`
                        w-[9px] h-[9px] rounded-full flex-shrink-0 ml-3 transition-all duration-200
                        ${isSelected
                          ? 'bg-gold shadow-[0_0_6px_rgba(184,160,122,0.4)]'
                          : 'border-hair border-borderLight'
                        }
                      `}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={!datePreference}
                className="section-label px-10 py-3.5 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
