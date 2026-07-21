'use client';

import { useState, useEffect } from 'react';

const items = [
  { icon: '✓', text: 'Meer dan 2835 tevreden klanten' },
  { icon: '★', text: <><strong style={{ fontWeight: 800 }}>4,9/5</strong> sterren gemiddeld</> },
  { icon: '✓', text: 'Gratis een vrijblijvende offerte' },
];

export default function TopTrustBar() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => setActive(a => (a + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [isMobile]);

  const textStyle: React.CSSProperties = {
    fontFamily: 'var(--font-archivo)',
    fontWeight: 500,
    fontSize: '0.85rem',
    color: '#fff',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      id="top-trust-bar"
      style={{
        background: '#3b3b3b',
        padding: '0.6rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 201, // above the fixed navbar
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1200,
          position: 'relative',
          gap: '2rem',
          minHeight: '1.4rem',
        }}
      >
        {/* Mobile: show one rotating item */}
        {mounted && isMobile ? (
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '1.4rem' }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  opacity: active === i ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                  pointerEvents: active === i ? 'auto' : 'none',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#2596be', fontSize: '1rem', fontWeight: 700 }}>{item.icon}</span>
                <span style={textStyle}>{item.text}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: all three side by side */
          <>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#2596be', fontSize: '1rem', fontWeight: 700 }}>{item.icon}</span>
                <span style={textStyle}>{item.text}</span>
              </div>
            ))}
            {/* Language selector */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <img src="https://flagcdn.com/w20/nl.png" alt="NL" style={{ width: 16, height: 'auto', borderRadius: 2 }} />
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}