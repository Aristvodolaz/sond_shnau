<template>
  <div>
    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-warm-50">
      <!-- Background elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary-100/40 rounded-full blur-[120px] animate-pulse" />
        <div class="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] bg-terra-100/30 rounded-full blur-[140px]" />
        <div class="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-primary-50/50 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10 py-12 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Text Content -->
          <div class="lg:col-span-7 max-w-2xl">
            <div class="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full mb-8 animate-fade-down shadow-sm">
              <span class="flex h-2.5 w-2.5 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
              </span>
              <span class="text-xs font-extrabold text-primary-700 uppercase tracking-[0.15em]">{{ animalsCountText }}</span>
            </div>

            <h1 class="font-display font-extrabold text-warm-900 text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 animate-fade-up tracking-tight">
              Шнауцеры <br/> 
              <span class="text-primary-500 italic font-display font-medium">ищут семью</span>
            </h1>

            <p class="text-warm-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg animate-fade-up delay-100">
              Помогаем шнауцерам, попавшим в беду.
            </p>

            <div class="flex flex-col sm:flex-row gap-5 animate-fade-up delay-200">
              <NuxtLink to="/animals" class="btn-primary px-10 py-5 text-lg rounded-2xl shadow-xl shadow-primary-500/25 hover:scale-105 active:scale-95 transition-all group">
                Найти друга
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
              <NuxtLink to="/support" class="btn border-2 border-warm-200 bg-white/50 backdrop-blur-sm px-10 py-5 text-lg rounded-2xl hover:bg-white hover:border-primary-200 transition-all">
                Поддержать фонд
              </NuxtLink>
            </div>
          </div>

          <!-- Hero Image/Mosaic -->
          <div class="lg:col-span-5 relative hidden lg:block">
            <div class="relative z-10 grid grid-cols-2 gap-4 animate-fade-in delay-200">
              <div class="space-y-4 pt-12">
                <div class="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-4 border-white">
                   <img v-if="heroPhotos[0]" :src="resolveMediaUrl(heroPhotos[0])" class="w-full h-full object-cover" />
                   <div v-else class="w-full h-full bg-primary-100" />
                </div>
                <div class="aspect-square rounded-[2rem] overflow-hidden shadow-xl rotate-[4deg] hover:rotate-0 transition-transform duration-500 border-4 border-white">
                   <img v-if="heroPhotos[1]" :src="resolveMediaUrl(heroPhotos[1])" class="w-full h-full object-cover" />
                   <div v-else class="w-full h-full bg-warm-200" />
                </div>
              </div>
              <div class="space-y-4">
                <div class="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500 border-4 border-white">
                   <img v-if="heroPhotos[2]" :src="resolveMediaUrl(heroPhotos[2])" class="w-full h-full object-cover" />
                   <div v-else class="w-full h-full bg-terra-100" />
                </div>
                <div class="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl rotate-[-4deg] hover:rotate-0 transition-transform duration-500 border-4 border-white">
                   <img v-if="heroPhotos[3]" :src="resolveMediaUrl(heroPhotos[3])" class="w-full h-full object-cover" />
                   <div v-else class="w-full h-full bg-primary-50" />
                </div>
              </div>
            </div>

            <!-- Floating Decoration -->
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-terra-400/10 rounded-full blur-2xl animate-pulse" />
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-400/10 rounded-full blur-2xl animate-pulse delay-700" />
          </div>

        </div>
      </div>
    </section>



    <!-- ─── FEATURED ANIMALS ──────────────────────────────────── -->
    <section class="py-24 bg-white relative">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div class="max-w-xl">
            <h2 class="font-display font-extrabold text-4xl md:text-5xl text-warm-900 mb-4 tracking-tight">Подопечные фонда</h2>
            <p class="text-warm-500 text-lg md:text-xl leading-relaxed">Шнауцеры, которые прямо сейчас ждут свою семью. Каждый со своим характером и историей.</p>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/animals" class="btn border-2 border-warm-100 hover:border-primary-200 hover:bg-primary-50 px-8 py-3.5 font-bold transition-all">
              Весь каталог
            </NuxtLink>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <template v-if="dogsPending">
            <DogCardSkeleton v-for="i in HOME_PAGE_SIZE" :key="i" />
          </template>
          <template v-else-if="pagedDogs.length">
            <DogCard v-for="dog in pagedDogs" :key="dog.id" :dog="dog" />
          </template>
          <div v-else class="col-span-full text-center py-20 text-warm-400 bg-warm-50 rounded-[3rem] border-2 border-dashed border-warm-200">
            <svg class="w-16 h-16 mx-auto mb-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xl font-medium">В этой категории пока пусто</p>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="!dogsPending && totalDogPages > 1" class="mt-16 flex justify-center items-center gap-3">
          <button
            class="w-12 h-12 rounded-2xl border-2 border-warm-100 flex items-center justify-center hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 transition-all active:scale-90"
            :disabled="homeDogPage <= 1"
            @click="homeDogPage = Math.max(1, homeDogPage - 1)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="glass px-6 py-3 rounded-2xl font-display font-bold text-warm-700 shadow-sm">
            {{ homeDogPage }} <span class="text-warm-300 mx-1">/</span> {{ totalDogPages }}
          </div>
          <button
            class="w-12 h-12 rounded-2xl border-2 border-warm-100 flex items-center justify-center hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 transition-all active:scale-90"
            :disabled="homeDogPage >= totalDogPages"
            @click="homeDogPage = Math.min(totalDogPages, homeDogPage + 1)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ──────────────────────────────────────── -->
    <section class="py-32 bg-warm-50 relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div class="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary-100/30 rounded-full blur-[120px]" />
        <div class="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-terra-100/20 rounded-full blur-[140px]" />
      </div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-24">
          <h2 class="font-display font-black text-4xl md:text-6xl text-warm-900 mb-6 tracking-tight">Путь к новому другу</h2>
          <p class="text-warm-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Мы помогаем вам и питомцу найти друг друга и обеспечиваем поддержку на каждом этапе</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, i) in adoptionSteps"
            :key="i"
            class="group relative"
          >
            <div class="glass p-8 rounded-[2.5rem] h-full border-white/40 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
              <!-- Step Number & Icon -->
              <div class="mb-8 flex items-center justify-between">
                <div class="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-500">
                  <component :is="step.icon" class="w-8 h-8" />
                </div>
                <span class="font-display font-black text-4xl text-warm-200/50 group-hover:text-primary-500/20 transition-colors">0{{ i + 1 }}</span>
              </div>

              <!-- Content -->
              <h3 class="font-display font-bold text-2xl text-warm-900 mb-4 group-hover:text-primary-600 transition-colors">{{ step.title }}</h3>
              <p class="text-warm-500 leading-relaxed">{{ step.desc }}</p>
            </div>

            <!-- Connecting line (desktop) -->
            <div v-if="i < 3" class="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 border-t-2 border-dashed border-warm-200 z-0" />
          </div>
        </div>

        <div class="mt-20 text-center">
          <NuxtLink to="/animals" class="inline-flex items-center gap-3 text-primary-600 font-black text-lg hover:gap-5 transition-all group">
            Посмотреть всех шнауцеров
            <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── NEWS + RSS ───────────────────────────────────────── -->
    <section class="py-24 bg-white">
      <div class="container-custom">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="font-display font-extrabold text-3xl md:text-5xl text-warm-900 mb-3 tracking-tight">Жизнь фонда</h2>
            <p class="text-warm-500 text-lg md:text-xl">Счастливые истории, новости и полезные советы</p>
          </div>
          <NuxtLink v-if="news.length" to="/news" class="hidden sm:inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all">
            Все новости
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- News Grid -->
          <div class="lg:col-span-7">
            <div v-if="news.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NewsCard v-for="item in news.slice(0, 2)" :key="item.id" :news="item" />
            </div>
            <div v-else class="flex items-center justify-center h-64 text-warm-400 bg-warm-50 rounded-[2.5rem] border-2 border-dashed border-warm-200">
              Пока новостей нет
            </div>
          </div>

          <!-- RSS / Side widget -->
          <div class="lg:col-span-5">
            <RssWidget />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA BANNER ────────────────────────────────────────── -->
    <section class="py-24">
      <div class="container-custom">
        <div class="relative overflow-hidden rounded-[3.5rem] p-12 md:p-20 text-white shadow-[0_32px_80px_rgba(0,0,0,0.15)] group">
          <!-- Advanced Mesh Gradient Background -->
          <div class="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105" 
               style="background: linear-gradient(135deg, #1e4b7a 0%, #2b7fb8 40%, #c85e30 100%);">
             <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
             <div class="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(58,156,220,0.3)_0%,transparent_50%)]" />
          </div>

          <div class="relative z-10 max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-8">
              <span class="w-1.5 h-1.5 bg-primary-300 rounded-full animate-pulse" />
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-50">Присоединяйтесь к нам</span>
            </div>

            <h2 class="font-display font-black text-5xl md:text-7xl mb-8 leading-[0.9] tracking-tight">
              Подарите шнауцеру <br/>
              <span class="text-white/80 italic font-display font-medium">счастливое будущее</span>
            </h2>
            <p class="text-white/80 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-medium">
              Ваша поддержка помогает нам спасать жизни. Станьте частью нашей команды волонтеров или поддержите фонд финансово.
            </p>
            <div class="flex flex-wrap gap-5">
              <NuxtLink to="/animals" class="btn bg-white text-primary-700 hover:bg-primary-50 px-10 py-5 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Найти питомца
              </NuxtLink>
              <NuxtLink to="/support" class="btn bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-10 py-5 text-lg font-bold rounded-2xl transition-all hover:scale-105 active:scale-95">
                Помочь фонду
              </NuxtLink>
            </div>
          </div>

          <!-- Abstract Decoration -->
          <div class="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] pointer-events-none opacity-20">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-white fill-current animate-spin-slow">
                <path d="M44.7,-76.4C58.3,-69.2,70.1,-58.5,78.2,-45.5C86.3,-32.5,90.8,-17.3,90.4,-2.2C90,12.9,84.7,27.8,76,40.1C67.3,52.4,55.1,62.1,41.4,70.1C27.7,78.1,12.5,84.3,-2.3,88.4C-17.1,92.5,-31.7,94.5,-44.8,89.5C-57.9,84.5,-69.5,72.4,-77.9,58.8C-86.3,45.2,-91.5,30,-92.8,14.6C-94.1,-0.7,-91.5,-16.2,-84.9,-29.8C-78.3,-43.4,-67.7,-55.1,-55.2,-62.7C-42.7,-70.3,-28.4,-73.8,-14.2,-74.3C-0.1,-74.8,14.2,-72.3,44.7,-76.4Z" transform="translate(100 100)" />
             </svg>
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
