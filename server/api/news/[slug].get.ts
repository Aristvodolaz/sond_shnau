import { query } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const result = await query('SELECT * FROM news WHERE slug = $1 AND published = true', [slug])

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'News not found'
    })
  }

  const item = result.rows[0]

  return {
    id: item.id.toString(),
    slug: item.slug,
    title: item.title,
    date: item.date,
    preview: item.preview,
    content: item.content,
    image: item.image
  }
})
