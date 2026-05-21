import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  // Build cache key from query string
  const qs = new URLSearchParams(
    Object.entries(getQuery(event) as Record<string, string>)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => [k, String(v)])
  ).toString()
  const cacheKey = `animals:list:${qs}`

  // Serve from cache if available
  const cached = apiCache.get<ReturnType<typeof fetchAnimalsList> extends Promise<infer T> ? T : never>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return cached.data
  }

  try {
    const parsed = parseAnimalsQuery(event)
    const result = await fetchAnimalsList(parsed)

    apiCache.set(cacheKey, result, CACHE_TTL.LIST)

    setHeader(event, 'X-Cache', 'MISS')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return result
  } catch (error: any) {
    console.error('Error in /api/animals:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch animals'
    })
  }
})
