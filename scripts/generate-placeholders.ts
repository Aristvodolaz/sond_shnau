import fs from 'fs'
import path from 'path'

// 1. Load .env file manually into process.env before importing db module
const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const firstEquals = trimmed.indexOf('=')
    if (firstEquals === -1) continue
    const key = trimmed.slice(0, firstEquals).trim()
    const val = trimmed.slice(firstEquals + 1).trim()
    process.env[key] = val
  }
}

// We will import the database client dynamically after process.env is populated to avoid ESM import hoisting.
async function generatePlaceholders() {
  const { query, pool } = await import('../server/database/db')
  console.log('🔍 Scanning database for missing local images...')
  const uniqueImages = new Set<string>()

  // 1x1 transparent PNG as buffer (works for PNG and WebP)
  const PNG_1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')

  // 1x1 black JPEG as buffer (more compatible for JPG files)
  const JPG_1x1 = Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=', 'base64')

  try {
    // 1. Stories
    try {
      const storiesResult = await query('SELECT photos, before_photo, after_photo FROM stories')
      for (const row of storiesResult.rows) {
        if (row.before_photo) uniqueImages.add(row.before_photo)
        if (row.after_photo) uniqueImages.add(row.after_photo)
        if (row.photos) {
          const photos = typeof row.photos === 'string' ? JSON.parse(row.photos) : row.photos
          if (Array.isArray(photos)) {
            photos.forEach(p => uniqueImages.add(p))
          }
        }
      }
    } catch (e: any) {
      console.warn('⚠️  Could not query stories table:', e.message)
    }

    // 2. Memorial
    try {
      const memorialResult = await query('SELECT photo FROM memorial')
      for (const row of memorialResult.rows) {
        if (row.photo) uniqueImages.add(row.photo)
      }
    } catch (e: any) {
      console.warn('⚠️  Could not query memorial table:', e.message)
    }

    // 3. Dogs
    try {
      const dogsResult = await query('SELECT photos FROM dogs')
      for (const row of dogsResult.rows) {
        if (row.photos) {
          const photos = typeof row.photos === 'string' ? JSON.parse(row.photos) : row.photos
          if (Array.isArray(photos)) {
            photos.forEach(p => uniqueImages.add(p))
          }
        }
      }
    } catch (e: any) {
      console.warn('⚠️  Could not query dogs table:', e.message)
    }

    // 4. Adopted
    try {
      const adoptedResult = await query('SELECT photo FROM adopted')
      for (const row of adoptedResult.rows) {
        if (row.photo) uniqueImages.add(row.photo)
      }
    } catch (e: any) {
      console.warn('⚠️  Could not query adopted table:', e.message)
    }

    // 5. News
    try {
      const newsResult = await query('SELECT image FROM news')
      for (const row of newsResult.rows) {
        if (row.image) uniqueImages.add(row.image)
      }
    } catch (e: any) {
      console.warn('⚠️  Could not query news table:', e.message)
    }

    // Process collected image paths
    let createdCount = 0
    let skippedCount = 0

    for (const imgPath of uniqueImages) {
      // We only care about local paths starting with /images/
      if (!imgPath.startsWith('/images/')) {
        continue
      }

      const localFilePath = path.join(process.cwd(), 'public', imgPath)

      if (fs.existsSync(localFilePath)) {
        skippedCount++
        continue
      }

      // Ensure directory exists
      const dir = path.dirname(localFilePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      // Choose buffer based on extension
      const ext = path.extname(localFilePath).toLowerCase()
      const buffer = (ext === '.jpg' || ext === '.jpeg') ? JPG_1x1 : PNG_1x1

      fs.writeFileSync(localFilePath, buffer)
      createdCount++
      console.log(`📸 Created placeholder: ${imgPath}`)
    }

    console.log(`\n🎉 Scan complete! Created ${createdCount} placeholders, ${skippedCount} files already existed.\n`)
  } catch (error: any) {
    console.error('❌ Error during placeholder generation:', error)
  } finally {
    await pool.end()
  }
}

generatePlaceholders()
