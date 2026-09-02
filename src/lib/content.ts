import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

/**
 * Default Dutch "Over ons" / About copy. Shared between the public page and the
 * admin editor so the editor never pre-fills (and risks saving) a different
 * language than the site shows.
 */
export const ABOUT_FALLBACK = `Al meer dan vijf jaar is "Lamar Finishing and Painting", een gespecialiseerd bedrijf, actief in de aannemers- en afwerkingsmarkt. Dankzij een innovatieve visie heeft het bedrijf een vooraanstaande en vertrouwde positie verworven. Bij Lamar werken we met professionele teams en technici die geïntegreerde oplossingen bieden voor binnen- en buitenafwerking en -decoratie. We combineren de nieuwste technologieën met de hoogste kwaliteits- en precisienormen. We streven er altijd naar om ruimtes te transformeren tot moderne en duurzame omgevingen die voldoen aan de wensen van onze klanten en die de hoogste normen op het gebied van vakmanschap en esthetiek weerspiegelen.`

export async function getContent(key: string, fallback: string): Promise<string> {
  try {
    const row = await prisma.content.findUnique({ where: { key } })
    return row?.value || fallback
  } catch {
    return fallback
  }
}

export async function getLanguage(): Promise<'nl'> {
  return 'nl'
}

export async function getContentMany(
  keys: string[]
): Promise<Record<string, string>> {
  try {
    const rows = await prisma.content.findMany({ where: { key: { in: keys } } })
    const map: Record<string, string> = {}
    for (const row of rows) map[row.key] = row.value
    return map
  } catch {
    return {}
  }
}

/**
 * Upsert a batch of content key/value pairs in a single transaction.
 * Shared by the admin content editors (about, contact, offerte, werkwijze, settings).
 */
export async function setContentKeys(entries: Record<string, string>): Promise<void> {
  const keys = Object.keys(entries)
  if (keys.length === 0) return

  const values: any[] = []
  const placeholders = keys
    .map((key, i) => {
      values.push(randomUUID(), key, entries[key])
      const offset = i * 3
      return `($${offset + 1}, $${offset + 2}, $${offset + 3})`
    })
    .join(', ')

  await prisma.$executeRawUnsafe(
    `INSERT INTO "Content" ("id", "key", "value") VALUES ${placeholders} ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value";`,
    ...values
  )
}
