import { query } from '../../../database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Require authentication
  await requireAuth(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { name, type, year, city, photo, adoptionDate, forumUrl } = body

  // Validate required fields
  if (!name || !type || !year || !city || !photo || !adoptionDate) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  try {
    // Update adopted dog
    const result = await query(
      `UPDATE adopted 
       SET name = $1, type = $2, year = $3, city = $4, photo = $5, adoption_date = $6, forum_url = $7
       WHERE id = $8
       RETURNING id, name, type, year, city, photo, adoption_date as "adoptionDate", forum_url as "forumUrl"`,
      [name, type, year, city, photo, adoptionDate, forumUrl || null, id]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Adopted dog not found'
      })
    }

    return result.rows[0]
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    
    console.error('Error updating adopted dog:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update adopted dog'
    })
  }
})
