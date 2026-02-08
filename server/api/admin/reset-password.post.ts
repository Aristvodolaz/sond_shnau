/**
 * Reset admin password endpoint
 * This will delete all users and create a new admin from env variables
 * Use with caution!
 */

import { query } from '~/server/database/db'
import { hashPassword } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Get credentials from environment
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminUsername || !adminPassword) {
      throw createError({
        statusCode: 500,
        message: 'Admin credentials not configured in environment variables'
      })
    }
    
    // Delete all existing users
    await query('DELETE FROM users')
    console.log('✅ Deleted all existing users')
    
    // Create new admin with secure hash
    const hashedPassword = hashPassword(adminPassword)
    await query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [adminUsername, hashedPassword]
    )
    
    console.log(`✅ Admin user created (username: ${adminUsername})`)
    
    return {
      success: true,
      message: 'Admin user reset successfully',
      username: adminUsername
    }
    
  } catch (error: any) {
    console.error('❌ Error resetting admin:', error)
    throw createError({
      statusCode: 500,
      message: `Failed to reset admin: ${error.message}`
    })
  }
})
