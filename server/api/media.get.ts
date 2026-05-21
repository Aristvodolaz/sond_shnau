import { getObjectFromS3 } from '~/server/utils/storage'

function extractObjectKeyFromUrl(rawUrl: string): string {
  const bucket = process.env.S3_BUCKET || ''
  const parsed = new URL(rawUrl)
  const host = parsed.hostname

  const allowedHosts = new Set<string>([
    'storage.yandexcloud.net',
    ...(process.env.S3_ENDPOINT ? [new URL(process.env.S3_ENDPOINT).hostname] : []),
    ...(process.env.S3_PUBLIC_BASE_URL ? [new URL(process.env.S3_PUBLIC_BASE_URL).hostname] : []),
  ])

  if (!allowedHosts.has(host)) {
    throw createError({
      statusCode: 400,
      message: 'Unsupported media host',
    })
  }

  const path = decodeURIComponent(parsed.pathname.replace(/^\/+/, ''))
  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'Invalid media URL',
    })
  }

  // Yandex Object Storage URL format: /<bucket>/<key>
  if (bucket && path.startsWith(`${bucket}/`)) {
    return path.slice(bucket.length + 1)
  }

  // Fallback for pre-normalized keys
  return path
}

async function streamToBuffer(stream: any): Promise<Buffer> {
  if (stream instanceof Buffer) {
    return stream
  }
  if (!stream) {
    return Buffer.alloc(0)
  }
  const chunks: any[] = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  const rawUrl = String(query.url || '')

  if (!rawUrl) {
    throw createError({
      statusCode: 400,
      message: 'url query parameter is required',
    })
  }

  const key = extractObjectKeyFromUrl(rawUrl)
  const result = await getObjectFromS3(key)
  const contentType = result.ContentType || 'application/octet-stream'

  setHeader(event, 'Content-Type', contentType)
  // Cache in browser for 1 year (immutable)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  
  if (result.ETag) {
    setHeader(event, 'ETag', result.ETag)
  }

  const buffer = await streamToBuffer(result.Body)
  return buffer
}, {
  maxAge: 7 * 24 * 60 * 60, // 7 days server cache
  name: 'media',
  getKey: (event) => {
    const query = getQuery(event)
    return String(query.url || '')
  }
})


