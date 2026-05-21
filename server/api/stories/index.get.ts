import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const cacheKey = 'stories:list'
  const cached = apiCache.get(cacheKey)
  if (cached) {
    setHeader(event, 'ETag', cached.etag)
    setHeader(event, 'Cache-Control', 'public, max-age=60')

    const ifNoneMatch = getHeader(event, 'if-none-match')
    if (ifNoneMatch === cached.etag) {
      setResponseStatus(event, 304)
      return ''
    }
    return cached.data
  }

  const result = await query('SELECT * FROM stories ORDER BY year DESC, part ASC')

  const data = result.rows.map((story: any) => ({
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

  const etag = apiCache.set(cacheKey, data, CACHE_TTL.LIST)

  setHeader(event, 'ETag', etag)
  setHeader(event, 'Cache-Control', 'public, max-age=60')

  return data
})
