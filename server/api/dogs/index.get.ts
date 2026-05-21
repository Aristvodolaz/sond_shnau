import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

const META_KEYS = new Set(['page', 'pageSize', 'sort', 'legacyAll', 'all'])

export default defineEventHandler(async (event) => {
  try {
    const parsed = parseAnimalsQuery(event)
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

    if (!hasFilters && !explicitPage) {
      parsed.legacyAll = true
    }

    const cacheKey = `dogs:list:${JSON.stringify(parsed)}:${hasFilters}:${explicitPage}`
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

    const result = await fetchAnimalsList(parsed)
    const data = (!hasFilters && !explicitPage) ? result.items : result
    const etag = apiCache.set(cacheKey, data, CACHE_TTL.LIST)

    setHeader(event, 'ETag', etag)
    setHeader(event, 'Cache-Control', 'public, max-age=60')

    return data
  } catch (error: any) {
    console.error('Error in /api/dogs:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch dogs from database'
    })
  }
})
