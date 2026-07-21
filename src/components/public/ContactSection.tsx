import { getContentMany } from '@/lib/content'
import { t, type Lang } from '@/lib/i18n'
import { getSiteText } from '@/lib/siteText'

const QUOTE_IMG = 'https://images.pexels.com/photos/5493654/pexels-photo-5493654.jpeg?auto=compress&cs=tinysrgb&w=1400&h=600&fit=crop'

function CIcon({ name }: { name: string }) {
  /* الأيقونات تأخذ اللون الباذنجاني لتظهر بشكل واضح داخل البطاقات البيضاء */
  const p = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--plum)', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'wa') return (<svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>)
  if (name === 'phone') return (<svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
  if (name === 'doc') return (<svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>)
  return (<svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>)
}

export default async function ContactSection({ lang, quote }: { lang: Lang; quote?: string }) {
  const tr = t[lang].contactCards
  const tx = await getSiteText()
  const c = await getContentMany(['contact_phone', 'contact_email', 'whatsapp_number'])
  const phone = c['contact_phone'] || '06 30302033'
  const email = c['contact_email'] || 'lamarstukadoor@gmail.com'
  const wa = c['whatsapp_number'] || '31630302033'
  const hrefs = [
    `https://wa.me/${wa}`,
    `tel:${phone.replace(/[^0-9+]/g, '')}`,
    `/offerte-aanvragen`,
    `mailto:${email}`,
  ]

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '7rem 3.5rem' }}>
      {/* Quote band */}
      <div className="rv contact-quote" style={{ maxWidth: 1200, margin: '0 auto 2.5rem', borderRadius: 24, overflow: 'hidden', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem', backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('${QUOTE_IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p style={{ fontFamily: 'var(--font-archivo)', fontStyle: 'italic', fontWeight: 800, fontSize: 'clamp(1.3rem,2.6vw,2.2rem)', lineHeight: 1.25, color: 'var(--emerald)', margin: 0, maxWidth: 900 }}>&ldquo;{quote ?? tx('home_contact_quote')}&rdquo;</p>
      </div>

      {/* Emerald card panel (البطاقة الكبيرة باللون الأخضر الأساسي) */}
      <div className="rv contact-panel" style={{ maxWidth: 1200, margin: '0 auto', borderRadius: 28, padding: '4.5rem 4rem', background: 'var(--emerald)', border: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: 'clamp(2rem,3.4vw,3.2rem)', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '1.25rem' }}>{tx('home_contact_heading')}</h2>
        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '3.5rem', maxWidth: 560, lineHeight: 1.7 }}>{tx('home_contact_sub')}</p>
        
        <div className="contact-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {tr.cards.map((card, i) => (
            <div key={i} style={{ background: 'var(--bg)', borderRadius: 20, padding: '2.5rem 1.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--border)' }}>
              <span style={{ marginBottom: '1.25rem' }}><CIcon name={card.icon} /></span>
              <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--white)', marginBottom: '0.75rem' }}>{tx(`home_contact_card${i + 1}_title`)}</div>
              <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--white2)', fontWeight: 300, marginBottom: '2rem', flex: 1 }}>{tx(`home_contact_card${i + 1}_text`)}</div>
              
              {/* زر باللون الباذنجاني Plum لإعطاء contrast ممتاز داخل الكروت البيضاء */}
              <a href={hrefs[i]} style={{ background: 'var(--plum)', color: '#FFFFFF', padding: '0.7rem 1.6rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-outfit)', transition: 'opacity 0.2s ease' }}>{tx(`home_contact_card${i + 1}_btn`)}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}