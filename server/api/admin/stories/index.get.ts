import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const result = await query('SELECT * FROM stories ORDER BY year DESC, part ASC')

  return result.rows.map((story: any) => ({
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
  }))
})
