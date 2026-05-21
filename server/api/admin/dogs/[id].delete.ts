import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'
import { apiCache } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')
  
  await query('DELETE FROM dogs WHERE id = $1', [id])

  // Invalidate all dog-related caches
  apiCache.invalidate('dogs:list:')
  apiCache.invalidate('animals:list:')
  apiCache.invalidate('dogs:detail:')
  apiCache.invalidate('animals:detail:')

  return { success: true }
})
