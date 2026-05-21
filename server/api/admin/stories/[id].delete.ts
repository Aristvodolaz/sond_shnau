import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'
import { apiCache } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const id = getRouterParam(event, 'id')

  await query('DELETE FROM stories WHERE id = $1', [id])

  apiCache.invalidate('stories:')

  return { success: true }
})

