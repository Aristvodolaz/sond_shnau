import { query } from '../database/db'
import type { H3Event } from 'h3'
import { createHash } from 'node:crypto'

// Simple session-based auth
export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function createSession(userId: number): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await query(`
    INSERT INTO sessions (token, user_id, expires_at)
    VALUES ($1, $2, $3)
  `, [token, userId, expiresAt.toISOString()])

  return token
}

export async function validateSession(token: string): Promise<number | null> {
  const result = await query<{ user_id: number, expires_at: string }>(`
    SELECT user_id, expires_at FROM sessions WHERE token = $1
  `, [token])

  if (result.rows.length === 0) return null

  const session = result.rows[0]

  if (new Date(session.expires_at) < new Date()) {
    await query('DELETE FROM sessions WHERE token = $1', [token])
    return null
  }

  return session.user_id
}

export async function requireAuth(event: H3Event): Promise<number> {
  const token = getCookie(event, 'admin_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const userId = await validateSession(token)
  
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired session'
    })
  }

  return userId
}

// Simple password hashing (in production use bcrypt)
export function hashPassword(password: string): string {
  // This is a simple hash for demo. In production, use bcrypt or argon2
  return createHash('sha256').update(password).digest('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Create default admin user if not exists
export async function ensureAdminUser() {
  const result = await query<{ id: number }>('SELECT id FROM users WHERE username = $1', ['admin'])
  
  if (result.rows.length === 0) {
    const password = hashPassword('admin123') // Change this!
    await query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', password])
    console.log('✅ Default admin user created (username: admin, password: admin123)')
    console.log('⚠️  IMPORTANT: Change the default password!')
  }
}
