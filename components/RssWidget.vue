<template>
  <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-display font-bold text-warm-900">
        Новости форума
      </h3>
      <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
        <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
      </svg>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="h-4 bg-warm-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-warm-100 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4">
      <p class="text-sm text-warm-600">Не удалось загрузить новости</p>
    </div>

    <!-- RSS Items -->
    <div v-else-if="items && items.length > 0" class="space-y-4">
      <a
        v-for="(item, index) in items.slice(0, 5)"
        :key="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="block group"
      >
        <div class="border-l-3 border-primary-500 pl-3 py-2 hover:bg-warm-50 transition-colors rounded-r">
          <h4 class="text-sm font-semibold text-warm-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
            {{ cleanTitle(item.title) }}
          </h4>
          <p class="text-xs text-warm-600">
            {{ formatDate(item.pubDate) }}
          </p>
        </div>
      </a>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-4">
      <p class="text-sm text-warm-600">Новостей пока нет</p>
    </div>

    <!-- View All Link -->
    <div v-if="items && items.length > 0" class="mt-6 pt-4 border-t border-warm-200">
      <NuxtLink
        to="/forum-news"
        class="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-2 transition-colors"
      >
        <span>Все новости форума</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RssItem {
  title: string
  link: string
  pubDate: string
  contentSnippet?: string
  content?: string
}

// Fetch RSS feed
const { data: items, pending, error } = await useFetch<RssItem[]>('/api/rss')

// Clean title from HTML entities and extra formatting
function cleanTitle(title: string): string {
  if (!title) return ''
  
  // Remove HTML tags
  let cleaned = title.replace(/<[^>]*>/g, '')
  
  // Decode HTML entities (server-safe way)
  cleaned = cleaned
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
  
  // Remove common prefixes
  cleaned = cleaned.replace(/^Шнауцеры на пристройство\s*•\s*/i, '')
  cleaned = cleaned.replace(/^Истории со счастливым концом \(шнауцеры\)\s*•\s*/i, '')
  
  return cleaned
}

// Format date to readable format
function formatDate(dateString: string): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 60) {
    return `${diffMins} мин назад`
  } else if (diffHours < 24) {
    return `${diffHours} ч назад`
  } else if (diffDays < 7) {
    return `${diffDays} дн назад`
  } else {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.border-l-3 {
  border-left-width: 3px;
}
</style>
