import { query } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const result = await query('SELECT * FROM stories WHERE slug = $1', [slug])

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
