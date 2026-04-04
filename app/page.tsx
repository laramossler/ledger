import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 border-hair border-gold mb-8">
          <span className="font-display text-xl text-gold">L</span>
        </div>
        <h1 className="font-display text-4xl italic text-cream mb-3">The Ledger</h1>
        <p className="font-body text-creamSoft text-lg leading-relaxed mb-8">
          A private record of the art of entertaining
        </p>
        <div className="gold-rule mb-8" />
        <p className="text-stone text-sm mb-6">
          The trip planning experience is live.
        </p>
        <Link
          href="/trip/demo/command"
          className="section-label px-8 py-3 border-hair border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300"
        >
          Enter
        </Link>
      </div>
    </main>
  )
}
