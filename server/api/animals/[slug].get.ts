import { query } from '~/server/database/db'
import { mapDogRow } from '~/server/utils/dogMapper'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const cacheKey = `animals:detail:${slug}`

  // Serve from cache if available
  const cached = apiCache.get<ReturnType<typeof mapDogRow>>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
    return cached.data
  }

  // Fetch full row (all columns including health, character, story)
  const result = await query('SELECT * FROM dogs WHERE slug = $1', [slug])
  if (result.rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Animal not found' })
  }

  const animal = mapDogRow(result.rows[0] as Record<string, unknown>)
  apiCache.set(cacheKey, animal, CACHE_TTL.DETAIL)

  setHeader(event, 'X-Cache', 'MISS')
  setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
  return animal
})
