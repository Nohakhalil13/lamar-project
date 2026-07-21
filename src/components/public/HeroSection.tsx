import { t, type Lang } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { getSiteText } from '@/lib/siteText';
import ReviewBadges from '@/components/public/ReviewBadges';

const HERO_FALLBACK = 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80';

export default async function HeroSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hero;
  const tx = await getSiteText();
  const wa = await getContent('whatsapp_number', '31630302033');

  // Hero background — managed via Admin → Afbeeldingen → Hero Achtergrond
  let heroBg = HERO_FALLBACK;
  try {
    const raw = await getContent('images:hero', '[]');
    const urls: string[] = JSON.parse(raw);
    if (urls[0]) heroBg = urls[0];
  } catch { /* keep fallback */ }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1rem 10rem',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("${heroBg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="rv"
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Headline */}
        <h1
          className="rv d1"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 1.2,
            color: '#fff',
            marginBottom: '2.5rem',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          BEST BEOORDEELDE <br />
          <span style={{ 
            fontWeight: 700, 
            textDecoration: 'underline', 
            textDecorationColor: '#fff',
            textDecorationThickness: '2px',
            textUnderlineOffset: '8px'
          }}>
            STUKADOORS & SCHILDERS
          </span> <br />
          VAN NEDERLAND!
        </h1>

        {/* CTAs */}
        <div
          className="rv d2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <a
            href="/offerte-aanvragen"
            className="hero-btn-hover"
            style={{
              background: 'var(--teal2)',
              color: '#fff',
              padding: '1.2rem 2.5rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '1rem',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              fontWeight: 800,
              borderRadius: 4,
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(37, 150, 190, 0.35)',
              transition: 'transform 0.2s, filter 0.2s',
            }}
          >
            ONTVANG BINNEN 1 DAG UW OFFERTE!
          </a>
          
          <div
            style={{
              background: '#222',
              color: '#fff',
              padding: '0.8rem 1.5rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.85rem',
              fontWeight: 700,
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              width: 20, height: 20, background: '#fff', color: '#222', 
              borderRadius: '50%', fontSize: '0.7rem', fontWeight: 900 
            }}>%</span>
            TIJDELIJKE KORTING TOT 10%!
          </div>
        </div>
      </div>

      {/* Trust Badges (managed via /admin/reviews-bar) */}
      <ReviewBadges />
    </section>
  );
}