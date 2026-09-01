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
import { t } from '@/lib/i18n';

export const revalidate = 3600;

export default async function Home() {
  const lang = 'nl' as const;
  const tx = await getSiteText();

  const faqHeading = tx('home_faq_heading') || undefined;
  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    q: tx(`home_faq_q${i}`) || t[lang].faq.items[i - 1]?.q || '',
    a: tx(`home_faq_a${i}`) || t[lang].faq.items[i - 1]?.a || '',
  }));

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
    { title: tx('home_services_stuc_card1_title') || 'Stucwerk',      price: tx('home_services_stuc_card1_price') || 'Vanaf €16 m²', href: '/diensten/stucwerk' },
    { title: tx('home_services_stuc_card2_title') || 'Dunpleister',   price: tx('home_services_stuc_card2_price') || 'Vanaf €12 m²', href: '/diensten/dunpleister' },
    { title: tx('home_services_stuc_card3_title') || 'Reparatiewerk', price: tx('home_services_stuc_card3_price') || 'Vanaf €250',       href: '/diensten/reparatiewerk' },
  ];

  const schilderwerkServices: ServiceItem[] = [
    { title: tx('home_services_schilder_card1_title') || 'Schilderwerk',       price: tx('home_services_schilder_card1_price') || 'Vanaf €11 m²', href: '/diensten/schilderwerk' },
    { title: tx('home_services_schilder_card2_title') || 'Latex spuiten',      price: tx('home_services_schilder_card2_price') || 'Vanaf €11 m²', href: '/diensten/latex-spuiten' },
    { title: tx('home_services_schilder_card3_title') || 'Schilderwerk (hout)', price: tx('home_services_schilder_card3_price') || 'Prijs per object',    href: '/diensten/schilderwerk-hout' },
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
          heading={tx('home_services_stuc_heading') || 'Stukadoorswerk'} 
          subheading={tx('home_services_stuc_sub') || 'Strakke wanden en plafonds, perfect afgewerkt.'}
          services={stucwerkServices} 
          startIndex={0}
          images={stucImages}
        />

        {/* Service Section 2 */}
        <ServiceGroupSection 
          heading={tx('home_services_schilder_heading') || 'Schilderwerk'} 
          subheading={tx('home_services_schilder_sub') || 'Kwalitatief schilderwerk voor binnen en buiten.'}
          services={schilderwerkServices} 
          startIndex={3}
          images={schilderImages}
        />

        {/* Portfolio Section */}
        <ProjectsSlider lang={lang} />

        {/* Review Bar — تم حذف النسخة المكررة */}

        {/* Why Choose Us — after portfolio */}
        <WhyChooseUsSection
          pill={tx('home_whychooseus_pill') || undefined}
          headingA={tx('home_whychooseus_heading_a') || undefined}
          headingB={tx('home_whychooseus_heading_b') || undefined}
          sub={tx('home_whychooseus_sub') || undefined}
          cards={[
            { title: tx('home_whychooseus_card1_title') || 'Betrouwbaarheid', text: tx('home_whychooseus_card1_text') || 'Wij houden ons altijd aan onze beloften — met eerlijkheid, verantwoordelijkheid en respect voor uw rechten.' },
            { title: tx('home_whychooseus_card2_title') || 'Initiatief',       text: tx('home_whychooseus_card2_text') || 'De geest van initiatief drijft ons team aan — snelle actie, voortdurende innovatie en het benutten van duurzame kansen.' },
            { title: tx('home_whychooseus_card3_title') || 'Kwaliteit',        text: tx('home_whychooseus_card3_text') || 'Wij realiseren kwaliteit op de hoogste standaard — met precisie, vakmanschap en toewijding aan de technische normen.' },
            { title: tx('home_whychooseus_card4_title') || 'Klantgerichtheid', text: tx('home_whychooseus_card4_text') || 'Uw tevredenheid staat centraal. Wij luisteren naar uw wensen en zorgen voor een persoonlijke aanpak bij elk project.' },
          ]}
        />

        {/* FAQ Accordion */}
        <FAQSection lang={lang} heading={faqHeading} items={faqItems} />

        {/* Offerte aanvraag Form */}
        <HomeContactForm
          heading={tx('home_quoteform_heading') || undefined}
          sub={tx('home_quoteform_sub') || undefined}
          badge={tx('home_quoteform_badge') || undefined}
          feat1Plain={tx('home_quoteform_feat1_plain') || undefined}
          feat1Bold={tx('home_quoteform_feat1_bold') || undefined}
          feat2Plain={tx('home_quoteform_feat2_plain') || undefined}
          feat2Bold={tx('home_quoteform_feat2_bold') || undefined}
          feat3Plain={tx('home_quoteform_feat3_plain') || undefined}
          feat3Bold={tx('home_quoteform_feat3_bold') || undefined}
        />
      </main>
      <Footer lang={lang} />
      <RevealObserver />
    </>
  );
}