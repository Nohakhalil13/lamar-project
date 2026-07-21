import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  bgImage: string;
  breadcrumbs?: { label: string; href?: string }[];
  priceBadge?: string;
  quote?: { text: string; author: string };
};

export default function PageHeader({ title, bgImage, breadcrumbs, priceBadge, quote }: PageHeaderProps) {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '55vh',
      display: 'flex',
      alignItems: 'center',
      padding: '9rem 1.5rem 5rem',
      background: 'var(--bg-dark, #111)',
      overflow: 'hidden',
    }}>
      {/* Background Image with gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)',
        zIndex: 1,
      }} />

      {/* Bottom fade into page background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
        zIndex: 2,
      }} />

      {/* Decorative accent line at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'var(--emerald)',
        zIndex: 10,
      }} />

      <div className="rv" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>

        {/* Left: Breadcrumbs + Title + Quote */}
        <div style={{ maxWidth: '680px' }}>

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="breadcrumb" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.25rem',
            }}>
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {crumb.href ? (
                    <Link href={crumb.href} style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      letterSpacing: '0.05em',
                      transition: 'color 0.2s',
                    }}
                    className="breadcrumb-link"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '0.82rem',
                      color: 'var(--emerald)',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}>
                      {crumb.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            letterSpacing: '-0.01em',
          }}>
            {/* Accent: first word in brand color */}
            {title.includes(' ') ? (
              <>
                <span style={{ color: 'var(--emerald)' }}>{title.split(' ')[0]}</span>
                {' '}{title.split(' ').slice(1).join(' ')}
              </>
            ) : (
              title
            )}
          </h1>

          {/* Quote */}
          {quote && (
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderLeft: '3px solid var(--emerald)',
              borderRadius: '0 12px 12px 0',
              padding: '1.25rem 1.5rem',
              maxWidth: 500,
            }}>
              <p style={{
                fontFamily: 'var(--font-outfit)',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.65,
                margin: '0 0 0.6rem',
              }}>
                &ldquo;{quote.text}&rdquo;
              </p>
              <div style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.78rem',
                color: 'var(--emerald)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                — {quote.author}
              </div>
            </div>
          )}
        </div>

        {/* Right: Price Badge */}
        {priceBadge && (
          <div style={{
            background: 'var(--emerald)',
            backdropFilter: 'blur(4px)',
            borderRadius: '16px',
            padding: '2rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(46, 90, 68, 0.35)',
            border: '1px solid rgba(255,255,255,0.3)',
            animation: 'floatBadge 6s ease-in-out infinite',
          }}>
            <div style={{ color: '#FFFFFF', fontSize: '0.85rem', fontFamily: 'var(--font-outfit)', fontWeight: 700, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Al vanaf
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '3.25rem', fontFamily: 'var(--font-archivo)', fontWeight: 900, lineHeight: 1 }}>
              {priceBadge}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem', fontFamily: 'var(--font-outfit)', marginTop: '0.25rem' }}>
              per m²
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .breadcrumb-link:hover { color: var(--emerald) !important; }
      `}</style>
    </section>
  );
}