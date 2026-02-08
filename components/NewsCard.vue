<template>
  <UiCard :padding="false" class="h-full flex flex-col group hover:shadow-2xl transition-all duration-300">
    <div class="relative overflow-hidden">
      <NuxtImg
        v-if="news.image"
        :src="news.image"
        :alt="news.title"
        class="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
        loading="lazy"
        width="400"
        height="300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <!-- Date badge overlay -->
      <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        <div class="text-xs font-semibold text-primary-600">{{ formatDate(news.date) }}</div>
      </div>
    </div>
    
    <div class="p-4 sm:p-5 flex-1 flex flex-col">
      <h3 class="font-display font-semibold text-base sm:text-lg text-warm-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ news.title }}
      </h3>
      <p class="text-sm sm:text-base text-warm-700 mb-3 sm:mb-4 line-clamp-3 flex-1">{{ news.preview }}</p>
      <UiButton :to="`/news/${news.slug}`" variant="outline" size="sm" class="mt-auto w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500">
        Читать далее
        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </UiButton>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types'

interface Props {
  news: NewsItem
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
