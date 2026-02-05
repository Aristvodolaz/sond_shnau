// Type definitions for the application

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
  }
  photos: string[]
  description: string
  features: string[]
  health: string
  character: string
  forumTopicUrl: string
  status: 'available' | 'pensioner'
  dateAdded: string
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
  external?: boolean
  children?: MenuItem[]
}
