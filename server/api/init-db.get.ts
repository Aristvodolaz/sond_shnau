import { initDatabase, migrateFromJSON } from '../database/db'
import { ensureAdminUser } from '../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    console.log('🔧 Initializing PostgreSQL database...')
    
    await initDatabase()
    await migrateFromJSON()
    await ensureAdminUser()
    
    console.log('✅ Database ready!')
    
    return {
      success: true,
      message: 'Database initialized successfully',
      steps: [
        'Tables created',
        'Data migrated from JSON',
        'Admin user created (username: admin, password: admin123)'
      ]
    }
  } catch (error: any) {
    console.error('❌ Error initializing database:', error)
    throw createError({
      statusCode: 500,
      message: `Database initialization failed: ${error.message}`
    })
  }
})
