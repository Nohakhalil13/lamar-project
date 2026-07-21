import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import PageHeader from '@/components/public/PageHeader'
import RevealObserver from '@/components/public/RevealObserver'
import { servicesData } from '@/lib/servicesData'
import Link from 'next/link'

export const revalidate = 3600

export const metadata = {
  title: 'Onze Diensten | LAMAR Stukadoor en Onderhoud',
  description: 'Bekijk al onze diensten: stucwerk, dunpleister, reparatiewerk, schilderwerk en latex spuiten. Vraag vandaag nog een vrijblijvende offerte aan.',
  alternates: { canonical: '/onze-diensten' },
}

// Service icons SVG paths
const serviceIcons: Record<string, React.JSX.Element> = {
  'sausklaar-stucwerk': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h10M7 11h6"/></svg>,
  'stucwerk': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2.1-.4-.4-2.1z"/></svg>,
  'dunpleister': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  'reparatiewerk': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2.1-.4-.4-2.1z"/><circle cx="18" cy="5" r="3"/></svg>,
  'schilderwerk': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><path d="M17 13H7c-1.1 0-2 .9-2 2v.5c0 1.4 1.1 2.5 2.5 2.5h9c1.4 0 2.5-1.1 2.5-2.5V15c0-1.1-.9-2-2-2z"/><path d="M13.5 9v4M8 13v1M16 13v1"/></svg>,
  'latex-spuiten': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>,
  'schilderwerk-hout': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/></svg>,
}

export default function OnzeDienstenPage() {
  const lang = 'nl' as const

  return (
    <>
      <Navbar lang={lang} />

      <PageHeader
        title="ONZE DIENSTEN"
        bgImage="/images/PHOTO-2024-01-06-19-24-18.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Onze Diensten' },
        ]}
      />

      <main style={{ background: 'var(--bg)' }}>

        {/* ── INTRO SECTION ────────────────────────────────────── */}
        <section style={{ padding: '5rem 1.5rem 3rem', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="rv" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(46,90,68,0.12)', border: '1px solid rgba(46,90,68,0.3)',
              borderRadius: 50, padding: '0.35rem 1.1rem', marginBottom: '1.5rem',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)', display: 'block' }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--emerald)' }}>
                Vakmanschap op maat
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--white)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Alles onder één dak
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--white2)', marginBottom: '1.5rem', fontFamily: 'var(--font-outfit)' }}>
              Bij ons kunt u terecht voor onderstaande diensten. Vraag gerust een{' '}
              <Link href="/offerte-aanvragen" style={{ color: 'var(--emerald)', textDecoration: 'none', fontWeight: 600 }}>vrijblijvende offerte</Link>{' '}
              aan en bekijk bij interesse ook onze{' '}
              <Link href="/projects" style={{ color: 'var(--emerald)', textDecoration: 'none', fontWeight: 600 }}>portfolio</Link>{' '}
              met foto's van eerder uitgevoerde werkzaamheden.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              {[
                { num: '200+', label: 'Projecten' },
                { num: '4.9★', label: 'Gemiddeld cijfer' },
                { num: '7', label: 'Diensten' },
                { num: '100%', label: 'Garantie' },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--emerald)' }}>{num}</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', color: 'var(--white2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES LIST ─────────────────────────────────────── */}
        {servicesData.map((service, idx) => {
          const isEven = idx % 2 === 0
          const icon = serviceIcons[service.slug]

          return (
            <section
              key={service.slug}
              id={service.slug}
              style={{
                padding: '5rem 1.5rem',
                background: isEven ? 'var(--bg)' : 'var(--bg2)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div
                className="rv"
                style={{
                  maxWidth: 1100,
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '3.5rem',
                  alignItems: 'center',
                }}
              >
                {/* Image — alternating sides */}
                <div style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  order: isEven ? 0 : 1,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  position: 'relative',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.whatIsIt.image}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                    className="dienst-img"
                  />
                  {/* Price badge */}
                  <div style={{
                    position: 'absolute', bottom: '1.25rem', left: '1.25rem',
                    background: 'var(--emerald)', color: '#FFFFFF',
                    fontFamily: 'var(--font-archivo)', fontWeight: 800,
                    fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: 6,
                    boxShadow: '0 4px 15px rgba(46,90,68,0.4)',
                  }}>
                    {service.price}
                  </div>
                </div>

                {/* Text */}
                <div style={{ order: isEven ? 1 : 0 }}>
                  {/* Icon + number */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 54, height: 54, borderRadius: 14,
                      background: 'rgba(46,90,68,0.12)', border: '1px solid rgba(46,90,68,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--emerald)', flexShrink: 0,
                    }}>
                      {icon || <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>}
                    </div>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white3)' }}>
                      Dienst {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-archivo)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                    color: 'var(--white)',
                    marginBottom: '1rem',
                    lineHeight: 1.15,
                  }}>
                    {service.title}
                  </h2>

                  <p style={{
                    color: 'var(--white2)',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    marginBottom: '1.75rem',
                    fontFamily: 'var(--font-outfit)',
                  }}>
                    {service.whatIsIt.text}
                  </p>

                  {/* Benefits grid */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                      {service.benefits.slice(0, 4).map((b) => (
                        <div key={b.title} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                          padding: '0.75rem', background: isEven ? 'var(--bg2)' : 'var(--bg)',
                          borderRadius: 10, border: '1px solid var(--border)',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <div>
                            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--white)', lineHeight: 1.2 }}>{b.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href="/offerte-aanvragen"
                      className="btn-emerald"
                      style={{
                        background: 'var(--emerald)',
                        color: '#FFFFFF',
                        padding: '0.85rem 1.75rem',
                        borderRadius: 6,
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-outfit)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Offerte aanvragen →
                    </Link>
                    <Link
                      href={`/diensten/${service.slug}`}
                      className="btn-outline-emerald"
                      style={{
                        border: '1px solid var(--emerald)',
                        color: 'var(--white2)',
                        background: 'transparent',
                        padding: '0.85rem 1.75rem',
                        borderRadius: 6,
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-outfit)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Meer informatie
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* ── CTA SECTION ──────────────────────────────────────── */}
        <section style={{
          padding: '6rem 1.5rem',
          background: '#1A1A1A',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative background accent */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(46,90,68,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div className="rv" style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🏠</div>
            <h2 style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: '#fff',
              marginBottom: '1.25rem',
              lineHeight: 1.2,
            }}>
              Niet gevonden wat u zocht?
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-outfit)',
            }}>
              Neem gerust contact op — wij helpen u altijd verder met een oplossing op maat.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                className="btn-emerald"
                style={{
                  background: 'var(--emerald)',
                  color: '#FFFFFF',
                  padding: '1rem 2.5rem',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-outfit)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
              >
                Neem contact op
              </Link>
              <Link
                href="/offerte-aanvragen"
                className="btn-outline-emerald"
                style={{
                  border: '1px solid var(--emerald)',
                  color: '#fff',
                  background: 'transparent',
                  padding: '1rem 2.5rem',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-outfit)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
              >
                Offerte aanvragen
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          .dienst-img:hover { transform: scale(1.04); }
          .btn-emerald {
            background-color: var(--emerald) !important;
          }
          .btn-emerald:hover {
            filter: brightness(1.1);
            transform: translateY(-2px);
            background-color: var(--emerald) !important;
          }
          .btn-outline-emerald:hover {
            background: var(--emerald) !important;
            color: #FFFFFF !important;
            border-color: var(--emerald) !important;
            transform: translateY(-2px);
          }
          @media (max-width: 700px) {
            #onze-diensten-grid > div { order: 0 !important; }
          }
        `}</style>
      </main>

      <Footer lang={lang} />
      <RevealObserver />
    </>
  )
}