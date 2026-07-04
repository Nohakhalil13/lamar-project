import { prisma } from '@/lib/prisma'
import type { LeadSource } from '@/generated/prisma/client'

export type NewLead = {
  name: string
  email?: string | null
  phone?: string | null
  service?: string | null
  message: string
  source: LeadSource
}

/**
 * Persist a public enquiry (contact form or quote wizard) as a Lead in the
 * admin Leads inbox.
 *
 * Throws if the write fails. Earlier this caught and swallowed every error,
 * always returning successfully to the caller even when the lead was never
 * saved — the quote forms would show "sent" while the database write
 * silently failed and nothing appeared in the admin Leads inbox. Callers
 * that have a fallback channel (e.g. the contact form's Resend email) should
 * catch this explicitly and decide what to do; callers that have no fallback
 * (the quote forms) should let it propagate so the person submitting sees a
 * real error instead of a false success.
 */
export async function createLead(data: NewLead) {
  return prisma.lead.create({
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      service: data.service || null,
      message: data.message,
      source: data.source,
    },
  })
}