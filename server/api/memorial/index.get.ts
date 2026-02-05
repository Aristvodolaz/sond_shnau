import { query } from '~/server/database/db'

export default defineEventHandler(async () => {
  const result = await query('SELECT * FROM memorial ORDER BY date_added DESC')

  return result.rows.map((entry: any) => ({
    id: entry.id.toString(),
    slug: entry.slug,
    name: entry.name,
    years: entry.years,
    type: entry.type,
    photo: entry.photo,
    tribute: entry.tribute,
    dateAdded: entry.date_added
  }))
})
