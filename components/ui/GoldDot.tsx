'use client'

interface GoldDotProps {
  active: boolean
  onClick?: (e?: React.MouseEvent) => void
  count?: number
}

export function GoldDot({ active, onClick, count }: GoldDotProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 group"
      type="button"
    >
      <span
        className={`
          inline-block w-[9px] h-[9px] rounded-full transition-all duration-200
          ${active
            ? 'bg-gold shadow-[0_0_6px_rgba(184,160,122,0.4)]'
            : 'border-hair border-goldMuted bg-transparent group-hover:border-gold'
          }
        `}
      />
      {count !== undefined && count > 0 && (
        <span className="font-mono text-[10px] text-stone">{count}</span>
      )}
    </button>
  )
}
