import { prisma } from '@/lib/prisma'
import ImageSectionClient, { type SectionDef } from './ImageSectionClient'

// ── section definitions ───────────────────────────────────────────────────────

const HOMEPAGE_SECTIONS: Omit<SectionDef, 'images'>[] = [
  {
    key: 'images:hero',
    label: 'Hero Achtergrond',
    description:
      'Achtergrondafbeelding van het hero-gedeelte bovenaan de homepage. Aanbevolen formaat: 1920×1080.',
    max: 1,
  },
  {
    key: 'images:home:stukadoorswerk',
    label: 'Stukadoorswerk — Sectie',
    description: "Foto's in het Stukadoorswerk-blok op de homepage.",
    max: 6,
  },
  {
    key: 'images:home:schilderwerk',
    label: 'Schilderwerk — Sectie',
    description: "Foto's in het Schilderwerk-blok op de homepage.",
    max: 6,
  },
  {
    key: 'images:home:projecten',
    label: 'Onze Projecten — Homepage Raster',
    description:
      "Maximaal 6 foto's zichtbaar in het portfolioraster op de homepage. Volgorde bepaalt de positie.",
    max: 6,
  },
]

const DIENSTEN_SECTIONS: Omit<SectionDef, 'images'>[] = [
  { key: 'images:dienst:sausklaar-stucwerk', label: 'Sausklaar Stucwerk', max: 40 },
  { key: 'images:dienst:stucwerk', label: 'Stucwerk', max: 40 },
  { key: 'images:dienst:dunpleister', label: 'Dunpleister', max: 40 },
  { key: 'images:dienst:reparatiewerk', label: 'Reparatiewerk', max: 40 },
  { key: 'images:dienst:schilderwerk', label: 'Schilderwerk', max: 40 },
  { key: 'images:dienst:latex-spuiten', label: 'Latex Spuiten', max: 40 },
  { key: 'images:dienst:schilderwerk-hout', label: 'Schilderwerk (Hout)', max: 40 },
  { key: 'images:dienst:behang', label: 'Behang', max: 40 },
]

// ── page ─────────────────────────────────────────────────────────────────────

export const metadata = { title: 'Afbeeldingen — Admin' }

export default async function ImagesAdminPage() {
  const allDefs = [...HOMEPAGE_SECTIONS, ...DIENSTEN_SECTIONS]
  const allKeys = allDefs.map((s) => s.key)

  const rows = await prisma.content
    .findMany({ where: { key: { in: allKeys } } })
    .catch(() => [])

  const imageMap: Record<string, string[]> = {}
  for (const row of rows) {
    try {
      imageMap[row.key] = JSON.parse(row.value) as string[]
    } catch {
      imageMap[row.key] = []
    }
  }

  function hydrate(defs: Omit<SectionDef, 'images'>[]): SectionDef[] {
    return defs.map((d) => ({ ...d, images: imageMap[d.key] ?? [] }))
  }

  return (
    <ImageSectionClient
      homepageSections={hydrate(HOMEPAGE_SECTIONS)}
      dienstenSections={hydrate(DIENSTEN_SECTIONS)}
    />
  )
}
