import { query } from '../../../database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Require authentication
  await requireAuth(event)

  const id = getRouterParam(event, 'id')

  try {
    // Delete adopted dog
    const result = await query(
      'DELETE FROM adopted WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Adopted dog not found'
      })
    }

    return { success: true }
  } catch (error: any) {
    if (error.statusCode === 404) throw error
    
    console.error('Error deleting adopted dog:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete adopted dog'
    })
  }
})
