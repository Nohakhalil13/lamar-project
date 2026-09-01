import { cache } from 'react'
import { getContentMany } from '@/lib/content'
import { t } from '@/lib/i18n'

const nl = t.nl

/**
 * Registry of admin-editable homepage copy. Each field stores an override in
 * the Content table under `key`; when empty the hard-coded `fallback` (from the
 * i18n file) is used. The admin "Texts" page renders these groups generically,
 * so adding a new editable phrase is just a new entry here.
 *
 * Labels are English (admin language) with the Dutch term in parentheses so the
 * Dutch client knows which piece of site copy each field maps to. `anchor` is
 * the homepage section id used by the "View on site" preview links.
 */
export type TextField = { key: string; label: string; fallback: string; multiline?: boolean }
export type TextGroup = { id: string; label: string; anchor: string; fields: TextField[] }

// Generated, index-aligned fields for the repeating list sections so they stay
// in sync with the i18n source arrays.
const benefitItemFields: TextField[] = nl.benefits.items.flatMap((it, i) => [
  { key: `home_benefits_item${i + 1}_title`, label: `Benefit ${i + 1} — title (Voordeel ${i + 1})`, fallback: it.title },
  { key: `home_benefits_item${i + 1}_text`, label: `Benefit ${i + 1} — text`, fallback: it.text, multiline: true },
])

const processStepFields: TextField[] = nl.werkwijze.steps.map((s, i) => ({
  key: `home_process_step${i + 1}`,
  label: `Step ${i + 1} — title (Stap ${i + 1})`,
  fallback: s.title,
}))

const faqFields: TextField[] = nl.faq.items.flatMap((it, i) => [
  { key: `home_faq_q${i + 1}`, label: `Question ${i + 1} (Vraag ${i + 1})`, fallback: it.q },
  { key: `home_faq_a${i + 1}`, label: `Answer ${i + 1} (Antwoord ${i + 1})`, fallback: it.a, multiline: true },
])

const contactCardFields: TextField[] = nl.contactCards.cards.flatMap((card, i) => [
  { key: `home_contact_card${i + 1}_title`, label: `Card ${i + 1} — title (Kaart ${i + 1})`, fallback: card.title },
  { key: `home_contact_card${i + 1}_text`, label: `Card ${i + 1} — text`, fallback: card.text, multiline: true },
  { key: `home_contact_card${i + 1}_btn`, label: `Card ${i + 1} — button (Knop)`, fallback: card.btn },
])

export const TEXT_GROUPS: TextGroup[] = [
  {
    id: 'hero',
    label: 'Hero — top of the homepage (Hero)',
    anchor: '#hero',
    fields: [
      { key: 'home_hero_headline_a', label: 'Title — line 1 (Titel)', fallback: nl.hero.headlineA },
      { key: 'home_hero_headline_b', label: 'Title — line 2, accent colour (Titel accent)', fallback: nl.hero.headlineB },
      { key: 'home_hero_headline_c', label: 'Title — line 3 (Titel regel 3)', fallback: nl.hero.h1c },
      { key: 'home_hero_sub', label: 'Subtext (Subtekst)', fallback: nl.hero.sub, multiline: true },
      { key: 'home_hero_trust', label: 'Rating badge (Beoordelings-badge)', fallback: nl.hero.trustBadge },
      { key: 'home_hero_cta_quote', label: 'Quote button (Knop offerte)', fallback: nl.hero.quoteCta },
      { key: 'home_hero_cta_process', label: 'Process button (Knop werkwijze)', fallback: nl.hero.processCta },
    ],
  },
  {
    id: 'services_stuc',
    label: 'Stukadoorswerk section (Stukadoorswerk-sectie)',
    anchor: '#stukadoorswerk',
    fields: [
      { key: 'home_services_stuc_heading', label: 'Section title (Sectietitel)', fallback: 'Stukadoorswerk' },
      { key: 'home_services_stuc_sub', label: 'Section subtext (Sectiesubtekst)', fallback: 'Strakke wanden en plafonds, perfect afgewerkt.' },
      { key: 'home_services_stuc_card1_title', label: 'Card 1 — title (Kaart 1 titel)', fallback: 'Stucwerk' },
      { key: 'home_services_stuc_card1_price', label: 'Card 1 — price (Kaart 1 prijs)', fallback: 'Vanaf \u20ac16 m\u00b2' },
      { key: 'home_services_stuc_card2_title', label: 'Card 2 — title (Kaart 2 titel)', fallback: 'Dunpleister' },
      { key: 'home_services_stuc_card2_price', label: 'Card 2 — price (Kaart 2 prijs)', fallback: 'Vanaf \u20ac12 m\u00b2' },
      { key: 'home_services_stuc_card3_title', label: 'Card 3 — title (Kaart 3 titel)', fallback: 'Reparatiewerk' },
      { key: 'home_services_stuc_card3_price', label: 'Card 3 — price (Kaart 3 prijs)', fallback: 'Vanaf \u20ac250' },
    ],
  },
  {
    id: 'services_schilder',
    label: 'Schilderwerk section (Schilderwerk-sectie)',
    anchor: '#schilderwerk',
    fields: [
      { key: 'home_services_schilder_heading', label: 'Section title (Sectietitel)', fallback: 'Schilderwerk' },
      { key: 'home_services_schilder_sub', label: 'Section subtext (Sectiesubtekst)', fallback: 'Kwalitatief schilderwerk voor binnen en buiten.' },
      { key: 'home_services_schilder_card1_title', label: 'Card 1 — title (Kaart 1 titel)', fallback: 'Schilderwerk' },
      { key: 'home_services_schilder_card1_price', label: 'Card 1 — price (Kaart 1 prijs)', fallback: 'Vanaf \u20ac11 m\u00b2' },
      { key: 'home_services_schilder_card2_title', label: 'Card 2 — title (Kaart 2 titel)', fallback: 'Latex spuiten' },
      { key: 'home_services_schilder_card2_price', label: 'Card 2 — price (Kaart 2 prijs)', fallback: 'Vanaf \u20ac11 m\u00b2' },
      { key: 'home_services_schilder_card3_title', label: 'Card 3 — title (Kaart 3 titel)', fallback: 'Schilderwerk (hout)' },
      { key: 'home_services_schilder_card3_price', label: 'Card 3 — price (Kaart 3 prijs)', fallback: 'Prijs per object' },
    ],
  },
  {
    id: 'whychooseus',
    label: 'Why Choose Us (Waarom kiezen voor ons)',
    anchor: '#why-choose-us',
    fields: [
      { key: 'home_whychooseus_pill',       label: 'Pill label (Pill-tekst)',         fallback: 'Waarom kiezen voor ons?' },
      { key: 'home_whychooseus_heading_a',  label: 'Title — plain part (Titel)',      fallback: 'Onze waarden zijn de' },
      { key: 'home_whychooseus_heading_b',  label: 'Title — accent part (Titel accent)', fallback: 'kern van ons succes' },
      { key: 'home_whychooseus_sub',        label: 'Subtext (Subtekst)',              fallback: 'Bij Lamar hechten wij grote waarde aan eerlijkheid, kwaliteit en persoonlijk contact — in elk project dat wij uitvoeren.', multiline: true },
      { key: 'home_whychooseus_card1_title', label: 'Card 1 — title (Kaart 1 titel)', fallback: 'Betrouwbaarheid' },
      { key: 'home_whychooseus_card1_text',  label: 'Card 1 — text (Kaart 1 tekst)',  fallback: 'Wij houden ons altijd aan onze beloften — met eerlijkheid, verantwoordelijkheid en respect voor uw rechten.', multiline: true },
      { key: 'home_whychooseus_card2_title', label: 'Card 2 — title (Kaart 2 titel)', fallback: 'Initiatief' },
      { key: 'home_whychooseus_card2_text',  label: 'Card 2 — text (Kaart 2 tekst)',  fallback: 'De geest van initiatief drijft ons team aan — snelle actie, voortdurende innovatie en het benutten van duurzame kansen.', multiline: true },
      { key: 'home_whychooseus_card3_title', label: 'Card 3 — title (Kaart 3 titel)', fallback: 'Kwaliteit' },
      { key: 'home_whychooseus_card3_text',  label: 'Card 3 — text (Kaart 3 tekst)',  fallback: 'Wij realiseren kwaliteit op de hoogste standaard — met precisie, vakmanschap en toewijding aan de technische normen.', multiline: true },
      { key: 'home_whychooseus_card4_title', label: 'Card 4 — title (Kaart 4 titel)', fallback: 'Klantgerichtheid' },
      { key: 'home_whychooseus_card4_text',  label: 'Card 4 — text (Kaart 4 tekst)',  fallback: 'Uw tevredenheid staat centraal. Wij luisteren naar uw wensen en zorgen voor een persoonlijke aanpak bij elk project.', multiline: true },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp section (WhatsApp-sectie)',
    anchor: '#how-it-works',
    fields: [
      { key: 'home_whatsapp_heading', label: 'Title (Titel)', fallback: nl.chat.heading },
      { key: 'home_whatsapp_heading_accent', label: 'Title — accent word (Titel accent)', fallback: nl.chat.headingTeal },
    ],
  },
  {
    id: 'process',
    label: 'Process (Werkwijze)',
    anchor: '#process',
    fields: [
      { key: 'home_process_heading_a', label: 'Title — line 1 (Titel)', fallback: nl.werkwijze.headingA },
      { key: 'home_process_heading_b', label: 'Title — line 2', fallback: nl.werkwijze.headingB },
      { key: 'home_process_heading_accent', label: 'Title — accent word', fallback: nl.werkwijze.headingAccent },
      { key: 'home_process_sub', label: 'Subtext (Subtekst)', fallback: nl.werkwijze.sub, multiline: true },
      ...processStepFields,
    ],
  },
  {
    id: 'benefits',
    label: 'Benefits (Voordelen)',
    anchor: '#benefits',
    fields: [
      { key: 'home_benefits_heading_a', label: 'Title — part 1 (Titel)', fallback: nl.benefits.headingA },
      { key: 'home_benefits_heading_accent', label: 'Title — accent word', fallback: nl.benefits.headingAccent },
      { key: 'home_benefits_heading_b', label: 'Title — part 2', fallback: nl.benefits.headingB },
      { key: 'home_benefits_sub', label: 'Subtext (Subtekst)', fallback: nl.benefits.sub, multiline: true },
      ...benefitItemFields,
    ],
  },
  {
    id: 'testimonials',
    label: 'Reviews (Beoordelingen)',
    anchor: '#testimonials',
    fields: [
      { key: 'home_testimonials_heading', label: 'Title (Titel)', fallback: nl.testimonials.heading },
      { key: 'home_testimonials_heading_accent', label: 'Title — accent word', fallback: nl.testimonials.headingTeal },
      { key: 'home_testimonials_sub', label: 'Subtext (Subtekst)', fallback: nl.testimonials.sub, multiline: true },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ (Veelgestelde vragen)',
    anchor: '#faq',
    fields: [
      { key: 'home_faq_heading', label: 'Title (Titel)', fallback: nl.faq.heading },
      ...faqFields,
    ],
  },
  {
    id: 'quoteform',
    label: 'Offerte aanvraag (Quote form)',
    anchor: '#offerte',
    fields: [
      { key: 'home_quoteform_heading', label: 'Title (Titel)', fallback: 'Offerte aanvraag' },
      { key: 'home_quoteform_sub', label: 'Subtext (Subtekst)', fallback: 'Laat hier uw bericht achter. Wij komen dezelfde dag nog bij u terug!', multiline: true },
      { key: 'home_quoteform_badge', label: 'Discount badge (Kortingsbadge)', fallback: 'TIJDELIJKE KORTING TOT 10%!' },
      { key: 'home_quoteform_feat1_plain', label: 'Feature 1 — text (Kenmerk 1 tekst)', fallback: 'Snel en efficiënt,' },
      { key: 'home_quoteform_feat1_bold', label: 'Feature 1 — bold (Kenmerk 1 vetgedrukt)', fallback: 'ZONDER wachttijden!' },
      { key: 'home_quoteform_feat2_plain', label: 'Feature 2 — text (Kenmerk 2 tekst)', fallback: 'Zowel grote, als' },
      { key: 'home_quoteform_feat2_bold', label: 'Feature 2 — bold (Kenmerk 2 vetgedrukt)', fallback: 'kleine klussen.' },
      { key: 'home_quoteform_feat3_plain', label: 'Feature 3 — text (Kenmerk 3 tekst)', fallback: '1 op 1 begeleiding' },
      { key: 'home_quoteform_feat3_bold', label: 'Feature 3 — bold (Kenmerk 3 vetgedrukt)', fallback: 'gedurende het hele traject.' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    anchor: '#contact',
    fields: [
      { key: 'home_contact_quote', label: 'Quote band (Quote-band)', fallback: nl.contactCards.quote, multiline: true },
      { key: 'home_contact_heading', label: 'Title (Titel)', fallback: nl.contactCards.heading },
      { key: 'home_contact_sub', label: 'Subtext (Subtekst)', fallback: nl.contactCards.sub, multiline: true },
      ...contactCardFields,
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    anchor: '',
    fields: [
      { key: 'footer_copy', label: 'Copyright text — year is added automatically (Copyright)', fallback: 'LAMAR Stukadoor en Onderhoud. Alle rechten voorbehouden.' },
    ],
  },
]

export const TEXT_KEYS = TEXT_GROUPS.flatMap((g) => g.fields.map((f) => f.key))

const FALLBACKS: Record<string, string> = Object.fromEntries(
  TEXT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.fallback]))
)

/**
 * Request-cached resolver for editable copy. `cache()` dedupes the DB read so
 * every section component on a page shares a single query.
 * Usage: const tx = await getSiteText(); tx('home_hero_headline_a')
 */
export const getSiteText = cache(async () => {
  const overrides = await getContentMany(TEXT_KEYS)
  return (key: string): string => {
    const v = overrides[key]
    return v && v.trim() ? v : FALLBACKS[key] ?? ''
  }
})
