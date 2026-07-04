'use client';

import { useState } from 'react';

export default function HomeContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    naam: '',
    email: '',
    telefoon: '',
    woonplaats: '',
    beschrijving: '',
  });

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const message = [
      fields.woonplaats ? `Woonplaats: ${fields.woonplaats}` : '',
      fields.beschrijving,
    ].filter(Boolean).join('\n\n');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.naam,
          email: fields.email || undefined,
          phone: fields.telefoon || undefined,
          message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Verzenden mislukt.');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verzenden mislukt. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '6rem 1.5rem', background: '#f9f9f9', position: 'relative' }} id="offerte">
      <div className="rv" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,3vw,2.5rem)', color: '#111' }}>
            Offerte aanvraag
          </h2>
          <div style={{ width: 100, height: 3, background: 'var(--teal2)', margin: '1rem auto 1.5rem' }} />
          <p style={{ color: '#444', fontSize: '1.1rem', fontFamily: 'var(--font-outfit)', maxWidth: 600, margin: '0 auto' }}>
            Laat hier uw bericht achter. Wij komen dezelfde dag nog bij u terug!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left: Form */}
          <div style={{ position: 'relative' }}>
            
            {/* Floating Discount Badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '20px',
              background: '#222',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.85rem',
              fontWeight: 700,
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 10,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <span style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: 18, height: 18, background: '#fff', color: '#222', 
                borderRadius: '50%', fontSize: '0.65rem', fontWeight: 900 
              }}>%</span>
              TIJDELIJKE KORTING TOT 10%!
            </div>

            <div style={{ background: '#fff', padding: '3.5rem 2.5rem 2.5rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              {success ? (
                <div style={{ background: '#E6F4EA', color: '#137333', padding: '2rem', borderRadius: 8, textAlign: 'center', fontFamily: 'var(--font-outfit)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-archivo)' }}>Bedankt voor uw aanvraag!</h3>
                  <p>Wij hebben uw gegevens ontvangen en nemen binnen 24 uur contact met u op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <input type="text" placeholder="Naam" required value={fields.naam} onChange={set('naam')} style={{ width: '100%', padding: '1rem', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', background: '#f5f5f5' }} />
                  <input type="email" placeholder="E-mailadres" value={fields.email} onChange={set('email')} style={{ width: '100%', padding: '1rem', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', background: '#f5f5f5' }} />
                  <input type="tel" placeholder="Telefoonnummer" required value={fields.telefoon} onChange={set('telefoon')} style={{ width: '100%', padding: '1rem', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', background: '#f5f5f5' }} />
                  <input type="text" placeholder="Woonplaats" required value={fields.woonplaats} onChange={set('woonplaats')} style={{ width: '100%', padding: '1rem', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', background: '#f5f5f5' }} />
                  <textarea placeholder="Beschrijving opdracht" required rows={4} value={fields.beschrijving} onChange={set('beschrijving')} style={{ width: '100%', padding: '1rem', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', background: '#f5f5f5', resize: 'vertical' }}></textarea>

                  {error && (
                    <p style={{ color: '#c0392b', fontFamily: 'var(--font-outfit)', fontSize: '0.9rem', margin: 0 }}>{error}</p>
                  )}

                  <button type="submit" disabled={loading} style={{ 
                    background: 'var(--teal2)', color: '#000', padding: '1.2rem', 
                    borderRadius: 4, border: 'none', fontFamily: 'var(--font-archivo)', 
                    fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', 
                    transition: 'all 0.2s', marginTop: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }} 
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.95)'; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}>
                    {loading ? 'Bezig met verzenden...' : 'Offerte Aanvragen'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Features — illustrated icons like vanibra.nl */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', justifyContent: 'center', padding: '1rem 0' }}>

            {/* Feature 1: Fast / No waiting */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
              <div style={{ width: 110, height: 80 }}>
                <img src="/rush-150x150.png" alt="Snel en efficiënt" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', color: '#333', margin: 0, lineHeight: 1.5 }}>
                Snel en efficiënt, <strong style={{ color: '#111' }}>ZONDER wachttijden!</strong>
              </p>
            </div>

            {/* Feature 2: Big and small jobs */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
              <div style={{ width: 100, height: 90 }}>
                <img src="/transparent-size-icon-real-estate-icon-measurement-icon-5fb3244b4c56c50929056516055757553127-282x300.png" alt="Grote en kleine klussen" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', color: '#333', margin: 0, lineHeight: 1.5 }}>
                Zowel grote, als <strong style={{ color: '#111' }}>kleine klussen.</strong>
              </p>
            </div>

            {/* Feature 3: 1-on-1 guidance */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
              <div style={{ width: 100, height: 90 }}>
                <img src="/customer-service-150x150.png" alt="1 op 1 begeleiding" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', color: '#333', margin: 0, lineHeight: 1.5 }}>
                1 op 1 begeleiding <strong style={{ color: '#111' }}>gedurende het hele traject.</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}