import { getContentMany } from '@/lib/content'
import { getSiteText } from '@/lib/siteText'
import ContactForm from './ContactForm'
import { t, type Lang } from '@/lib/i18n'

export default async function ContactPageSection({ lang }: { lang: Lang }) {
  const tr = t[lang]
  const tx = await getSiteText()
  const c = await getContentMany([
    'contact_phone', 'contact_email', 'whatsapp_number',
    'contact_name', 'contact_city', 'contact_location',
  ])

  const phone   = c['contact_phone']    || '06 30302033'
  const email   = c['contact_email']    || 'lamarstukadoor@gmail.com'
  const wa      = c['whatsapp_number']  || '31630302033'
  const name    = c['contact_name']     || 'LAMAR Stukadoor en Onderhoud'
  const city    = c['contact_city']     || 'Heel Nederland'
  const address = c['contact_location'] || 'Geurdeland 17 g, 6673 DR Andelst'
  const phoneHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const waHref    = `https://wa.me/${wa}`

  const formTr = {
    nameLbl: 'Naam',            namePh: 'Uw volledige naam',
    phoneLbl: 'Telefoonnummer', phonePh: '+31 6 ...',
    emailLbl: 'E-mailadres',    emailPh: 'uw@email.nl',
    serviceLbl: 'Gewenste dienst', servicePh: 'bijv. Stucwerk, Schilderwerk...',
    messageLbl: 'Bericht',     messagePh: 'Beschrijf uw project of vraag...',
    send: 'VERSTUUR BERICHT',  sending: 'Versturen...',
    successTitle: 'Bericht ontvangen!',
    successMsg: 'We nemen zo snel mogelijk contact met u op. Bedankt voor uw bericht.',
  }

  return (
    <>
      {/* ── HERO CONTACT STRIP ──────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        padding: '4rem 1.5rem',
        borderBottom: '3px solid var(--teal2)',
      }}>
        <div className="rv" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Phone */}
            <a href={phoneHref} className="contact-hero-card" style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '1.5rem 1.75rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}>
              <span style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'var(--teal2)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.94 19.79 19.79 0 0 1 1.06 3.31 2 2 0 0 1 3.04 1.11h3a2 2 0 0 1 2 1.72c.127.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-archivo)', marginBottom: 3 }}>Bel ons</div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{phone}</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="contact-hero-card" style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              background: 'rgba(37,211,102,0.12)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: 16, padding: '1.5rem 1.75rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}>
              <span style={{
                width: 50, height: 50, borderRadius: '50%',
                background: '#25D366', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-archivo)', marginBottom: 3 }}>WhatsApp</div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1rem', color: '#25D366' }}>Snel antwoord</div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${email}`} className="contact-hero-card" style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '1.5rem 1.75rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}>
              <span style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'var(--teal2)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-archivo)', marginBottom: 3 }}>E-mail</div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', wordBreak: 'break-all' }}>{email}</div>
              </div>
            </a>

            {/* Hours */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '1.5rem 1.75rem',
            }}>
              <span style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'rgba(255,217,53,0.15)', border: '1px solid rgba(255,217,53,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-archivo)', marginBottom: 3 }}>Beschikbaar</div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Ma–Vr · 07:00–18:00</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Za · 09:00–14:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN SECTION: Form + Info ──────────────────────────── */}
      <section
        id="contact-main"
        style={{ background: 'var(--bg)', padding: '6rem 1.5rem' }}
      >
        <div
          className="rv"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)',
            gap: '3.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* ── LEFT: Contact Form ───────────────────────────── */}
          <div
            className="rv"
            style={{
              background: 'var(--bg)',
              borderRadius: 20,
              padding: '3rem 2.5rem',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
            }}
          >
            {/* Section label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,217,53,0.12)', border: '1px solid rgba(255,217,53,0.3)',
              borderRadius: 50, padding: '0.35rem 1rem', marginBottom: '1.5rem',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal2)', display: 'block' }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal2)' }}>
                Stuur een bericht
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-archivo)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                color: 'var(--white)',
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}
            >
              Hoe kunnen wij <span style={{ color: 'var(--teal2)' }}>u helpen?</span>
            </h2>
            <p
              style={{
                color: 'var(--white2)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-outfit)',
              }}
            >
              Vul het formulier in — wij reageren <strong>binnen één werkdag</strong>.
            </p>

            <ContactForm tr={formTr} />
          </div>

          {/* ── RIGHT: Info Cards ────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Contact details card */}
            <div
              className="rv d1"
              style={{
                background: '#1A1A1A',
                borderRadius: 20,
                padding: '2.5rem 2rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem',
              }}>
                <div style={{ width: 36, height: 36, background: 'var(--teal2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  Contactgegevens
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: 'Naam', value: name },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Werkgebied', value: city },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Adres', value: address },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div style={{ marginTop: 2, flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,217,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-archivo)', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp card */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rv d2 contact-wa-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'linear-gradient(135deg, #1ebe5d 0%, #25D366 100%)',
                borderRadius: 20,
                padding: '1.75rem 2rem',
                textDecoration: 'none',
                transition: 'transform 0.25s, box-shadow 0.25s',
                boxShadow: '0 8px 30px rgba(37,211,102,0.2)',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>Direct via WhatsApp</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>Snel antwoord gegarandeerd ✓</div>
              </div>
              <svg style={{ marginLeft: 'auto' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Response time card */}
            <div
              className="rv d3"
              style={{
                background: 'var(--bg2)',
                borderRadius: 20,
                padding: '1.75rem 2rem',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--white)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Beschikbaarheid
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { day: 'Maandag – Vrijdag', hours: '07:00 – 18:00', open: true },
                  { day: 'Zaterdag',          hours: '09:00 – 14:00', open: true },
                  { day: 'Zondag',            hours: 'Gesloten',      open: false },
                ].map(({ day, hours, open }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.88rem', color: 'var(--white2)' }}>{day}</span>
                    <span style={{
                      fontFamily: 'var(--font-outfit)', fontSize: '0.88rem', fontWeight: 600,
                      color: open ? 'var(--white)' : 'var(--white3)',
                      background: open ? 'rgba(255,217,53,0.1)' : 'transparent',
                      padding: open ? '0.2rem 0.6rem' : '0',
                      borderRadius: 4,
                    }}>{hours}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem', background: 'rgba(255,217,53,0.08)', borderRadius: 8,
                border: '1px solid rgba(255,217,53,0.2)',
              }}>
                <span style={{ fontSize: '0.75rem' }}>⚡</span>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', color: 'var(--teal2)', fontWeight: 600 }}>
                  Reactietijd: binnen 1 werkdag
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAPS ────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div className="rv" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: 'var(--white)', marginBottom: '0.5rem' }}>
              Ons werkgebied
            </h2>
            <p style={{ fontFamily: 'var(--font-outfit)', color: 'var(--white2)', fontSize: '0.95rem' }}>
              Wij zijn actief door heel Nederland — van Amsterdam tot Nijmegen.
            </p>
          </div>
          <div className="rv d1" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', height: 420 }}>
            <iframe
              title="LAMAR werkgebied kaart"
              src="https://maps.google.com/maps?q=Geurdeland+17+g+6673+DR+Andelst+Netherlands&output=embed&z=12"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,217,53,0.3) !important;
          background: rgba(255,217,53,0.06) !important;
        }
        .contact-wa-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(37,211,102,0.35) !important;
        }
        @media (max-width: 900px) {
          #contact-main > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
