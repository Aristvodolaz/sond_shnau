/**
 * In-memory cache with TTL support for high-load optimization.
 * Eliminates redundant database queries for public read endpoints.
 *
 * For horizontal scaling (multiple server instances), replace with Redis.
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
  etag: string
}

class MemoryCache {
  private store = new Map<string, CacheEntry<any>>()
  private maxSize: number

  constructor(maxSize = 1000) {
    this.maxSize = maxSize

    // Cleanup expired entries every 60 seconds
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 60_000)
    }
  }

  /**
   * Get cached value, returns null if expired or not found.
   */
  get<T>(key: string): { data: T; etag: string } | null {
    const entry = this.store.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }

    return { data: entry.data as T, etag: entry.etag }
  }

  /**
   * Set cached value with TTL in milliseconds.
   */
  set<T>(key: string, data: T, ttlMs: number): string {
    // Evict oldest if at capacity
    if (this.store.size >= this.maxSize && !this.store.has(key)) {
      const firstKey = this.store.keys().next().value
      if (firstKey) this.store.delete(firstKey)
    }

    const etag = this.generateEtag(data)
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
      etag,
    })

    return etag
  }

  /**
   * Invalidate a specific cache key or a pattern (prefix match).
   */
  invalidate(keyOrPrefix: string): void {
    // Exact match
    if (this.store.has(keyOrPrefix)) {
      this.store.delete(keyOrPrefix)
      return
    }

    // Prefix match for invalidating groups (e.g., 'dogs:' invalidates all dog caches)
    for (const key of this.store.keys()) {
      if (key.startsWith(keyOrPrefix)) {
        this.store.delete(key)
      }
    }
  }

  /**
   * Clear entire cache.
   */
  clear(): void {
    this.store.clear()
  }

  /**
   * Get cache statistics for monitoring.
   */
  stats(): { size: number; maxSize: number; keys: string[] } {
    return {
      size: this.store.size,
      maxSize: this.maxSize,
      keys: [...this.store.keys()],
    }
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key)
      }
    }
  }

  private generateEtag(data: any): string {
    const str = JSON.stringify(data)
    // Simple hash for ETag — fast and good enough for cache validation
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash |= 0 // Convert to 32bit integer
    }
    return `"${Math.abs(hash).toString(36)}"` 
  }
}

/** Global cache instance — shared across all API handlers */
export const apiCache = new MemoryCache(500)

/** Cache TTL constants (milliseconds) */
export const CACHE_TTL = {
  /** Public list endpoints (dogs, news, stories, etc.) — 2 minutes */
  LIST: 2 * 60 * 1000,
  /** Individual item endpoints (dog by slug) — 5 minutes */
  DETAIL: 5 * 60 * 1000,
  /** RSS feed — 15 minutes */
  RSS: 15 * 60 * 1000,
  /** Memorial/adopted — 10 minutes (changes rarely) */
  STATIC: 10 * 60 * 1000,
} as const
