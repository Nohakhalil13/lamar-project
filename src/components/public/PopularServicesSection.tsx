import { type Lang } from '@/lib/i18n'
import { getContent } from '@/lib/content'
import Link from 'next/link'

type PopularService = {
  title: string
  price: string
  img: string
  href: string
}

const fallbackServices: PopularService[] = [
  { title: 'Stucwerk', price: 'Vanaf €16 m²', img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
  { title: 'Dunpleister', price: 'Vanaf €12 m²', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
  { title: 'Reparatiewerk', price: 'Vanaf €250', img: 'https://images.pexels.com/photos/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
  { title: 'Schilderwerk', price: 'Vanaf €11 m²', img: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
  { title: 'Latex spuiten', price: 'Vanaf €11 m²', img: 'https://images.pexels.com/photos/209268/pexels-photo-209268.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
  { title: 'Schilderwerk (hout)', price: 'Prijs per object', img: 'https://images.pexels.com/photos/132894/pexels-photo-132894.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop', href: '/offerte-aanvragen' },
]

export default async function PopularServicesSection({ lang }: { lang: Lang }) {
  const raw = await getContent('popular_services', JSON.stringify(fallbackServices))
  let services: PopularService[] = fallbackServices
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) services = parsed
  } catch (err) {
    // Keep fallbacks
  }

  return (
    <section style={{ padding: '6rem 1.5rem', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="rv" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3vw,3rem)', lineHeight: 1.1, color: 'var(--white)' }}>
            Onze <span style={{ color: 'var(--teal2)' }}>Diensten & Tarieven</span>
          </h2>
          <div style={{ width: 60, height: 3, background: 'var(--teal2)', margin: '1rem auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {services.map((svc, i) => (
            <div key={i} className="rv" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={svc.img} alt={svc.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
              
              {/* Dark Overlay for readability */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />

              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '2rem' }}>
                {/* Accent Box for Title */}
                <div style={{ background: 'var(--teal2)', color: '#FFFFFF', padding: '0.75rem 2rem', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '1.4rem', width: '90%', textAlign: 'center', borderRadius: 8, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                  {svc.title}
                </div>
                
                {/* White Box for Price */}
                <div style={{ background: '#FFFFFF', color: '#1A1A1A', padding: '0.4rem 1.5rem', fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.2rem', marginTop: '-0.5rem', borderRadius: 6, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  {svc.price}
                </div>
              </div>

              {/* Bottom Button */}
              <div style={{ position: 'absolute', bottom: '2rem', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Link href={svc.href} className="pop-svc-btn" style={{ background: 'rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.3)', color: '#FFFFFF', padding: '0.8rem 2rem', fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em', textDecoration: 'none', transition: 'background 0.3s', backdropFilter: 'blur(4px)' }}>
                  MEER LEZEN
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pop-svc-btn:hover {
          background: var(--teal2) !important;
        }
      `}</style>
    </section>
  )
}
