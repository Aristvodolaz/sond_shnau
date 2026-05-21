import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const cacheKey = `news:detail:${slug}`

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

  const result = await query('SELECT * FROM news WHERE slug = $1 AND published = true', [slug])

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'News not found'
    })
  }

  const item = result.rows[0]
  const data = {
    id: item.id.toString(),
    slug: item.slug,
    title: item.title,
    date: item.date,
    preview: item.preview,
    content: item.content,
    image: item.image
  }

  const etag = apiCache.set(cacheKey, data, CACHE_TTL.DETAIL)

  setHeader(event, 'ETag', etag)
  setHeader(event, 'Cache-Control', 'public, max-age=60')

  return data
})
