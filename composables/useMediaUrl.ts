function isProxiedStorageHost(hostname: string): boolean {
  if (hostname === 'storage.yandexcloud.net') return true
  // bucket.storage.yandexcloud.net
  if (hostname.endsWith('.storage.yandexcloud.net')) return true
  return false
}

export const useMediaUrl = () => {
  const resolveMediaUrl = (url?: string | null): string => {
    if (!url?.trim()) return ''

    const trimmed = url.trim()

    // Local/static paths
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return trimmed
    }

    try {
      const parsed = new URL(trimmed)
      if (isProxiedStorageHost(parsed.hostname)) {
        return `/api/media?url=${encodeURIComponent(trimmed)}`
      }
    } catch {
      return trimmed
    }

    return trimmed
  }

  return { resolveMediaUrl }
}
