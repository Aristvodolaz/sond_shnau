/**
 * Script to reset admin user credentials
 * Usage: npm run admin:reset
 */

import { query, pool } from '../server/database/db.js'
import { hashPassword } from '../server/utils/auth.js'

async function resetAdmin() {
  try {
    console.log('🔄 Resetting admin user...')
    
    // Get credentials from environment
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminUsername || !adminPassword) {
      console.error('❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env')
      process.exit(1)
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
    
    console.log(`✅ Admin user created successfully!`)
    console.log(`   Username: ${adminUsername}`)
    console.log(`   Password: [hidden for security]`)
    console.log('')
    console.log('🔒 Keep your credentials secure!')
    console.log('📝 You can now login at /admin/login')
    
  } catch (error: any) {
    console.error('❌ Error resetting admin:', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

resetAdmin()
