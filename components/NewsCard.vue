<template>
  <article class="group bg-white rounded-2xl border border-warm-100 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
    style="box-shadow: var(--shadow-card);"
    :style="{ '--hover-shadow': 'var(--shadow-card-hover)' }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Photo -->
    <NuxtLink :to="`/news/${news.slug}`" class="block relative overflow-hidden bg-warm-100 shrink-0" style="aspect-ratio: 16/9;">
      <NuxtImg
        v-if="news.image"
        :src="news.image"
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
        width="600"
        height="338"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-100 to-primary-50">
        <svg class="w-10 h-10 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
    </NuxtLink>

    <!-- Body -->
    <div class="p-5 flex-1 flex flex-col gap-3">
      <!-- Date -->
      <time class="text-xs font-medium text-warm-400" :datetime="news.date">
        {{ formatDate(news.date) }}
      </time>

      <!-- Title -->
      <NuxtLink :to="`/news/${news.slug}`" class="block group/title">
        <h3 class="font-display font-semibold text-base text-warm-900 leading-snug line-clamp-2 group-hover/title:text-primary-600 transition-colors duration-200">
          {{ news.title }}
        </h3>
      </NuxtLink>

      <!-- Preview -->
      <p class="text-sm text-warm-500 line-clamp-3 leading-relaxed flex-1">{{ news.preview }}</p>

      <!-- CTA -->
      <NuxtLink
        :to="`/news/${news.slug}`"
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors mt-auto pt-1 group/link"
      >
        Читать далее
        <svg class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
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
