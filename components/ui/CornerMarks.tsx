export function CornerMarks() {
  const cornerStyle = 'absolute w-8 h-8 opacity-[0.35]'
  const borderColor = 'border-goldMuted'

  return (
    <>
      <span className={`${cornerStyle} top-0 left-0 border-t-hair border-l-hair ${borderColor}`} />
      <span className={`${cornerStyle} top-0 right-0 border-t-hair border-r-hair ${borderColor}`} />
      <span className={`${cornerStyle} bottom-0 left-0 border-b-hair border-l-hair ${borderColor}`} />
      <span className={`${cornerStyle} bottom-0 right-0 border-b-hair border-r-hair ${borderColor}`} />
    </>
  )
}
