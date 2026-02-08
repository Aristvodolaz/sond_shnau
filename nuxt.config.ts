// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Фонд помощи шнауцерам — Пристройство и забота',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { name: 'description', content: 'Фонд помощи шнауцерам. Пристройство собак в добрые руки, помощь потерявшимся, истории спасения.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Фонд помощи шнауцерам' },
        { property: 'og:description', content: 'Пристройство шнауцеров, истории спасения и помощь собакам в нужде' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/logo/logo.png'
        },
                { rel: 'alternate', type: 'application/rss+xml', title: 'Новости фонда', href: '/rss.xml' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/HoboBT.ttf', crossorigin: 'anonymous' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  image: {
    format: ['webp', 'jpg'],
    quality: 85
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/rss.xml']
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
