import { query } from '~/server/database/db'

export default defineEventHandler(async () => {
  const result = await query('SELECT * FROM dogs ORDER BY date_added DESC')

  return result.rows.map((dog: any) => ({
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
    photos: dog.photos, // Already JSONB in PostgreSQL
    description: dog.description,
    features: dog.features, // Already JSONB in PostgreSQL
    health: dog.health,
    character: dog.character,
    forumTopicUrl: dog.forum_topic_url,
    status: dog.status,
    dateAdded: dog.date_added
  }))
})
