import { query } from '../../database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Require authentication
  await requireAuth(event)

  const body = await readBody(event)
  const { name, type, year, city, photo, adoptionDate, forumUrl } = body

  // Validate required fields
  if (!name || !type || !year || !city || !photo || !adoptionDate) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: name, type, year, city, photo, adoptionDate'
    })
  }

  try {
    // Insert new adopted dog
    const result = await query(
      `INSERT INTO adopted (name, type, year, city, photo, adoption_date, forum_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, type, year, city, photo, adoption_date as "adoptionDate", forum_url as "forumUrl"`,
      [name, type, year, city, photo, adoptionDate, forumUrl || null]
    )

    return result.rows[0]
  } catch (error) {
    console.error('Error creating adopted dog:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to create adopted dog'
    })
  }
})
