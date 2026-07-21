import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ServiceGroupSection, { ServiceItem } from '@/components/public/ServiceGroupSection';
import ProjectsSlider from '@/components/public/ProjectsSlider';
import WhyChooseUsSection from '@/components/public/WhyChooseUsSection';
import HomeContactForm from '@/components/public/HomeContactForm';
import Footer from '@/components/public/Footer';
import RevealObserver from '@/components/public/RevealObserver';
import FAQSection from '@/components/public/FAQSection';
import { getSiteText } from '@/lib/siteText';
import { getContentMany } from '@/lib/content';

export const revalidate = 3600;

export default async function Home() {
  const lang = 'nl' as const;

  // ── Section images from admin → Afbeeldingen ─────────────────────────────
  const imgMap = await getContentMany([
    'images:home:stukadoorswerk',
    'images:home:schilderwerk',
  ]).catch(() => ({} as Record<string, string>))

  let stucImages: string[] = []
  let schilderImages: string[] = []
  try { stucImages    = JSON.parse(imgMap['images:home:stukadoorswerk'] || '[]') } catch { /**/ }
  try { schilderImages = JSON.parse(imgMap['images:home:schilderwerk']  || '[]') } catch { /**/ }

  // ─────────────────────────────────────────────────────────────────────────

  const stucwerkServices: ServiceItem[] = [
    { title: 'Stucwerk', price: 'Vanaf €16 m²', href: '/diensten/stucwerk' },
    { title: 'Dunpleister', price: 'Vanaf €12 m²', href: '/diensten/dunpleister' },
    { title: 'Reparatiewerk', price: 'Vanaf €250', href: '/diensten/reparatiewerk' },
  ];

  const schilderwerkServices: ServiceItem[] = [
    { title: 'Schilderwerk', price: 'Vanaf €11 m²', href: '/diensten/schilderwerk' },
    { title: 'Latex spuiten', price: 'Vanaf €11 m²', href: '/diensten/latex-spuiten' },
    { title: 'Schilderwerk (hout)', price: 'Prijs per object', href: '/diensten/schilderwerk-hout' },
  ];

  return (
    <>
      <Navbar lang={lang} />
      <main>
        <HeroSection lang={lang} />
        
        {/* Real Review Bar (Using Testimonials) — معطّلة مؤقتاً، يمكن للمالك تفعيلها */}
        {/* <TestimonialsSection lang={lang} /> */}

        {/* Service Section 1 */}
        <ServiceGroupSection 
          heading="Stukadoorswerk" 
          subheading="Strakke wanden en plafonds, perfect afgewerkt."
          services={stucwerkServices}
          sectionImages={stucImages}
        />

        {/* Service Section 2 */}
        <ServiceGroupSection 
          heading="Schilderwerk" 
          subheading="Kwalitatief schilderwerk voor binnen en buiten."
          services={schilderwerkServices}
          sectionImages={schilderImages}
        />

        {/* Portfolio Section */}
        <ProjectsSlider lang={lang} />

        {/* Review Bar — تم حذف النسخة المكررة */}

        {/* Why Choose Us — after portfolio */}
        <WhyChooseUsSection />

        {/* FAQ Accordion */}
        <FAQSection lang={lang} />

        {/* Offerte aanvraag Form */}
        <HomeContactForm />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}