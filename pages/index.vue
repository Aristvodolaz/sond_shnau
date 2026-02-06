<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 via-warm-50 to-warm-100 py-16 md:py-24 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div class="container-custom relative z-10">
        <div class="max-w-3xl animate-fade-in-up">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-warm-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-warm-900 to-primary-700">
            Помогаем шнауцерам найти любящий дом
          </h1>
          <p class="text-lg md:text-xl text-warm-700 mb-8 leading-relaxed animate-fade-in-up delay-200">
            Мы — команда волонтёров, которая спасает, лечит и пристраивает шнауцеров в добрые руки. 
            Каждая собака заслуживает тепло, заботу и безопасность.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
            <UiButton to="/useful/adopt" variant="primary" size="lg" class="transform hover:scale-105 hover:shadow-lg">
              Взять собаку
            </UiButton>
            <UiButton to="/contacts" variant="outline" size="lg" class="transform hover:scale-105">
              Связаться с нами
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Dogs on Adoption -->
    <section class="py-16 md:py-20">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-900">
            Шнауцеры на пристройство
          </h2>
          <div class="flex gap-2">
            <button
              @click="filterStatus = 'looking'"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base',
                filterStatus === 'looking' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
              ]"
            >
              Ищут дом
            </button>
            <button
              @click="filterStatus = 'pensioner'"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base',
                filterStatus === 'pensioner' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
              ]"
            >
              Пенсионеры
            </button>
          </div>
        </div>

        <div v-if="filteredDogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <DogCard v-for="dog in filteredDogs" :key="dog.id" :dog="dog" />
        </div>
        <div v-else class="text-center py-12 text-warm-600">
          <p>Нет собак в этой категории</p>
        </div>
      </div>
    </section>

    <!-- News and RSS -->
    <section class="bg-warm-100 py-16 md:py-20">
      <div class="container-custom">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-900 mb-10">
          Новости фонда
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- News Cards -->
          <div class="lg:col-span-2">
            <div v-if="news.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NewsCard v-for="item in news.slice(0, 4)" :key="item.id" :news="item" />
            </div>
            <div v-else class="text-warm-600">
              <p>Новости пока отсутствуют</p>
            </div>
            <div class="mt-8">
              <UiButton to="/news" variant="outline">
                Все новости
              </UiButton>
            </div>
          </div>

          <!-- RSS Widget -->
          <div class="lg:col-span-1">
            <RssWidget />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 md:py-20">
      <div class="container-custom">
        <div class="bg-primary-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
            Как вы можете помочь?
          </h2>
          <p class="text-lg md:text-xl mb-8 text-primary-50 max-w-2xl mx-auto">
            Каждый вклад имеет значение. Вы можете взять собаку, стать волонтёром, сделать пожертвование 
            или просто рассказать о нас друзьям.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton to="/useful/adopt" variant="secondary" size="lg">
              Взять шнауцера
            </UiButton>
            <UiButton to="/contacts" variant="outline" size="lg" class="!border-white !text-white hover:!bg-white/10">
              Связаться
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Dog, NewsItem } from '~/types'

// SEO
useHead({
  title: 'Главная',
  meta: [
    { name: 'description', content: 'Фонд помощи шнауцерам. Пристройство собак в добрые руки, помощь потерявшимся, счастливые истории.' }
  ]
})

// Fetch dogs from API
const { data: dogsData } = await useFetch<Dog[]>('/api/dogs')
const dogs = ref<Dog[]>(dogsData.value || [])

const filterStatus = ref<'looking' | 'pensioner'>('looking')

const filteredDogs = computed(() => {
  return dogs.value.filter(dog => dog.status === filterStatus.value)
})

// Fetch news from API
const { data: newsData } = await useFetch<NewsItem[]>('/api/news')
const news = ref<NewsItem[]>(newsData.value || [])
</script>
