// Type definitions for the application

/** looking — ищет дом; trial — на испытательном сроке; foster — на передержке; pensioner — программа пенсионеров */
export type AnimalStatus = 'looking' | 'trial' | 'foster' | 'pensioner'

export interface Dog {
  id: string
  slug: string
  name: string
  type: 'riesenschnauzer' | 'mittelschnauzer' | 'zwergschnauzer' | 'metis'
  age: string
  city: string
  curator: {
    name: string
    phone: string
    email?: string
    whatsapp?: string
    telegram?: string
  }
  photos: string[]
  description: string
  features: string[]
  health: string
  character: string
  /** Необязательно: старые темы форума, без редиректа из основного сценария */
  forumTopicUrl?: string
  status: AnimalStatus
  dateAdded: string
  /** Для фильтров по возрасту в API; если null — не участвует в возрастном фильтре */
  ageMonths: number | null
  story: string
}

export interface AnimalListResponse {
  items: Dog[]
  total: number
  page: number
  pageSize: number
}

export interface AdoptionRequestBody {
  animalId?: string
  applicantName: string
  phone: string
  email?: string
  message?: string
  preferredChannel: 'phone' | 'whatsapp' | 'telegram' | 'email'
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  date: string
  preview: string
  content: string
  image?: string
}

export interface Story {
  id: string
  slug: string
  dogName: string
  year: number
  part?: number
  preview: string
  content: string
  photos: string[]
  beforePhoto?: string
  afterPhoto?: string
}

export interface MemorialEntry {
  id: string
  slug: string
  name: string
  years: string
  type: string
  photo: string
  tribute: string
  dateAdded: string
}

export interface AdoptedDog {
  id: string
  name: string
  type: string
  year: number
  city: string
  photo: string
  adoptionDate: string
  forumUrl?: string
}

export interface RssItem {
  title: string
  link: string
  pubDate: string
  contentSnippet?: string
  content?: string
}

export interface MenuItem {
  label: string
  to?: string
  href?: string
  external?: boolean
  children?: MenuItem[]
}
