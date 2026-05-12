<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Page header -->
    <section class="bg-white border-b border-warm-100 py-12">
      <div class="container-custom">
        <h1 class="font-display font-bold text-4xl text-warm-900 leading-tight mb-2">Найти шнауцера</h1>
        <p class="text-warm-500 text-lg">
          <template v-if="!pending">
            Мы нашли <strong class="text-primary-600">{{ data?.total ?? 0 }}</strong> {{ pluralAnimals(data?.total ?? 0) }}, которые ищут новый дом
          </template>
          <template v-else>Ищем лучших питомцев для вас…</template>
        </p>
      </div>
    </section>

    <!-- Sticky filter bar -->
    <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-warm-100">
      <div class="container-custom">
        <div class="flex items-center gap-3 py-2.5">
          <!-- Mobile filter button -->
          <button
            type="button"
            class="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-warm-200 text-warm-700 font-semibold text-sm hover:border-primary-300 hover:text-primary-600 transition-colors"
            @click="mobileFiltersOpen = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Фильтры
            <span
              v-if="activeFilterCount > 0"
              class="w-5 h-5 bg-primary-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
            >{{ activeFilterCount }}</span>
          </button>
          <!-- Desktop: active filter hint -->
          <span v-if="activeFilterCount > 0" class="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ activeFilterCount }} {{ activeFilterCount === 1 ? 'фильтр' : 'фильтра' }}
          </span>
          <span v-if="!pending && data" class="ml-auto text-xs text-warm-400 font-medium">
            {{ data.total }} {{ pluralAnimals(data.total) }}
          </span>
        </div>
      </div>
    </div>

    <div class="container-custom py-8 md:py-10">
      <div class="lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] lg:gap-8 xl:gap-10">

        <!-- Sidebar filters (desktop) -->
        <aside class="hidden lg:block">
          <div class="sticky top-[80px] bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
            <AnimalFiltersPanel
              variant="sidebar"
              :model="filterUi"
              @update:model="onFilterModel"
              @reset="resetFilters"
            />
          </div>
        </aside>

        <!-- Main content -->
        <div class="min-w-0">
          <!-- Active filter chips -->
          <div v-if="activeFilterCount > 0" class="flex flex-wrap gap-2 mb-6">
            <button
              v-if="filterUi.q"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-200 hover:bg-primary-100 transition-colors"
              @click="onFilterModel({ ...filterUi, q: '' })"
            >
              «{{ filterUi.q }}» ✕
            </button>
            <button
              v-if="filterUi.city"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-200 hover:bg-primary-100 transition-colors"
              @click="onFilterModel({ ...filterUi, city: '' })"
            >
              {{ filterUi.city }} ✕
            </button>
            <button
              v-if="filterUi.status !== 'all'"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-200 hover:bg-primary-100 transition-colors"
              @click="onFilterModel({ ...filterUi, status: 'all' })"
            >
              {{ statusLabels[filterUi.status] || filterUi.status }} ✕
            </button>
            <button
              v-if="filterUi.age !== 'all'"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-200 hover:bg-primary-100 transition-colors"
              @click="onFilterModel({ ...filterUi, age: 'all' })"
            >
              {{ ageLabels[filterUi.age] || filterUi.age }} ✕
            </button>
            <button
              v-if="filterUi.type !== 'all'"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold border border-primary-200 hover:bg-primary-100 transition-colors"
              @click="onFilterModel({ ...filterUi, type: 'all' })"
            >
              {{ breedLabel(filterUi.type) }} ✕
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-warm-500 rounded-full text-sm hover:text-primary-600 transition-colors"
              @click="resetFilters"
            >
              Сбросить все
            </button>
          </div>

          <!-- Grid -->
          <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <DogCardSkeleton v-for="i in 9" :key="i" />
          </div>

          <div v-else-if="data && data.items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <DogCard v-for="dog in data.items" :key="dog.id" :dog="dog" />
          </div>

          <div v-else class="text-center py-20">
            <div class="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg class="w-10 h-10 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-xl font-display font-semibold text-warm-900 mb-2">Ничего не найдено</p>
            <p class="text-warm-500 mb-6">По вашим критериям нет результатов.</p>
            <button
              class="btn-outline px-6 py-3"
              @click="resetFilters"
            >
              Сбросить фильтры
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="data && totalPages > 1" class="mt-10 flex justify-center items-center gap-2">
            <button
              class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
              :disabled="currentPage <= 1"
              @click="goPage(currentPage - 1)"
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
                  @click="goPage(Number(p))"
                >
                  {{ p }}
                </button>
              </template>
            </div>

            <button
              class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
              :disabled="currentPage >= totalPages"
              @click="goPage(currentPage + 1)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile filter modal -->
    <UiModal v-model="mobileFiltersOpen" title="Фильтры">
      <AnimalFiltersPanel
        variant="modal"
        :model="filterUi"
        @update:model="onFilterModelMobile"
        @reset="resetFiltersMobile"
      />
      <div class="sticky bottom-0 pt-4 bg-white mt-4 border-t border-warm-100">
        <button class="btn-primary w-full py-3" @click="mobileFiltersOpen = false">
          Показать результаты
          <span v-if="!pending && data" class="ml-2 opacity-80">({{ data.total }})</span>
        </button>
      </div>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse } from '~/types'
import type { AnimalFiltersModel } from '~/components/AnimalFiltersPanel.vue'

useHead({
  title: 'Шнауцеры',
  meta: [{ name: 'description', content: 'Поиск анкет шнауцеров: город, статус, порода, возраст. Пагинация.' }]
})

const route = useRoute()
const router = useRouter()
const mobileFiltersOpen = ref(false)
const { breedLabel } = useAnimalLabels()

const statusLabels: Record<string, string> = {
  looking: 'Ищут дом',
  foster: 'Передержка',
  pensioner: 'Пенсионеры'
}

const ageLabels: Record<string, string> = {
  puppy: 'До 1 года',
  young: '1–3 года',
  adult: '3–7 лет',
  senior: '7+ лет'
}

const filterUi = computed<AnimalFiltersModel>(() => ({
  q: String(route.query.q || ''),
  city: String(route.query.city || ''),
  species: String(route.query.species || 'all'),
  type: String(route.query.type || 'all'),
  status: String(route.query.status || 'all'),
  age: String(route.query.age || 'all'),
  sort: route.query.sort === 'date_asc' ? 'date_asc' : 'date_desc'
}))

const activeFilterCount = computed(() => {
  const f = filterUi.value
  let n = 0
  if (f.q.trim()) n++
  if (f.city.trim()) n++
  if (f.species !== 'all') n++
  if (f.type !== 'all') n++
  if (f.status !== 'all') n++
  if (f.age !== 'all') n++
  if (f.sort !== 'date_desc') n++
  return n
})

function filtersToQuery(f: AnimalFiltersModel, page: number): Record<string, string> {
  const q: Record<string, string> = {}
  if (page > 1) q.page = String(page)
  if (f.q.trim()) q.q = f.q.trim()
  if (f.city.trim()) q.city = f.city.trim()
  if (f.species !== 'all') q.species = f.species
  if (f.type !== 'all') q.type = f.type
  if (f.status !== 'all') q.status = f.status
  if (f.age !== 'all') q.age = f.age
  if (f.sort !== 'date_desc') q.sort = f.sort
  return q
}

const apiQuery = computed(() => {
  const q = route.query
  const out: Record<string, string> = { page: String(Number(q.page) || 1), pageSize: '12' }
  if (q.q) out.q = String(q.q)
  if (q.city) out.city = String(q.city)
  if (q.species && q.species !== 'all') out.species = String(q.species)
  if (q.type && q.type !== 'all') out.type = String(q.type)
  if (q.status && q.status !== 'all') out.status = String(q.status)
  if (q.age && q.age !== 'all') out.age = String(q.age)
  if (q.sort === 'date_asc') out.sort = 'date_asc'
  return out
})

const { data, pending } = await useFetch<AnimalListResponse>('/api/animals', { query: apiQuery })

const currentPage = computed(() => Number(route.query.page) || 1)
const totalPages = computed(() => {
  if (!data.value) return 1
  return Math.max(1, Math.ceil(data.value.total / data.value.pageSize))
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

watch(totalPages, (max) => { if (currentPage.value > max) goPage(max) })

function onFilterModel(next: AnimalFiltersModel) {
  router.replace({ query: filtersToQuery(next, 1) })
}
function onFilterModelMobile(next: AnimalFiltersModel) { onFilterModel(next) }
function resetFilters() { router.replace({ query: {} }) }
function resetFiltersMobile() { resetFilters(); mobileFiltersOpen.value = false }
function goPage(p: number) {
  if (p < 1) return
  router.replace({ query: filtersToQuery(filterUi.value, p) })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function pluralAnimals(n: number) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'собак'
  if (n % 10 === 1) return 'собака'
  if (n % 10 >= 2 && n % 10 <= 4) return 'собаки'
  return 'собак'
}
</script>
