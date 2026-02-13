import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const result = await query(`
    UPDATE stories
    SET slug = $1, dog_name = $2, year = $3, part = $4, preview = $5, content = $6,
        photos = $7, before_photo = $8, after_photo = $9, updated_at = NOW()
    WHERE id = $10
    RETURNING *
  `, [
    body.slug,
    body.dog_name || body.dogName,
    body.year,
    body.part || null,
    body.preview,
    body.content,
    JSON.stringify(body.photos || []),
    body.before_photo || body.beforePhoto || null,
    body.after_photo || body.afterPhoto || null,
    id
  ])

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Story not found'
    })
  }

  const story = result.rows[0]

  return {
    id: story.id.toString(),
    slug: story.slug,
    dogName: story.dog_name,
    year: story.year,
    part: story.part,
    preview: story.preview,
    content: story.content,
    photos: story.photos,
    beforePhoto: story.before_photo,
    afterPhoto: story.after_photo
  }
})
