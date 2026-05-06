<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Header -->
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Шнауцеры дома</h1>
        <p class="text-warm-500 mt-2 text-sm">Собаки, которые нашли любящие семьи. Каждая история — маленькое чудо.</p>
      </div>
    </section>

    <div class="container-custom py-8 md:py-10">

      <!-- Stats strip -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-xl p-4 text-center border border-warm-100 shadow-sm">
          <p class="font-display font-semibold text-2xl text-primary-600">{{ adoptedDogs.length }}</p>
          <p class="text-xs text-warm-500 mt-0.5">всего пристроено</p>
        </div>
        <div class="bg-white rounded-xl p-4 text-center border border-warm-100 shadow-sm">
          <p class="font-display font-semibold text-2xl text-primary-600">{{ availableYears.length }}</p>
          <p class="text-xs text-warm-500 mt-0.5">лет работы</p>
        </div>
        <div class="bg-white rounded-xl p-4 text-center border border-warm-100 shadow-sm">
          <p class="font-display font-semibold text-2xl text-primary-600">{{ currentYearCount }}</p>
          <p class="text-xs text-warm-500 mt-0.5">в этом году</p>
        </div>
      </div>

      <!-- Year filter pills -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          :class="['pill-filter', selectedYear === null ? 'pill-filter-active' : 'pill-filter-inactive']"
          @click="selectedYear = null"
        >
          Все годы
        </button>
        <button
          v-for="year in availableYears"
          :key="year"
          type="button"
          :class="['pill-filter', selectedYear === year ? 'pill-filter-active' : 'pill-filter-inactive']"
          @click="selectedYear = year"
        >
          {{ year }}
        </button>
      </div>

      <!-- Grid -->
      <div v-if="pagedDogs.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <component
          :is="dog.forumUrl ? 'a' : 'div'"
          v-for="dog in pagedDogs"
          :key="dog.id"
          :href="dog.forumUrl || undefined"
          :target="dog.forumUrl ? '_blank' : undefined"
          :rel="dog.forumUrl ? 'noopener noreferrer' : undefined"
          class="group block"
        >
          <div class="bg-white rounded-xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div class="relative overflow-hidden aspect-square bg-warm-100">
              <NuxtImg
                :src="dog.photo"
                :alt="dog.name"
                class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                loading="lazy"
                width="240"
                height="240"
              />
              <!-- Forum link indicator -->
              <div v-if="dog.forumUrl" class="absolute bottom-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center shadow-sm">
                <svg class="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
            <div class="px-3 py-2.5">
              <p class="font-semibold text-warm-900 text-sm truncate leading-snug">{{ dog.name }}</p>
              <div class="flex items-center justify-between mt-1 gap-1">
                <span class="text-xs text-warm-500 truncate">{{ dog.city }}</span>
                <span class="text-xs font-semibold text-primary-600 shrink-0">{{ dog.year }}</span>
              </div>
            </div>
          </div>
        </component>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
        <button
          class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
          :disabled="currentPage <= 1"
          @click="currentPage = Math.max(1, currentPage - 1)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex items-center gap-1">
          <template v-for="p in pageNumbers" :key="p">
            <span v-if="p === '...'" class="px-1 text-warm-400">…</span>
            <button
              v-else
              type="button"
              :class="[
                'w-10 h-10 rounded-xl text-sm font-semibold transition-colors',
                p === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'border-2 border-warm-200 text-warm-700 hover:border-primary-300'
              ]"
              @click="currentPage = Number(p)"
            >
              {{ p }}
            </button>
          </template>
        </div>
        <button
          class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
          :disabled="currentPage >= totalPages"
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredDogs.length === 0" class="text-center py-16">
        <div class="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-warm-600 text-sm">Нет пристроенных за выбранный период</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdoptedDog } from '~/types'

useHead({
  title: 'Шнауцеры дома',
  meta: [{ name: 'description', content: 'Архив пристроенных шнауцеров. Счастливые истории собак, которые обрели любящие семьи.' }]
})

const PAGE_SIZE = 30

const { data } = await useFetch<AdoptedDog[]>('/api/adopted')
const adoptedDogs = ref<AdoptedDog[]>(data.value || [])
const selectedYear = ref<number | null>(null)
const currentPage = ref(1)

const availableYears = computed(() => {
  const years = [...new Set(adoptedDogs.value.map(d => d.year))]
  return years.sort((a, b) => b - a)
})

const filteredDogs = computed(() =>
  selectedYear.value === null
    ? adoptedDogs.value
    : adoptedDogs.value.filter(d => d.year === selectedYear.value)
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDogs.value.length / PAGE_SIZE)))

const pagedDogs = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredDogs.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (cur > 3) pages.push('...')
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p)
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

watch(selectedYear, () => { currentPage.value = 1 })

const currentYearCount = computed(() => {
  const year = new Date().getFullYear()
  return adoptedDogs.value.filter(d => d.year === year).length
})
</script>
