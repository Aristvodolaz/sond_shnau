<template>
  <div class="bg-white rounded-2xl border border-warm-100 flex flex-col h-full lg:sticky lg:top-24" style="box-shadow: var(--shadow-card);">

    <!-- Header -->
    <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-warm-100">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
          <svg class="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-warm-900 leading-none">Форум</h3>
          <p class="text-xs text-warm-400 mt-0.5">Последние обновления</p>
        </div>
      </div>
      <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary-600 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full">
        <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse inline-block" />
        Онлайн
      </span>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex-1 px-6 py-4 space-y-4">
      <div v-for="i in 7" :key="i" class="animate-pulse flex gap-3 py-2">
        <div class="w-0.5 bg-warm-100 rounded-full shrink-0 self-stretch" />
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-warm-100 rounded w-full" />
          <div class="h-3 bg-warm-100 rounded w-4/5" />
          <div class="h-2.5 bg-warm-50 rounded w-16 mt-1" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center px-6 py-8 text-center">
      <div>
        <p class="text-xs text-warm-400 mb-3">Не удалось загрузить</p>
        <button class="text-xs font-semibold text-primary-600 hover:text-primary-700" @click="refresh?.()">
          Повторить
        </button>
      </div>
    </div>

    <!-- Items -->
    <div v-else-if="items?.length" class="flex-1 overflow-y-auto px-6 py-4 space-y-1 scrollbar-none">
      <a
        v-for="item in items.slice(0, 8)"
        :key="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex gap-3 px-3 py-3 -mx-3 rounded-xl hover:bg-warm-50 transition-colors duration-200"
      >
        <div class="w-0.5 bg-warm-200 group-hover:bg-primary-400 rounded-full shrink-0 transition-colors duration-200 self-stretch" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-warm-800 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
            {{ cleanTitle(item.title) }}
          </p>
          <p class="text-xs text-warm-400 mt-1.5">{{ formatDate(item.pubDate) }}</p>
        </div>
        <svg class="w-3.5 h-3.5 text-warm-300 group-hover:text-primary-400 shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <!-- Empty -->
    <div v-else class="flex-1 flex items-center justify-center py-8">
      <p class="text-sm text-warm-400">Новостей пока нет</p>
    </div>

    <!-- Footer -->
    <div v-if="items?.length" class="px-6 py-4 border-t border-warm-100">
      <NuxtLink
        to="/forum-news"
        class="flex items-center justify-between text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
      >
        Все новости форума
        <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const { data: items, pending, error, refresh } = await useFetch<RssItem[]>('/api/rss')

function cleanTitle(title: string): string {
  if (!title) return ''
  let cleaned = title.replace(/<[^>]*>/g, '')
  cleaned = cleaned
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
  cleaned = cleaned.replace(/^Шнауцеры на пристройство\s*•\s*/i, '')
  cleaned = cleaned.replace(/^Истории со счастливым концом \(шнауцеры\)\s*•\s*/i, '')
  return cleaned.trim()
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 60) return `${diffMins} мин назад`
  if (diffHours < 24) return `${diffHours} ч назад`
  if (diffDays < 7) return `${diffDays} дн назад`
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
