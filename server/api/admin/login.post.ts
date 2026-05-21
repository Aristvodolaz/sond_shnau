import { query } from '~/server/database/db'
import { hashPassword, createSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Username and password required'
    })
  }

  const result = await query<{ id: number, password: string }>(
    'SELECT id, password FROM users WHERE username = $1',
    [username]
  )

  if (result.rows.length === 0 || result.rows[0].password !== hashPassword(password)) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    })
  }

  const token = await createSession(result.rows[0].id)

  // Set secure flag only if requested over HTTPS in production
  // This supports accessing the site over plain HTTP (e.g. by IP address or test domain)
  const isSecure = process.env.NODE_ENV === 'production' && 
    (getRequestProtocol(event) === 'https' || event.node.req.headers['x-forwarded-proto'] === 'https')

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: isSecure,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })

  return { success: true }
})
