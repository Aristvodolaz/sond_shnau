<template>
  <div class="min-h-screen bg-warm-50 pb-24">

    <!-- Hero Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100/50 backdrop-blur-md rounded-full border border-primary-200/50 mb-6">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Поддержка</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Помочь фонду <br/>
            <span class="text-primary-600 italic font-display font-medium">спасать жизни</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Выберите удобный способ участия — каждый вклад важен. Мы благодарны любой помощи, от репоста до финансовой поддержки.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      
      <!-- Ways to help -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        <NuxtLink
          v-for="option in helpOptions"
          :key="option.title"
          :to="option.to"
          class="glass p-8 md:p-10 rounded-[3rem] border-white/60 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(0,0,0,0.06)] group"
        >
          <div :class="['w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg', option.iconBg, option.shadowColor]">
            <svg :class="['w-8 h-8', option.iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="option.svg" />
          </div>
          
          <h2 class="font-display font-black text-2xl text-warm-900 mb-4 group-hover:text-primary-600 transition-colors">{{ option.title }}</h2>
          <p class="text-warm-500 text-base leading-relaxed flex-1 mb-8">{{ option.desc }}</p>
          
          <div class="flex items-center gap-2 font-bold text-sm tracking-wide uppercase" :class="option.linkColor">
            {{ option.btnLabel }}
            <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom CTA -->
      <div class="bg-primary-600 rounded-[3.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <h2 class="font-display font-black text-3xl md:text-5xl mb-6 relative z-10">Самая большая помощь</h2>
        <p class="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
          ... это взять питомца домой. Подарите счастливую жизнь тому, кто в ней очень нуждается.
        </p>
        
        <NuxtLink to="/animals" class="relative z-10 inline-flex items-center gap-3 bg-white text-primary-700 hover:bg-primary-50 px-10 py-5 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 group">
          Найти питомца
          <svg class="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
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
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500',
    linkColor: 'text-primary-600',
    shadowColor: 'shadow-primary-500/20',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`
  },
  {
    title: 'Взять на передержку',
    desc: 'Временно приютить животное, пока ждёт постоянного хозяина. Всё необходимое мы предоставляем.',
    to: '/useful/adopt',
    btnLabel: 'Узнать больше',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    linkColor: 'text-emerald-600',
    shadowColor: 'shadow-emerald-500/20',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`
  },
  {
    title: 'Финансовая помощь',
    desc: 'Все средства идут на лечение, питание и содержание собак — мы регулярно публикуем отчёты.',
    to: '/contacts',
    btnLabel: 'Как помочь',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    linkColor: 'text-amber-600',
    shadowColor: 'shadow-amber-500/20',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
  },
  {
    title: 'Волонтёрство',
    desc: 'Помогайте руками на передержках, машиной для перевозки собак или просто распространяйте информацию.',
    to: '/contacts',
    btnLabel: 'Связаться',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    linkColor: 'text-sky-600',
    shadowColor: 'shadow-sky-500/20',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>`
  }
]
</script>
