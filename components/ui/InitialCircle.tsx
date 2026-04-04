'use client'

interface InitialCircleProps {
  initial: string
  size?: 'sm' | 'md'
  className?: string
}

export function InitialCircle({ initial, size = 'md', className = '' }: InitialCircleProps) {
  const sizeClass = size === 'sm' ? 'w-5 h-5 text-[8px]' : 'w-[22px] h-[22px] text-[9px]'

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-hair border-creamSoft font-sans text-creamSoft ${sizeClass} ${className}`}
    >
      {initial.toUpperCase()}
    </span>
  )
}
