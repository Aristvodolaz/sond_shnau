// @ts-ignore - rss-parser doesn't have official types
import Parser from 'rss-parser'
import type { RssItem } from '~/types'

// RSS feed URL from config
const RSS_URL = 'https://pet-help.ru/rss.xml'

// Create parser instance
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; SchnauzerFond/1.0)'
  }
}) as any

// In-memory cache
let cachedData: RssItem[] | null = null
let cacheTime = 0
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

export default defineEventHandler(async (event) => {
  try {
    const now = Date.now()
    
    // Return cached data if still valid
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      return cachedData
    }

    // Fetch and parse RSS feed
    const feed = await parser.parseURL(RSS_URL)
    
    // Transform to our RssItem format
    const items: RssItem[] = feed.items.map(item => ({
      title: item.title || 'Без заголовка',
      link: item.link || '#',
      pubDate: item.pubDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet,
      content: item.content
    }))

    // Update cache
    cachedData = items
    cacheTime = now

    return items
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    
    // Return cached data if available, even if expired
    if (cachedData) {
      return cachedData
    }
    
    // Return empty array if no cache and fetch failed
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch RSS feed'
    })
  }
})
