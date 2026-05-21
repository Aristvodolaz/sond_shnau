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
  const ids = useState<string[]>(FAVORITES_KEY, () => [])

  // Sync with localStorage on mount (client-only)
  onMounted(() => {
    const saved = readFavorites()
    if (saved.length) {
      ids.value = saved
    }
  })

  // Watch for changes and persist
  watch(ids, (newVal) => {
    if (import.meta.client) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newVal))
    }
  }, { deep: true })

  const has = (id: string) => ids.value.includes(id)

  const toggle = (id: string) => {
    if (has(id)) {
      ids.value = ids.value.filter(x => x !== id)
    } else {
      ids.value = [...ids.value, id]
    }
  }

  const remove = (id: string) => {
    ids.value = ids.value.filter(x => x !== id)
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

  const featureLabel = (f: string) => {
    const key = f.replace(/[^a-zA-Z]/g, '').toLowerCase()
    const features: Record<string, string> = {
      sterilized: 'Стерилизован(а)',
      vaccinated: 'Привит(а)',
      treatedforparasites: 'Обработан(а) от паразитов',
      treatedforparasite: 'Обработан(а) от паразитов',
      castrated: 'Кастрирован',
      passport: 'Есть паспорт',
      chipped: 'Чипирован'
    }
    return features[key] || f
  }

  return { statusLabel, statusVariant, breedLabel, featureLabel }
}

/** tel: ссылка для iOS/Android — только цифры, для РФ 8… → +7… */
export function telHrefFromPhone(phone: string | undefined | null): string | null {
  if (!phone?.trim()) return null

  // 1. Take the first number if multiple numbers are specified (separated by comma, slash, or "или")
  let first = phone.split(/[,;/|]|(?:\s+или\s+)/i)[0].trim()

  // 2. Remove parenthesized comments containing letters, e.g. (звонить после 18) or (Анна)
  // but keep area code parenthesis like (921)
  first = first.replace(/\([^)]*[a-zA-Zа-яА-ЯёЁ][^)]*\)/g, '').trim()

  // 3. Truncate at the first letter (to strip comments like "до 21:00", "спросить Ирину")
  const letterIndex = first.search(/[a-zа-яё]/i)
  if (letterIndex !== -1) {
    first = first.slice(0, letterIndex).trim()
  }

  // 4. Extract digits
  let digits = first.replace(/\D/g, '')
  if (!digits) return null

  // 5. Handle Russian phone number length constraints to avoid trailing numbers from times (e.g. "18:00")
  if ((digits.startsWith('7') || digits.startsWith('8')) && digits.length > 11) {
    digits = digits.slice(0, 11)
  } else if (digits.startsWith('9') && digits.length > 10) {
    digits = digits.slice(0, 10)
  }

  // 6. Convert 8... to 7... and prefix with country code if 10 digits
  if (digits.length === 11 && digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  } else if (digits.length === 10) {
    digits = `7${digits}`
  }

  return `tel:+${digits}`
}

/** Digits only for wa.me / tel */
export function useContactLinks() {
  const digitsPhone = (phone: string) => phone.replace(/\D/g, '')

  const telUrl = (phone: string) => telHrefFromPhone(phone)

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

  return { digitsPhone, waUrl, tgUrl, telUrl }
}
