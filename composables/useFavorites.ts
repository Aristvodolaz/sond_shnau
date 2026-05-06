import type { AnimalStatus } from '~/types'

const FAVORITES_KEY = 'fond-favorite-animals'

function readFavorites(): string[] {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) as string[] : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const ids = useState<string[]>(FAVORITES_KEY, () => readFavorites())

  const persist = () => {
    if (!import.meta.client) return
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids.value))
  }

  const has = (id: string) => ids.value.includes(id)

  const toggle = (id: string) => {
    if (has(id)) ids.value = ids.value.filter(x => x !== id)
    else ids.value = [...ids.value, id]
    persist()
  }

  const remove = (id: string) => {
    ids.value = ids.value.filter(x => x !== id)
    persist()
  }

  return { ids, has, toggle, remove }
}

export function useAnimalLabels() {
  const statusLabel = (s: AnimalStatus) => {
    if (s === 'looking') return 'Ищет дом'
    if (s === 'foster') return 'На передержке'
    return 'Пенсионер'
  }

  const statusVariant = (s: AnimalStatus): 'success' | 'info' | 'warning' => {
    if (s === 'looking') return 'success'
    if (s === 'foster') return 'warning'
    return 'info'
  }

  const breedLabel = (type: string) => {
    const types: Record<string, string> = {
      riesenschnauzer: 'Ризеншнауцер',
      mittelschnauzer: 'Миттельшнауцер',
      zwergschnauzer: 'Цвергшнауцер',
      metis: 'Метис'
    }
    return types[type] || type
  }

  return { statusLabel, statusVariant, breedLabel }
}

/** Digits only for wa.me / tel */
export function useContactLinks() {
  const digitsPhone = (phone: string) => phone.replace(/\D/g, '')

  const waUrl = (phone: string, text?: string) => {
    const n = digitsPhone(phone)
    if (!n) return '#'
    const q = text ? `?text=${encodeURIComponent(text)}` : ''
    return `https://wa.me/${n}${q}`
  }

  const tgUrl = (handle: string) => {
    const h = handle.replace(/^@/, '').trim()
    if (!h) return '#'
    return `https://t.me/${h}`
  }

  return { digitsPhone, waUrl, tgUrl }
}
