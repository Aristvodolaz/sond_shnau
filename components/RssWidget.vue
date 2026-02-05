<template>
  <UiCard>
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-display font-bold text-xl text-warm-900 flex items-center">
        <svg class="w-6 h-6 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
        </svg>
        Новости (RSS)
      </h3>
      <a
        :href="config.RSS_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-primary-500 hover:text-primary-600 transition-colors flex items-center"
      >
        <span>RSS</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="animate-pulse">
        <div class="h-4 bg-warm-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-warm-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-6">
      <svg class="w-12 h-12 mx-auto text-warm-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-warm-600 text-sm mb-3">Не удалось загрузить RSS-ленту</p>
      <a
        :href="config.RSS_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary-500 hover:text-primary-600 text-sm underline"
      >
        Открыть RSS по ссылке
      </a>
    </div>

    <!-- RSS Items -->
    <div v-else-if="items && items.length > 0" class="space-y-4">
      <a
        v-for="(item, index) in items.slice(0, 8)"
        :key="index"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="block group"
      >
        <h4 class="font-semibold text-warm-900 group-hover:text-primary-500 transition-colors mb-1 line-clamp-2">
          {{ item.title }}
        </h4>
        <p class="text-xs text-warm-600">{{ formatDate(item.pubDate) }}</p>
      </a>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-6 text-warm-600 text-sm">
      Нет доступных новостей
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'
import type { RssItem } from '~/types'

// Fetch RSS items from server API
const { data: items, pending, error } = await useAsyncData<RssItem[]>(
  'rss-feed',
  () => $fetch('/api/rss'),
  {
    // Cache for 15 minutes
    server: true,
    lazy: false
  }
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
