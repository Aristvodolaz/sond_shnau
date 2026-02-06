import { Pool, QueryResult } from 'pg'
import { dbConfig } from './config'

// Create PostgreSQL connection pool
export const pool = new Pool(dbConfig)

// Track connection status
let isConnected = false

// Test connection
pool.on('connect', () => {
  isConnected = true
  console.log('✅ Connected to PostgreSQL database:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user
  })
})

pool.on('error', (err) => {
  isConnected = false
  console.error('❌ Unexpected error on idle client:', err.message)
  // Don't exit process in Nuxt/Nitro - let the app handle errors gracefully
})

// Connection health check with better error messages
export async function checkConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1')
    isConnected = true
    return true
  } catch (error: any) {
    isConnected = false
    console.error('❌ Database connection check failed:', {
      code: error.code,
      message: error.message,
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database
    })
    
    // Provide helpful error messages
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error(`
⚠️  Cannot connect to PostgreSQL database.
   
   Possible solutions:
   1. Start a local PostgreSQL server:
      - Using Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
      - Or install PostgreSQL locally
   
   2. Check your .env file configuration:
      DB_HOST=${dbConfig.host}
      DB_PORT=${dbConfig.port}
      DB_NAME=${dbConfig.database}
      
   3. If using a remote database, ensure:
      - The server is running and accessible
      - Firewall allows connections to port ${dbConfig.port}
      - Your IP is whitelisted in pg_hba.conf
`)
    }
    return false
  }
}

// Helper function to execute queries with better error handling
export async function query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
  try {
    const start = Date.now()
    const res = await pool.query<T>(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount })
    return res
  } catch (error: any) {
    console.error('❌ Query execution failed:', {
      error: error.message,
      code: error.code,
      query: text.substring(0, 100)
    })
    
    // If connection error, suggest checking database
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      throw new Error(`Database connection failed: ${error.message}. Please check your database configuration in .env file.`)
    }
    
    throw error
  }
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Dogs table
    await query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        age VARCHAR(100) NOT NULL,
        city VARCHAR(255) NOT NULL,
        curator_name VARCHAR(255) NOT NULL,
        curator_phone VARCHAR(50) NOT NULL,
        curator_email VARCHAR(255),
        photos JSONB NOT NULL,
        description TEXT NOT NULL,
        features JSONB NOT NULL,
        health TEXT NOT NULL,
        character TEXT NOT NULL,
        forum_topic_url TEXT NOT NULL,
        status VARCHAR(50) NOT NULL,
        date_added DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // News table
    await query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title TEXT NOT NULL,
        date DATE NOT NULL,
        preview TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Stories table
    await query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        dog_name VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        part INTEGER,
        preview TEXT NOT NULL,
        content TEXT NOT NULL,
        photos JSONB NOT NULL,
        before_photo TEXT,
        after_photo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Memorial table
    await query(`
      CREATE TABLE IF NOT EXISTS memorial (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        years VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL,
        photo TEXT NOT NULL,
        tribute TEXT NOT NULL,
        date_added DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Adopted dogs table
    await query(`
      CREATE TABLE IF NOT EXISTS adopted (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        city VARCHAR(255) NOT NULL,
        photo TEXT NOT NULL,
        adoption_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Sessions table
    await query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        token VARCHAR(255) UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)

    // Create indexes for better performance
    await query(`CREATE INDEX IF NOT EXISTS idx_dogs_status ON dogs(status)`)
    await query(`CREATE INDEX IF NOT EXISTS idx_dogs_slug ON dogs(slug)`)
    await query(`CREATE INDEX IF NOT EXISTS idx_news_published ON news(published)`)
    await query(`CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC)`)
    await query(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`)

    console.log('✅ Database tables initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  }
}

// Migrate data from JSON files to database
export async function migrateFromJSON() {
  try {
    const { readFile } = await import('node:fs/promises')
    const { resolve } = await import('node:path')
    const { existsSync } = await import('node:fs')

    // Dogs
    const dogsPath = resolve('./data/dogs.json')
    if (existsSync(dogsPath)) {
      const dogsContent = await readFile(dogsPath, 'utf-8')
      const dogsData = JSON.parse(dogsContent)
      
      for (const dog of dogsData) {
        await query(`
          INSERT INTO dogs (slug, name, type, age, city, curator_name, curator_phone, curator_email,
            photos, description, features, health, character, forum_topic_url, status, date_added)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          ON CONFLICT (slug) DO NOTHING
        `, [
          dog.slug, dog.name, dog.type, dog.age, dog.city,
          dog.curator.name, dog.curator.phone, dog.curator.email || null,
          JSON.stringify(dog.photos), dog.description, JSON.stringify(dog.features),
          dog.health, dog.character, dog.forumTopicUrl, dog.status, dog.dateAdded
        ])
      }
      console.log(`✅ Migrated ${dogsData.length} dogs`)
    }

    // News
    const newsPath = resolve('./data/news.json')
    if (existsSync(newsPath)) {
      const newsContent = await readFile(newsPath, 'utf-8')
      const newsData = JSON.parse(newsContent)
      
      for (const item of newsData) {
        await query(`
          INSERT INTO news (slug, title, date, preview, content, image)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (slug) DO NOTHING
        `, [item.slug, item.title, item.date, item.preview, item.content, item.image || null])
      }
      console.log(`✅ Migrated ${newsData.length} news items`)
    }

    // Stories
    const storiesPath = resolve('./data/stories.json')
    if (existsSync(storiesPath)) {
      const storiesContent = await readFile(storiesPath, 'utf-8')
      const storiesData = JSON.parse(storiesContent)
      
      for (const story of storiesData) {
        await query(`
          INSERT INTO stories (slug, dog_name, year, part, preview, content, photos, before_photo, after_photo)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (slug) DO NOTHING
        `, [
          story.slug, story.dogName, story.year, story.part || null,
          story.preview, story.content, JSON.stringify(story.photos),
          story.beforePhoto || null, story.afterPhoto || null
        ])
      }
      console.log(`✅ Migrated ${storiesData.length} stories`)
    }

    // Memorial
    const memorialPath = resolve('./data/memorial.json')
    if (existsSync(memorialPath)) {
      const memorialContent = await readFile(memorialPath, 'utf-8')
      const memorialData = JSON.parse(memorialContent)
      
      for (const entry of memorialData) {
        await query(`
          INSERT INTO memorial (slug, name, years, type, photo, tribute, date_added)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (slug) DO NOTHING
        `, [entry.slug, entry.name, entry.years, entry.type, entry.photo, entry.tribute, entry.dateAdded])
      }
      console.log(`✅ Migrated ${memorialData.length} memorial entries`)
    }

    // Adopted
    const adoptedPath = resolve('./data/adopted.json')
    if (existsSync(adoptedPath)) {
      const adoptedContent = await readFile(adoptedPath, 'utf-8')
      const adoptedData = JSON.parse(adoptedContent)
      
      for (const dog of adoptedData) {
        await query(`
          INSERT INTO adopted (name, type, year, city, photo, adoption_date)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [dog.name, dog.type, dog.year, dog.city, dog.photo, dog.adoptionDate])
      }
      console.log(`✅ Migrated ${adoptedData.length} adopted dogs`)
    }

    console.log('✅ All data migrated from JSON to PostgreSQL')
  } catch (error) {
    console.error('❌ Error migrating data:', error)
    throw error
  }
}
