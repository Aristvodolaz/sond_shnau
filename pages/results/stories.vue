<template>
  <div class="min-h-screen bg-warm-50">
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Счастливые истории</h1>
        <p class="text-warm-500 mt-2 text-sm">Трогательные рассказы о спасении, преображении и обретении дома</p>
      </div>
    </section>
    <div class="container-custom py-8 md:py-10">

      <!-- Filters -->
      <div class="mb-8 flex flex-wrap gap-3">
        <select
          v-model="filterYear"
          class="min-h-[40px] pl-3 pr-8 py-2 text-sm text-warm-900 bg-white border border-warm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 hover:border-warm-300 appearance-none cursor-pointer"
        >
          <option :value="null">Все годы</option>
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
        <select
          v-model="filterPart"
          class="min-h-[40px] pl-3 pr-8 py-2 text-sm text-warm-900 bg-white border border-warm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 hover:border-warm-300 appearance-none cursor-pointer"
        >
          <option :value="null">Все части</option>
          <option :value="1">Часть 1</option>
          <option :value="2">Часть 2</option>
        </select>
      </div>

      <!-- Stories Grid -->
      <div v-if="filteredStories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <UiCard v-for="story in filteredStories" :key="story.id" :padding="false" class="group flex flex-col">
          <div class="grid grid-cols-2 gap-1">
            <div class="relative aspect-square overflow-hidden">
              <NuxtImg
                v-if="story.beforePhoto"
                :src="resolveMediaUrl(story.beforePhoto)"
                :alt="`${story.dogName} до`"
                class="w-full h-full object-cover"
                loading="lazy"
                width="200"
                height="200"
              />
              <div class="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">До</div>
            </div>
            <div class="relative aspect-square overflow-hidden">
              <NuxtImg
                v-if="story.afterPhoto"
                :src="resolveMediaUrl(story.afterPhoto)"
                :alt="`${story.dogName} после`"
                class="w-full h-full object-cover"
                loading="lazy"
                width="200"
                height="200"
              />
              <div class="absolute bottom-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">После</div>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-display font-semibold text-xl text-warm-900">{{ story.dogName }}</h3>
              <UiTag variant="info" size="sm">{{ story.year }}</UiTag>
            </div>
            <p class="text-warm-700 mb-4 line-clamp-3 flex-1">{{ story.preview }}</p>
            <UiButton :to="`/stories/${story.slug}`" variant="outline" size="sm" class="mt-auto">
              Читать историю
            </UiButton>
          </div>
        </UiCard>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-warm-600">Нет историй по выбранным фильтрам</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '~/types'

const { resolveMediaUrl } = useMediaUrl()

// SEO
useHead({
  title: 'Счастливые истории',
  meta: [
    { name: 'description', content: 'Трогательные истории спасения и преображения шнауцеров, обретших новый дом и любящую семью.' }
  ]
})


// Fetch stories from API
const { data } = await useFetch<Story[]>('/api/stories')
const stories = ref<Story[]>(data.value || [])
const filterYear = ref<number | null>(null)
const filterPart = ref<number | null>(null)

// Get unique years
const availableYears = computed(() => {
  const years = [...new Set(stories.value.map(s => s.year))]
  return years.sort((a, b) => b - a)
})

// Filtered stories
const filteredStories = computed(() => {
  return stories.value.filter(story => {
    const yearMatch = filterYear.value === null || story.year === filterYear.value
    const partMatch = filterPart.value === null || story.part === filterPart.value
    return yearMatch && partMatch
  })
})
</script>
