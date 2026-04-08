export const useMediaUrl = () => {
  const resolveMediaUrl = (url?: string | null): string => {
    if (!url) return ''

    // Keep local/static paths as-is.
    if (url.startsWith('/') && !url.startsWith('//')) {
      return url
    }

    try {
      const parsed = new URL(url)
      const isObjectStorageHost =
        parsed.hostname === 'storage.yandexcloud.net' ||
        parsed.hostname.includes('storage.yandexcloud.net')

      if (isObjectStorageHost) {
        return `/api/media?url=${encodeURIComponent(url)}`
      }
    } catch {
      return url
    }

    return url
  }

  return { resolveMediaUrl }
}

