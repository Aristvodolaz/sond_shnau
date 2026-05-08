<template>
  <div v-if="newsItem" class="py-12 md:py-16">
    <article class="container-custom max-w-4xl">
      <!-- Back Button -->
      <NuxtLink to="/news" class="inline-flex items-center gap-2 text-sm font-semibold text-warm-500 hover:text-primary-600 transition-colors mb-8 group">
        <div class="w-8 h-8 rounded-full bg-white border border-warm-200 flex items-center justify-center group-hover:border-primary-300 group-hover:bg-primary-50 transition-all shadow-sm">
          <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        Назад к новостям
      </NuxtLink>

      <!-- Article Header -->
      <header class="relative mb-12 p-8 md:p-12 glass rounded-[3rem] border-white/60 shadow-lg overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-terra-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-6">
            <span class="inline-flex items-center px-3 py-1 bg-warm-100/80 text-warm-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {{ formatDate(newsItem.date) }}
            </span>
          </div>
          <h1 class="text-3xl md:text-5xl font-display font-black text-warm-900 leading-[1.1] tracking-tight mb-8">
            {{ newsItem.title }}
          </h1>
          <NuxtImg
            v-if="newsItem.image"
            :src="newsItem.image"
            :alt="newsItem.title"
            class="w-full rounded-2xl shadow-md border border-warm-100"
            width="1200"
            height="600"
          />
        </div>
      </header>

      <!-- Article Content -->
      <div class="prose prose-lg prose-warm max-w-none">
        <p v-for="(paragraph, index) in newsItem.content.split('\n\n')" :key="index" class="mb-4 text-warm-700 leading-relaxed">
          {{ paragraph }}
        </p>
      </div>

      <!-- Share/Actions -->
      <div class="mt-12 pt-8 border-t border-warm-200">
        <UiButton to="/" variant="outline">
          Вернуться к новостям
        </UiButton>
      </div>
    </article>
  </div>
  <div v-else class="py-16 text-center">
    <p class="text-warm-600">Новость не найдена</p>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

// Fetch news from API
const { data: newsItem } = await useFetch<NewsItem>(`/api/news/${slug}`)

// SEO
useHead({
  title: newsItem.value ? newsItem.value.title : 'Новость не найдена',
  meta: newsItem.value ? [
    { name: 'description', content: newsItem.value.preview }
  ] : []
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
