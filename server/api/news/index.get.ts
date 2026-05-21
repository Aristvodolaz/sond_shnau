import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  try {
    const cacheKey = 'news:list'
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

    const result = await query('SELECT * FROM news WHERE published = true ORDER BY date DESC')

    const data = result.rows.map((item: any) => ({
      id: item.id.toString(),
      slug: item.slug,
      title: item.title,
      date: item.date,
      preview: item.preview,
      content: item.content,
      image: item.image
    }))

    const etag = apiCache.set(cacheKey, data, CACHE_TTL.LIST)

    setHeader(event, 'ETag', etag)
    setHeader(event, 'Cache-Control', 'public, max-age=60')

    return data
  } catch (error: any) {
    console.error('Error in /api/news:', error)
    
    // Return user-friendly error
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch news from database'
    })
  }
})
