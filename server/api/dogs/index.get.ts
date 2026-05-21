import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

const META_KEYS = new Set(['page', 'pageSize', 'sort', 'legacyAll', 'all'])

export default defineEventHandler(async (event) => {
  const q = (getQuery(event) || {}) as Record<string, unknown>
  const queryKeys = Object.keys(q)

  const hasFilters = queryKeys.some((k) => {
    if (META_KEYS.has(k)) return false
    const v = q[k]
    if (v === undefined || v === null || v === '') return false
    if (Array.isArray(v) && v.length === 0) return false
    return true
  })

  const explicitPage = queryKeys.includes('page') || queryKeys.includes('pageSize')
  const isLegacyAll = !hasFilters && !explicitPage

  // Build cache key
  const qs = new URLSearchParams(
    Object.entries(q as Record<string, string>)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => [k, String(v)])
  ).toString()
  const cacheKey = `dogs:list:${qs}`

  // Serve from cache if available
  const cached = apiCache.get<any>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return cached.data
  }

  try {
    const parsed = parseAnimalsQuery(event)
    if (isLegacyAll) parsed.legacyAll = true

    const result = await fetchAnimalsList(parsed)
    const responseData = isLegacyAll ? result.items : result

    apiCache.set(cacheKey, responseData, CACHE_TTL.LIST)

    setHeader(event, 'X-Cache', 'MISS')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return responseData
  } catch (error: any) {
    console.error('Error in /api/dogs:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch dogs from database'
    })
  }
})
