import { query } from '~/server/database/db'
import { mapDogRow } from '~/server/utils/dogMapper'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const cacheKey = `dogs:detail:${slug}`

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

  const result = await query('SELECT * FROM dogs WHERE slug = $1', [slug])

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Dog not found'
    })
  }

  const data = mapDogRow(result.rows[0] as Record<string, unknown>)
  const etag = apiCache.set(cacheKey, data, CACHE_TTL.DETAIL)

  setHeader(event, 'ETag', etag)
  setHeader(event, 'Cache-Control', 'public, max-age=60')

  return data
})
