<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Header -->
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom max-w-4xl">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1 rounded-full">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse inline-block" />
            В прямом эфире
          </span>
        </div>
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Новости форума</h1>
        <p class="text-warm-500 mt-2 text-sm">Последние истории, пристройства и обновления с форума шнауцеристов</p>
      </div>
    </section>

    <section class="py-8 md:py-10">
      <div class="container-custom max-w-4xl">

        <!-- Loading -->
        <div v-if="pending" class="space-y-4">
          <div class="animate-pulse bg-white rounded-2xl border border-warm-100 p-8">
            <div class="h-2.5 bg-warm-100 rounded-full w-20 mb-5" />
            <div class="h-6 bg-warm-200 rounded-lg w-4/5 mb-3" />
            <div class="h-3.5 bg-warm-100 rounded w-full mb-2" />
            <div class="h-3.5 bg-warm-100 rounded w-3/4 mb-6" />
            <div class="h-4 bg-warm-100 rounded w-28" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i" class="animate-pulse bg-white rounded-2xl border border-warm-100 p-5">
              <div class="h-2.5 bg-warm-100 rounded w-16 mb-4" />
              <div class="h-4 bg-warm-200 rounded w-5/6 mb-2" />
              <div class="h-4 bg-warm-200 rounded w-3/4 mb-4" />
              <div class="h-3 bg-warm-100 rounded w-full mb-1.5" />
              <div class="h-3 bg-warm-100 rounded w-4/5" />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="bg-white border border-warm-200 rounded-2xl p-8 text-center">
          <div class="w-14 h-14 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="text-warm-600 text-sm mb-4">Не удалось загрузить новости форума</p>
          <button @click="refresh()" class="btn-primary px-5 py-2.5 text-sm">Попробовать снова</button>
        </div>

        <!-- Content -->
        <div v-else-if="items && items.length > 0">

          <!-- Featured first item -->
          <a
            :href="items[0].link"
            target="_blank"
            rel="noopener noreferrer"
            class="group block mb-5"
          >
            <article class="bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
              <div class="h-1 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-400" />
              <div class="p-6 sm:p-8">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-lg">
                    Свежее
                  </span>
                  <span class="text-xs text-warm-400 flex items-center gap-1.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(items[0].pubDate) }}
                  </span>
                </div>
                <h2 class="font-display font-semibold text-xl sm:text-2xl text-warm-900 leading-snug mb-4 group-hover:text-primary-700 transition-colors duration-200">
                  {{ cleanTitle(items[0].title) }}
                </h2>
                <div
                  v-if="items[0].content"
                  class="forum-prose text-sm text-warm-600 line-clamp-3 mb-5 leading-relaxed"
                  v-html="sanitizeContent(items[0].content)"
                />
                <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                  Читать на форуме
                  <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </article>
          </a>

          <!-- Grid of remaining items -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              v-for="(item, idx) in items.slice(1)"
              :key="item.link"
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="group block forum-card-stagger"
              :style="{ animationDelay: `${idx * 50}ms` }"
            >
              <article class="bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-250 h-full flex flex-col overflow-hidden hover:-translate-y-0.5">
                <div class="h-0.5 bg-warm-100 group-hover:bg-primary-400 transition-colors duration-300" />
                <div class="p-5 flex flex-col flex-1">
                  <span class="text-[11px] font-medium text-warm-400 mb-3 flex items-center gap-1.5">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(item.pubDate) }}
                  </span>
                  <h3 class="font-display font-semibold text-sm text-warm-900 leading-snug flex-1 group-hover:text-primary-700 transition-colors duration-200 line-clamp-3 mb-3">
                    {{ cleanTitle(item.title) }}
                  </h3>
                  <div
                    v-if="item.content"
                    class="forum-prose text-xs text-warm-500 line-clamp-2 mb-4 leading-relaxed"
                    v-html="sanitizeContent(item.content)"
                  />
                  <span class="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 group-hover:text-primary-600 mt-auto transition-colors">
                    Читать
                    <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </article>
            </a>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-16">
          <div class="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-warm-500 text-sm">Новостей пока нет</p>
        </div>

      </div>
    </section>
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

useHead({
  title: 'Новости форума — Фонд помощи шнауцерам',
  meta: [{ name: 'description', content: 'Последние новости и обновления с форума помощи шнауцерам' }]
})

const { data: items, pending, error, refresh } = await useFetch<RssItem[]>('/api/rss')

function cleanTitle(title: string): string {
  let cleaned = title.replace(/<[^>]*>/g, '')
  cleaned = cleaned
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\[CDATA\[/g, '').replace(/\]\]/g, '')
  cleaned = cleaned.replace(/^Шнауцеры на пристройство\s*•\s*/i, '')
  cleaned = cleaned.replace(/^Истории со счастливым концом \(шнауцеры\)\s*•\s*/i, '')
  return cleaned.trim()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays < 1) return 'Сегодня'
  if (diffDays === 1) return 'Вчера'
  if (diffDays < 7) return `${diffDays} дн назад`
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function sanitizeContent(html: string): string {
  if (!html) return ''
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  cleaned = cleaned.replace(/<hr\s*\/?>/gi, '')
  cleaned = cleaned.replace(/<img[^>]*>/gi, '')
  if (cleaned.length > 300) cleaned = cleaned.substring(0, 300) + '…'
  return cleaned
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forum-card-stagger {
  animation: fadeUpCard 0.4s ease-out both;
}

@keyframes fadeUpCard {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.forum-prose :deep(img) { display: none; }

.forum-prose :deep(a) {
  color: #3a9cdc;
  text-decoration: underline;
}

.forum-prose :deep(blockquote) {
  border-left: 3px solid #cbe3f5;
  padding-left: 0.75rem;
  font-style: italic;
  color: #7fc0e9;
}

.forum-prose :deep(p) {
  margin-bottom: 0;
}
</style>
