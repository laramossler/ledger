export function DressCode({ code }: { code: string }) {
  return (
    <div className="dress-code-panel py-2.5 px-3.5 rounded-sm">
      <span className="section-label text-goldMuted block mb-1" style={{ fontSize: '8px', letterSpacing: '2.5px' }}>
        DRESS
      </span>
      <p className="font-body text-creamSoft italic text-sm leading-relaxed">
        {code}
      </p>
    </div>
  )
}
