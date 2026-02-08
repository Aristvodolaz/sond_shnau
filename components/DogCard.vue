<template>
  <UiCard :padding="false" class="group hover:shadow-2xl transition-all duration-300">
    <div class="relative aspect-square overflow-hidden">
      <NuxtImg
        :src="dog.photos[0]"
        :alt="dog.name"
        class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
        loading="lazy"
        width="400"
        height="400"
      />
      <!-- Gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div class="absolute top-3 right-3 transform group-hover:scale-110 transition-transform duration-300">
        <UiTag :variant="dog.status === 'pensioner' ? 'info' : 'success'" size="sm">
          {{ dog.status === 'pensioner' ? 'Пенсионер' : 'Ищет дом' }}
        </UiTag>
      </div>

      <!-- Favorite button (decorative) -->
      <button class="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110 transform">
        <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <div class="p-4 sm:p-5">
      <!-- Name and Type -->
      <div class="mb-3">
        <h3 class="font-display font-bold text-lg sm:text-xl text-warm-900 mb-1">{{ dog.name }}</h3>
        <p class="text-warm-600 text-sm">{{ getDogTypeName(dog.type) }}</p>
      </div>

      <!-- Quick Facts -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-warm-700">
          <svg class="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="truncate">{{ dog.age }}</span>
        </div>
        <div class="flex items-center text-sm text-warm-700">
          <svg class="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ dog.city }}</span>
        </div>
        <div class="flex items-center text-sm text-warm-700">
          <svg class="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="truncate">{{ dog.curator.name }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-2">
        <UiButton :to="`/dogs/${dog.slug}`" variant="primary" size="sm" class="w-full">
          Подробнее
        </UiButton>
        <UiButton :href="dog.forumTopicUrl" variant="outline" size="sm" external class="w-full">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Форум
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { Dog } from '~/types'

interface Props {
  dog: Dog
}

defineProps<Props>()

const getDogTypeName = (type: string) => {
  const types: Record<string, string> = {
    riesenschnauzer: 'Ризеншнауцер',
    mittelschnauzer: 'Миттельшнауцер',
    zwergschnauzer: 'Цвергшнауцер',
    metis: 'Метис'
  }
  return types[type] || type
}
</script>
