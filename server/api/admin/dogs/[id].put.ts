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
      curator_whatsapp = $9, curator_telegram = $10,
      photos = $11, description = $12, features = $13,
      health = $14, character = $15, story = $16, forum_topic_url = $17,
      status = $18, age_months = $19, date_added = $20,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $21
  `, [
    body.slug, body.name, body.type, body.age, body.city,
    body.curator_name, body.curator_phone, body.curator_email || null,
    body.curator_whatsapp || null, body.curator_telegram || null,
    JSON.stringify(body.photos), body.description ?? '', JSON.stringify(body.features),
    body.health, body.character, body.story ?? '', body.forum_topic_url ?? null,
    body.status, body.age_months ?? null, body.date_added,
    id
  ])

  return { success: true }
})
