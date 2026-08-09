// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      s3PublicBaseUrl: process.env.S3_PUBLIC_BASE_URL || '',
    },
  },
  
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
        { rel: 'icon', type: 'image/png', href: '/images/logo/logo.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Новости фонда', href: '/rss.xml' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/HoboBT.ttf', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(89861167, 'init', {clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/89861167" style="position:absolute; left:-9999px;" alt="" /></div>'
        }
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
