import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'

const bucket = process.env.S3_BUCKET || ''
const region = process.env.S3_REGION || 'us-east-1'
const endpoint = process.env.S3_ENDPOINT
const accessKeyId = process.env.S3_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || ''
const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL // e.g. https://cdn.example.com or https://bucket.s3.region.amazonaws.com

if (!bucket || !accessKeyId || !secretAccessKey) {
  console.warn(
    '[storage] S3 is not fully configured. Please set S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY in .env',
  )
}

const s3Client = new S3Client({
  region,
  endpoint,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export interface UploadedMedia {
  key: string
  url: string
  mimeType: string
  size: number
}

export function generateObjectKey(filename: string): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const safeName = filename.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-')
  const id = randomUUID()

  return `uploads/${year}/${month}/${id}-${safeName}`
}

export function getPublicUrl(key: string): string {
  if (publicBaseUrl) {
    return `${publicBaseUrl.replace(/\/$/, '')}/${encodeURI(key)}`
  }

  if (endpoint) {
    // Generic S3-compatible endpoint
    const base = endpoint.replace(/\/$/, '')
    return `${base}/${bucket}/${encodeURI(key)}`
  }

  // Default AWS S3 URL format
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodeURI(key)}`
}

export async function uploadBufferToS3(
  buffer: Buffer,
  contentType: string,
  filename: string,
): Promise<UploadedMedia> {
  const key = generateObjectKey(filename)

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    }),
  )

  const url = getPublicUrl(key)

  return {
    key,
    url,
    mimeType: contentType,
    size: buffer.length,
  }
}

export async function deleteFromS3(key: string): Promise<void> {
  if (!key) return

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  )
}

export async function getObjectFromS3(key: string) {
  if (!key) {
    throw new Error('Object key is required')
  }

  return s3Client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  )
}

