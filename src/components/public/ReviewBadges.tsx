import { getContent } from '@/lib/content'

type Badge = {
  platform: string
  rating: string
  reviews: string
  url: string
  enabled: boolean
}

// Fixed, supported platforms in display order.
const ORDER = ['google', 'facebook', 'trustpilot', 'werkspot']

function Stars() {
  return (
    <span className="rb-stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="rb-star">★</span>
      ))}
    </span>
  )
}

function Logo({ platform }: { platform: string }) {
  if (platform === 'google') {
    // Reused from TestimonialsSection.tsx
    return (
      <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    )
  }
  if (platform === 'facebook') {
    // Reused path from Footer.tsx, filled in the Facebook brand blue.
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  if (platform === 'trustpilot') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#00B67A" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.5l7.1-.6z" />
      </svg>
    )
  }
  // werkspot — simple branded lettered badge
  return (
    <span
      className="rb-werkspot"
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: '#FF6B00',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-archivo)',
        fontWeight: 800,
        fontSize: '1rem',
        flexShrink: 0,
      }}
    >
      W
    </span>
  )
}

export default async function ReviewBadges() {
  const raw = await getContent('review_badges', '[]')

  let badges: Badge[] = []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) badges = parsed as Badge[]
  } catch {
    badges = []
  }

  // A badge shows once it's enabled and has a score. URL and review count are
  // optional — without a URL the card simply isn't a link.
  const visible = badges
    .filter(
      (b) =>
        b &&
        b.enabled === true &&
        typeof b.rating === 'string' &&
        b.rating.trim() !== ''
    )
    .sort((a, b) => ORDER.indexOf(a.platform) - ORDER.indexOf(b.platform))

  if (visible.length === 0) return null

  return (
    <section className="rb-section" style={{ background: 'transparent', padding: '2.5rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        .rb-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .rb-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(20,24,29,0.05);
          padding: 2rem 2.25rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          min-width: 190px;
          flex: 0 1 210px;
        }
        .rb-logo svg { width: 50px; height: 50px; }
        .rb-werkspot { width: 50px !important; height: 50px !important; font-size: 1.5rem !important; border-radius: 12px !important; }
        .rb-rating {
          font-family: var(--font-archivo);
          font-weight: 800;
          font-size: 2.5rem;
          color: #1A1A1A;
          line-height: 1.1;
          margin-top: 0.5rem;
        }
        .rb-reviews {
          font-size: 1.05rem;
          color: #4A4A4A;
          font-weight: 600;
          margin-top: 0.2rem;
          white-space: nowrap;
        }
        .rb-stars { display: inline-flex; gap: 2px; }
        .rb-star { color: #FBBC04; font-size: 1.3rem; }

        /* Mobile: still one row (per earlier fix), but noticeably bigger than before */
        @media (max-width: 640px) {
          .rb-section { padding: 1.75rem 0.6rem !important; }
          .rb-grid { flex-wrap: nowrap !important; gap: 0.45rem !important; }
          .rb-card {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            padding: 1rem 0.4rem !important;
            border-radius: 12px !important;
            gap: 0.25rem !important;
          }
          .rb-rating { font-size: 1.45rem !important; margin-top: 0.2rem !important; }
          .rb-reviews { font-size: 0.68rem !important; margin-top: 0 !important; }
          .rb-star { font-size: 0.65rem !important; }
          .rb-logo svg { width: 30px !important; height: 30px !important; }
          .rb-werkspot { width: 30px !important; height: 30px !important; font-size: 0.85rem !important; border-radius: 7px !important; }
        }

        @media (max-width: 380px) {
          .rb-card { padding: 0.8rem 0.3rem !important; }
          .rb-rating { font-size: 1.2rem !important; }
          .rb-reviews { font-size: 0.6rem !important; }
          .rb-logo svg { width: 25px !important; height: 25px !important; }
          .rb-werkspot { width: 25px !important; height: 25px !important; font-size: 0.7rem !important; }
        }
      `}</style>
      <div className="rb-grid">
        {visible.map((b) => {
          const hasUrl = typeof b.url === 'string' && b.url.trim() !== ''
          const inner = (
            <>
              <span className="rb-logo" style={{ display: 'inline-flex' }}>
                <Logo platform={b.platform} />
              </span>
              <span className="rb-rating">{b.rating}</span>
              <Stars />
              {b.reviews.trim() !== '' && (
                <span className="rb-reviews">{b.reviews} reviews</span>
              )}
            </>
          )

          return hasUrl ? (
            <a key={b.platform} href={b.url} target="_blank" rel="noopener noreferrer" className="rb-card">
              {inner}
            </a>
          ) : (
            <div key={b.platform} className="rb-card">
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}