// @ts-ignore - rss-parser doesn't have official types
import Parser from 'rss-parser'
import type { RssItem } from '~/types'
import { apiCache, CACHE_TTL } from '~/server/utils/cache'

// RSS feed URL from config
const RSS_URL = 'https://pet-help.ru/forum/feed.php?mode=topics_active'
const CACHE_KEY = 'rss:feed'

// Create parser instance (singleton)
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; SchnauzerFond/1.0)'
  }
}) as any

export default defineEventHandler(async (event) => {
  // Serve from shared cache if available
  const cached = apiCache.get<RssItem[]>(CACHE_KEY)
  if (cached) {
    setHeader(event, 'X-Cache', 'HIT')
    setHeader(event, 'Cache-Control', 'public, s-maxage=900, stale-while-revalidate=300')
    return cached.data
  }

  try {
    const feed = await parser.parseURL(RSS_URL)

    const items: RssItem[] = feed.items.map((item: any) => ({
      title: item.title || 'Без заголовка',
      link: item.link || '#',
      pubDate: item.pubDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet,
      content: item.content
    }))

    apiCache.set(CACHE_KEY, items, CACHE_TTL.RSS)

    setHeader(event, 'X-Cache', 'MISS')
    setHeader(event, 'Cache-Control', 'public, s-maxage=900, stale-while-revalidate=300')
    return items
  } catch (error) {
    console.error('Error fetching RSS feed:', error)

    // Return stale cache if available rather than failing
    const stale = apiCache.get<RssItem[]>(CACHE_KEY)
    if (stale) return stale.data

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch RSS feed'
    })
  }
})
