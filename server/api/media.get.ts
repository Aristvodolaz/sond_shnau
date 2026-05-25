import { sendStream } from 'h3'
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

  // Path-style: /bucket/key
  if (bucket && path.startsWith(`${bucket}/`)) {
    return path.slice(bucket.length + 1)
  }

  // Virtual-hosted: https://bucket.storage.yandexcloud.net/key
  return path
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
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')
    if (result.ETag) {
      setHeader(event, 'ETag', result.ETag)
    }

    return sendStream(event, result.Body as ReadableStream)
  } catch (err: unknown) {
    const e = err as { statusCode?: number }
    if (e.statusCode) throw err
    console.error('[media] Failed to load:', rawUrl, err)
    throw createError({ statusCode: 404, message: 'Media not found' })
  }
})
