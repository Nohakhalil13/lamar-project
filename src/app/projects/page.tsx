import { prisma } from '@/lib/prisma'
import { t } from '@/lib/i18n'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import Link from 'next/link'
import PageHeader from '@/components/public/PageHeader'
import { staticProjects } from '@/lib/staticProjects'

export const revalidate = 3600

export const metadata = {
  title: 'Portfolio | LAMAR Stukadoor en Onderhoud',
  description: 'Een selectie van afgeronde stukadoors-, afwerkings- en renovatieprojecten van LAMAR door heel Nederland.',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const lang = 'nl' as const
  const tr = t[lang].projectsPage

  const dbProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: {
      images: { orderBy: { order: 'asc' }, take: 1 },
      _count: { select: { images: true } },
    },
  }).catch(() => [])

  // Use DB projects if available, otherwise fall back to static local images
  const useStatic = dbProjects.length === 0

  return (
    <>
      <Navbar lang={lang} />

      <PageHeader
        title="PORTFOLIO"
        bgImage="/images/Sausklaar-Stucwerk-1.webp"
        quote={{
          text: "Aanrader! Geweldige kwaliteit stuc- en schilderwerk. Reageert snel, op alle vragen en is flexibel. Hele goede prijs-kwaliteit verhouding. Ik zou zeker terugkomen!",
          author: "Maureen"
        }}
      />

      <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Tip bar */}
        <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--white2)', fontFamily: 'var(--font-outfit)', margin: 0 }}>
              <strong style={{ color: 'var(--white)' }}>Tip:</strong> Om de kwaliteit van de afbeelding te verhogen raden wij u aan om erop te klikken.
            </p>
          </div>
        </section>

        {/* Section header */}
        <section style={{ padding: '4rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--white)', marginBottom: '0.75rem' }}>
              Projecten
            </h2>
            <div style={{ width: 60, height: 4, background: 'var(--emerald)', margin: '0 auto 1.5rem', borderRadius: 2 }} />
            <p style={{ color: 'var(--white2)', fontSize: '1rem', lineHeight: 1.7, fontFamily: 'var(--font-outfit)' }}>
              Op Google kunt u onze reviews terugvinden. Daar staan de werkzaamheden die wij in het verleden hebben verricht, samen met de referenties van onze opdrachtgevers.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: '1rem 1.5rem 6rem' }}>
          {useStatic ? (
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {staticProjects.map((project) => (
                <div
                  key={project.id}
                  style={{ borderRadius: 12, overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
                  className="project-card"
                >
                  {/* Multi-image strip: large left + 2 small right */}
                  <div style={{ display: 'grid', gridTemplateColumns: project.images.length >= 2 ? '2fr 1fr' : '1fr', gap: 2, height: 220, overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.images[0]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {project.images.length >= 2 && (
                      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }}>
                        {project.images[1] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={project.images[1]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        )}
                        {project.images[2] && (
                          <div style={{ position: 'relative', overflow: 'hidden' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.images[2]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            {project.images.length > 3 && (
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.1rem' }}>
                                +{project.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.4rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--white2)', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-outfit)' }}>
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {dbProjects.map((project) => {
                const cover = project.coverImageUrl ?? project.images[0]?.url ?? null
                const count = project._count.images
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block', borderRadius: 12, overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
                    className="project-card"
                  >
                    <div style={{ height: 220, background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt={project.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} className="project-cover-img" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--white2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                      {count > 0 && (
                        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(12,12,10,0.75)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.65rem', borderRadius: 4, fontSize: '0.65rem', letterSpacing: '0.1em', color: '#fff', fontFamily: 'var(--font-archivo)' }}>
                          {count} foto&apos;s
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--white)', marginBottom: '0.5rem' }}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--white2)', lineHeight: 1.65, fontWeight: 300, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'var(--font-outfit)' }}>
                          {project.description}
                        </p>
                      )}
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--emerald)', fontFamily: 'var(--font-archivo)', fontWeight: 600 }}>
                        {tr.viewProject} →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: '5rem 1.5rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--white)', marginBottom: '1rem' }}>
              Wil jij ook zulk werk?
            </h2>
            <p style={{ color: 'var(--white2)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'var(--font-outfit)' }}>
              Vraag vandaag nog een vrijblijvende offerte aan. Wij reageren binnen 24 uur.
            </p>
            <Link
              href="/offerte-aanvragen"
              className="btn-emerald"
              style={{
                background: 'var(--emerald)',
                color: '#FFFFFF',
                padding: '0.9rem 2.5rem',
                borderRadius: 6,
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-outfit)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            >
              Offerte aanvragen →
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />

      <style>{`
        .project-card:hover {
          border-color: rgba(46, 90, 68, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .project-card:hover .project-cover-img {
          transform: scale(1.05);
        }
        .btn-emerald:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}