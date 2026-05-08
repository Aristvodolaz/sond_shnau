<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Hero Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100/50 backdrop-blur-md rounded-full border border-primary-200/50 mb-6">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Блог фонда</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Новости <span class="text-primary-600 italic font-display font-medium">фонда</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Актуальные новости и истории о работе фонда
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-12 pb-20">
      <!-- Loading State -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-24 gap-4">
        <UiLoader />
        <p class="text-warm-400 font-bold text-sm uppercase tracking-widest">Загрузка ленты новостей...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="glass p-12 rounded-[3rem] border-white/60 shadow-lg text-center max-w-2xl mx-auto">
        <div class="w-16 h-16 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="text-lg font-bold text-warm-900 mb-6">Не удалось загрузить новости</p>
        <button @click="refresh()" class="btn-primary px-8 py-3 rounded-2xl">Попробовать снова</button>
      </div>

      <!-- News Content -->
      <div v-else-if="newsItems && newsItems.length > 0" class="space-y-12">
        
        <!-- Featured Item -->
        <article class="relative group glass rounded-[3.5rem] border-white/60 shadow-xl overflow-hidden hover-lift transition-all duration-500">
          <NuxtLink :to="`/news/${newsItems[0].slug}`" class="grid grid-cols-1 lg:grid-cols-2">
            <div class="relative overflow-hidden aspect-[16/10] lg:aspect-square bg-warm-200">
              <NuxtImg
                v-if="newsItems[0].image"
                :src="newsItems[0].image"
                :alt="newsItems[0].title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div class="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-6">
                <span class="px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-[10px] font-black uppercase tracking-widest">Главное</span>
                <span class="text-warm-400 text-xs font-bold">{{ formatDate(newsItems[0].date) }}</span>
              </div>
              
              <h2 class="text-3xl md:text-4xl font-display font-black text-warm-900 leading-tight mb-6 group-hover:text-primary-600 transition-colors">
                {{ newsItems[0].title }}
              </h2>
              
              <p class="text-lg text-warm-500 leading-relaxed mb-10 line-clamp-3">
                {{ newsItems[0].preview }}
              </p>
              
              <div class="flex items-center gap-4 text-primary-600 font-black uppercase tracking-widest text-sm">
                <span>Читать далее</span>
                <div class="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </article>

        <!-- Secondary News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard v-for="item in newsItems.slice(1)" :key="item.id" :news="item" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 glass rounded-[3.5rem] border-white/60 shadow-lg max-w-3xl mx-auto">
        <div class="w-20 h-20 bg-warm-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-warm-300">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p class="text-xl font-display font-black text-warm-900 mb-2">Новостей пока нет</p>
        <p class="text-warm-500">Заходите позже, мы обязательно что-нибудь напишем!</p>
      </div>

      <!-- CTA Section -->
      <section class="mt-24 relative overflow-hidden rounded-[3.5rem] group">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
        <div class="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-full bg-terra-400/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
        
        <div class="relative z-10 px-8 py-16 md:py-20 text-center">
          <h2 class="text-3xl md:text-5xl font-display font-black text-white leading-tight mb-6">
            Будьте в курсе <span class="text-primary-200 italic font-medium">событий</span>
          </h2>
          <p class="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Следите за обновлениями форума — там в реальном времени публикуются новые собаки и истории их спасения.
          </p>
          <NuxtLink to="/forum-news" class="inline-flex items-center gap-4 bg-white text-primary-700 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-primary-50 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 group/btn">
            Перейти на форум
            <svg class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types'

// Fetch news from API
const { data: newsItems, pending, error, refresh } = await useFetch<NewsItem[]>('/api/news')

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

// SEO
useHead({
  title: 'Новости фонда — Фонд помощи шнауцерам',
  meta: [
    {
      name: 'description',
      content: 'Актуальные новости фонда помощи шнауцерам. Истории спасения, объявления о пристройстве и важные события.'
    }
  ]
})
</script>
