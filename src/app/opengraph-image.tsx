import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'

export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand colours — kept in sync with the live theme set in `app/layout.tsx`
// (`--teal` / `--teal2`) rather than the retired purple/teal identity.
const INK = '#1A1C20'
const ACCENT = '#ffd935'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 12,
          background: ACCENT,
          display: 'flex',
        }} />

        {/* Top: Logo wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* House icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="72" height="66" viewBox="0 0 72 66" fill="none">
              <polygon points="36,4 68,30 64,30 64,62 8,62 8,30 4,30" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinejoin="round"/>
              <rect x="28" y="38" width="16" height="24" fill={INK} rx="2"/>
              <rect x="30" y="14" width="12" height="10" fill={INK} rx="1"/>
            </svg>
          </div>
          {/* Brand name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{
              fontSize: 58,
              fontWeight: 900,
              color: INK,
              letterSpacing: '-1px',
              lineHeight: 1,
              fontStyle: 'italic',
            }}>
              Lamar
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: INK,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              Stukadoor en Renovatie
            </div>
          </div>
        </div>

        {/* Middle: Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            fontSize: 72,
            fontWeight: 900,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: '-2px',
          }}>
            Stucwerk &amp; Schilderwerk
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              paddingBottom: 6,
              borderBottom: `10px solid ${ACCENT}`,
              display: 'flex',
            }}
          >
            van topkwaliteit.
          </div>
          <div style={{
            fontSize: 26,
            color: '#555',
            marginTop: 8,
            fontWeight: 400,
            letterSpacing: '0.2px',
          }}>
            Vakkundig stucwerk · Renovatie · Interieurbouw — door heel Nederland
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            fontSize: 22,
            color: '#666',
          }}>
            <span>✓ Gratis offerte</span>
            <span>✓ Zelfde dag reactie</span>
            <span>✓ 200+ projecten</span>
          </div>
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: INK,
            letterSpacing: 1,
          }}>
            lamarrenovatie.nl
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 8,
          background: INK,
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  )
}