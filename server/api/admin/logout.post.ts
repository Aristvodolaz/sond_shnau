import { query } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')

  if (token) {
    await query('DELETE FROM sessions WHERE token = $1', [token])
  }

  deleteCookie(event, 'admin_token')

  return { success: true }
})
