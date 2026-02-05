<template>
  <div v-if="dog" class="py-12 md:py-16">
    <div class="container-custom">
      <!-- Back Button -->
      <UiButton to="/" variant="outline" size="sm" class="mb-8">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад к списку
      </UiButton>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Photos -->
        <div>
          <div class="relative aspect-square rounded-xl overflow-hidden mb-4">
            <NuxtImg
              :src="currentPhoto"
              :alt="dog.name"
              class="w-full h-full object-cover"
              width="800"
              height="800"
            />
          </div>
          <div v-if="dog.photos.length > 1" class="grid grid-cols-4 gap-3">
            <button
              v-for="(photo, index) in dog.photos"
              :key="index"
              @click="currentPhoto = photo"
              :class="[
                'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                currentPhoto === photo ? 'border-primary-500' : 'border-transparent hover:border-warm-300'
              ]"
            >
              <NuxtImg
                :src="photo"
                :alt="`${dog.name} фото ${index + 1}`"
                class="w-full h-full object-cover"
                width="200"
                height="200"
              />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div>
          <div class="mb-6">
            <UiTag :variant="dog.status === 'pensioner' ? 'info' : 'success'" class="mb-3">
              {{ dog.status === 'pensioner' ? 'Программа «Наши пенсионеры»' : 'Ищет дом' }}
            </UiTag>
            <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-2">{{ dog.name }}</h1>
            <p class="text-xl text-warm-600">{{ getDogTypeName(dog.type) }}</p>
          </div>

          <!-- Quick Info -->
          <div class="bg-warm-100 rounded-lg p-6 mb-6 space-y-3">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-warm-700"><strong>Возраст:</strong> {{ dog.age }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-warm-700"><strong>Город:</strong> {{ dog.city }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-warm-700"><strong>Куратор:</strong> {{ dog.curator.name }}</span>
            </div>
          </div>

          <!-- Contact Actions -->
          <div class="flex flex-col sm:flex-row gap-3 mb-8">
            <UiButton :href="`tel:${dog.curator.phone}`" variant="primary" class="flex-1">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ dog.curator.phone }}
            </UiButton>
            <UiButton :href="dog.forumTopicUrl" variant="outline" external class="flex-1">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Обсудить на форуме
            </UiButton>
          </div>

          <!-- Description -->
          <div class="prose prose-warm max-w-none mb-6">
            <h3 class="text-xl font-display font-semibold text-warm-900 mb-3">Описание</h3>
            <p class="text-warm-700 leading-relaxed">{{ dog.description }}</p>
          </div>

          <!-- Features -->
          <div class="mb-6">
            <h3 class="text-xl font-display font-semibold text-warm-900 mb-3">Особенности</h3>
            <ul class="space-y-2">
              <li v-for="(feature, index) in dog.features" :key="index" class="flex items-start">
                <svg class="w-5 h-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-warm-700">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Character -->
          <div class="mb-6">
            <h3 class="text-xl font-display font-semibold text-warm-900 mb-3">Характер</h3>
            <p class="text-warm-700 leading-relaxed">{{ dog.character }}</p>
          </div>

          <!-- Health -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="text-lg font-display font-semibold text-blue-900 mb-2 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Здоровье
            </h3>
            <p class="text-blue-800">{{ dog.health }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-16 text-center">
    <p class="text-warm-600">Собака не найдена</p>
  </div>
</template>

<script setup lang="ts">
import type { Dog } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

// Fetch dog data from API
const { data: dog } = await useFetch<Dog>(`/api/dogs/${slug}`)

const currentPhoto = ref(dog.value?.photos[0] || '')

// SEO
useHead({
  title: dog.value ? dog.value.name : 'Собака не найдена',
  meta: dog.value ? [
    { name: 'description', content: `${dog.value.name} — ${getDogTypeName(dog.value.type)}, ${dog.value.age}, ${dog.value.city}. ${dog.value.description}` }
  ] : []
})

function getDogTypeName(type: string) {
  const types: Record<string, string> = {
    riesenschnauzer: 'Ризеншнауцер',
    mittelschnauzer: 'Миттельшнауцер',
    zwergschnauzer: 'Цвергшнауцер',
    metis: 'Метис'
  }
  return types[type] || type
}
</script>
