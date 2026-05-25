function isProxiedStorageHost(hostname: string): boolean {
  if (hostname === 'storage.yandexcloud.net') return true
  if (hostname.endsWith('.storage.yandexcloud.net')) return true
  return false
}

function toAbsoluteStorageUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  const config = useRuntimeConfig()
  const base = String(config.public.s3PublicBaseUrl || '').replace(/\/$/, '')
  if (base) {
    return `${base}/${trimmed.replace(/^\/+/, '')}`
  }

  return trimmed
}

export const useMediaUrl = () => {
  const resolveMediaUrl = (url?: string | null): string => {
    if (!url?.trim()) return ''

    const absolute = toAbsoluteStorageUrl(url)
    if (!absolute) return ''

    if (absolute.startsWith('/') && !absolute.startsWith('//')) {
      return absolute
    }

    try {
      const parsed = new URL(absolute)
      if (isProxiedStorageHost(parsed.hostname)) {
        return `/api/media?url=${encodeURIComponent(absolute)}`
      }
    } catch {
      return absolute
    }

    return absolute
  }

  return { resolveMediaUrl }
}
