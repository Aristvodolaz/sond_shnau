import { query } from '~/server/database/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const result = await query('SELECT * FROM dogs ORDER BY created_at DESC')

  return result.rows
})
