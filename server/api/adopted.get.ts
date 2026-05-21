import { query } from '../database/db'
import type { AdoptedDog } from '~/types'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event): Promise<AdoptedDog[]> => {
  try {
    const cacheKey = 'adopted:list'
    
    const cached = apiCache.get<AdoptedDog[]>(cacheKey)
    if (cached) {
      setHeader(event, 'ETag', cached.etag)
      setHeader(event, 'Cache-Control', 'public, max-age=60')

      const ifNoneMatch = getHeader(event, 'if-none-match')
      if (ifNoneMatch === cached.etag) {
        setResponseStatus(event, 304)
        return [] as any // Returning empty response for 304
      }
      return cached.data
    }

    // Get all adopted dogs, ordered by adoption date (newest first)
    const result = await query(
      `SELECT id, name, type, year, city, photo, adoption_date as "adoptionDate", forum_url as "forumUrl"
       FROM adopted 
       ORDER BY adoption_date DESC`
    )

    const data = result.rows
    const etag = apiCache.set(cacheKey, data, CACHE_TTL.STATIC)
    
    setHeader(event, 'ETag', etag)
    setHeader(event, 'Cache-Control', 'public, max-age=60')

    return data
  } catch (error) {
    console.error('Error fetching adopted dogs:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch adopted dogs'
    })
  }
})

