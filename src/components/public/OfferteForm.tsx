'use client';

import { useState } from 'react';
import Link from 'next/link';

type FormData = {
  naam: string;
  email: string;
  telefoon: string;
  woonplaats: string;
  soortBouw: string;
  diensten: string[];
  oppervlakte: string;
  startdatum: string;
  opmerkingen: string;
};

const DIENSTEN_OPTIONS = [
  'Dunpleister',
  'Stucwerk',
  'Sausklaar stucwerk',
  'Schilderwerk',
  'Latex spuiten',
  'Schilderwerk (hout)',
  'Reparatiewerk',
];

const SOORT_BOUW_OPTIONS = [
  'Nieuwbouw (jonger dan 2 jaar)',
  'Bestaande bouw (ouder dan 2 jaar)',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1rem',
  border: '1px solid #ddd',
  borderRadius: 6,
  fontSize: '0.95rem',
  fontFamily: 'var(--font-outfit)',
  background: '#f9f9f9',
  color: '#1a1a1a',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-archivo)',
  fontWeight: 700,
  fontSize: '0.9rem',
  color: '#1a1a1a',
  marginBottom: '0.5rem',
};

export default function OffertePage() {
  const [form, setForm] = useState<FormData>({
    naam: '',
    email: '',
    telefoon: '',
    woonplaats: '',
    soortBouw: '',
    diensten: [],
    oppervlakte: '',
    startdatum: '',
    opmerkingen: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDienst = (d: string) => {
    setForm(prev => ({
      ...prev,
      diensten: prev.diensten.includes(d)
        ? prev.diensten.filter(x => x !== d)
        : [...prev.diensten, d],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const lines = [
      'Hallo LAMAR, ik wil graag een offerte aanvragen.',
      '',
      `Naam: ${form.naam}`,
      `E-mail: ${form.email}`,
      `Telefoon: ${form.telefoon}`,
      `Woonplaats: ${form.woonplaats}`,
      `Soort bouw: ${form.soortBouw}`,
      `Gewenste diensten: ${form.diensten.join(', ')}`,
      form.oppervlakte ? `Oppervlakte: ${form.oppervlakte} m²` : '',
      form.startdatum ? `Gewenste startdatum: ${form.startdatum}` : '',
      form.opmerkingen ? `Opmerkingen: ${form.opmerkingen}` : '',
    ].filter(Boolean);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.naam,
          email: form.email,
          phone: form.telefoon,
          service: form.diensten.join(', '),
          message: lines.join('\n'),
        }),
      });
    } catch { /* ignore */ }

    const waUrl = `https://wa.me/31630302033?text=${encodeURIComponent(lines.join('\n'))}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  if (submitted) {
    return (
      <PageShell>
        <div style={{ maxWidth: 560, margin: '4rem auto', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--teal2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem',
          }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '1rem' }}>
            Aanvraag verzonden!
          </h2>
          <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'var(--font-outfit)' }}>
            Bedankt voor uw aanvraag. Wij streven ernaar om binnen <strong>één werkdag</strong> een passende offerte te sturen.
            WhatsApp wordt geopend zodat u eventuele foto&apos;s direct kunt meesturen.
          </p>
          <Link href="/" style={{
            background: 'var(--teal2)', color: '#000', padding: '0.9rem 2.5rem',
            borderRadius: 6, textDecoration: 'none', fontFamily: 'var(--font-archivo)',
            fontWeight: 800, fontSize: '0.95rem',
          }}>← Terug naar home</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <style>{`
        .of-input:focus { border-color: var(--teal2) !important; background: #fff !important; }
        .of-dienst:hover { border-color: var(--teal2) !important; }
        .of-submit:hover { filter: brightness(0.92); }
        select.of-input { appearance: auto; }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(255,217,53,0.12)', border: '1px solid rgba(255,217,53,0.35)',
          borderRadius: 50, padding: '0.35rem 1.1rem', marginBottom: '1rem',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal2)', display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal2)' }}>
            Vrijblijvend & Gratis
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-archivo)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#1a1a1a',
          lineHeight: 1.2, marginBottom: '0.75rem',
        }}>
          Offerte aanvragen
        </h1>
        <p style={{ color: '#555', fontSize: '1rem', fontFamily: 'var(--font-outfit)', lineHeight: 1.65, maxWidth: 560 }}>
          Vul het formulier in en ontvang binnen <strong>1 werkdag</strong> een vrijblijvende offerte op maat.
        </p>
      </div>

      {/* Main grid: form + sidebar */}
      <div className="of-grid">

        {/* ── LEFT: Form ── */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Section: Uw gegevens */}
          <div style={{
            background: '#fff', borderRadius: 12,
            padding: '2rem', border: '1px solid #eee',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.3rem', color: '#1a1a1a', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--teal2)', display: 'inline-block' }}>
              Uw gegevens
            </h2>

            <div className="of-two-col" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Voor- en achternaam *</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="text"
                  required
                  value={form.naam}
                  onChange={e => setForm(p => ({ ...p, naam: e.target.value }))}
                  placeholder="Jan de Vries"
                />
              </div>
              <div>
                <label style={labelStyle}>Woonplaats *</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="text"
                  required
                  value={form.woonplaats}
                  onChange={e => setForm(p => ({ ...p, woonplaats: e.target.value }))}
                  placeholder="Amsterdam"
                />
              </div>
            </div>

            <div className="of-two-col">
              <div>
                <label style={labelStyle}>E-mailadres *</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="jan@voorbeeld.nl"
                />
              </div>
              <div>
                <label style={labelStyle}>Telefoonnummer *</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="tel"
                  required
                  value={form.telefoon}
                  onChange={e => setForm(p => ({ ...p, telefoon: e.target.value }))}
                  placeholder="06 12345678"
                />
              </div>
            </div>
          </div>

          {/* Section: Werkzaamheden */}
          <div style={{
            background: '#fff', borderRadius: 12,
            padding: '2rem', border: '1px solid #eee',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.3rem', color: '#1a1a1a', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--teal2)', display: 'inline-block' }}>
              Werkzaamheden
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Soort bouw *</label>
              <select
                className="of-input"
                style={{ ...inputStyle, cursor: 'pointer' }}
                required
                value={form.soortBouw}
                onChange={e => setForm(p => ({ ...p, soortBouw: e.target.value }))}
              >
                <option value="">— Selecteer —</option>
                {SOORT_BOUW_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Van welke diensten wilt u gebruik maken? *</label>
              <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.75rem', fontFamily: 'var(--font-outfit)' }}>
                Meerdere opties mogelijk
              </p>
              <div className="of-diensten-grid">
                {DIENSTEN_OPTIONS.map(d => {
                  const checked = form.diensten.includes(d);
                  return (
                    <label
                      key={d}
                      className="of-dienst"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.75rem 1rem',
                        border: checked ? '2px solid var(--teal2)' : '1px solid #ddd',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: checked ? 'rgba(255,217,53,0.06)' : '#f9f9f9',
                        transition: 'border-color 0.2s, background 0.2s',
                        fontFamily: 'var(--font-outfit)',
                        fontSize: '0.9rem',
                        color: '#1a1a1a',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDienst(d)}
                        style={{ accentColor: 'var(--teal2)', width: 16, height: 16, flexShrink: 0 }}
                      />
                      {d}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="of-two-col">
              <div>
                <label style={labelStyle}>Oppervlakte (m²)</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="number"
                  min="0"
                  value={form.oppervlakte}
                  onChange={e => setForm(p => ({ ...p, oppervlakte: e.target.value }))}
                  placeholder="bijv. 45"
                />
              </div>
              <div>
                <label style={labelStyle}>Gewenste startdatum</label>
                <input
                  className="of-input"
                  style={inputStyle}
                  type="date"
                  value={form.startdatum}
                  onChange={e => setForm(p => ({ ...p, startdatum: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Section: Extra info */}
          <div style={{
            background: '#fff', borderRadius: 12,
            padding: '2rem', border: '1px solid #eee',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.3rem', color: '#1a1a1a', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--teal2)', display: 'inline-block' }}>
              Aanvullende informatie
            </h2>
            <label style={labelStyle}>Opmerkingen of bijzonderheden</label>
            <textarea
              className="of-input"
              style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
              value={form.opmerkingen}
              onChange={e => setForm(p => ({ ...p, opmerkingen: e.target.value }))}
              placeholder="Bijv. 'alleen de woonkamer', 'vochtproblemen aanwezig', extra info..."
            />

            {/* Privacy note */}
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.82rem', color: '#777', fontFamily: 'var(--font-outfit)' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>🔒</span>
              <span>Uw gegevens zijn veilig bij ons en worden uitsluitend gebruikt voor het opstellen van uw offerte.</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="of-submit"
            style={{
              background: 'var(--teal2)',
              color: '#000',
              padding: '1.1rem 2rem',
              borderRadius: 6,
              border: 'none',
              fontFamily: 'var(--font-archivo)',
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.75 : 1,
              transition: 'filter 0.2s',
              letterSpacing: '0.02em',
            }}
          >
            {loading ? 'Verzenden…' : '→ Offerte aanvragen'}
          </button>
        </form>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="of-sidebar" style={{ position: 'sticky', top: 80 }}>

          {/* How it works card */}
          <div style={{
            background: '#fff', borderRadius: 12, padding: '1.75rem',
            border: '1px solid #eee', boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '1rem' }}>
              Hoe werkt het?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.65, fontFamily: 'var(--font-outfit)', marginBottom: '1rem' }}>
              Door het formulier op deze pagina in te vullen, geeft u ons de benodigde informatie om een vrijblijvende offerte op maat te maken.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, fontFamily: 'var(--font-outfit)', marginBottom: '0.5rem' }}>
              <strong>Velden met een * zijn verplicht.</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, fontFamily: 'var(--font-outfit)', marginBottom: '0.5rem' }}>
              We streven ernaar om binnen <strong>één werkdag</strong> een passende offerte retour te sturen.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, fontFamily: 'var(--font-outfit)' }}>
              Soms is het nodig dat wij meer informatie nodig hebben. We nemen dan persoonlijk contact met u op voordat wij uw offerte retour sturen.
            </p>
          </div>

          {/* Steps */}
          <div style={{
            background: '#fff', borderRadius: 12, padding: '1.75rem',
            border: '1px solid #eee', boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '1.25rem' }}>
              Onze werkwijze
            </h3>
            {[
              { step: '1', title: 'Aanvraag indienen', desc: 'Vul het formulier in — duurt minder dan 2 minuten.' },
              { step: '2', title: 'Offerte ontvangen', desc: 'Binnen 1 werkdag ontvangt u een heldere offerte.' },
              { step: '3', title: 'Klus uitvoeren', desc: 'Na akkoord plannen we samen een startdatum in.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--teal2)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontFamily: 'var(--font-archivo)',
                  fontWeight: 800, fontSize: '0.85rem', color: '#000',
                }}>{s.step}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a', marginBottom: '0.2rem' }}>{s.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#777', fontFamily: 'var(--font-outfit)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Liever anders doen */}
          <div style={{
            background: '#1a1a1a', borderRadius: 12, padding: '1.75rem',
            color: '#fff',
          }}>
            <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
              Liever anders doen?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontFamily: 'var(--font-outfit)', marginBottom: '1.25rem' }}>
              Heeft u vragen of wilt u direct iemand spreken?
            </p>
            <a
              href="https://wa.me/31630302033"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--teal2)', color: '#000',
                padding: '0.8rem 1.5rem', borderRadius: 6,
                textDecoration: 'none', fontFamily: 'var(--font-archivo)',
                fontWeight: 800, fontSize: '0.9rem',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Vraag via WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .of-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 2rem; align-items: start; }
        .of-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .of-diensten-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
        .of-sidebar { position: sticky; top: 80px; }
        .of-header-band { padding: 4rem 3.5rem 3rem; }
        .of-main { padding: 3rem 1.5rem 6rem; }
        @media (max-width: 1023px) {
          .of-grid { grid-template-columns: 1fr !important; }
          .of-two-col { grid-template-columns: 1fr 1fr !important; }
          .of-sidebar { position: static !important; top: auto !important; }
          .of-header-band { padding: 3rem 1.5rem 2.5rem !important; }
        }
        @media (max-width: 767px) {
          .of-grid { grid-template-columns: 1fr !important; }
          .of-two-col { grid-template-columns: 1fr !important; }
          .of-diensten-grid { grid-template-columns: 1fr 1fr !important; }
          .of-sidebar { position: static !important; top: auto !important; }
          .of-header-band { padding: 2.5rem 1.25rem 2rem !important; }
          .of-main { padding: 2rem 1.25rem 4rem !important; }
        }
        @media (max-width: 480px) {
          .of-diensten-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        {/* Page header band */}
        <div className="of-header-band" style={{
          background: '#1a1a1a',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-outfit)' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: 'var(--teal2)' }}>Offerte aanvragen</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-archivo)', fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff',
              lineHeight: 1.1, marginBottom: '0.75rem',
            }}>
              Vrijblijvende offerte<br />
              <span style={{ color: 'var(--teal2)' }}>aanvragen</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-outfit)', fontSize: '1rem', lineHeight: 1.6, maxWidth: 500 }}>
              Vul het formulier in en ontvang binnen 1 werkdag een heldere offerte op maat — gratis en vrijblijvend.
            </p>
          </div>
        </div>

        {/* Content area */}
        <main className="of-main" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </>
  );
}
