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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">В прямом эфире</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Новости <span class="text-primary-600 italic font-display font-medium">форума</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Последние истории, пристройства и обновления с форума шнауцеристов
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 relative z-10 -mt-10">
      <div class="container-custom max-w-5xl">
        
        <!-- Loading State -->
        <div v-if="pending" class="flex flex-col items-center justify-center py-24 gap-6">
          <div class="w-16 h-16 relative">
            <div class="absolute inset-0 rounded-full border-4 border-primary-100 opacity-20"></div>
            <div class="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
          <p class="text-warm-400 font-black text-xs uppercase tracking-[0.2em] animate-pulse">Загрузка эфира форума...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="glass p-12 rounded-[3.5rem] border-white/60 shadow-lg text-center">
          <div class="w-16 h-16 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="text-lg font-display font-black text-warm-900 mb-6">Не удалось подключиться к форуму</p>
          <button @click="refresh()" class="btn-primary px-8 py-3 rounded-2xl">Попробовать снова</button>
        </div>

        <!-- Feed Content -->
        <div v-else-if="items && items.length > 0" class="space-y-8">
          
          <!-- Featured Latest Post -->
          <a :href="items[0].link" target="_blank" rel="noopener noreferrer" class="group block">
            <article class="glass p-8 md:p-12 rounded-[3.5rem] border-white/80 shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              
              <div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div class="flex-1 space-y-6">
                  <div class="flex items-center gap-4">
                    <span class="px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Свежее обсуждение</span>
                    <span class="text-warm-400 text-xs font-bold">{{ formatDate(items[0].pubDate) }}</span>
                  </div>
                  
                  <h2 class="text-2xl md:text-3xl font-display font-black text-warm-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {{ cleanTitle(items[0].title) }}
                  </h2>
                  
                  <div v-if="items[0].content" 
                       class="forum-prose text-warm-500 text-base md:text-lg leading-relaxed line-clamp-2 italic"
                       v-html="sanitizeContent(items[0].content)" />
                  
                  <div class="flex items-center gap-4 pt-4 text-primary-600 font-black uppercase tracking-widest text-xs">
                    <span>Перейти к теме</span>
                    <div class="w-10 h-10 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </a>

          <!-- Feed Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a v-for="(item, idx) in items.slice(1)" 
               :key="item.link" 
               :href="item.link" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="group block forum-card-stagger"
               :style="{ animationDelay: `${idx * 50}ms` }">
              <article class="glass p-8 rounded-[2.5rem] border-white/60 shadow-lg h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-center justify-between mb-6">
                  <span class="text-[10px] font-black text-warm-400 uppercase tracking-widest">{{ formatDate(item.pubDate) }}</span>
                  <div class="w-8 h-8 rounded-xl bg-warm-50 flex items-center justify-center text-warm-300 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                
                <h3 class="text-lg font-display font-black text-warm-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors flex-1">
                  {{ cleanTitle(item.title) }}
                </h3>
                
                <div v-if="item.content" 
                     class="forum-prose text-sm text-warm-500 line-clamp-3 mb-6 leading-relaxed"
                     v-html="sanitizeContent(item.content)" />
                
                <div class="flex items-center gap-3 text-[11px] font-black text-primary-500 uppercase tracking-widest mt-auto">
                  <span>Читать</span>
                  <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </article>
            </a>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-24 glass rounded-[3.5rem] border-white/60 shadow-lg">
          <div class="w-20 h-20 bg-warm-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-warm-300">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-xl font-display font-black text-warm-900 mb-2">На форуме пока тихо</p>
          <p class="text-warm-500">Заходите позже или начните обсуждение сами!</p>
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
