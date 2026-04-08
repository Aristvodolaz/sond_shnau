import { requireAuth } from '~/server/utils/auth'
import { query } from '~/server/database/db'
import { uploadBufferToS3 } from '~/server/utils/storage'

// Must stay below reverse-proxy limits (nginx default is 1m — raise client_max_body_size on the server)
const DEFAULT_MAX_MB = 25
const allowedMimeTypes =
  process.env.UPLOAD_ALLOWED_MIME?.split(',').map((t) => t.trim()) ||
  ['image/jpeg', 'image/png', 'image/webp']

const maxSizeBytes =
  (Number(process.env.UPLOAD_MAX_FILE_SIZE_MB || DEFAULT_MAX_MB) || DEFAULT_MAX_MB) *
  1024 *
  1024

// simple in-memory rate limit per IP for uploads
const uploadCounters = new Map<string, { count: number; resetAt: number }>()
const UPLOAD_LIMIT_PER_MINUTE = Number(process.env.UPLOAD_RATE_LIMIT_PER_MINUTE || '20')

function checkRateLimit(ip: string) {
  const now = Date.now()
  const bucket = uploadCounters.get(ip)

  if (!bucket || bucket.resetAt < now) {
    uploadCounters.set(ip, { count: 1, resetAt: now + 60_000 })
    return
  }

  if (bucket.count >= UPLOAD_LIMIT_PER_MINUTE) {
    throw createError({
      statusCode: 429,
      message: 'Too many upload requests. Please try again later.',
    })
  }

  bucket.count += 1
}

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const ip =
    getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  checkRateLimit(ip)

  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({
      statusCode: 400,
      message: 'No form data received',
    })
  }

  const filePart = formData.find((part) => part.name === 'file')

  if (!filePart || !filePart.filename || !filePart.data) {
    throw createError({
      statusCode: 400,
      message: 'File is required (field name: file)',
    })
  }

  const buffer = Buffer.from(filePart.data)

  if (buffer.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Empty file',
    })
  }

  if (buffer.length > maxSizeBytes) {
    throw createError({
      statusCode: 413,
      message: `File is too large. Max size is ${
        maxSizeBytes / (1024 * 1024)
      }MB`,
    })
  }

  const mimeType = filePart.type || 'application/octet-stream'

  if (!allowedMimeTypes.includes(mimeType)) {
    throw createError({
      statusCode: 400,
      message: 'Unsupported file type',
    })
  }

  // Basic security: allow only known image extensions
  const lowerName = filePart.filename.toLowerCase()
  if (!lowerName.match(/\.(jpg|jpeg|png|webp)$/)) {
    throw createError({
      statusCode: 400,
      message: 'Only JPG, PNG and WEBP images are allowed',
    })
  }

  const uploaded = await uploadBufferToS3(
    buffer,
    mimeType,
    filePart.filename,
  )

  const result = await query<{ id: number }>(
    `
      INSERT INTO media (key, url, mime_type, size)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `,
    [uploaded.key, uploaded.url, uploaded.mimeType, uploaded.size],
  )

  const mediaId = result.rows[0].id

  return {
    id: mediaId,
    url: uploaded.url,
    mimeType: uploaded.mimeType,
    size: uploaded.size,
  }
}
)

