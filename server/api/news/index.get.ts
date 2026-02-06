import { query, checkConnection } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  try {
    // Check database connection first
    const isConnected = await checkConnection()
    if (!isConnected) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Database connection unavailable. Please check DATABASE_SETUP.md for configuration instructions.'
      })
    }

    const result = await query('SELECT * FROM news WHERE published = true ORDER BY date DESC')

    return result.rows.map((item: any) => ({
      id: item.id.toString(),
      slug: item.slug,
      title: item.title,
      date: item.date,
      preview: item.preview,
      content: item.content,
      image: item.image
    }))
  } catch (error: any) {
    console.error('Error in /api/news:', error)
    
    // Return user-friendly error
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch news from database'
    })
  }
})
