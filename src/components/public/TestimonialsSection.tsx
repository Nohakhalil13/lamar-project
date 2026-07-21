import { getContentMany } from '@/lib/content'
import { type Lang } from '@/lib/i18n'
import { getSiteText } from '@/lib/siteText'

interface Testimonial {
  quote: string
  name: string
  location: string
  daysAgo?: string
}

const fallbacks: Testimonial[] = [
  { quote: "Topppers!", name: 'Daniel Bos', location: 'Amsterdam', daysAgo: '4 dagen geleden' },
  { quote: 'Erg tevreden over het stucwerk bij ons in huis. Als wij opnieuw een stukadoor zouden zoeken zouden we zeker weer bij dit..', name: 'Gert-Kees Larooy', location: 'Rotterdam', daysAgo: '1 week geleden' },
  { quote: 'Meerdere keren bij ons geweest, super service.', name: 'MK', location: 'Utrecht', daysAgo: '1 week geleden' },
  { quote: 'I worked with them for getting my apartment plastered and painted and they did a great job. Very efficient and great..', name: 'Prerana Sharma', location: 'Den Haag', daysAgo: '2 weken geleden' },
]

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function parse(raw: string | undefined, fallback: Testimonial): Testimonial {
  if (!raw) return fallback
  try { return JSON.parse(raw) as Testimonial } catch { return fallback }
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.85 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

export default async function TestimonialsSection({ headingA, headingAccent, headingB, sub }: { lang?: Lang; headingA?: string; headingAccent?: string; headingB?: string; sub?: string }) {
  const content = await getContentMany(['testimonial_1', 'testimonial_2', 'testimonial_3', 'testimonial_4'])
  const testimonials = [
    parse(content['testimonial_1'], fallbacks[0]),
    parse(content['testimonial_2'], fallbacks[1]),
    parse(content['testimonial_3'], fallbacks[2]),
    parse(content['testimonial_4'], fallbacks[3]),
  ]

  /* مصفوفة ألوان متناسقة مع الهوية الجديدة (تردد بين Emerald و Plum وباقي الدرجات) */
  const AVATAR_COLORS = ['var(--emerald)', 'var(--plum)', '#2E5A44', '#4A2A4F'];

  return (
    <section id="testimonials" style={{ padding: '6rem 1.5rem', background: '#fff' }}>
      <div className="rv" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Top Header */}
        <h3 style={{ 
          fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.5rem', 
          color: '#111', marginBottom: '1.5rem', borderBottom: '3px solid var(--emerald)', 
          paddingBottom: '0.5rem' 
        }}>
          Review
        </h3>

        {/* Subtitle */}
        <h2 style={{ 
          fontFamily: 'var(--font-archivo)', fontWeight: 400, fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', 
          color: '#333', marginBottom: '3rem', textAlign: 'center'
        }}>
          BEST BEOORDEELDE <span style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationColor: 'var(--emerald)' }}>STUKADOORS & SCHILDERS</span> VAN NEDERLAND!
        </h2>

        {/* Reviews Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', width: '100%' }}>
          {testimonials.map((tm, i) => (
            <div key={i} className={`tcard rv ${['d1', 'd2', 'd3', 'd4'][i]}`} style={{ 
              background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', 
              padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ 
                    width: 40, height: 40, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], 
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '1rem' 
                  }}>
                    {initials(tm.name)}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.95rem', color: '#111' }}>{tm.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{tm.daysAgo || '1 week geleden'}</div>
                  </div>
                </div>
                <GoogleG />
              </div>

              {/* النجوم باللون الأساسي Emerald */}
              <div style={{ color: 'var(--emerald)', fontSize: '1.1rem', letterSpacing: '2px' }}>
                ★★★★★
              </div>

              <p style={{ 
                fontSize: '0.85rem', lineHeight: 1.6, color: '#444', 
                margin: 0, display: '-webkit-box', WebkitLineClamp: 4, 
                WebkitBoxOrient: 'vertical', overflow: 'hidden' 
              }}>
                {tm.quote}
              </p>

              <span style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 600, marginTop: 'auto', cursor: 'pointer' }}>Lees verder</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}