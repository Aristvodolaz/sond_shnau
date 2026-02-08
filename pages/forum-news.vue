<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-8 sm:py-12 md:py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
          Новости форума
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-primary-100 max-w-2xl">
          Последние обновления и истории с форума помощи шнауцерам
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-8 sm:py-10 md:py-12">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center py-12">
          <UiLoader text="Загрузка новостей..." />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
          <p class="text-sm sm:text-base text-red-800">Не удалось загрузить новости форума</p>
          <button 
            @click="refresh()" 
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base"
          >
            Попробовать снова
          </button>
        </div>

        <!-- News Grid -->
        <div v-else-if="items && items.length > 0" class="space-y-4 sm:space-y-6">
          <div
            v-for="item in items"
            :key="item.link"
            class="bg-white rounded-lg shadow-md hover:shadow-lg active:shadow-xl transition-shadow p-4 sm:p-6"
          >
            <!-- Title -->
            <h2 class="text-xl sm:text-2xl font-display font-bold text-warm-900 mb-2 sm:mb-3">
              {{ cleanTitle(item.title) }}
            </h2>

            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-warm-600 mb-3 sm:mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="truncate">{{ item.contentSnippet || 'Автор форума' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(item.pubDate) }}</span>
              </div>
            </div>

            <!-- Content Preview -->
            <div 
              v-if="item.content" 
              class="prose prose-sm sm:prose prose-warm max-w-none mb-3 sm:mb-4 text-warm-700"
              v-html="sanitizeContent(item.content)"
            />

            <!-- Link to Forum -->
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm sm:text-base text-primary-600 hover:text-primary-700 active:text-primary-800 font-semibold transition-colors py-2"
            >
              <span>Читать на форуме</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <p class="text-base sm:text-lg text-warm-600">Новостей пока нет</p>
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
  meta: [
    {
      name: 'description',
      content: 'Последние новости и обновления с форума помощи шнауцерам'
    }
  ]
})

// Fetch RSS feed
const { data: items, pending, error, refresh } = await useFetch<RssItem[]>('/api/rss')

// Clean title from HTML entities and extra formatting
function cleanTitle(title: string): string {
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
    .replace(/\[CDATA\[/g, '')
    .replace(/\]\]/g, '')
  
  // Remove "Шнауцеры на пристройство •" prefix if present
  cleaned = cleaned.replace(/^Шнауцеры на пристройство\s*•\s*/i, '')
  cleaned = cleaned.replace(/^Истории со счастливым концом \(шнауцеры\)\s*•\s*/i, '')
  return cleaned
}

// Format date to readable format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Sanitize HTML content - remove scripts, limit length
function sanitizeContent(html: string): string {
  if (!html) return ''
  
  // Remove script tags
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Remove hr tags
  cleaned = cleaned.replace(/<hr\s*\/?>/gi, '')
  
  // Limit content length
  const maxLength = 300
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength) + '...'
  }
  
  return cleaned
}
</script>

<style scoped>
.prose {
  max-width: 100%;
}

.prose :deep(img) {
  max-width: 200px;
  height: auto;
  border-radius: 0.5rem;
}

.prose :deep(a) {
  color: #d97706;
  text-decoration: underline;
}

.prose :deep(blockquote) {
  border-left: 4px solid #d97706;
  padding-left: 1rem;
  font-style: italic;
  color: #78716c;
}
</style>
