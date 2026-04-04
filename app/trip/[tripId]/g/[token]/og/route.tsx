import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0908',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Corner marks */}
        <div style={{ position: 'absolute', top: 24, left: 24, width: 40, height: 40, borderTop: '0.5px solid #7A6D54', borderLeft: '0.5px solid #7A6D54', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40, borderTop: '0.5px solid #7A6D54', borderRight: '0.5px solid #7A6D54', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, width: 40, height: 40, borderBottom: '0.5px solid #7A6D54', borderLeft: '0.5px solid #7A6D54', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: 24, right: 24, width: 40, height: 40, borderBottom: '0.5px solid #7A6D54', borderRight: '0.5px solid #7A6D54', opacity: 0.4 }} />

        {/* Monogram */}
        <div
          style={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0.5px solid #B8A07A',
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#B8A07A', fontSize: 24 }}>L</span>
        </div>

        {/* Title */}
        <p
          style={{
            color: '#B8A07A',
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          YOU ARE INVITED
        </p>
        <h1
          style={{
            color: '#EDE8DF',
            fontSize: 40,
            fontStyle: 'italic',
            fontWeight: 400,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          The South of France
        </h1>
        <p
          style={{
            color: '#928679',
            fontSize: 18,
            marginBottom: 32,
          }}
        >
          May 2026
        </p>

        {/* Gold rule */}
        <div
          style={{
            width: 64,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #B8A07A, transparent)',
            marginBottom: 32,
          }}
        />

        <p
          style={{
            color: '#B8B0A2',
            fontSize: 16,
            textAlign: 'center',
            maxWidth: 360,
            lineHeight: 1.6,
          }}
        >
          Chloe is gathering her favourite people for something extraordinary
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
