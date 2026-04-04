import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Ledger',
  description: 'A private record of the art of entertaining',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
