import { requireAuth } from '~/server/utils/auth'
import { query } from '~/server/database/db'
import { deleteFromS3 } from '~/server/utils/storage'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  if (!id || Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid media id',
    })
  }

  const existing = await query<{ id: number; key: string }>(
    'SELECT id, key FROM media WHERE id = $1',
    [id],
  )

  if (existing.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Media not found',
    })
  }

  const media = existing.rows[0]

  // Try to delete from S3 (ignore errors so we can still clean up DB)
  try {
    await deleteFromS3(media.key)
  } catch (err) {
    console.error('Failed to delete from S3', err)
  }

  await query('DELETE FROM media WHERE id = $1', [id])

  return { success: true }
})

