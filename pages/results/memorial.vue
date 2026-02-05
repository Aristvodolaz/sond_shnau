<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-5xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        В памяти
      </h1>
      <p class="text-xl text-warm-700 mb-12 max-w-3xl">
        Эта страница посвящена тем, кто ушёл от нас, но навсегда остался в наших сердцах. 
        Мы помним каждого и благодарны за время, проведённое вместе.
      </p>

      <!-- Memorial Entries -->
      <div class="space-y-8">
        <div
          v-for="entry in memorialEntries"
          :key="entry.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
            <!-- Photo -->
            <div class="md:col-span-1">
              <div class="relative aspect-square rounded-lg overflow-hidden">
                <NuxtImg
                  :src="entry.photo"
                  :alt="entry.name"
                  class="w-full h-full object-cover"
                  width="400"
                  height="400"
                />
              </div>
            </div>

            <!-- Info -->
            <div class="md:col-span-2 flex flex-col">
              <div class="mb-4">
                <h2 class="text-2xl md:text-3xl font-display font-bold text-warm-900 mb-2">
                  {{ entry.name }}
                </h2>
                <p class="text-warm-600 mb-1">{{ entry.type }}</p>
                <p class="text-warm-500 text-sm">{{ entry.years }}</p>
              </div>

              <div class="flex-1">
                <p class="text-warm-700 leading-relaxed italic">
                  {{ entry.tribute }}
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-warm-200">
                <div class="flex items-center text-sm text-warm-500">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                  <span>Светлая память</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="memorialEntries.length === 0" class="text-center py-12">
        <p class="text-warm-600">Записей пока нет</p>
      </div>

      <!-- Tribute Message -->
      <div class="mt-16 bg-warm-100 rounded-xl p-8 md:p-12 text-center">
        <svg class="w-12 h-12 mx-auto text-warm-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        <p class="text-lg text-warm-700 max-w-2xl mx-auto leading-relaxed">
          Каждая собака оставила след в жизни тех, кто её любил. 
          Мы помним их преданность, доброту и безусловную любовь. 
          Спасибо вам за то, что были рядом.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MemorialEntry } from '~/types'

// SEO
useHead({
  title: 'В памяти',
  meta: [
    { name: 'description', content: 'Памяти наших четвероногих друзей, которые ушли, но навсегда остались в наших сердцах.' }
  ]
})

// Fetch memorial entries from API
const { data } = await useFetch<MemorialEntry[]>('/api/memorial')
const memorialEntries = ref<MemorialEntry[]>(data.value || [])
</script>
