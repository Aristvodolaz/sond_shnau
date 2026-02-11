<template>
  <div class="py-12 md:py-16">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Шнауцеры дома
      </h1>
      <p class="text-xl text-warm-700 mb-10 max-w-3xl">
        Это наша радость и гордость — собаки, которые нашли любящие семьи. 
        Каждая история — это маленькое чудо и большая победа любви над равнодушием.
      </p>

      <!-- Year Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectedYear = null"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedYear === null 
                ? 'bg-primary-500 text-white' 
                : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
            ]"
          >
            Все года
          </button>
          <button
            v-for="year in availableYears"
            :key="year"
            @click="selectedYear = year"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedYear === year 
                ? 'bg-primary-500 text-white' 
                : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
            ]"
          >
            {{ year }}
          </button>
          <button
            @click="selectedYear = 'pre2015'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedYear === 'pre2015' 
                ? 'bg-primary-500 text-white' 
                : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
            ]"
          >
            До 2015
          </button>
        </div>
      </div>

      <!-- Dogs Grid -->
      <div v-if="filteredDogs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <component 
          :is="dog.forumUrl ? 'a' : 'div'"
          v-for="dog in filteredDogs" 
          :key="dog.id"
          :href="dog.forumUrl || undefined"
          :target="dog.forumUrl ? '_blank' : undefined"
          :rel="dog.forumUrl ? 'noopener noreferrer' : undefined"
          class="block"
        >
          <UiCard 
            :padding="false" 
            :class="[
              'group transition-all duration-300',
              dog.forumUrl ? 'cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary-500' : ''
            ]"
          >
            <div class="relative aspect-square overflow-hidden">
              <NuxtImg
                :src="dog.photo"
                :alt="dog.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width="300"
                height="300"
              />
              <!-- Forum Link Badge -->
              <div 
                v-if="dog.forumUrl" 
                class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-primary-600 flex items-center gap-1 shadow-md"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Форум
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-display font-semibold text-lg text-warm-900 mb-1">{{ dog.name }}</h3>
              <p class="text-sm text-warm-600 mb-2">{{ dog.type }}</p>
              <div class="flex items-center justify-between text-xs text-warm-500">
                <span>{{ dog.city }}</span>
                <UiTag variant="success" size="sm">{{ dog.year }}</UiTag>
              </div>
            </div>
          </UiCard>
        </component>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-warm-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-warm-600">Нет пристроенных собак за выбранный период</p>
      </div>

      <!-- Stats -->
      <div class="mt-16 bg-primary-50 rounded-xl p-8 text-center">
        <h2 class="text-3xl font-display font-bold text-primary-900 mb-2">
          {{ adoptedDogs.length }}
        </h2>
        <p class="text-lg text-primary-700">
          Счастливых историй за всё время работы фонда
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdoptedDog } from '~/types'

// SEO
useHead({
  title: 'Шнауцеры дома',
  meta: [
    { name: 'description', content: 'Архив пристроенных шнауцеров. Счастливые истории собак, которые обрели любящие семьи.' }
  ]
})

// Fetch adopted dogs from API
const { data } = await useFetch<AdoptedDog[]>('/api/adopted')
const adoptedDogs = ref<AdoptedDog[]>(data.value || [])
const selectedYear = ref<number | string | null>(null)

// Get unique years sorted descending
const availableYears = computed(() => {
  const years = [...new Set(adoptedDogs.value.map(d => d.year))]
  return years.sort((a, b) => b - a)
})

// Filter dogs by selected year
const filteredDogs = computed(() => {
  if (selectedYear.value === null) {
    return adoptedDogs.value
  }
  if (selectedYear.value === 'pre2015') {
    return adoptedDogs.value.filter(d => d.year < 2015)
  }
  return adoptedDogs.value.filter(d => d.year === selectedYear.value)
})
</script>
