<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Hero Header -->
    <section class="relative py-20 overflow-hidden mb-8">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100/50 backdrop-blur-md rounded-full border border-primary-200/50 mb-6">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Наш архив</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Шнауцеры <span class="text-primary-600 italic font-display font-medium">дома</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Собаки, которые нашли любящие семьи. Каждая история — маленькое чудо.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-12 pb-20">
      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div v-for="(stat, i) in stats" :key="i" 
             class="glass p-8 rounded-[2.5rem] border-white/60 shadow-lg text-center hover:translate-y-[-4px] transition-all duration-300">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-warm-400 mb-3">{{ stat.label }}</p>
          <p class="font-display font-black text-4xl text-primary-600">{{ stat.value }}</p>
          <div class="w-8 h-1 bg-primary-100 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      <!-- Filters & Content -->
      <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 class="text-2xl font-display font-black text-warm-900 tracking-tight flex items-center gap-3">
            <span class="w-2 h-8 bg-primary-500 rounded-full"></span>
            Архив по годам
          </h2>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="year in [null, ...availableYears]"
              :key="year === null ? 'all' : year"
              @click="selectedYear = year"
              :class="[
                'px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border',
                selectedYear === year 
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20' 
                  : 'bg-white border-warm-200 text-warm-500 hover:border-primary-300 hover:text-primary-600'
              ]"
            >
              {{ year === null ? 'Все' : year }}
            </button>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div v-if="pagedDogs.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          <component
            :is="dog.forumUrl ? 'a' : 'div'"
            v-for="dog in pagedDogs"
            :key="dog.id"
            :href="dog.forumUrl || undefined"
            target="_blank"
            class="group block bg-white rounded-3xl overflow-hidden border border-warm-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Photo Container -->
            <div class="relative aspect-square overflow-hidden bg-warm-900/5">
              <NuxtImg
                :src="dog.photo"
                :alt="dog.name"
                class="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-50 saturate-150 pointer-events-none"
                loading="lazy"
              />
              <NuxtImg
                :src="dog.photo"
                :alt="dog.name"
                class="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width="320"
                height="320"
              />
              
              <!-- Forum Icon Indicator -->
              <div v-if="dog.forumUrl" class="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <!-- Year Badge -->
              <div class="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-black text-white/90">
                {{ dog.year }}
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-4">
              <h3 class="font-display font-black text-warm-900 text-sm truncate leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                {{ dog.name }}
              </h3>
              <div class="flex items-center gap-1.5 text-warm-400">
                <svg class="w-3 h-3 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-[11px] font-bold uppercase tracking-wider truncate">{{ dog.city }}</span>
              </div>
            </div>
          </component>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-3 pt-10">
          <button
            class="w-12 h-12 rounded-2xl bg-white border border-warm-200 flex items-center justify-center text-warm-400 hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 transition-all shadow-sm"
            :disabled="currentPage <= 1"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex items-center gap-2">
            <template v-for="p in pageNumbers" :key="p">
              <span v-if="p === '...'" class="px-2 text-warm-300 font-black">...</span>
              <button
                v-else
                @click="currentPage = Number(p)"
                :class="[
                  'w-12 h-12 rounded-2xl text-sm font-black transition-all duration-300',
                  p === currentPage
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white border border-warm-200 text-warm-600 hover:border-primary-300'
                ]"
              >
                {{ p }}
              </button>
            </template>
          </div>

          <button
            class="w-12 h-12 rounded-2xl bg-white border border-warm-200 flex items-center justify-center text-warm-400 hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 transition-all shadow-sm"
            :disabled="currentPage >= totalPages"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredDogs.length === 0" class="text-center py-24 glass rounded-[3rem] border-white/60">
          <div class="w-20 h-20 bg-warm-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-warm-300">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xl font-display font-black text-warm-900 mb-2">Никого не нашли</p>
          <p class="text-warm-500">За выбранный год в архиве пока нет записей.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdoptedDog } from '~/types'

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

const currentYearCount = computed(() => {
  const year = new Date().getFullYear()
  return adoptedDogs.value.filter(d => d.year === year).length
})

const stats = computed(() => [
  { label: 'Всего пристроено', value: adoptedDogs.value.length },
  { label: 'Лет работы', value: availableYears.value.length },
  { label: 'В этом году', value: currentYearCount.value }
])

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

// SEO
useHead({
  title: 'Шнауцеры дома — Фонд помощи шнауцерам',
  meta: [{ name: 'description', content: 'Архив пристроенных шнауцеров. Счастливые истории собак, которые обрели любящие семьи.' }]
})
</script>
