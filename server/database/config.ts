// Database configuration using environment variables
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'fond_shnau',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: process.env.DB_SSL === 'true',
  // Connection timeout settings
  connectionTimeoutMillis: 5000, // 5 seconds timeout for connection attempts
  idleTimeoutMillis: 30000, // 30 seconds before idle connection is closed
  max: 10 // Maximum number of clients in the pool
}
