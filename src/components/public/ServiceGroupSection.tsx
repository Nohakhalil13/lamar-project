'use client';

import Link from 'next/link';

export type ServiceItem = {
  title: string;
  price: string;
  href: string;
};

type Props = {
  heading: string;
  subheading?: string;
  services: ServiceItem[];
  sectionImages?: string[];
};

export default function ServiceGroupSection({ heading, subheading, services, sectionImages }: Props) {
  // Placeholder images based on the service name for visual matching
  const getImage = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('stuc')) return 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800';
    if (t.includes('dunpleister')) return 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800';
    if (t.includes('reparatie')) return 'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg?auto=compress&cs=tinysrgb&w=800';
    if (t.includes('latex')) return 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800';
    return 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <section style={{ padding: '6rem 1.5rem', background: '#fff', position: 'relative', zIndex: 10 }}>
      <div className="rv" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3vw,2.5rem)', color: '#111' }}>
            {heading}
          </h2>
          <div style={{ width: 100, height: 3, background: 'var(--teal2)', margin: '1rem auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {services.map((svc, i) => {
            const bgSrc = sectionImages?.[i] || getImage(svc.title);
            return (
              <div
              key={i} 
              className="rv" 
              style={{ 
                position: 'relative',
                borderRadius: '12px', 
                overflow: 'hidden',
                aspectRatio: '3/4',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              {/* Background Image */}
              <img 
                src={bgSrc} 
                alt={svc.title} 
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s',
                }}
              />
              
              {/* Overlay Content */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}>
                <div style={{
                  background: 'var(--teal2)',
                  color: '#fff',
                  padding: '0.8rem 2rem',
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  marginBottom: '0.5rem',
                  width: '80%',
                  textAlign: 'center'
                }}>
                  {svc.title}
                </div>
                
                <div style={{
                  background: '#fff',
                  color: '#333',
                  padding: '0.5rem 1.5rem',
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                }}>
                  {svc.price}
                </div>
              </div>

              {/* Hover Button */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Link href={svc.href} style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '0.8rem 2rem',
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; }}
                >
                  MEER LEZEN
                </Link>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
  );
}