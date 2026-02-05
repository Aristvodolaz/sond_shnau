import { query } from '~/server/database/db'

export default defineEventHandler(async () => {
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
