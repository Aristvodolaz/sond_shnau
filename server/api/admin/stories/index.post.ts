import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const body = await readBody(event)

  const result = await query(`
    INSERT INTO stories (slug, dog_name, year, part, preview, content, photos, before_photo, after_photo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `, [
    body.slug,
    body.dogName,
    body.year,
    body.part || null,
    body.preview,
    body.content,
    JSON.stringify(body.photos || []),
    body.beforePhoto || null,
    body.afterPhoto || null
  ])

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
