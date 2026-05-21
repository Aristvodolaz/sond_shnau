import { query } from '~/server/database/db'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const cacheKey = `news:detail:${slug}`

  const cached = apiCache.get<any>(cacheKey)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
    return cached.data
  }

  const result = await query(
    'SELECT id, slug, title, date, preview, content, image FROM news WHERE slug = $1 AND published = true',
    [slug]
  )

  if (result.rows.length === 0) {
    throw createError({ statusCode: 404, message: 'News not found' })
  }

  const item = result.rows[0]
  const data = {
    id: item.id.toString(),
    slug: item.slug,
    title: item.title,
    date: item.date,
    preview: item.preview,
    content: item.content,
    image: item.image
  }

  apiCache.set(cacheKey, data, CACHE_TTL.DETAIL)

  setHeader(event, 'X-Cache', 'MISS')
  setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
  return data
})
