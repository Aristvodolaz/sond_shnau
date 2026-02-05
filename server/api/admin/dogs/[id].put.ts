import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  await query(`
    UPDATE dogs SET
      slug = $1, name = $2, type = $3, age = $4, city = $5,
      curator_name = $6, curator_phone = $7, curator_email = $8,
      photos = $9, description = $10, features = $11,
      health = $12, character = $13, forum_topic_url = $14,
      status = $15, date_added = $16, updated_at = CURRENT_TIMESTAMP
    WHERE id = $17
  `, [
    body.slug, body.name, body.type, body.age, body.city,
    body.curator_name, body.curator_phone, body.curator_email || null,
    JSON.stringify(body.photos), body.description, JSON.stringify(body.features),
    body.health, body.character, body.forum_topic_url, body.status, body.date_added,
    id
  ])

  return { success: true }
})
