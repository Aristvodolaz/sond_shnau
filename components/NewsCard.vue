<template>
  <article class="group bg-white rounded-[2rem] border border-warm-100 overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-card-hover hover-lift">
    <!-- Photo -->
    <NuxtLink :to="`/news/${news.slug}`" class="block relative overflow-hidden bg-warm-100 shrink-0" style="aspect-ratio: 16/10;">
      <NuxtImg
        v-if="news.image"
        :src="news.image"
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-50 to-primary-50">
        <svg class="w-12 h-12 text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      
      <!-- Date Overlay -->
      <div class="absolute bottom-4 left-4">
        <time class="glass px-3 py-1.5 rounded-xl text-[10px] font-black text-warm-900 uppercase tracking-widest shadow-sm" :datetime="news.date">
          {{ formatDate(news.date) }}
        </time>
      </div>
    </NuxtLink>

    <!-- Body -->
    <div class="p-6 flex-1 flex flex-col gap-4">
      <!-- Title -->
      <NuxtLink :to="`/news/${news.slug}`" class="block">
        <h3 class="font-display font-bold text-xl text-warm-900 leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
          {{ news.title }}
        </h3>
      </NuxtLink>

      <!-- Preview -->
      <p class="text-sm text-warm-500 line-clamp-3 leading-relaxed flex-1">{{ news.preview }}</p>

      <!-- CTA -->
      <NuxtLink
        :to="`/news/${news.slug}`"
        class="inline-flex items-center gap-2 text-sm font-black text-primary-600 group/link mt-4"
      >
        <span>Читать статью</span>
        <div class="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover/link:bg-primary-500 group-hover/link:text-white transition-all duration-300">
          <svg class="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types'

defineProps<{ news: NewsItem }>()

const hovered = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
