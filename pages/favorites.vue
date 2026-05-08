<template>
  <div class="min-h-screen bg-warm-50 py-10">
    <div class="container-custom">
    <!-- Hero Header -->
    <section class="relative py-16 md:py-20 overflow-hidden mb-8">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10 text-center">
        <div class="max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-100/50 backdrop-blur-md rounded-full border border-red-200/50 mb-6">
            <svg class="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-700">Сохранённые</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Ваши <span class="text-primary-600 italic font-display font-medium">любимцы</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Список собак, которых вы сохранили. Собаки из этого списка всегда будут под рукой.
          </p>
        </div>
      </div>
    </section>

      <!-- Empty state -->
      <div v-if="!favorites.length" class="bg-white rounded-[2.5rem] p-16 text-center shadow-sm border border-warm-100 max-w-2xl mx-auto">
        <div class="w-24 h-24 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-warm-900 mb-4">В избранном пока пусто</h2>
        <p class="text-warm-500 mb-8 leading-relaxed">
          Чтобы добавить собаку в избранное, нажмите на сердечко в углу её карточки.
        </p>
        <NuxtLink to="/animals" class="btn-primary px-10 py-4 text-lg">
          Перейти в каталог
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div v-else>
        <div v-if="pending && !data" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DogCardSkeleton v-for="i in 3" :key="i" />
        </div>
        <div v-else-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DogCard v-for="dog in items" :key="dog.id" :dog="dog" />
        </div>
        <div v-else-if="!pending" class="text-center py-20 text-warm-400">
          Собаки не найдены или были удалены из базы.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse } from '~/types'

const { ids: favorites } = useFavorites()

// Fetch details for favorited IDs
const { data, pending } = await useFetch<AnimalListResponse>('/api/animals', {
  query: computed(() => ({
    ids: favorites.value.join(','),
    pageSize: 100
  })),
  watch: [favorites]
})

const items = computed(() => data.value?.items || [])

useHead({
  title: 'Избранное | Фонд помощи шнауцерам'
})
</script>
