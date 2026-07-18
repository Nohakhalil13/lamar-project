'use server'

import { prisma } from '@/lib/prisma'
import { cloudinary, destroyByUrl } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { requireAccess } from '@/lib/guards'

// ── helpers ───────────────────────────────────────────────────────────────────

async function getSectionImages(key: string): Promise<string[]> {
  try {
    const row = await prisma.content.findUnique({ where: { key } })
    if (!row) return []
    return JSON.parse(row.value) as string[]
  } catch {
    return []
  }
}

async function setSectionImages(key: string, urls: string[]): Promise<void> {
  await prisma.content.upsert({
    where: { key },
    update: { value: JSON.stringify(urls) },
    create: { key, value: JSON.stringify(urls) },
  })
}

function pathsToRevalidate(sectionKey: string): string[] {
  if (sectionKey === 'images:hero' || sectionKey.startsWith('images:home:')) {
    return ['/']
  }
  if (sectionKey.startsWith('images:dienst:')) {
    const slug = sectionKey.replace('images:dienst:', '')
    return [`/diensten/${slug}`, '/']
  }
  return ['/']
}

// ── public actions ────────────────────────────────────────────────────────────

export async function uploadSectionImage(
  sectionKey: string,
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  await requireAccess('/admin/images')

  const files = formData.getAll('files') as File[]
  const valid = files.filter((f) => f && f.size > 0)
  if (valid.length === 0) return { ok: false, error: 'Geen bestand geselecteerd.' }

  try {
    const folderPath = `lamar/${sectionKey.replace(/:/g, '/')}`
    const uploaded: string[] = []

    for (const file of valid) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: folderPath, resource_type: 'image' },
          (err, res) => {
            if (err || !res) return reject(err ?? new Error('Upload failed'))
            resolve(res)
          }
        ).end(buffer)
      })
      uploaded.push(result.secure_url)
    }

    const current = await getSectionImages(sectionKey)
    await setSectionImages(sectionKey, [...current, ...uploaded])

    for (const p of pathsToRevalidate(sectionKey)) revalidatePath(p)
    revalidatePath('/admin/images')

    return { ok: true }
  } catch (err) {
    console.error('[uploadSectionImage]', err)
    return { ok: false, error: 'Upload mislukt. Controleer de Cloudinary-instellingen.' }
  }
}

export async function deleteSectionImage(sectionKey: string, imageUrl: string): Promise<void> {
  await requireAccess('/admin/images')
  await destroyByUrl(imageUrl).catch(() => null)
  const current = await getSectionImages(sectionKey)
  await setSectionImages(sectionKey, current.filter((u) => u !== imageUrl))
  for (const p of pathsToRevalidate(sectionKey)) revalidatePath(p)
  revalidatePath('/admin/images')
}

export async function moveSectionImage(
  sectionKey: string,
  imageUrl: string,
  direction: 'left' | 'right'
): Promise<void> {
  await requireAccess('/admin/images')
  const current = await getSectionImages(sectionKey)
  const idx = current.indexOf(imageUrl)
  if (idx < 0) return
  const swapIdx = direction === 'left' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= current.length) return
  const next = [...current]
  ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
  await setSectionImages(sectionKey, next)
  for (const p of pathsToRevalidate(sectionKey)) revalidatePath(p)
  revalidatePath('/admin/images')
}
