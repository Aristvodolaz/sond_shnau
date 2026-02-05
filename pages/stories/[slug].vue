<template>
  <div v-if="story" class="py-12 md:py-16">
    <article class="container-custom max-w-4xl">
      <!-- Back Button -->
      <UiButton to="/results/stories" variant="outline" size="sm" class="mb-8">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        К списку историй
      </UiButton>

      <!-- Header -->
      <header class="mb-10">
        <div class="flex items-center gap-3 mb-4">
          <UiTag variant="info">{{ story.year }}</UiTag>
          <UiTag v-if="story.part" variant="default">Часть {{ story.part }}</UiTag>
        </div>
        <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-4">
          История {{ story.dogName }}
        </h1>
      </header>

      <!-- Before/After -->
      <div v-if="story.beforePhoto && story.afterPhoto" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <div class="relative aspect-square rounded-xl overflow-hidden mb-3">
            <NuxtImg
              :src="story.beforePhoto"
              :alt="`${story.dogName} до`"
              class="w-full h-full object-cover"
              width="600"
              height="600"
            />
          </div>
          <p class="text-center text-warm-600 font-medium">До</p>
        </div>
        <div>
          <div class="relative aspect-square rounded-xl overflow-hidden mb-3">
            <NuxtImg
              :src="story.afterPhoto"
              :alt="`${story.dogName} после`"
              class="w-full h-full object-cover"
              width="600"
              height="600"
            />
          </div>
          <p class="text-center text-primary-600 font-medium">После</p>
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-lg prose-warm max-w-none mb-10">
        <p v-for="(paragraph, index) in story.content.split('\n\n')" :key="index" class="mb-4 text-warm-700 leading-relaxed">
          {{ paragraph }}
        </p>
      </div>

      <!-- Photo Gallery -->
      <div v-if="story.photos && story.photos.length > 0" class="mb-10">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Фотогалерея</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(photo, index) in story.photos" :key="index" class="aspect-square rounded-lg overflow-hidden">
            <NuxtImg
              :src="photo"
              :alt="`${story.dogName} фото ${index + 1}`"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width="400"
              height="400"
            />
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h3 class="text-2xl font-display font-bold text-primary-900 mb-3">
          Вы тоже можете изменить чью-то жизнь
        </h3>
        <p class="text-primary-800 mb-6">
          Каждая из наших собак ждёт своего шанса на счастье. Возможно, именно вы подарите кому-то новую жизнь.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UiButton to="/" variant="primary">
            Посмотреть собак
          </UiButton>
          <UiButton to="/useful/adopt" variant="outline">
            Как взять собаку
          </UiButton>
        </div>
      </div>
    </article>
  </div>
  <div v-else class="py-16 text-center">
    <p class="text-warm-600">История не найдена</p>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

// Fetch story from API
const { data: story } = await useFetch<Story>(`/api/stories/${slug}`)

// SEO
useHead({
  title: story.value ? `История ${story.value.dogName}` : 'История не найдена',
  meta: story.value ? [
    { name: 'description', content: story.value.preview }
  ] : []
})
</script>
