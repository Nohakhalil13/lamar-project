import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/servicesData';
import { getContent } from '@/lib/content';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import Link from 'next/link';
import PageHeader from '@/components/public/PageHeader';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const lang = 'nl' as const;

  // ── Images from admin → Afbeeldingen → Diensten ────────────────────────
  let dienstImages: string[] = [];
  try {
    const raw = await getContent(`images:dienst:${service.slug}`, '[]');
    dienstImages = JSON.parse(raw);
  } catch { /**/ }

  // Use DB images if available, fall back to static servicesData
  const galleryImages = dienstImages.length > 0 ? dienstImages : service.gallery;
  const headerImage   = dienstImages[0] || service.whatIsIt?.image || '/images/PHOTO-2024-01-06-19-24-18.jpg';
  // ─────────────────────────────────────────────────────────────────────────

  // Use the service's whatIsIt image or fallback to a default
  const bgImage = headerImage;

  return (
    <>
      <Navbar lang={lang} />
      
      <PageHeader 
        title={service.title}
        bgImage={bgImage}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: service.title }
        ]}
        priceBadge={service.price.replace('Vanaf ', '').trim()}
      />

      <main style={{ background: 'var(--bg)' }}>

        {/* Intro */}
        <section style={{ padding: '3rem 1.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <p style={{ maxWidth: 800, margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--white2)', fontFamily: 'var(--font-outfit)', textAlign: 'center' }}>
            {service.intro}
          </p>
        </section>

        {/* Wat is het? */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2rem', color: 'var(--white)', marginBottom: '1.5rem' }}>
                {service.whatIsIt.title}
              </h2>
              <p style={{ color: 'var(--white2)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: 'var(--font-outfit)' }}>
                {service.whatIsIt.text}
              </p>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={headerImage} alt={service.whatIsIt.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* Voordelen (Benefits) */}
        <section style={{ padding: '5rem 1.5rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--white)', textAlign: 'center', marginBottom: '3rem' }}>
              Voordelen van {service.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {service.benefits.map((b, i) => (
                <div key={i} style={{ background: 'var(--bg)', padding: '2rem', borderRadius: 16, border: '1px solid var(--border)' }}>
                  <div style={{ width: 40, height: 40, background: 'var(--teal)', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'var(--font-archivo)' }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.75rem' }}>{b.title}</h3>
                  <p style={{ color: 'var(--white2)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0, fontFamily: 'var(--font-outfit)' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waarom Lamar (Why choose us) */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--white)', marginBottom: '2rem' }}>
              Waarom kiezen voor Lamar?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', textAlign: 'left' }}>
              {service.whyLamar.map((reason, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1.1rem', color: 'var(--white2)', fontFamily: 'var(--font-outfit)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section style={{ padding: '5rem 1.5rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--white)', textAlign: 'center', marginBottom: '3rem' }}>
              Projecten
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {galleryImages.map((img, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${service.title} project`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--white)', textAlign: 'center', marginBottom: '3rem' }}>
              Veelgestelde Vragen
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.faq.map((faq, i) => (
                <details key={i} style={{ background: 'var(--bg2)', padding: '1.5rem', borderRadius: 12, border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <summary style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', outline: 'none', listStyle: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {faq.q}
                      <span style={{ color: 'var(--teal)' }}>+</span>
                    </div>
                  </summary>
                  <p style={{ marginTop: '1rem', color: 'var(--white2)', lineHeight: 1.6, fontFamily: 'var(--font-outfit)', fontSize: '0.95rem' }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '6rem 1.5rem', background: 'var(--teal)', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginBottom: '1.5rem' }}>
              Klaar om te beginnen?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'var(--font-outfit)' }}>
              Vraag vandaag nog een vrijblijvende offerte aan voor {service.title.toLowerCase()}.
            </p>
            <Link href="/offerte-aanvragen" style={{ background: '#fff', color: 'var(--teal)', padding: '1rem 2.5rem', borderRadius: 4, fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block' }}>
              Offerte Aanvragen
            </Link>
          </div>
        </section>

      </main>
      
      <Footer lang={lang} />
    </>
  );
}
