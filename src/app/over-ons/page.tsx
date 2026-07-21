import { getContent, ABOUT_FALLBACK } from '@/lib/content'
import { t } from '@/lib/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import ContactSection from '@/components/public/ContactSection'
import RevealObserver from '@/components/public/RevealObserver'
import PageHeader from '@/components/public/PageHeader'
import Link from 'next/link'

export const revalidate = 3600

export const metadata = {
  title: 'Over ons | LAMAR Stukadoor en Onderhoud',
  description: 'Leer LAMAR Stukadoor en Onderhoud kennen: vakmanschap in stucwerk, afwerking en renovatie met meer dan 200 voltooide projecten in Nederland.',
  alternates: { canonical: '/over-ons' },
}

const HEADER_IMG = '/images/image01.jpg'

type Principle = { title: string; text: string }

function PrincipleCard({ item, idx }: { item: Principle; idx: number }) {
  const colors = ['#2596be', '#2596be', '#2596be', '#2596be']
  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '2rem',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-start',
      transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      cursor: 'default',
    }}
    className="principle-card"
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: 'rgba(255,217,53,0.12)', border: '1px solid rgba(255,217,53,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', color: colors[idx % 4] }}>
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.5rem' }}>{item.title}</div>
        <div style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--white2)', fontFamily: 'var(--font-outfit)' }}>{item.text}</div>
      </div>
    </div>
  )
}

export default async function OverOnsPage() {
  const lang = 'nl' as const
  const tr = t[lang].overOns
  const aboutText = await getContent('about_text', ABOUT_FALLBACK)
  const paragraphs = aboutText.split('\n\n').filter(Boolean)

  return (
    <>
      <Navbar lang={lang} />

      <PageHeader
        title="OVER ONS"
        bgImage={HEADER_IMG}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Over ons' },
        ]}
        quote={{
          text: 'Wij geloven dat vakmanschap meer is dan techniek — het is vertrouwen verdienen, elke dag opnieuw.',
          author: 'LAMAR Team',
        }}
      />

      <main>

        {/* ── STATS SECTION ───────────────────────────────────── */}
        <section style={{ background: '#1A1A1A', borderBottom: '3px solid var(--teal2)' }}>
          <div className="rv" style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}>
              {[
                { num: '200+',  label: 'Voltooide projecten', icon: '🏗️' },
                { num: '4.9★',  label: 'Gemiddelde beoordeling', icon: '⭐' },
                { num: '5+',    label: 'Jaar ervaring', icon: '📅' },
                { num: '100%',  label: 'Klanttevredenheid', icon: '✅' },
              ].map(({ num, label, icon }) => (
                <div key={label} style={{ padding: '0.5rem' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,2.8rem)', color: 'var(--teal2)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN ABOUT CONTENT ──────────────────────────────── */}
        <section id="over-content" style={{ background: 'var(--bg)', padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            {/* Section label */}
            <div className="rv" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,217,53,0.12)', border: '1px solid rgba(255,217,53,0.3)',
                borderRadius: 50, padding: '0.35rem 1.1rem', marginBottom: '1.25rem',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal2)', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal2)' }}>
                  Ons verhaal
                </span>
              </div>
            </div>

            <h2 className="rv" style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--white)', marginBottom: '3rem', textAlign: 'center', lineHeight: 1.15 }}>
              {tr.headingA} <span style={{ color: 'var(--teal2)' }}>{tr.headingAccent}</span> {tr.headingB}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>

              {/* Left: text */}
              <div className="rv">
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--white2)', fontFamily: 'var(--font-outfit)', marginBottom: '1.5rem' }}>{p}</p>
                ))}

                {/* Why us list */}
                <div style={{ background: 'var(--bg2)', borderRadius: 16, padding: '1.75rem', border: '1px solid var(--border)', marginTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--white)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Waarom kiezen voor LAMAR?
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      'Jarenlange ervaring in stucwerk en schilderwerk',
                      'Vaste scherpe prijzen — geen verrassingen achteraf',
                      'Vakkundig team met oog voor detail',
                      'Resultaatgarantie op al onze werkzaamheden',
                      'Actief door heel Nederland',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.92rem', color: 'var(--white2)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/offerte-aanvragen"
                    className="btn-teal"
                    style={{
                      background: 'var(--teal2)', color: '#1A1A1A',
                      padding: '0.9rem 2rem', borderRadius: 6,
                      textDecoration: 'none', fontWeight: 800,
                      fontSize: '0.9rem', fontFamily: 'var(--font-outfit)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}
                  >
                    Gratis offerte →
                  </Link>
                  <Link
                    href="/projects"
                    className="btn-outline"
                    style={{
                      border: '1px solid var(--border2)', color: 'var(--white2)',
                      padding: '0.9rem 2rem', borderRadius: 6,
                      textDecoration: 'none', fontWeight: 600,
                      fontSize: '0.9rem', fontFamily: 'var(--font-outfit)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}
                  >
                    Bekijk portfolio
                  </Link>
                </div>
              </div>

              {/* Right: principles */}
              <div className="rv d2" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--white3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  Onze kernwaarden
                </div>
                {tr.principles.map((it: Principle, idx: number) => (
                  <PrincipleCard key={idx} item={it} idx={idx} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAM / IMAGE SECTION ─────────────────────────────── */}
        <section style={{ background: 'var(--bg2)', padding: '6rem 1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="rv" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,217,53,0.12)', border: '1px solid rgba(255,217,53,0.3)',
                  borderRadius: 50, padding: '0.35rem 1.1rem', marginBottom: '1.5rem',
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal2)', display: 'block' }} />
                  <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal2)' }}>
                    Ons werk
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.75rem,3vw,2.5rem)', color: 'var(--white)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                  Kwaliteit die<br/><span style={{ color: 'var(--teal2)' }}>voor zichzelf spreekt</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--white2)', marginBottom: '2rem' }}>
                  Van kleine reparaties tot complete renovaties — wij leveren altijd topkwaliteit. Onze klanten beoordelen ons gemiddeld met een 4.9 op Google.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.25rem' }}>⭐</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1rem', color: 'var(--white)' }}>4.9 / 5.0</div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.75rem', color: 'var(--white3)' }}>612+ Google reviews</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.25rem' }}>🏆</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1rem', color: 'var(--white)' }}>Best beoordeeld</div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.75rem', color: 'var(--white3)' }}>Nederland 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Sausklaar-Stucwerk-1.webp"
                  alt="LAMAR stucwerk vakmanschap"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
      <RevealObserver />

      <style>{`
        .principle-card:hover {
          border-color: rgba(255,217,53,0.4) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
      `}</style>
    </>
  )
}
