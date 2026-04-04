'use client'

export function Monogram({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-14 h-14 text-xl',
    lg: 'w-20 h-20 text-3xl',
  }

  return (
    <div className={`inline-flex items-center justify-center border-hair border-gold ${sizes[size]}`}>
      <span className="font-display text-gold">L</span>
    </div>
  )
}
