export function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`section-label block ${className}`}>
      {children}
    </span>
  )
}
