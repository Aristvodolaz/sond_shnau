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

    const result = await query('SELECT * FROM dogs ORDER BY date_added DESC')

    return result.rows.map((dog: any) => ({
      id: dog.id.toString(),
      slug: dog.slug,
      name: dog.name,
      type: dog.type,
      age: dog.age,
      city: dog.city,
      curator: {
        name: dog.curator_name,
        phone: dog.curator_phone,
        email: dog.curator_email
      },
      photos: dog.photos, // Already JSONB in PostgreSQL
      description: dog.description,
      features: dog.features, // Already JSONB in PostgreSQL
      health: dog.health,
      character: dog.character,
      forumTopicUrl: dog.forum_topic_url,
      status: dog.status,
      dateAdded: dog.date_added
    }))
  } catch (error: any) {
    console.error('Error in /api/dogs:', error)
    
    // Return user-friendly error
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch dogs from database'
    })
  }
})
