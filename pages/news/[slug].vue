<template>
  <div v-if="newsItem" class="py-12 md:py-16">
    <article class="container-custom max-w-4xl">
      <!-- Back Button -->
      <UiButton to="/" variant="outline" size="sm" class="mb-8">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад
      </UiButton>

      <!-- Article Header -->
      <header class="mb-8">
        <div class="text-warm-600 mb-3">{{ formatDate(newsItem.date) }}</div>
        <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
          {{ newsItem.title }}
        </h1>
        <NuxtImg
          v-if="newsItem.image"
          :src="newsItem.image"
          :alt="newsItem.title"
          class="w-full rounded-xl"
          width="1200"
          height="600"
        />
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
