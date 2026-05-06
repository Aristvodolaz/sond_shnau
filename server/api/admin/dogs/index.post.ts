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
  curator_phone: z.string().min(1).max(255, 'Телефон слишком длинный (макс. 255 символов)'),
  curator_email: z.string().nullable().optional(),
  curator_whatsapp: z.string().nullable().optional(),
  curator_telegram: z.string().nullable().optional(),
  photos: z.array(z.string()),
  description: z.string().optional().default(''),
  features: z.array(z.string()),
  health: z.string().min(1),
  character: z.string().min(1),
  story: z.string().optional().default(''),
  forum_topic_url: z
    .union([z.string().url(), z.literal('')])
    .nullable()
    .optional()
    .transform((s) => (s && String(s).trim() ? String(s).trim() : null)),
  status: z.enum(['looking', 'foster', 'pensioner']),
  age_months: z.number().int().min(0).max(600).nullable().optional(),
  date_added: z.string()
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const body = await readBody(event)
  const data = dogSchema.parse(body)

  const result = await query<{ id: number }>(`
    INSERT INTO dogs (
      slug, name, type, age, city,
      curator_name, curator_phone, curator_email, curator_whatsapp, curator_telegram,
      photos, description, features, health, character, story, forum_topic_url,
      status, age_months, date_added
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    RETURNING id
  `, [
    data.slug, data.name, data.type, data.age, data.city,
    data.curator_name, data.curator_phone, data.curator_email || null,
    data.curator_whatsapp || null, data.curator_telegram || null,
    JSON.stringify(data.photos), data.description ?? '', JSON.stringify(data.features),
    data.health, data.character, data.story ?? '', data.forum_topic_url,
    data.status, data.age_months ?? null, data.date_added
  ])

  return { id: result.rows[0].id, success: true }
})
