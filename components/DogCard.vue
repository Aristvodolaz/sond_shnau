<template>
  <article class="group bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

    <!-- Photo -->
    <NuxtLink :to="`/animals/${dog.slug}`" class="block relative overflow-hidden bg-warm-100 shrink-0" style="aspect-ratio: 4/3;">
      <template v-if="dog.photos?.length">
        <!-- Blurred backdrop — fills colour from the photo itself -->
        <img
          :src="resolveMediaUrl(dog.photos[0])"
          aria-hidden="true"
          class="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50 saturate-[1.4] pointer-events-none select-none"
        />
        <!-- Actual photo, fully visible -->
        <img
          :src="resolveMediaUrl(dog.photos[0])"
          :alt="dog.name"
          class="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04] drop-shadow-sm"
          loading="lazy"
        />
      </template>
      <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 text-warm-300">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- Gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Status badge -->
      <span :class="['absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold leading-none backdrop-blur-sm', statusBadgeClass]">
        {{ statusLabel(dog.status) }}
      </span>

      <!-- Favorite -->
      <button
        type="button"
        class="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200 hover:scale-110"
        :aria-pressed="favorited"
        :title="favorited ? 'Убрать из избранного' : 'В избранное'"
        @click.prevent.stop="toggleFavorite"
      >
        <svg
          class="w-4 h-4 transition-colors duration-200"
          :class="favorited ? 'text-red-500' : 'text-warm-400'"
          :fill="favorited ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </NuxtLink>

    <!-- Body -->
    <div class="px-4 pt-3.5 pb-4 flex flex-col flex-1 gap-2.5">

      <!-- Name + breed -->
      <div class="min-w-0">
        <h3 class="font-semibold text-base text-warm-900 truncate leading-snug">{{ dog.name }}</h3>
        <p class="text-xs text-warm-400 mt-0.5 truncate">{{ breedLabel(dog.type) }}</p>
      </div>

      <!-- Age + city -->
      <div class="flex items-center gap-3 text-xs text-warm-500 min-w-0">
        <span class="flex items-center gap-1 shrink-0">
          <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ dog.age }}
        </span>
        <span class="flex items-center gap-1 min-w-0">
          <svg class="w-3 h-3 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ dog.city }}</span>
        </span>
      </div>

      <!-- Action -->
      <div class="mt-auto pt-1">
        <NuxtLink
          :to="`/animals/${dog.slug}`"
          class="block w-full btn-primary text-sm py-2.5 text-center rounded-xl"
        >
          Подробнее
        </NuxtLink>
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
    case 'looking':   return 'bg-primary-500/90 text-white'
    case 'foster':    return 'bg-primary-800/90 text-white'
    case 'pensioner': return 'bg-warm-800/90 text-warm-100'
    default:          return 'bg-primary-500/90 text-white'
  }
})
</script>
