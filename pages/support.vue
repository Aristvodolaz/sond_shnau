<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Page header -->
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom max-w-4xl">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Помочь фонду</h1>
        <p class="text-warm-500 mt-2 text-sm">Выберите удобный способ участия — каждый вклад важен</p>
      </div>
    </section>

    <div class="container-custom max-w-4xl py-8 md:py-10">

      <!-- Ways to help -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
        <NuxtLink
          v-for="option in helpOptions"
          :key="option.title"
          :to="option.to"
          class="bg-white rounded-2xl p-5 md:p-6 border border-warm-100 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-warm-200 group active:scale-[0.99]"
        >
          <div class="flex items-start gap-4 mb-3 md:block">
            <div :class="['w-11 h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-4', option.iconBg]">
              <svg :class="['w-5 h-5', option.iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="option.svg" />
            </div>
            <h2 class="font-display font-semibold text-base text-warm-900 leading-snug md:hidden pt-1.5">{{ option.title }}</h2>
          </div>
          <h2 class="hidden md:block font-display font-semibold text-base text-warm-900 mb-2 leading-snug">{{ option.title }}</h2>
          <p class="text-warm-500 text-sm leading-relaxed flex-1">{{ option.desc }}</p>
          <div class="mt-4 flex items-center gap-1.5 text-sm font-semibold" :class="option.linkColor">
            {{ option.btnLabel }}
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Impact stats -->
      <div class="relative overflow-hidden bg-primary-500 rounded-3xl p-8 md:p-10 text-white mb-10">
        <div class="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full" />
        <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full" />
        <div class="relative z-10">
          <h2 class="font-display font-semibold text-lg md:text-xl mb-6 text-center">За 10 лет работы</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div v-for="stat in impactStats" :key="stat.label">
              <p class="font-display font-semibold text-2xl md:text-3xl mb-1 leading-none">{{ stat.value }}</p>
              <p class="text-primary-200 text-xs mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center py-6">
        <p class="text-warm-600 mb-5 text-sm">Самая большая помощь — взять питомца домой</p>
        <NuxtLink to="/animals" class="btn-primary px-8 py-3 text-sm">
          Найти питомца
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Помочь фонду',
  meta: [{ name: 'description', content: 'Как помочь фонду помощи шнауцерам: взять питомца, стать куратором, связаться.' }]
})

const helpOptions = [
  {
    title: 'Взять питомца',
    desc: 'Просматривайте анкеты, фильтруйте по городу и породе, связывайтесь напрямую с куратором.',
    to: '/animals',
    btnLabel: 'Смотреть шнауцеров',
    btnClass: 'btn-primary',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`
  },
  {
    title: 'Взять на передержку',
    desc: 'Временно приютить животное, пока ждёт постоянного хозяина. Всё необходимое предоставляется.',
    to: '/useful/adopt',
    btnLabel: 'Подробнее',
    btnClass: 'btn-outline',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`
  },
  {
    title: 'Юридическая помощь',
    desc: 'FAQ по содержанию животных, правам и документам. Ответы от юридического отдела фонда.',
    to: '/useful/legal',
    btnLabel: 'Открыть раздел',
    btnClass: 'btn-outline',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>`
  },
  {
    title: 'Связаться с нами',
    desc: 'Телефоны, мессенджеры и email кураторов — всё в одном месте, без поиска в тексте.',
    to: '/contacts',
    btnLabel: 'Контакты',
    btnClass: 'btn-outline',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>`
  }
]

const impactStats = [
  { value: '150+', label: 'пристроено' },
  { value: '300+', label: 'спасено' },
  { value: '20+',  label: 'кураторов' },
  { value: '10',   label: 'лет работы' }
]
</script>
