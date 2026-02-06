import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const dogSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(['riesenschnauzer', 'mittelschnauzer', 'zwergschnauzer', 'metis']),
  age: z.string().min(1),
  city: z.string().min(1),
  curator_name: z.string().min(1),
  curator_phone: z.string().min(1),
  curator_email: z.string().optional(),
  photos: z.array(z.string()),
  description: z.string().min(1),
  features: z.array(z.string()),
  health: z.string().min(1),
  character: z.string().min(1),
  forum_topic_url: z.string().url(),
  status: z.enum(['looking', 'pensioner']),
  date_added: z.string()
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const body = await readBody(event)
  const data = dogSchema.parse(body)

  const result = await query<{ id: number }>(`
    INSERT INTO dogs (slug, name, type, age, city, curator_name, curator_phone, curator_email,
      photos, description, features, health, character, forum_topic_url, status, date_added)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING id
  `, [
    data.slug, data.name, data.type, data.age, data.city,
    data.curator_name, data.curator_phone, data.curator_email || null,
    JSON.stringify(data.photos), data.description, JSON.stringify(data.features),
    data.health, data.character, data.forum_topic_url, data.status, data.date_added
  ])

  return { id: result.rows[0].id, success: true }
})
