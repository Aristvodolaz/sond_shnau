<template>
  <div class="bg-white rounded-[2.5rem] border border-warm-100 flex flex-col h-full lg:sticky lg:top-24 hover:shadow-2xl transition-shadow duration-500 overflow-hidden" style="box-shadow: 0 10px 40px rgba(0,0,0,0.04);">

    <!-- Header -->
    <div class="px-6 pt-7 pb-5">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-8.18v4.831c10.555.064 19.111 8.615 19.173 19.169h4.827c-.063-13.219-10.781-23.93-24-24z"/>
            </svg>
          </div>
          <h3 class="font-display font-extrabold text-lg text-warm-900 tracking-tight">Форум</h3>
        </div>
        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span class="text-[10px] font-black uppercase tracking-widest">LIVE</span>
        </div>
      </div>
      <p class="text-xs font-semibold text-warm-400 uppercase tracking-widest">Последние обновления</p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex-1 px-6 py-4 space-y-6">
      <div v-for="i in 5" :key="i" class="animate-pulse flex gap-4">
        <div class="w-1.5 h-1.5 rounded-full bg-warm-100 mt-2 shrink-0" />
        <div class="flex-1 space-y-3">
          <div class="h-3 bg-warm-100 rounded-full w-full" />
          <div class="h-3 bg-warm-100 rounded-full w-2/3" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center px-8 py-12 text-center">
      <div class="space-y-4">
        <div class="w-12 h-12 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-warm-500">Не удалось загрузить данные</p>
        <button class="btn-ghost text-xs px-4 py-2" @click="refresh?.()">Повторить</button>
      </div>
    </div>

    <!-- Items -->
    <div v-else-if="items?.length" class="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-none">
      <a
        v-for="(item, i) in items.slice(0, 8)"
        :key="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex gap-4 p-4 rounded-2xl hover:bg-primary-50/50 transition-all duration-300 border border-transparent hover:border-primary-100"
      >
        <div class="mt-2 w-1.5 h-1.5 rounded-full bg-warm-200 group-hover:bg-primary-500 transition-all shrink-0 shadow-sm" />
        <div class="min-w-0 flex-1">
          <h4 class="text-[14px] font-bold text-warm-800 group-hover:text-primary-800 transition-colors line-clamp-2 leading-[1.4] mb-2">
            {{ cleanTitle(item.title) }}
          </h4>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-warm-400 group-hover:text-primary-500 transition-colors">
              {{ formatDate(item.pubDate) }}
            </span>
          </div>
        </div>
        <div class="self-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </div>

    <!-- Empty -->
    <div v-else class="flex-1 flex items-center justify-center py-16">
      <p class="text-sm font-medium text-warm-400">Обновлений пока нет</p>
    </div>

    <!-- Footer -->
    <div v-if="items?.length" class="p-4 pt-2">
      <NuxtLink
        to="/forum-news"
        class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-warm-50 hover:bg-primary-50 text-xs font-black uppercase tracking-widest text-warm-600 hover:text-primary-600 rounded-xl transition-all duration-300"
      >
        Все новости форума
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
