import { getContentMany } from '@/lib/content'
import Link from 'next/link'

export default async function MobileBottomNav() {
  const c = await getContentMany(['contact_phone', 'whatsapp_number'])
  const phone = c['contact_phone'] || '06 30302033'
  const wa = c['whatsapp_number'] || '31630302033'
  
  const waUrl = `https://wa.me/${wa}`
  const phoneUrl = `tel:${phone.replace(/[^0-9+]/g, '')}`

  return (
    <>
      <div className="mobile-bottom-nav">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>WhatsApp</span>
        </a>
        <a href={phoneUrl} className="nav-item center-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Bellen</span>
        </a>
        <Link href="/#offerte" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="8 14 12 18 16 14"></polyline></svg>
          <span>Offerte</span>
        </Link>
      </div>

      <style>{`
        .mobile-bottom-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background: #000000;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
          }

          .nav-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--teal2, #D4AF37);
            text-decoration: none;
            gap: 4px;
          }

          .nav-item span {
            font-family: var(--font-outfit);
            font-size: 0.75rem;
            font-weight: 500;
          }

          .center-item {
            border-left: 1px solid rgba(255,255,255,0.1);
            border-right: 1px solid rgba(255,255,255,0.1);
          }
          
          /* Add padding to the body so the bottom content isn't hidden by the nav */
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  )
}