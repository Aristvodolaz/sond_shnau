<template>
  <div class="min-h-screen bg-warm-50 py-10 md:py-14">
    <div class="container-custom">

      <!-- Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Избранное</h1>
          <p class="text-warm-500 mt-2 text-sm">
            {{ list.length > 0 ? `${list.length} ${pluralAnimals(list.length)}` : 'Пусто' }}
          </p>
        </div>
        <NuxtLink
          v-if="list.length > 0"
          to="/animals"
          class="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          + Добавить ещё
        </NuxtLink>
      </div>

      <!-- List -->
      <div v-if="list.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <DogCard v-for="dog in list" :key="dog.id" :dog="dog" />
      </div>

      <!-- Empty state -->
      <div v-else class="py-20 text-center">
        <div class="w-24 h-24 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 class="font-display font-semibold text-xl text-warm-800 mb-3">Список пуст</h2>
        <p class="text-warm-500 text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Нажимайте на сердечко в карточках животных, чтобы сохранять понравившихся.
        </p>
        <NuxtLink to="/animals" class="btn-primary px-8 py-3.5">
          Смотреть животных
        </NuxtLink>
      </div>

      <!-- Tip -->
      <div v-if="list.length > 0" class="mt-8 p-4 bg-warm-100 rounded-2xl text-sm text-warm-600 flex items-start gap-3">
        <svg class="w-4 h-4 shrink-0 mt-0.5 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Список хранится на этом устройстве. Чтобы не потерять — отправьте себе ссылки с карточек.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse, Dog } from '~/types'

useHead({ title: 'Избранное', meta: [{ name: 'description', content: 'Сохранённые анкеты животных.' }] })

const { ids } = useFavorites()
const { data } = await useFetch<AnimalListResponse>('/api/animals', { query: { pageSize: '500', page: '1' } })

const list = computed(() => {
  const items = data.value?.items || []
  const set = new Set(ids.value)
  return items.filter((d: Dog) => set.has(d.id))
})

function pluralAnimals(n: number) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'животных'
  if (n % 10 === 1) return 'животное'
  if (n % 10 >= 2 && n % 10 <= 4) return 'животных'
  return 'животных'
}
</script>
