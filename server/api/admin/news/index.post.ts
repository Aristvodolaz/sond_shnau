import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const newsSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string(),
  preview: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional(),
  published: z.boolean().default(true)
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const body = await readBody(event)
  const data = newsSchema.parse(body)

  const result = await query<{ id: number }>(`
    INSERT INTO news (slug, title, date, preview, content, image, published)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `, [
    data.slug, data.title, data.date, data.preview, data.content,
    data.image || null, data.published
  ])

  return { id: result.rows[0].id, success: true }
})
