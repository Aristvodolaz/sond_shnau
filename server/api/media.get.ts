import { getObjectFromS3 } from '~/server/utils/storage'
import { isStoragePhotoHost } from '~/server/utils/photoUrl'

function extractObjectKeyFromUrl(rawUrl: string): string {
  const bucket = process.env.S3_BUCKET || ''
  const parsed = new URL(rawUrl)
  const host = parsed.hostname

  const allowedHosts = new Set<string>([
    'storage.yandexcloud.net',
    ...(process.env.S3_ENDPOINT ? [new URL(process.env.S3_ENDPOINT).hostname] : []),
    ...(process.env.S3_PUBLIC_BASE_URL ? [new URL(process.env.S3_PUBLIC_BASE_URL).hostname] : []),
  ])

  if (!allowedHosts.has(host) && !isStoragePhotoHost(host)) {
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

  if (bucket && path.startsWith(`${bucket}/`)) {
    return path.slice(bucket.length + 1)
  }

  return path
}

async function streamToBuffer(body: unknown): Promise<Buffer> {
  if (body instanceof Buffer) return body
  if (!body || typeof body !== 'object') return Buffer.alloc(0)

  const readable = body as AsyncIterable<Uint8Array | string>
  const chunks: Buffer[] = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : Buffer.from(chunk))
  }
  return Buffer.concat(chunks)
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rawUrl = String(query.url || '')

  if (!rawUrl) {
    throw createError({
      statusCode: 400,
      message: 'url query parameter is required',
    })
  }

  try {
    const key = extractObjectKeyFromUrl(rawUrl)
    const result = await getObjectFromS3(key)

    if (!result.Body) {
      throw createError({ statusCode: 404, message: 'Media not found' })
    }

    const contentType = result.ContentType || 'application/octet-stream'
    const buffer = await streamToBuffer(result.Body)

    if (!buffer.length) {
      throw createError({ statusCode: 404, message: 'Media not found' })
    }

    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Content-Length', String(buffer.length))
    setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')
    if (result.ETag) {
      setHeader(event, 'ETag', result.ETag)
    }

    return buffer
  } catch (err: unknown) {
    const e = err as { statusCode?: number }
    if (e.statusCode) throw err
    console.error('[media] Failed to load:', rawUrl, err)
    throw createError({ statusCode: 404, message: 'Media not found' })
  }
})
