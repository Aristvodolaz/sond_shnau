<template>
  <div class="min-h-screen bg-warm-50">
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Новости фонда</h1>
        <p class="text-warm-500 mt-2 text-sm">Актуальные новости и истории о работе фонда</p>
      </div>
    </section>

    <!-- News Grid -->
    <section class="py-8 md:py-10">
      <div class="container-custom">
        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center py-12">
          <UiLoader text="Загрузка новостей..." />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center max-w-md mx-auto">
          <p class="text-sm sm:text-base text-red-800">Не удалось загрузить новости</p>
          <button 
            @click="refresh()" 
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base"
          >
            Попробовать снова
          </button>
        </div>

        <!-- News Cards -->
        <div v-else-if="newsItems && newsItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <NewsCard v-for="item in newsItems" :key="item.id" :news="item" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="max-w-md mx-auto">
            <svg class="w-16 h-16 mx-auto text-warm-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p class="text-base sm:text-lg text-warm-600">Новостей пока нет</p>
            <p class="text-sm text-warm-500 mt-2">Следите за обновлениями!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-8 md:py-10">
      <div class="container-custom">
        <div class="bg-primary-500 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 class="font-display font-semibold text-xl md:text-2xl mb-3">Будьте в курсе событий</h2>
          <p class="text-primary-100 text-sm mb-6 max-w-lg mx-auto">Следите за обновлениями форума — там публикуются новые собаки и истории спасения</p>
          <NuxtLink to="/forum-news" class="btn bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-xl transition-all">
            Новости форума
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types'

useHead({
  title: 'Новости — Фонд помощи шнауцерам',
  meta: [
    {
      name: 'description',
      content: 'Актуальные новости фонда помощи шнауцерам. Истории спасения, объявления о пристройстве и важные события.'
    }
  ]
})

// Fetch news from API
const { data: newsItems, pending, error, refresh } = await useFetch<NewsItem[]>('/api/news')
</script>
