import { query } from '../database/db'
import type { AdoptedDog } from '~/types'

export default defineEventHandler(async (event): Promise<AdoptedDog[]> => {
  try {
    // Get all adopted dogs, ordered by adoption date (newest first)
    const result = await query(
      `SELECT id, name, type, year, city, photo, adoption_date as "adoptionDate", forum_url as "forumUrl"
       FROM adopted 
       ORDER BY adoption_date DESC`
    )

    return result.rows
  } catch (error) {
    console.error('Error fetching adopted dogs:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch adopted dogs'
    })
  }
})
