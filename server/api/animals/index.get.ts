import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  try {
    const parsed = parseAnimalsQuery(event)
    const cacheKey = `animals:list:${JSON.stringify(parsed)}`

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

    const data = await fetchAnimalsList(parsed)
    const etag = apiCache.set(cacheKey, data, CACHE_TTL.LIST)

    setHeader(event, 'ETag', etag)
    setHeader(event, 'Cache-Control', 'public, max-age=60')

    return data
  } catch (error: any) {
    console.error('Error in /api/animals:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch animals'
    })
  }
})
