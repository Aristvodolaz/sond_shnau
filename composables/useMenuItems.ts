import { config } from '~/utils/config'

/** Видимые в шапке постоянно (не перегружают строку) */
const menuPrimary: MenuItem[] = [
  { label: 'Главная', to: '/' },
  { label: 'Шнауцеры', to: '/animals' },
  { label: 'Форум', href: config.FORUM_URL },
  { label: 'Помочь фонду', to: '/support' },
  { label: 'Контакты', to: '/contacts' }
]

/** Выпадающее «Ещё» */
const menuMore: MenuItem[] = [
  { label: 'Пропал / найден', to: '/lost-found' },
  { label: 'Шнауцеры дома', to: '/results/adopted' },
  { label: 'Информация', to: '/about' },
  { label: 'Отдать шнауцера', to: '/useful/give-away' },
  { label: 'Взять шнауцера', to: '/useful/adopt' }
]

export const useMenuItems = () => {
  return {
    menuPrimary,
    menuMore
  }
}
