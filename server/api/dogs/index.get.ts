import { fetchAnimalsList, parseAnimalsQuery } from '~/server/utils/animalsList'

const META_KEYS = new Set(['page', 'pageSize', 'sort', 'legacyAll', 'all'])

export default defineEventHandler(async (event) => {
  try {
    const parsed = parseAnimalsQuery(event)
    const q = (getQuery(event) || {}) as Record<string, unknown>
    const queryKeys = Object.keys(q)

    const hasFilters = queryKeys.some((k) => {
      if (META_KEYS.has(k)) return false
      const v = q[k]
      if (v === undefined || v === null || v === '') return false
      if (Array.isArray(v) && v.length === 0) return false
      return true
    })

    const explicitPage = queryKeys.includes('page') || queryKeys.includes('pageSize')

    if (!hasFilters && !explicitPage) {
      parsed.legacyAll = true
    }

    const result = await fetchAnimalsList(parsed)

    if (!hasFilters && !explicitPage) {
      return result.items
    }
    return result
  } catch (error: any) {
    console.error('Error in /api/dogs:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch dogs from database'
    })
  }
})
