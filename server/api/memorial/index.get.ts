import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const cacheKey = 'memorial:list'
  
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

  const result = await query('SELECT * FROM memorial ORDER BY date_added DESC')

  const data = result.rows.map((entry: any) => ({
    id: entry.id.toString(),
    slug: entry.slug,
    name: entry.name,
    years: entry.years,
    type: entry.type,
    photo: entry.photo,
    tribute: entry.tribute,
    dateAdded: entry.date_added
  }))

  const etag = apiCache.set(cacheKey, data, CACHE_TTL.STATIC)
  setHeader(event, 'ETag', etag)
  setHeader(event, 'Cache-Control', 'public, max-age=60')

  return data
})

