import { query } from '~/server/database/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const result = await query('SELECT * FROM dogs WHERE slug = $1', [slug])

  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Dog not found'
    })
  }

  const dog = result.rows[0]

  return {
    id: dog.id.toString(),
    slug: dog.slug,
    name: dog.name,
    type: dog.type,
    age: dog.age,
    city: dog.city,
    curator: {
      name: dog.curator_name,
      phone: dog.curator_phone,
      email: dog.curator_email
    },
    photos: dog.photos,
    description: dog.description,
    features: dog.features,
    health: dog.health,
    character: dog.character,
    forumTopicUrl: dog.forum_topic_url,
    status: dog.status,
    dateAdded: dog.date_added
  }
})
