/** Normalize photo URL from DB (full URL, /static path, or bare S3 key). */
export function normalizePhotoUrl(url: string): string {
  const t = url.trim()
  if (!t) return ''

  if (t.startsWith('http://') || t.startsWith('https://') || t.startsWith('/')) {
    return t
  }

  const base = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, '')
  if (base) {
    return `${base}/${t.replace(/^\/+/, '')}`
  }

  return t
}

export function normalizePhotoList(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map(String).map(normalizePhotoUrl).filter(Boolean)
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) {
        return parsed.map(String).map(normalizePhotoUrl).filter(Boolean)
      }
    } catch {
      const one = normalizePhotoUrl(raw)
      return one ? [one] : []
    }
  }
  return []
}

export function isStoragePhotoHost(hostname: string): boolean {
  return hostname === 'storage.yandexcloud.net' || hostname.endsWith('.storage.yandexcloud.net')
}
