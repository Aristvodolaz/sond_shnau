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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">До / После</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Счастливые <span class="text-primary-600 italic font-display font-medium">истории</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Трогательные рассказы о спасении, преображении и обретении дома
          </p>
        </div>
      </div>
    </section>
    <div class="container-custom relative z-10 -mt-8 pb-16">

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
                :src="story.beforePhoto"
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
                :src="story.afterPhoto"
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
