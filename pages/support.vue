<template>
  <div class="min-h-screen bg-warm-50 py-10 md:py-14">
    <div class="container-custom max-w-4xl">

      <!-- Header -->
      <div class="mb-12">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight mb-3">
          Как вы можете помочь
        </h1>
        <p class="text-warm-600 text-sm leading-relaxed max-w-xl">
          Выберите удобный формат участия. Каждый вклад — реальная помощь конкретному животному.
        </p>
      </div>

      <!-- Ways to help -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        <div
          v-for="option in helpOptions"
          :key="option.title"
          class="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
        >
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center mb-4', option.iconBg]">
            <component :is="option.icon" :class="['w-6 h-6', option.iconColor]" />
          </div>
          <h2 class="font-display font-semibold text-base text-warm-900 mb-2">{{ option.title }}</h2>
          <p class="text-warm-600 text-sm leading-relaxed mb-5 flex-1">{{ option.desc }}</p>
          <NuxtLink
            :to="option.to"
            :class="['btn text-sm py-2.5 px-5 self-start', option.btnClass]"
          >
            {{ option.btnLabel }}
          </NuxtLink>
        </div>
      </div>

      <!-- Impact stats -->
      <div class="bg-primary-500 rounded-3xl p-8 md:p-10 text-white mb-10">
        <h2 class="font-display font-semibold text-xl md:text-2xl mb-6 text-center">За 10 лет работы</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="stat in impactStats" :key="stat.label">
            <p class="font-display font-semibold text-2xl md:text-3xl mb-1">{{ stat.value }}</p>
            <p class="text-primary-200 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- CTA to adopt -->
      <div class="text-center py-8">
        <p class="text-warm-600 mb-5 text-lg">Самая большая помощь — взять питомца домой</p>
        <NuxtLink to="/animals" class="btn-primary px-10 py-4 text-base">
          Найти питомца
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Помочь фонду',
  meta: [{ name: 'description', content: 'Как помочь фонду помощи шнауцерам: пристройство, волонтёрство, контакты.' }]
})

const HouseIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
}
const HandIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/></svg>`
}
const BookIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
}
const PhoneIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`
}

const helpOptions = [
  {
    title: 'Взять питомца',
    desc: 'Просматривайте анкеты, используйте фильтры по городу и породе, связывайтесь с куратором напрямую.',
    to: '/animals',
    btnLabel: 'Смотреть животных',
    btnClass: 'btn-primary rounded-xl',
    icon: HouseIcon,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500'
  },
  {
    title: 'Взять на передержку',
    desc: 'Временно приютить животное, пока оно ждёт постоянного хозяина. Всё необходимое предоставляется.',
    to: '/useful/give-away',
    btnLabel: 'Подробнее',
    btnClass: 'btn-outline rounded-xl',
    icon: HandIcon,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500'
  },
  {
    title: 'Юридическая помощь',
    desc: 'FAQ по содержанию, правам животных и оформлению документов. Юридический отдел фонда.',
    to: '/useful/faq',
    btnLabel: 'Открыть FAQ',
    btnClass: 'btn-outline rounded-xl',
    icon: BookIcon,
    iconBg: 'bg-warm-100',
    iconColor: 'text-warm-600'
  },
  {
    title: 'Связаться с нами',
    desc: 'Телефоны, мессенджеры и email кураторов — всё в одном месте, без поиска в тексте.',
    to: '/contacts',
    btnLabel: 'Контакты',
    btnClass: 'btn-outline rounded-xl',
    icon: PhoneIcon,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500'
  }
]

const impactStats = [
  { value: '150+', label: 'пристроено' },
  { value: '300+', label: 'спасено' },
  { value: '20+', label: 'кураторов' },
  { value: '10', label: 'лет работы' }
]
</script>
