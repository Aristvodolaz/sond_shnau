import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const cacheKey = 'news:list'

  const cached = apiCache.get<any[]>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return cached.data
  }

  try {
    const result = await query(
      'SELECT id, slug, title, date, preview, content, image FROM news WHERE published = true ORDER BY date DESC LIMIT 50'
    )

    const items = result.rows.map((item: any) => ({
      id: item.id.toString(),
      slug: item.slug,
      title: item.title,
      date: item.date,
      preview: item.preview,
      content: item.content,
      image: item.image
    }))

    apiCache.set(cacheKey, items, CACHE_TTL.LIST)

    setHeader(event, 'X-Cache', 'MISS')
    setHeader(event, 'Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60')
    return items
  } catch (error: any) {
    console.error('Error in /api/news:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch news from database'
    })
  }
})
