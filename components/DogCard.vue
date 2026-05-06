<template>
  <article class="group bg-white rounded-xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 flex flex-col">

    <!-- Photo -->
    <div class="relative overflow-hidden bg-warm-100" style="aspect-ratio: 4/3;">
      <img
        v-if="dog.photos?.length"
        :src="resolveMediaUrl(dog.photos[0])"
        :alt="dog.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 text-warm-300">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- Status badge -->
      <span :class="['absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-semibold leading-none', statusBadgeClass]">
        {{ statusLabel(dog.status) }}
      </span>

      <!-- Favorite -->
      <button
        type="button"
        class="absolute top-2 right-2 w-8 h-8 bg-white/85 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        :aria-pressed="favorited"
        :title="favorited ? 'Убрать из избранного' : 'В избранное'"
        @click.prevent.stop="toggleFavorite"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="favorited ? 'text-red-500' : 'text-warm-400 group-hover:text-primary-400'"
          :fill="favorited ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="px-4 pt-3.5 pb-4 flex flex-col flex-1 gap-3">

      <!-- Name + breed -->
      <div class="min-w-0">
        <h3 class="font-semibold text-base text-warm-900 truncate leading-snug">{{ dog.name }}</h3>
        <p class="text-xs text-warm-500 mt-0.5 truncate">{{ breedLabel(dog.type) }}</p>
      </div>

      <!-- Age + city -->
      <div class="flex items-center gap-3 text-xs text-warm-600 min-w-0">
        <span class="flex items-center gap-1 shrink-0">
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ dog.age }}
        </span>
        <span class="flex items-center gap-1 min-w-0">
          <svg class="w-3 h-3 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ dog.city }}</span>
        </span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 mt-auto">
        <NuxtLink
          :to="`/animals/${dog.slug}`"
          class="flex-1 min-w-0 btn-primary text-sm py-2.5 text-center rounded-lg"
        >
          Подробнее
        </NuxtLink>
        <a
          :href="telHref(dog.curator.phone)"
          class="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border border-warm-200 text-warm-500 hover:border-primary-400 hover:text-primary-600 transition-colors"
          :title="`Позвонить: ${dog.curator.phone}`"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a
          v-if="dog.forumTopicUrl"
          :href="dog.forumTopicUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border border-warm-200 text-warm-500 hover:border-primary-400 hover:text-primary-600 transition-colors"
          title="Тема на форуме"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Dog } from '~/types'

const props = defineProps<{ dog: Dog }>()
const { resolveMediaUrl } = useMediaUrl()
const { statusLabel, breedLabel } = useAnimalLabels()
const { has, toggle } = useFavorites()

const favorited = computed(() => has(props.dog.id))
const toggleFavorite = () => toggle(props.dog.id)

const statusBadgeClass = computed(() => {
  switch (props.dog.status) {
    case 'looking':   return 'bg-primary-500 text-white'
    case 'foster':    return 'bg-primary-700 text-white'
    case 'pensioner': return 'bg-warm-800 text-warm-100'
    default:          return 'bg-primary-500 text-white'
  }
})

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
</script>
