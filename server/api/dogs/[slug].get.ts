import { query } from '~/server/database/db'
import { mapDogRow } from '~/server/utils/dogMapper'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const cacheKey = `dogs:detail:${slug}`

  const cached = apiCache.get<ReturnType<typeof mapDogRow>>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
    return cached.data
  }

  const result = await query('SELECT * FROM dogs WHERE slug = $1', [slug])

  if (result.rows.length === 0) {
    throw createError({ statusCode: 404, message: 'Dog not found' })
  }

  const dog = mapDogRow(result.rows[0] as Record<string, unknown>)
  apiCache.set(cacheKey, dog, CACHE_TTL.DETAIL)

  setHeader(event, 'X-Cache', 'MISS')
  setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
  return dog
})
