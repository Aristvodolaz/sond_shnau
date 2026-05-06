import type { H3Event } from 'h3'
import { query } from '~/server/database/db'
import { mapDogRow } from '~/server/utils/dogMapper'
import type { AnimalListResponse } from '~/types'

export interface AnimalsQuery {
  city?: string
  type?: string
  status?: string
  age?: string
  q?: string
  page: number
  pageSize: number
  sort: 'date_desc' | 'date_asc'
  /** When true, ignore pagination and return full list (legacy /api/dogs) */
  legacyAll?: boolean
}

function parsePositiveInt(value: string | undefined, fallback: number, max?: number): number {
  const n = Number.parseInt(String(value || ''), 10)
  if (Number.isNaN(n) || n < 1) return fallback
  if (max != null && n > max) return max
  return n
}

function ageBucketRange(bucket: string): { min: number; max: number } | null {
  switch (bucket) {
    case 'puppy':
      return { min: 0, max: 12 }
    case 'young':
      return { min: 13, max: 36 }
    case 'adult':
      return { min: 37, max: 84 }
    case 'senior':
      return { min: 85, max: 600 }
    default:
      return null
  }
}

export function parseAnimalsQuery(event: H3Event): AnimalsQuery {
  const q = getQuery(event) as Record<string, string | string[] | undefined>
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined

  return {
    city: first(q.city),
    type: first(q.type) || first(q.breed),
    status: first(q.status),
    age: first(q.age),
    q: first(q.q),
    page: parsePositiveInt(first(q.page) as string | undefined, 1),
    pageSize: parsePositiveInt(first(q.pageSize) as string | undefined, 12, 48),
    sort: first(q.sort) === 'date_asc' ? 'date_asc' : 'date_desc',
    legacyAll: first(q.legacyAll) === '1' || first(q.all) === '1'
  }
}

/** Fetches filtered animals from DB; throws createError if DB unavailable */
export async function fetchAnimalsList(opts: AnimalsQuery): Promise<AnimalListResponse> {
  const conditions: string[] = []
  const params: unknown[] = []
  let i = 1

  if (opts.city) {
    conditions.push(`city ILIKE $${i}`)
    params.push(`%${opts.city.trim()}%`)
    i++
  }

  if (opts.type && opts.type !== 'all') {
    conditions.push(`type = $${i}`)
    params.push(opts.type)
    i++
  }

  if (opts.status && opts.status !== 'all') {
    conditions.push(`status = $${i}`)
    params.push(opts.status)
    i++
  }

  const range = opts.age && opts.age !== 'all' ? ageBucketRange(opts.age) : null
  if (range) {
    conditions.push(`(age_months IS NULL OR (age_months >= $${i} AND age_months <= $${i + 1}))`)
    params.push(range.min, range.max)
    i += 2
  }

  if (opts.q && opts.q.trim()) {
    const term = `%${opts.q.trim().replace(/%/g, '\\%')}%`
    conditions.push(
      `(name ILIKE $${i} OR city ILIKE $${i + 1} OR description ILIKE $${i + 2} OR character ILIKE $${i + 3} OR COALESCE(story,'') ILIKE $${i + 4})`
    )
    params.push(term, term, term, term, term)
    i += 5
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const orderSql = opts.sort === 'date_asc' ? 'date_added ASC, id ASC' : 'date_added DESC, id DESC'

  try {
    if (opts.legacyAll) {
      const [countResult, listResult] = await Promise.all([
        query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM dogs ${whereSql}`, params),
        query(`SELECT * FROM dogs ${whereSql} ORDER BY ${orderSql}`, params)
      ])
      const total = Number.parseInt(countResult.rows[0]?.count || '0', 10)
      return {
        items: listResult.rows.map(r => mapDogRow(r as Record<string, unknown>)),
        total,
        page: 1,
        pageSize: total
      }
    }

    const offset = (opts.page - 1) * opts.pageSize
    const [countResult, listResult] = await Promise.all([
      query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM dogs ${whereSql}`, params),
      query(
        `SELECT * FROM dogs ${whereSql} ORDER BY ${orderSql} LIMIT $${i} OFFSET $${i + 1}`,
        [...params, opts.pageSize, offset]
      )
    ])

    const total = Number.parseInt(countResult.rows[0]?.count || '0', 10)
    return {
      items: listResult.rows.map(r => mapDogRow(r as Record<string, unknown>)),
      total,
      page: opts.page,
      pageSize: opts.pageSize
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' ? 503 : 500,
      statusMessage: 'Failed to fetch animals'
    })
  }
}
