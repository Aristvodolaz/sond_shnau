import type { MenuItem } from '~/types'

/** Видимые в шапке постоянно (не перегружают строку) */
const menuPrimary: MenuItem[] = [
  { label: 'Главная', to: '/' },
  { label: 'Животные', to: '/animals' },
  { label: 'Избранное', to: '/favorites' },
  { label: 'Помочь фонду', to: '/support' },
  { label: 'Контакты', to: '/contacts' }
]

/** Выпадающее «Ещё» */
const menuMore: MenuItem[] = [
  { label: 'Пропал / найден', to: '/lost-found' },
  { label: 'Новости форума', to: '/forum-news' },
  { label: 'Шнауцеры дома', to: '/results/adopted' },
  { label: 'Кто мы', to: '/about' },
  { label: 'Правила Фонда', to: '/about/rules' },
  { label: 'ЧаВо', to: '/useful/faq' },
  { label: 'Юр отдел', to: '/useful/legal' },
  { label: 'Отдать шнауцера', to: '/useful/give-away' },
  { label: 'Взять шнауцера', to: '/useful/adopt' }
]

export const useMenuItems = () => {
  return {
    menuPrimary,
    menuMore
  }
}
