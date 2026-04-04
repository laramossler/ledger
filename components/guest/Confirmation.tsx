'use client'

import { Monogram } from '@/components/ui/Monogram'

export function Confirmation() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-sm">
        <div className="opacity-0 animate-fade-in">
          <Monogram size="sm" />
        </div>

        <div className="mt-8 opacity-0 animate-fade-in-delay-1">
          <h1 className="font-display text-4xl italic text-cream mb-3">
            You're in.
          </h1>
          <p className="font-body text-creamSoft text-lg leading-relaxed max-w-[280px] mx-auto">
            Chloe will share the week plan soon. All you need to do is show up.
          </p>
        </div>

        <div className="my-10 opacity-0 animate-fade-in-delay-2">
          <div className="gold-rule" />
        </div>

        <p className="opacity-0 animate-fade-in-delay-3 section-label text-stone">
          C&ocirc;te d'Azur &middot; May 2026
        </p>
      </div>
    </div>
  )
}
