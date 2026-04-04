interface TagProps {
  children: React.ReactNode
  color?: string
  filled?: boolean
}

export function Tag({ children, color = 'stone', filled = false }: TagProps) {
  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    stone: { border: 'border-stone', text: 'text-stone', bg: 'bg-stone' },
    gold: { border: 'border-gold', text: 'text-gold', bg: 'bg-gold' },
    sage: { border: 'border-sage', text: 'text-sage', bg: 'bg-sage' },
    red: { border: 'border-red', text: 'text-red', bg: 'bg-red' },
    sea: { border: 'border-sea', text: 'text-sea', bg: 'bg-sea' },
  }

  const c = colorMap[color] || colorMap.stone

  if (filled) {
    return (
      <span className={`tag-filled inline-block px-2 py-0.5 rounded-sm ${c.bg} text-bg`}>
        {children}
      </span>
    )
  }

  return (
    <span className={`tag inline-block px-2 py-0.5 rounded-sm ${c.border} ${c.text}`}>
      {children}
    </span>
  )
}
