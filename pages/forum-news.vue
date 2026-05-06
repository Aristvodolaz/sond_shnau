<template>
  <div class="min-h-screen bg-warm-50">
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Новости форума</h1>
        <p class="text-warm-500 mt-2 text-sm">Последние обновления и истории с форума помощи шнауцерам</p>
      </div>
    </section>

    <section class="py-8 md:py-10">
      <div class="container-custom max-w-3xl">
        <!-- Loading State -->
        <div v-if="pending" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse bg-white rounded-2xl border border-warm-100 p-6">
            <div class="h-5 bg-warm-200 rounded w-3/4 mb-3"></div>
            <div class="h-3 bg-warm-100 rounded w-1/3 mb-4"></div>
            <div class="space-y-2">
              <div class="h-3 bg-warm-100 rounded"></div>
              <div class="h-3 bg-warm-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white border border-warm-200 rounded-2xl p-8 text-center">
          <p class="text-warm-600 text-sm mb-4">Не удалось загрузить новости форума</p>
          <button
            @click="refresh()"
            class="btn-primary px-5 py-2.5 text-sm"
          >
            Попробовать снова
          </button>
        </div>

        <!-- News List -->
        <div v-else-if="items && items.length > 0" class="space-y-4">
          <div
            v-for="item in items"
            :key="item.link"
            class="bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6"
          >
            <h2 class="text-base font-display font-semibold text-warm-900 mb-2 leading-snug">
              {{ cleanTitle(item.title) }}
            </h2>

            <div class="flex items-center gap-4 text-xs text-warm-500 mb-3">
              <span>{{ formatDate(item.pubDate) }}</span>
            </div>

            <div
              v-if="item.content"
              class="forum-prose text-sm text-warm-700 mb-4 line-clamp-3"
              v-html="sanitizeContent(item.content)"
            />

            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Читать на форуме
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Empty State -->
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
  return cleaned
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays < 1) return 'Сегодня'
  if (diffDays < 7) return `${diffDays} дн назад`
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function sanitizeContent(html: string): string {
  if (!html) return ''
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  cleaned = cleaned.replace(/<hr\s*\/?>/gi, '')
  if (cleaned.length > 400) cleaned = cleaned.substring(0, 400) + '…'
  return cleaned
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forum-prose :deep(img) {
  max-width: 160px;
  height: auto;
  border-radius: 0.5rem;
}

.forum-prose :deep(a) {
  color: #3a9cdc;
  text-decoration: underline;
}

.forum-prose :deep(blockquote) {
  border-left: 3px solid #e2eef7;
  padding-left: 0.75rem;
  font-style: italic;
  color: #8a9bb0;
}
</style>
