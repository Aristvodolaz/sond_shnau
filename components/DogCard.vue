<template>
  <article class="group bg-white rounded-3xl overflow-hidden border border-warm-100 shadow-card hover:shadow-card-hover hover-lift transition-all duration-500 flex flex-col h-full">

    <!-- Photo -->
    <NuxtLink :to="`/animals/${dog.slug}`" class="block relative overflow-hidden bg-warm-100 shrink-0" style="aspect-ratio: 1/1;">
      <template v-if="dog.photos?.length">
        <img
          :src="resolveMediaUrl(dog.photos[0])"
          aria-hidden="true"
          class="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40 saturate-[1.4] pointer-events-none select-none"
        />
        <img
          :src="resolveMediaUrl(dog.photos[0])"
          :alt="dog.name"
          class="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </template>
      <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 text-warm-300">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <!-- Status badge -->
      <div class="absolute top-4 left-4 z-10">
        <span :class="['px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm', statusBadgeClass]">
          {{ statusLabel(dog.status) }}
        </span>
      </div>

      <!-- Favorite -->
      <button
        type="button"
        class="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm hover:bg-white active:scale-90 transition-all duration-300 z-10 group/fav"
        :aria-pressed="favorited"
        @click.prevent.stop="toggleFavorite"
      >
        <svg
          class="w-5 h-5 transition-all duration-500 transform"
          :class="[
            favorited ? 'text-red-500 scale-110 fill-current animate-heart-pop' : 'text-warm-400 group-hover/fav:text-red-500'
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </NuxtLink>

    <!-- Body -->
    <div class="p-5 flex flex-col flex-1 gap-4">
      <div class="flex justify-between items-start gap-4">
        <div class="min-w-0">
          <h3 class="font-display font-bold text-xl text-warm-900 truncate leading-tight group-hover:text-primary-600 transition-colors">{{ dog.name }}</h3>
          <p class="text-xs font-semibold text-warm-400 mt-1 uppercase tracking-wider">{{ breedLabel(dog.type) }}</p>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="dog.features?.length" class="flex flex-wrap gap-2">
        <span
          v-for="feat in dog.features.slice(0, 2)"
          :key="feat"
          class="px-2.5 py-1 bg-warm-50 text-warm-600 text-[10px] font-bold rounded-lg border border-warm-100 uppercase tracking-wider"
        >
          {{ featureLabel(feat) }}
        </span>
      </div>

      <!-- Info Row -->
      <div class="pt-4 mt-auto border-t border-warm-50 flex items-center justify-between text-xs font-medium text-warm-500">
        <div class="flex items-center gap-3">
           <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ dog.age }}
          </span>
          <span class="flex items-center gap-1.5 truncate max-w-[100px]">
            <svg class="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {{ dog.city }}
          </span>
        </div>
        
        <NuxtLink
          :to="`/animals/${dog.slug}`"
          class="w-9 h-9 flex items-center justify-center bg-primary-50 text-primary-600 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary-500/20"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Dog } from '~/types'

const props = defineProps<{ dog: Dog }>()
const { resolveMediaUrl } = useMediaUrl()
const { statusLabel, breedLabel, featureLabel } = useAnimalLabels()
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
