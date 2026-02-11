#!/usr/bin/env node
/**
 * Migration: Add forum_url field to adopted table
 * This adds a nullable forum_url field to track forum links for adopted dogs
 */

import pkg from 'pg'
const { Pool } = pkg
import { config } from 'dotenv'

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

async function query(text: string, params?: any[]) {
  return await pool.query(text, params)
}

async function checkConnection() {
  try {
    await pool.query('SELECT 1')
    return true
  } catch {
    return false
  }
}

async function migrate() {
  console.log('🔄 Starting migration: add forum_url to adopted table...\n')

  try {
    // Check connection
    const isConnected = await checkConnection()
    if (!isConnected) {
      throw new Error('Cannot connect to database')
    }

    // Add forum_url column
    await query(`
      ALTER TABLE adopted 
      ADD COLUMN IF NOT EXISTS forum_url TEXT
    `)

    console.log('✅ Migration completed: forum_url field added to adopted table\n')
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

// Run migration
migrate()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
