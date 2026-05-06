import { z } from 'zod'
import { query, checkConnection } from '~/server/database/db'

const bodySchema = z.object({
  animalId: z.string().optional(),
  applicantName: z.string().min(1, 'Укажите имя').max(255),
  phone: z.string().min(5, 'Укажите телефон').max(100),
  email: z.string().max(255).optional().transform((v) => (v && v.trim() ? v.trim() : undefined)),
  message: z.string().max(5000).optional(),
  preferredChannel: z.enum(['phone', 'whatsapp', 'telegram', 'email']).default('phone')
})

export default defineEventHandler(async (event) => {
  const ok = await checkConnection()
  if (!ok) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  const raw = await readBody(event)
  const body = bodySchema.parse(raw)

  let dogId: number | null = null
  if (body.animalId?.trim()) {
    const idNum = Number.parseInt(body.animalId, 10)
    if (!Number.isNaN(idNum)) {
      const check = await query('SELECT id FROM dogs WHERE id = $1', [idNum])
      if (check.rows.length > 0) dogId = idNum
    }
  }

  const res = await query<{ id: number }>(
    `INSERT INTO adoption_requests (dog_id, applicant_name, phone, email, message, preferred_channel)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      dogId,
      body.applicantName.trim(),
      body.phone.trim(),
      body.email?.trim() || null,
      body.message?.trim() || null,
      body.preferredChannel
    ]
  )

  return { id: res.rows[0].id, success: true }
})
