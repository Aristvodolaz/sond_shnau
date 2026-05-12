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
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-100 px-3 py-1.5 rounded-full mb-6 opacity-0-start animate-fade-up shadow-sm">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span class="text-xs font-bold text-primary-700 uppercase tracking-wider">{{ animalsCountText }}</span>
            </div>

            <h1 class="font-display font-extrabold text-warm-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6 opacity-0-start animate-fade-up delay-100">
              Каждый шнауцер <span class="text-primary-500 relative">заслуживает дом<span class="absolute -bottom-2 left-0 w-full h-1.5 bg-primary-100 -z-10 rounded-full"></span></span>
            </h1>

            <p class="text-warm-600 text-lg md:text-xl leading-relaxed mb-10 opacity-0-start animate-fade-up delay-200">
              Мы спасаем, лечим и пристраиваем шнауцеров в любящие семьи уже более 20 лет. Найдите своего питомца сегодня.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 opacity-0-start animate-fade-up delay-300">
              <NuxtLink to="/animals" class="btn-primary px-10 py-5 text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all">
                Найти шнауцера
              </NuxtLink>
            </div>
          </div>

          <!-- Photo mosaic -->
          <div class="relative hidden lg:grid grid-cols-2 gap-4 h-[520px] opacity-0-start animate-fade-up delay-200">
            <div class="space-y-4">
              <div class="group rounded-2xl overflow-hidden h-[240px] bg-warm-100 shadow-lg hover:-translate-y-1 transition-all duration-500 relative border border-warm-200/50">
                <template v-if="heroPhotos[0]">
                  <img :src="resolveMediaUrl(heroPhotos[0])" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                </template>
              </div>
              <div class="group rounded-2xl overflow-hidden bg-warm-100 shadow-lg hover:-translate-y-1 transition-all duration-500 flex-1 relative border border-warm-200/50" style="height: calc(280px - 1rem)">
                <template v-if="heroPhotos[1]">
                  <img :src="resolveMediaUrl(heroPhotos[1])" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                </template>
              </div>
            </div>
            <div class="space-y-4 pt-12">
              <div class="group rounded-2xl overflow-hidden bg-warm-100 shadow-lg hover:-translate-y-1 transition-all duration-500 flex-1 relative border border-warm-200/50" style="height: calc(280px - 1rem)">
                <template v-if="heroPhotos[2]">
                  <img :src="resolveMediaUrl(heroPhotos[2])" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                </template>
              </div>
              <div class="group rounded-2xl overflow-hidden h-[240px] bg-warm-100 shadow-lg hover:-translate-y-1 transition-all duration-500 relative border border-warm-200/50">
                <template v-if="heroPhotos[3]">
                  <img :src="resolveMediaUrl(heroPhotos[3])" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                </template>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>



    <!-- ─── FEATURED ANIMALS ──────────────────────────────────── -->
    <section class="py-20 bg-warm-50/50">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 class="font-display font-bold text-3xl md:text-4xl text-warm-900 mb-2">Наши подопечные</h2>
            <p class="text-warm-500 text-lg">Те, кто ищет дом и любящую семью прямо сейчас</p>
          </div>
          <div class="flex items-center gap-3">
            <NuxtLink to="/animals" class="btn-outline px-6 py-2.5 text-sm font-bold border-warm-200">
              Смотреть всех
            </NuxtLink>
          </div>
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
            <p class="text-lg font-medium">В этой категории пока нет собак</p>
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
          <NuxtLink to="/animals" class="btn-outline px-8 py-3">Все шнауцеры</NuxtLink>
        </div>
      </div>
    </section>



    <!-- ─── NEWS + RSS ───────────────────────────────────────── -->
    <section class="py-10 md:py-14 bg-warm-50">
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

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- News cards: 1/2 -->
          <div class="order-2 lg:order-1">
            <div v-if="news.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <NewsCard v-for="item in news.slice(0, 2)" :key="item.id" :news="item" />
            </div>
            <div v-else class="flex items-center justify-center h-48 text-warm-500 text-sm bg-white rounded-2xl border border-warm-100">
              Новости пока не добавлены
            </div>
            <div class="mt-4 sm:hidden">
              <NuxtLink to="/news" class="text-sm font-semibold text-primary-600 hover:text-primary-700">Все новости →</NuxtLink>
            </div>
          </div>

          <!-- RSS widget: 1/2 -->
          <div class="order-1 lg:order-2">
            <RssWidget />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA BANNER ────────────────────────────────────────── -->
    <section class="py-10 md:py-14">
      <div class="container-custom">
        <div class="relative overflow-hidden bg-primary-500 rounded-3xl p-8 md:p-12 text-white">
          <!-- Decorative circles -->
          <div class="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />

          <div class="relative z-10 max-w-2xl">
            <h2 class="font-display font-semibold text-2xl md:text-3xl mb-3 leading-snug">
              Готовы дать новый дом?
            </h2>
            <p class="text-primary-100 text-base mb-7 leading-relaxed">
              Каждый вклад имеет значение. Возьмите питомца, станьте волонтёром или помогите финансово.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/animals" class="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Найти шнауцера
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

const adoptionSteps = [
  {
    title: 'Выбираете',
    desc: 'Изучаете анкеты, фильтруете по породе и характеру, добавляете в избранное.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' }),
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 10h.01M15 10h.01M12 12h.01' })
      ])
    })
  },
  {
    title: 'Связываетесь',
    desc: 'Нажимаете «Позвонить» или «Написать» — всё общение в удобном мессенджере.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
      ])
    })
  },
  {
    title: 'Знакомитесь',
    desc: 'Встречаетесь с куратором и питомцем, задаёте все важные вопросы.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    })
  },
  {
    title: 'Забираете',
    desc: 'Оформляем договор ответственного содержания и вы обретаете друга.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ])
    })
  }
]



const filterStatus = ref<'looking' | 'foster' | 'pensioner'>('looking')
const homeDogPage = ref(1)

const currentStatusLabel = computed(() => {
  const map: Record<string, string> = {
    looking: 'Ищут дом',
    foster: 'На передержке',
    pensioner: 'Пенсионеры'
  }
  return map[filterStatus.value] || 'Шнауцеры'
})

function setFilter(val: string) {
  const breeds = ['riesenschnauzer', 'mittelschnauzer', 'zwergschnauzer', 'metis']
  if (breeds.includes(val)) {
    navigateTo({ path: '/animals', query: { type: val } })
    return
  }
  if (val === 'pensioner') {
    navigateTo({ path: '/animals', query: { status: 'pensioner' } })
    return
  }
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
  return t > 0 ? `${t} ${pluralAnimals(t)} ждут хозяев` : 'Ищут любящий дом'
})

function pluralAnimals(n: number) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'собак'
  if (n % 10 === 1) return 'собака'
  if (n % 10 >= 2 && n % 10 <= 4) return 'собаки'
  return 'собак'
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
