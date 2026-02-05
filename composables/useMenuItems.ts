import type { MenuItem } from '~/types'

export const useMenuItems = () => {
  const menuItems: MenuItem[] = [
    {
      label: 'Главная',
      to: '/'
    },
    {
      label: 'Пропал / найден',
      to: '/lost-found'
    },
    {
      label: 'Наши результаты',
      children: [
        { label: 'Шнауцеры дома', to: '/results/adopted' },
        { label: 'Счастливые истории', to: '/results/stories' },
        { label: 'В памяти', to: '/results/memorial' }
      ]
    },
    {
      label: 'О нас',
      children: [
        { label: 'Кто мы', to: '/about' },
        { label: 'Правила Фонда', to: '/about/rules' }
      ]
    },
    {
      label: 'Полезно',
      children: [
        { label: 'ЧаВо', to: '/useful/faq' },
        { label: 'Юр отдел', to: '/useful/legal' },
        { label: 'Отдать шнауцера', to: '/useful/give-away' },
        { label: 'Взять шнауцера', to: '/useful/adopt' }
      ]
    },
    {
      label: 'Контакты',
      to: '/contacts'
    }
  ]

  return { menuItems }
}
