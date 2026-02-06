#!/usr/bin/env node
/**
 * Database initialization script
 * Creates tables and optionally migrates data from JSON files
 */

import { initDatabase, migrateFromJSON, checkConnection, pool } from '../server/database/db'

async function main() {
  console.log('🔄 Starting database initialization...\n')

  try {
    // Check connection first
    console.log('📡 Testing database connection...')
    const isConnected = await checkConnection()
    
    if (!isConnected) {
      console.error('\n❌ Cannot connect to database.')
      console.error('Please check your .env file and ensure PostgreSQL is running.')
      console.error('See DATABASE_SETUP.md for setup instructions.\n')
      process.exit(1)
    }

    console.log('✅ Database connection successful\n')

    // Initialize tables
    console.log('📋 Creating database tables...')
    await initDatabase()
    console.log('✅ Tables created successfully\n')

    // Ask if user wants to migrate data
    console.log('📦 Checking for JSON data files to migrate...')
    try {
      await migrateFromJSON()
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log('ℹ️  No JSON data files found to migrate (this is ok)\n')
      } else {
        throw error
      }
    }

    console.log('✅ Database initialization complete!\n')
    
  } catch (error: any) {
    console.error('\n❌ Database initialization failed:', error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  } finally {
    // Close the pool
    await pool.end()
    process.exit(0)
  }
}

// Run the script
main()
