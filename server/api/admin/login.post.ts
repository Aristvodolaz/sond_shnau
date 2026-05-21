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

  // Diagnostic logs to debug production cookie/proxy issues
  console.log(`[Login API] Attempting login for user: ${username}`)
  console.log(`[Login API] Node protocol: ${getRequestProtocol(event)}`)
  console.log(`[Login API] X-Forwarded-Proto: ${event.node.req.headers['x-forwarded-proto']}`)
  console.log(`[Login API] NODE_ENV: ${process.env.NODE_ENV}`)

  // Disable secure flag temporarily to ensure compatibility with all proxy setups
  const isSecure = false
  console.log(`[Login API] Setting cookie admin_token with secure flag: ${isSecure}`)

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })

  return { success: true }
})
