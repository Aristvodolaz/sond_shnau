import { query } from '~/server/database/db'

export default defineEventHandler(async () => {
  const result = await query('SELECT * FROM news WHERE published = true ORDER BY date DESC')

  return result.rows.map((item: any) => ({
    id: item.id.toString(),
    slug: item.slug,
    title: item.title,
    date: item.date,
    preview: item.preview,
    content: item.content,
    image: item.image
  }))
})
