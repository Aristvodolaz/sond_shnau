import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  await query(`
    UPDATE news SET
      slug = $1, title = $2, date = $3, preview = $4, content = $5,
      image = $6, published = $7, updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
  `, [
    body.slug, body.title, body.date, body.preview, body.content,
    body.image || null, body.published, id
  ])

  return { success: true }
})
