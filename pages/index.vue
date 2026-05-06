<template>
  <div>
    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <section class="relative bg-warm-50 overflow-hidden">
      <!-- Background texture -->
      <div class="absolute inset-0 opacity-30"
        style="background-image: radial-gradient(circle at 20% 50%, #A5D4C3 0%, transparent 50%), radial-gradient(circle at 80% 20%, #EBB89D 0%, transparent 40%);"
      />

      <div class="container-custom relative z-10 py-16 md:py-20 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Text block -->
          <div>
            <div class="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 px-4 py-2 rounded-full mb-6 opacity-0-start animate-fade-up">
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span class="text-sm font-semibold text-primary-700">{{ animalsCountText }}</span>
            </div>

            <h1 class="font-display font-semibold text-warm-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 opacity-0-start animate-fade-up delay-100">
              Каждая собака<br />
              <span class="text-primary-500">заслуживает дома</span>
            </h1>

            <p class="text-warm-600 text-base md:text-lg leading-relaxed mb-8 max-w-md opacity-0-start animate-fade-up delay-200">
              Мы спасаем и пристраиваем шнауцеров в любящие семьи уже более 10 лет. Найдите своего питомца сегодня.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 opacity-0-start animate-fade-up delay-300">
              <NuxtLink to="/animals" class="btn-primary px-8 py-4 text-base shadow-md hover:shadow-lg">
                Найти питомца
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
              <NuxtLink to="/support" class="btn-outline px-8 py-4 text-base">
                Помочь фонду
              </NuxtLink>
            </div>
          </div>

          <!-- Photo mosaic -->
          <div class="relative hidden lg:grid grid-cols-2 gap-3 h-[500px] opacity-0-start animate-fade-up delay-200">
            <div class="space-y-3">
              <div class="rounded-2xl overflow-hidden h-[200px] bg-warm-200">
                <img v-if="heroPhotos[0]" :src="resolveMediaUrl(heroPhotos[0])" class="w-full h-full object-cover" alt="" />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <svg class="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div class="rounded-2xl overflow-hidden bg-warm-200 flex-1" style="height: calc(300px - 0.75rem)">
                <img v-if="heroPhotos[1]" :src="resolveMediaUrl(heroPhotos[1])" class="w-full h-full object-cover" alt="" />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
              </div>
            </div>
            <div class="space-y-3 pt-8">
              <div class="rounded-2xl overflow-hidden bg-warm-200 flex-1" style="height: calc(280px - 0.75rem)">
                <img v-if="heroPhotos[2]" :src="resolveMediaUrl(heroPhotos[2])" class="w-full h-full object-cover" alt="" />
                <div v-else class="w-full h-full bg-gradient-to-br from-warm-200 to-warm-300" />
              </div>
              <div class="rounded-2xl overflow-hidden h-[200px] bg-warm-200">
                <img v-if="heroPhotos[3]" :src="resolveMediaUrl(heroPhotos[3])" class="w-full h-full object-cover" alt="" />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300" />
              </div>
            </div>

            <!-- Floating stat card -->
            <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xl font-semibold text-warm-900 font-display leading-none">150+</p>
                <p class="text-xs text-warm-500 mt-0.5">счастливых семей</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── QUICK FILTERS ─────────────────────────────────────── -->
    <section class="bg-warm-50/80 backdrop-blur-md border-b border-warm-200/60 sticky top-16 z-30">
      <div class="container-custom">
        <div class="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none -mx-1 px-1">
          <span class="text-xs font-semibold text-warm-400 uppercase tracking-wider shrink-0">Статус:</span>
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            type="button"
            :class="['pill-filter shrink-0', filterStatus === opt.value ? 'pill-filter-active' : 'pill-filter-inactive']"
            @click="setFilter(opt.value)"
          >
            {{ opt.label }}
          </button>
          <div class="ml-auto shrink-0">
            <NuxtLink to="/animals" class="text-sm font-semibold text-primary-600 hover:text-primary-700 whitespace-nowrap flex items-center gap-1">
              Все фильтры
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── ANIMALS GRID ───────────────────────────────────────── -->
    <section class="py-14 md:py-16 lg:py-20">
      <div class="container-custom">
        <div class="flex items-end justify-between mb-10">
          <div>
            <h2 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">
              {{ currentStatusLabel }}
            </h2>
            <p v-if="!dogsPending && animalsBlock" class="text-warm-500 mt-1 text-sm">
              {{ animalsBlock.total }} {{ pluralAnimals(animalsBlock.total) }}
            </p>
          </div>
          <NuxtLink to="/animals" class="hidden sm:inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
            Смотреть всех
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-if="dogsPending">
            <DogCardSkeleton v-for="i in HOME_PAGE_SIZE" :key="i" />
          </template>
          <template v-else-if="pagedDogs.length">
            <DogCard v-for="dog in pagedDogs" :key="dog.id" :dog="dog" />
          </template>
          <div v-else class="col-span-full text-center py-16 text-warm-500">
            <svg class="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-lg font-medium">В этой категории пока нет животных</p>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="!dogsPending && totalDogPages > 1" class="mt-10 flex justify-center items-center gap-2">
          <button
            class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
            :disabled="homeDogPage <= 1"
            @click="homeDogPage = Math.max(1, homeDogPage - 1)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-4 py-2 text-sm font-semibold text-warm-700">{{ homeDogPage }} / {{ totalDogPages }}</span>
          <button
            class="w-10 h-10 rounded-xl border-2 border-warm-200 flex items-center justify-center hover:border-primary-400 disabled:opacity-40 transition-colors"
            :disabled="homeDogPage >= totalDogPages"
            @click="homeDogPage = Math.min(totalDogPages, homeDogPage + 1)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="mt-8 text-center sm:hidden">
          <NuxtLink to="/animals" class="btn-outline px-8 py-3">Все животные</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ──────────────────────────────────────── -->
    <section class="py-14 md:py-20 bg-warm-100">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 mb-2">Как взять питомца</h2>
          <p class="text-warm-600 text-sm max-w-md mx-auto">Простой процесс в четыре шага — от знакомства до нового члена семьи</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-warm-100"
          >
            <div class="w-9 h-9 rounded-lg mb-4 flex items-center justify-center text-sm font-semibold font-display bg-primary-50 text-primary-600">
              {{ i + 1 }}
            </div>
            <h3 class="font-semibold text-warm-900 text-sm mb-1.5">{{ step.title }}</h3>
            <p class="text-warm-500 text-xs leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── NEWS + RSS ───────────────────────────────────────── -->
    <section class="py-14 md:py-16 lg:py-20 bg-warm-100">
      <div class="container-custom">
        <div class="flex items-end justify-between mb-8">
          <h2 class="font-display font-semibold text-2xl md:text-3xl text-warm-900">Новости фонда</h2>
          <NuxtLink v-if="news.length" to="/news" class="hidden sm:inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
            Все новости
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- News cards: 2/3 width -->
          <div class="lg:col-span-2 order-2 lg:order-1">
            <div v-if="news.length" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <NewsCard v-for="item in news.slice(0, 4)" :key="item.id" :news="item" />
            </div>
            <div v-else class="flex items-center justify-center h-48 text-warm-500 text-sm bg-white rounded-xl">
              Новости пока не добавлены
            </div>
            <div class="mt-5 sm:hidden">
              <NuxtLink to="/news" class="text-sm font-semibold text-primary-600 hover:text-primary-700">Все новости →</NuxtLink>
            </div>
          </div>

          <!-- RSS widget: 1/3 -->
          <div class="lg:col-span-1 order-1 lg:order-2">
            <RssWidget />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA BANNER ────────────────────────────────────────── -->
    <section class="py-14 md:py-16">
      <div class="container-custom">
        <div class="relative overflow-hidden bg-primary-500 rounded-3xl p-8 md:p-12 lg:p-16 text-white">
          <!-- Decorative circles -->
          <div class="absolute -top-16 -right-16 w-64 h-64 bg-primary-400/30 rounded-full" />
          <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-400/20 rounded-full" />

          <div class="relative z-10 max-w-2xl">
            <h2 class="font-display font-semibold text-2xl md:text-3xl mb-3 leading-snug">
              Готовы дать новый дом?
            </h2>
            <p class="text-primary-100 text-base mb-7 leading-relaxed">
              Каждый вклад имеет значение. Возьмите питомца, станьте волонтёром или помогите финансово.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/animals" class="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Найти питомца
              </NuxtLink>
              <NuxtLink to="/support" class="btn border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all">
                Помочь фонду
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse, Dog, NewsItem } from '~/types'

useHead({
  title: 'Главная',
  meta: [{ name: 'description', content: 'Фонд помощи шнауцерам. Пристройство собак в добрые руки, помощь потерявшимся, счастливые истории.' }]
})

const { resolveMediaUrl } = useMediaUrl()

const HOME_PAGE_SIZE = 6

const statusOptions = [
  { value: 'looking', label: 'Ищут дом' },
  { value: 'foster', label: 'Передержка' },
  { value: 'pensioner', label: 'Пенсионеры' }
]

const steps = [
  { title: 'Выбираете', desc: 'Изучаете анкеты, фильтруете по городу и породе, добавляете в избранное.' },
  { title: 'Связываетесь', desc: 'Нажимаете «Позвонить» или «Написать» — без поиска номера в тексте.' },
  { title: 'Знакомитесь', desc: 'Встречаетесь с куратором и питомцем, задаёте все вопросы.' },
  { title: 'Забираете', desc: 'Оформляете договор и забираете питомца в любящий дом.' }
]

const filterStatus = ref<'looking' | 'foster' | 'pensioner'>('looking')
const homeDogPage = ref(1)

const currentStatusLabel = computed(() => {
  const map: Record<string, string> = {
    looking: 'Ищут дом',
    foster: 'На передержке',
    pensioner: 'Пенсионеры'
  }
  return map[filterStatus.value] || 'Животные'
})

function setFilter(val: string) {
  filterStatus.value = val as 'looking' | 'foster' | 'pensioner'
  homeDogPage.value = 1
}

const homeQuery = computed(() => ({
  status: filterStatus.value,
  page: String(homeDogPage.value),
  pageSize: String(HOME_PAGE_SIZE)
}))

const { data: animalsBlock, pending: dogsPending } = await useFetch<AnimalListResponse>('/api/animals', { query: homeQuery })

const pagedDogs = computed<Dog[]>(() => animalsBlock.value?.items ?? [])
const totalDogPages = computed(() => {
  if (!animalsBlock.value) return 1
  return Math.max(1, Math.ceil(animalsBlock.value.total / animalsBlock.value.pageSize))
})

const animalsCountText = computed(() => {
  const t = animalsBlock.value?.total ?? 0
  return t > 0 ? `${t} ${pluralAnimals(t)} ждут дома` : 'Ищут любящий дом'
})

function pluralAnimals(n: number) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'животных'
  if (n % 10 === 1) return 'животное'
  if (n % 10 >= 2 && n % 10 <= 4) return 'животных'
  return 'животных'
}

// Hero photos from first loaded dogs
const heroPhotos = computed(() => {
  const dogs = pagedDogs.value
  return [0, 1, 2, 3].map(i => dogs[i]?.photos?.[0] || '')
})

watch(filterStatus, () => { homeDogPage.value = 1 })
watch(totalDogPages, (max) => { if (homeDogPage.value > max) homeDogPage.value = max })

const { data: newsData } = await useFetch<NewsItem[]>('/api/news')
const news = ref<NewsItem[]>(newsData.value || [])
</script>
