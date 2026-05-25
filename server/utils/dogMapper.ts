import type { Dog } from '~/types'
import { normalizePhotoList } from '~/server/utils/photoUrl'

function normalizeFeatures(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String)
  if (raw && typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k)
  }
  return []
}

// Maps a PostgreSQL dogs row to the public Dog type used by the app.
export function mapDogRow(dog: Record<string, unknown>): Dog {
  return {
    id: String(dog.id),
    slug: dog.slug as string,
    name: dog.name as string,
    type: dog.type as Dog['type'],
    age: dog.age as string,
    city: dog.city as string,
    curator: {
      name: dog.curator_name as string,
      phone: dog.curator_phone as string,
      email: (dog.curator_email as string | null) ?? undefined,
      whatsapp: (dog.curator_whatsapp as string | null) ?? undefined,
      telegram: (dog.curator_telegram as string | null) ?? undefined
    },
    photos: normalizePhotoList(dog.photos),
    description: (dog.description as string) || '',
    features: normalizeFeatures(dog.features),
    health: dog.health as string,
    character: dog.character as string,
    forumTopicUrl: (dog.forum_topic_url as string | null) || undefined,
    status: (dog.status as Dog['status']) || 'looking',
    dateAdded: dog.date_added as string,
    ageMonths: dog.age_months != null ? Number(dog.age_months) : null,
    story: (dog.story as string | null) ?? ''
  }
}
