<template>
  <div class="min-h-screen bg-warm-50 pb-24 lg:pb-12">

    <!-- Loading state -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-24 gap-4">
      <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      <p class="text-warm-500 font-medium">Загружаем анкету…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!dog" class="text-center py-24">
      <div class="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg class="w-10 h-10 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="font-display font-semibold text-2xl text-warm-900 mb-2">Анкета не найдена</h1>
      <p class="text-warm-500 mb-6">Возможно, питомец уже нашёл дом.</p>
      <NuxtLink to="/animals" class="btn-primary px-8 py-3">Смотреть всех</NuxtLink>
    </div>

    <!-- Dog detail -->
    <template v-else>
      <!-- Breadcrumb -->
      <div class="container-custom pt-6 pb-0">
        <nav class="flex items-center gap-2 text-sm text-warm-500 flex-wrap">
          <NuxtLink to="/" class="hover:text-primary-600 transition-colors">Главная</NuxtLink>
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <NuxtLink to="/animals" class="hover:text-primary-600 transition-colors">Шнауцеры</NuxtLink>
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-warm-900 font-medium">{{ dog.name }}</span>
        </nav>
      </div>

      <!-- Main content -->
      <div class="container-custom py-8 md:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">

          <!-- Left: Gallery -->
          <div class="space-y-3">
            <!-- Main photo -->
            <div class="relative rounded-2xl overflow-hidden bg-warm-200" style="aspect-ratio: 4/3;">
              <img
                v-if="currentPhoto"
                :src="resolveMediaUrl(currentPhoto)"
                :alt="dog.name"
                class="w-full h-full object-cover transition-opacity duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-warm-400">
                <svg class="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- Nav arrows for multiple photos -->
              <template v-if="dog.photos.length > 1">
                <button
                  type="button"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  @click="prevPhoto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  @click="nextPhoto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </template>

              <!-- Photo counter -->
              <div v-if="dog.photos.length > 1" class="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                {{ currentPhotoIndex + 1 }} / {{ dog.photos.length }}
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="dog.photos.length > 1" class="flex gap-2 overflow-x-auto pb-1">
              <button
                v-for="(photo, i) in dog.photos"
                :key="i"
                type="button"
                :class="[
                  'shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
                  currentPhoto === photo ? 'border-primary-500 scale-95' : 'border-transparent hover:border-warm-300'
                ]"
                @click="currentPhoto = photo; currentPhotoIndex = i"
              >
                <img :src="resolveMediaUrl(photo)" :alt="`${dog.name} фото ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>

            <!-- Features tags -->
            <div v-if="displayFeatures.length" class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="(f, i) in displayFeatures"
                :key="i"
                class="px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 rounded-full text-xs font-semibold"
              >
                ✓ {{ f }}
              </span>
            </div>
          </div>

          <!-- Right: Info -->
          <div>
            <!-- Status badge -->
            <span :class="['inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4', statusBadgeClass]">
              {{ statusLabel(dog.status) }}
            </span>

            <h1 class="font-display font-semibold text-3xl md:text-4xl text-warm-900 mb-1.5 leading-tight">{{ dog.name }}</h1>
            <p class="text-base text-primary-600 font-semibold mb-5">{{ breedLabel(dog.type) }}</p>

            <!-- Key attributes -->
            <div class="grid grid-cols-2 gap-3 mb-7">
              <div class="bg-white rounded-2xl p-4 border border-warm-100">
                <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-1">Возраст</p>
                <p class="font-semibold text-warm-900">{{ dog.age }}</p>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-warm-100">
                <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-1">Город</p>
                <p class="font-semibold text-warm-900">{{ dog.city }}</p>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-warm-100 col-span-2">
                <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-1">Куратор</p>
                <p class="font-semibold text-warm-900">{{ dog.curator.name }}</p>
              </div>
            </div>

            <!-- Tab navigation -->
            <div class="flex gap-1 mb-5 border-b border-warm-200">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                :class="[
                  'px-4 py-2.5 text-sm font-semibold -mb-px border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-warm-500 hover:text-warm-800'
                ]"
                @click="activeTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab content -->
            <div class="mb-7 min-h-[120px]">
              <div v-if="activeTab === 'about'" class="space-y-4">
                <p v-if="dog.description?.trim()" class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.description }}</p>
                <p v-else class="text-warm-400 italic">Описание не добавлено.</p>
              </div>

              <div v-else-if="activeTab === 'character'" class="space-y-4">
                <p v-if="dog.character?.trim()" class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.character }}</p>
                <p v-else class="text-warm-400 italic">Характер не описан.</p>
              </div>

              <div v-else-if="activeTab === 'health'">
                <div class="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p class="text-blue-900 leading-relaxed whitespace-pre-line">{{ dog.health || 'Данные о здоровье не указаны.' }}</p>
                </div>
              </div>

              <div v-else-if="activeTab === 'story'" class="space-y-4">
                <p v-if="dog.story?.trim()" class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.story }}</p>
                <p v-else class="text-warm-400 italic">История пока не рассказана.</p>
              </div>
            </div>

            <!-- Contact section -->
            <div class="bg-white rounded-2xl border border-warm-100 p-5 mb-5">
              <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Связаться с куратором</p>
              <div class="grid grid-cols-2 gap-2.5">
                <a
                  :href="telHref()"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-warm-50 border border-warm-200 rounded-xl text-sm font-semibold text-warm-800 hover:bg-warm-100 hover:border-warm-300 transition-colors"
                >
                  <svg class="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Позвонить
                </a>
                <a
                  v-if="dog.forumTopicUrl"
                  :href="dog.forumTopicUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-primary-50 border border-primary-200 rounded-xl text-sm font-semibold text-primary-800 hover:bg-primary-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Форум
                </a>
                <a
                  v-if="dog.curator.telegram"
                  :href="tgHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-sky-50 border border-sky-200 rounded-xl text-sm font-semibold text-sky-800 hover:bg-sky-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.21.21 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  v-if="dog.curator.email"
                  :href="`mailto:${dog.curator.email}`"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-warm-50 border border-warm-200 rounded-xl text-sm font-semibold text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-warm-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>

            <!-- Primary CTAs -->
            <div class="flex gap-3 flex-wrap">
              <button
                class="btn-primary flex-1 min-w-[160px] py-3.5 text-base"
                @click="requestOpen = true"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Хочу забрать
              </button>
              <button
                :class="[
                  'w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all',
                  favorited
                    ? 'border-primary-400 bg-primary-50 text-primary-500'
                    : 'border-warm-200 text-warm-600 hover:border-primary-300 hover:text-primary-500'
                ]"
                :title="favorited ? 'В избранном' : 'В избранное'"
                @click="toggleFav"
              >
                <svg class="w-5 h-5" :fill="favorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        <!-- Related animals -->
        <section v-if="related.length" class="mt-16 pt-10 border-t border-warm-200">
          <h2 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 mb-8">
            Ещё в {{ dog.city }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DogCard v-for="d in related" :key="d.id" :dog="d" />
          </div>
        </section>
      </div>

      <!-- Sticky mobile CTA bar -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-warm-200 px-4 py-3 safe-bottom">
        <div class="flex gap-2">
          <button class="btn-primary flex-1 py-3 text-sm" @click="requestOpen = true">
            Хочу забрать
          </button>
          <a :href="telHref()" class="w-12 h-12 flex items-center justify-center rounded-xl bg-warm-50 border border-warm-200 text-warm-700 hover:bg-warm-100 transition-colors shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            v-if="dog.forumTopicUrl"
            :href="dog.forumTopicUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors shrink-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>

      <AdoptionRequestModal
        v-model="requestOpen"
        :animal-id="dog.id"
        :animal-name="dog.name"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse, Dog } from '~/types'

const route = useRoute()
const slug = route.params.slug as string
const { resolveMediaUrl } = useMediaUrl()
const { statusLabel, breedLabel } = useAnimalLabels()
const { tgUrl } = useContactLinks()
const { has, toggle } = useFavorites()

const { data: dog, pending } = await useFetch<Dog>(`/api/animals/${slug}`)
const currentPhoto = ref('')
const currentPhotoIndex = ref(0)
const requestOpen = ref(false)
const activeTab = ref('about')

const tabs = [
  { id: 'about', label: 'О собаке' },
  { id: 'character', label: 'Характер' },
  { id: 'health', label: 'Здоровье' },
  { id: 'story', label: 'История' }
]

watch(dog, (d) => {
  if (d?.photos?.length) {
    currentPhoto.value = d.photos[0]
    currentPhotoIndex.value = 0
  }
}, { immediate: true })

const statusBadgeClass = computed(() => {
  switch (dog.value?.status) {
    case 'looking': return 'bg-primary-500 text-white'
    case 'foster': return 'bg-primary-700 text-white'
    case 'pensioner': return 'bg-primary-900 text-white'
    default: return 'bg-warm-400 text-white'
  }
})

function prevPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + len) % len
  currentPhoto.value = dog.value.photos[currentPhotoIndex.value]
}

function nextPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % len
  currentPhoto.value = dog.value.photos[currentPhotoIndex.value]
}

const featureLabels: Record<string, string> = {
  sterilized: 'Стерилизован(а)',
  vaccinated: 'Привит(а)',
  treatedForParasites: 'Обработан(а) от паразитов'
}

const displayFeatures = computed(() =>
  (dog.value?.features ?? []).map(f => featureLabels[f] || f).filter(Boolean)
)

const telHref = () => dog.value ? `tel:${dog.value.curator.phone.replace(/\s/g, '')}` : '#'


const tgHref = computed(() => dog.value?.curator.telegram ? tgUrl(dog.value.curator.telegram) : '#')

const favorited = computed(() => dog.value ? has(dog.value.id) : false)
const toggleFav = () => { if (dog.value) toggle(dog.value.id) }

const related = ref<Dog[]>([])

watch(dog, async (d) => {
  if (!d) { related.value = []; return }
  try {
    const res = await $fetch<AnimalListResponse>('/api/animals', {
      query: { city: d.city, status: 'looking', pageSize: '7' }
    })
    related.value = res.items.filter(x => x.id !== d.id).slice(0, 3)
  } catch {
    related.value = []
  }
}, { immediate: true })

useHead(() => {
  const d = dog.value
  if (!d) return { title: 'Животное' }
  return {
    title: d.name,
    meta: [{ name: 'description', content: `${d.name} — ${breedLabel(d.type)}, ${d.age}, ${d.city}.` }]
  }
})
</script>
