import { query, checkConnection } from '~/server/database/db'
import { mapDogRow } from '~/server/utils/dogMapper'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const isConnected = await checkConnection()
  if (!isConnected) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Database connection unavailable.'
    })
  }

  const result = await query('SELECT * FROM dogs WHERE slug = $1', [slug])
  if (result.rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Animal not found' })
  }

  return mapDogRow(result.rows[0] as Record<string, unknown>)
})
