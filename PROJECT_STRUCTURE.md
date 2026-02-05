# 📂 Структура проекта

## Дерево файлов

```
fond/
│
├── .gitignore                         # Игнорируемые Git файлы
├── package.json                       # Зависимости и скрипты
├── tsconfig.json                      # Конфигурация TypeScript
├── nuxt.config.ts                     # Конфигурация Nuxt 3
├── tailwind.config.ts                 # Конфигурация TailwindCSS
├── README.md                          # Основная документация
├── SETUP.md                           # Инструкция по настройке
├── PROJECT_STRUCTURE.md               # Этот файл
│
├── assets/
│   └── css/
│       └── main.css                   # Основные стили, Tailwind, шрифты
│
├── components/                        # Vue компоненты
│   ├── AppHeader.vue                  # Шапка сайта с навигацией
│   ├── AppFooter.vue                  # Футер сайта
│   ├── DogCard.vue                    # Карточка собаки (для списка)
│   ├── NewsCard.vue                   # Карточка новости
│   ├── RssWidget.vue                  # RSS виджет на главной
│   ├── UiButton.vue                   # Универсальная кнопка
│   ├── UiCard.vue                     # Универсальная карточка
│   ├── UiTag.vue                      # Тег/бейдж
│   └── UiAccordion.vue                # Аккордеон (раскрывающийся блок)
│
├── composables/                       # Composables (переиспользуемая логика)
│   └── useMenuItems.ts                # Структура меню сайта
│
├── data/                              # JSON данные (редактируемые без кода)
│   ├── dogs.json                      # Список собак на пристройство
│   ├── news.json                      # Новости фонда
│   ├── stories.json                   # Счастливые истории
│   ├── memorial.json                  # В памяти (ушедшие собаки)
│   └── adopted.json                   # Пристроенные собаки (архив)
│
├── pages/                             # Страницы (автоматический роутинг)
│   ├── index.vue                      # Главная (/)
│   ├── lost-found.vue                 # Пропал/найден (/lost-found)
│   ├── contacts.vue                   # Контакты (/contacts)
│   │
│   ├── about/                         # Раздел "О нас"
│   │   ├── index.vue                  # Кто мы (/about)
│   │   └── rules.vue                  # Правила фонда (/about/rules)
│   │
│   ├── dogs/                          # Собаки
│   │   └── [slug].vue                 # Детальная страница собаки (/dogs/reks)
│   │
│   ├── news/                          # Новости
│   │   └── [slug].vue                 # Детальная страница новости (/news/slug)
│   │
│   ├── results/                       # Наши результаты
│   │   ├── adopted.vue                # Шнауцеры дома (/results/adopted)
│   │   ├── stories.vue                # Счастливые истории (/results/stories)
│   │   └── memorial.vue               # В памяти (/results/memorial)
│   │
│   ├── stories/                       # Детали историй
│   │   └── [slug].vue                 # Детальная страница истории (/stories/slug)
│   │
│   └── useful/                        # Полезно
│       ├── faq.vue                    # ЧаВо (/useful/faq)
│       ├── legal.vue                  # Юридический отдел (/useful/legal)
│       ├── give-away.vue              # Отдать шнауцера (/useful/give-away)
│       └── adopt.vue                  # Взять шнауцера (/useful/adopt)
│
├── public/                            # Статические файлы (доступны напрямую)
│   ├── favicon.ico                    # Иконка сайта
│   └── images/                        # Изображения
│       ├── dogs/                      # Фото собак
│       ├── news/                      # Фото для новостей
│       ├── stories/                   # Фото для историй
│       ├── memorial/                  # Фото мемориала
│       └── adopted/                   # Фото пристроенных собак
│
├── server/                            # Серверная часть (API, маршруты)
│   ├── api/
│   │   └── rss.get.ts                 # API endpoint для получения RSS (/api/rss)
│   └── routes/
│       └── rss.xml.get.ts             # Генерация RSS ленты (/rss.xml)
│
├── types/                             # TypeScript типы
│   └── index.ts                       # Интерфейсы для данных (Dog, News, Story и т.д.)
│
├── utils/                             # Утилиты
│   └── config.ts                      # Конфигурация: ссылки, контакты, реквизиты
│
└── app.vue                            # Корневой компонент приложения
```

## 🗺️ Карта сайта (URL структура)

```
/                                      Главная
├── /lost-found                        Пропал / найден
├── /contacts                          Контакты
│
├── /about                             О нас
│   ├── /about                         └─ Кто мы
│   └── /about/rules                   └─ Правила Фонда
│
├── /results                           Наши результаты
│   ├── /results/adopted               └─ Шнауцеры дома
│   ├── /results/stories               └─ Счастливые истории
│   └── /results/memorial              └─ В памяти
│
├── /useful                            Полезно
│   ├── /useful/faq                    └─ ЧаВо
│   ├── /useful/legal                  └─ Юридический отдел
│   ├── /useful/give-away              └─ Отдать шнауцера
│   └── /useful/adopt                  └─ Взять шнауцера
│
├── /dogs/[slug]                       Детальная страница собаки
├── /news/[slug]                       Детальная страница новости
├── /stories/[slug]                    Детальная страница истории
│
├── /api/rss                           API: получение RSS
└── /rss.xml                           RSS лента сайта
```

## 📋 Основные компоненты

### Layout компоненты

- **AppHeader.vue** — навигационная шапка с логотипом, меню и бургером для мобильных
- **AppFooter.vue** — футер с миссией, быстрыми ссылками и соцсетями

### UI компоненты

- **UiButton.vue** — универсальная кнопка (primary, secondary, outline)
- **UiCard.vue** — карточка с тенью
- **UiTag.vue** — цветные теги/бейджи
- **UiAccordion.vue** — раскрывающийся блок для FAQ

### Контентные компоненты

- **DogCard.vue** — карточка собаки (фото, имя, возраст, город, кнопки)
- **NewsCard.vue** — карточка новости (изображение, дата, заголовок, превью)
- **RssWidget.vue** — виджет RSS ленты с загрузкой и ошибками

## 🔧 Конфигурационные файлы

### utils/config.ts

Все изменяемые параметры:
- Ссылки на соцсети (VK, Telegram)
- Ссылки на форум
- RSS URL
- Контакты (телефон, email)
- Банковские реквизиты

### data/*.json

Все данные о собаках, новостях, историях — в JSON формате, можно редактировать без знания кода.

## 📡 API и Server Routes

### /api/rss

Server API endpoint, который:
- Загружает внешний RSS (или внутренний)
- Парсит XML через rss-parser
- Кэширует на 15 минут
- Возвращает массив элементов RSS

Используется компонентом `RssWidget.vue`

### /rss.xml

Server route, который генерирует RSS ленту из `data/news.json`:
- Формат: RSS 2.0
- Включает title, link, description, pubDate
- Возвращает XML

## 🎨 Стили

### Tailwind

Все стили основаны на Tailwind CSS. Кастомизация в `tailwind.config.ts`:
- Цветовая палитра: `primary` (оранжевый), `warm` (бежево-серая)
- Шрифты: Inter (sans), Manrope (display)
- Контейнер с адаптивными отступами

### Global CSS

В `assets/css/main.css`:
- Импорт шрифтов из Google Fonts
- Базовые стили для body, заголовков
- Классы-утилиты (.btn, .card, .link и т.д.)

## 🧩 TypeScript типы

Все типы в `types/index.ts`:

- **Dog** — собака (id, slug, name, type, age, city, curator, photos, description и т.д.)
- **NewsItem** — новость
- **Story** — счастливая история
- **MemorialEntry** — запись в мемориале
- **AdoptedDog** — пристроенная собака
- **RssItem** — элемент RSS ленты
- **MenuItem** — пункт меню

## 📦 Зависимости

**Production:**
- `nuxt` — фреймворк
- `vue` — UI библиотека
- `@nuxt/image` — оптимизация изображений
- `rss-parser` — парсинг RSS

**Development:**
- `@nuxtjs/tailwindcss` — TailwindCSS интеграция
- `typescript` — типизация
- `@types/rss-parser` — типы для rss-parser

## 🚀 Команды

```bash
npm install          # Установка зависимостей
npm run dev          # Запуск dev-сервера (localhost:3000)
npm run build        # Сборка для production
npm run generate     # Генерация статического сайта
npm run preview      # Просмотр production-сборки
```

## 📝 Примечания

- **Mobile-first**: все компоненты адаптивны, сначала для мобильных
- **SEO**: настроены meta-теги, OG-теги, семантическая разметка
- **Accessibility**: focus states, aria-labels, контраст
- **Performance**: NuxtImg для оптимизации картинок, ленивая загрузка
- **Типобезопасность**: весь код на TypeScript с типизацией
