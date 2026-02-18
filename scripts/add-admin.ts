#!/usr/bin/env node
/**
 * Script to add a new admin user
 * Usage: npx tsx scripts/add-admin.ts <username> <password>
 */

import pkg from 'pg'
const { Pool } = pkg
import { config } from 'dotenv'
import { createHash } from 'node:crypto'

// Load environment variables
config()

// Create database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'fond_shnau',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
}

const pool = new Pool(dbConfig)

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

async function addAdmin(username: string, password: string) {
  console.log(`🔄 Adding admin user: ${username}...\n`)

  try {
    // Check if user already exists
    const checkResult = await pool.query('SELECT id FROM users WHERE username = $1', [username])
    
    if (checkResult.rows.length > 0) {
      console.log(`⚠️  User "${username}" already exists. Updating password...`)
      const hashedPassword = hashPassword(password)
      await pool.query('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, username])
      console.log(`✅ Password updated for user "${username}"\n`)
    } else {
      // Create new user
      const hashedPassword = hashPassword(password)
      await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, hashedPassword]
      )
      console.log(`✅ Admin user "${username}" created successfully\n`)
    }
    
  } catch (error: any) {
    console.error('❌ Error adding admin:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

// Get username and password from command line arguments or use defaults
const username = process.argv[2] || 'Windy'
const password = process.argv[3] || '{jxe<kzGbdf13'

// Run script
addAdmin(username, password)
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
