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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Пристройство</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Взять шнауцера <br/>
            <span class="text-primary-600 italic font-display font-medium">в добрые руки</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Как взять собаку из фонда — пошагово, прозрачно и с поддержкой куратора на всех этапах.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">

      <!-- Why Adopt -->
      <section class="mb-16">
        <h2 class="text-3xl md:text-4xl font-display font-black text-warm-900 mb-10 tracking-tight px-4">Почему фонд?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 rounded-3xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-all duration-500 shadow-md">
                <component :is="benefit.icon" class="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3 group-hover:text-primary-600 transition-colors">{{ benefit.title }}</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        <!-- Process -->
        <div class="lg:col-span-8">
          <h2 class="text-3xl md:text-4xl font-display font-black text-warm-900 mb-10 tracking-tight px-4">Как взять собаку: шаги</h2>
          <div class="space-y-6">
            <div
              v-for="(step, i) in detailedSteps"
              :key="i"
              class="glass rounded-[2.5rem] border-white/60 p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 md:gap-8 items-start group"
            >
              <div class="relative shrink-0">
                <div class="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:bg-primary-50">
                  <component :is="step.icon" class="w-10 h-10 text-warm-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <div class="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-black shadow-md border-4 border-warm-50">
                  {{ i + 1 }}
                </div>
              </div>
              <div class="flex-1 pt-2">
                <h3 class="font-display font-bold text-xl text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">{{ step.title }}</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base">{{ step.desc }}</p>
                <div v-if="i === 0" class="mt-4">
                  <NuxtLink to="/animals" class="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all text-sm">
                    Посмотреть шнауцеров
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Requirements & Questionnaire -->
        <div class="lg:col-span-4 space-y-8">
          
          <!-- Requirements -->
          <div class="bg-primary-600 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
            <h2 class="font-display font-black text-2xl mb-6 relative z-10">Мы ожидаем от вас</h2>
            <ul class="space-y-4 relative z-10">
              <li v-for="req in requirements" :key="req" class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold">{{ req }}</span>
              </li>
            </ul>
          </div>

          <!-- Questionnaire -->
          <div class="glass p-8 rounded-[2.5rem] border-white/60">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-display font-black text-warm-900">Анкета владельца</h2>
              <button
                @click="copyQuestionnaire"
                class="w-10 h-10 rounded-2xl bg-warm-100 hover:bg-primary-100 text-warm-600 hover:text-primary-600 transition-colors flex items-center justify-center"
                title="Копировать анкету"
              >
                <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <svg v-else class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
            
            <div ref="questionnaireRef" class="bg-white rounded-2xl p-5 text-xs font-mono text-warm-700 space-y-2 h-64 overflow-y-auto border border-warm-100 shadow-inner custom-scrollbar">
              <p><strong>АНКЕТА ПОТЕНЦИАЛЬНОГО ВЛАДЕЛЬЦА</strong></p>
              <p>1. Ваши контактные данные (ФИО, телефон, email, город):</p>
              <p>2. Возраст:</p>
              <p>3. Состав семьи (кто проживает вместе с вами):</p>
              <p>4. Есть ли дети (возраст):</p>
              <p>5. Тип жилья (квартира / дом, площадь, этаж):</p>
              <p>6. Все ли члены семьи согласны на появление собаки:</p>
              <p>7. Есть ли у кого-то аллергия на животных:</p>
              <p>8. Есть ли у вас другие животные (какие, сколько, возраст):</p>
              <p>9. Был ли у вас опыт содержания собак:</p>
              <p>10. Почему хотите взять именно эту собаку:</p>
              <p>11. Кто будет основным «хозяином» собаки:</p>
              <p>12. Сколько времени в день вы сможете уделять собаке:</p>
              <p>13. Работаете ли вы / учитесь (график, сколько часов собака одна):</p>
              <p>14. Где собака будет находиться в ваше отсутствие:</p>
              <p>15. Готовы ли вы к длительным прогулкам (минимум по часу):</p>
              <p>16. Готовы ли вы к дрессировке / работе с кинологом:</p>
              <p>17. Готовы ли вы к регулярным ветеринарным осмотрам:</p>
              <p>18. Какой бюджет вы готовы выделять ежемесячно:</p>
              <p>19. Что будете делать с собакой во время отпуска / командировок:</p>
              <p>20. Готовы ли вы вернуть собаку в фонд, если не сможете содержать:</p>
              <p>21. Дополнительная информация / комментарии:</p>
            </div>
            <p class="text-xs text-warm-500 mt-4 leading-relaxed">
              Скопируйте вопросы, заполните и пришлите куратору или на почту фонда.
            </p>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div class="glass p-10 md:p-14 rounded-[3.5rem] border-white/60 text-center shadow-lg relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-terra-400/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <h2 class="relative z-10 text-3xl md:text-4xl font-display font-black text-warm-900 mb-4 tracking-tight">
          Готовы подарить дом?
        </h2>
        <p class="relative z-10 text-warm-600 text-lg max-w-xl mx-auto mb-8">
          Выберите собаку и свяжитесь с куратором. Мы поможем вам на каждом этапе!
        </p>
        <div class="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/animals" class="btn bg-primary-600 text-white hover:bg-primary-700 px-8 py-4 text-base font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
            Посмотреть собак
          </NuxtLink>
          <NuxtLink to="/contacts" class="btn bg-white text-warm-900 hover:bg-warm-50 px-8 py-4 text-base font-bold rounded-2xl shadow-sm border border-warm-200 transition-all hover:scale-105 active:scale-95">
            Связаться с нами
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Взять шнауцера',
  meta: [
    { name: 'description', content: 'Как взять шнауцера из фонда: процесс пристройства, требования, анкета. Подарите собаке второй шанс!' }
  ]
})

const questionnaireRef = ref<HTMLElement | null>(null)
const copied = ref(false)

const copyQuestionnaire = async () => {
  if (!questionnaireRef.value) return
  
  const text = questionnaireRef.value.innerText
  
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const benefits = [
  {
    title: 'Вы спасаете жизнь',
    desc: 'Каждая пристроенная собака — это освободившееся место для новой собаки в беде.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    })
  },
  {
    title: 'Вы знаете характер собаки',
    desc: 'Мы честно рассказываем об особенностях каждой собаки, её здоровье и привычках.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
      ])
    })
  },
  {
    title: 'Поддержка после пристройства',
    desc: 'Куратор остаётся на связи, помогает советами, поддерживает в период адаптации.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
      ])
    })
  },
  {
    title: 'Это бесплатно',
    desc: 'Мы не продаём собак. Вы можете добровольно помочь с расходами на лечение, но это не обязательно.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' })
      ])
    })
  }
]

const detailedSteps = [
  {
    title: 'Выберите собаку',
    desc: 'Посмотрите карточки собак на главной странице. Изучите описание, характер, особенности.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
      ])
    })
  },
  {
    title: 'Свяжитесь с куратором',
    desc: 'Позвоните или напишите куратору собаки (контакты указаны в карточке).',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
      ])
    })
  },
  {
    title: 'Познакомьтесь с собакой',
    desc: 'Встретьтесь с собакой лично. Погуляйте, пообщайтесь, понаблюдайте за её поведением.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    })
  },
  {
    title: 'Заполните анкету',
    desc: 'Мы попросим вас ответить на вопросы о ваших условиях, опыте, мотивации.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })
      ])
    })
  },
  {
    title: 'Подготовьте дом',
    desc: 'Купите миски, лежанку, игрушки, корм. Уберите опасные предметы.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ])
    })
  },
  {
    title: 'Подпишите договор',
    desc: 'Договор ответственного содержания — юридический документ, защищающий интересы собаки.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' })
      ])
    })
  },
  {
    title: 'Заберите собаку домой',
    desc: 'Поздравляем! У вас новый член семьи. Первые дни дайте собаке освоиться.',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14 5l7 7m0 0l-7 7m7-7H3' })
      ])
    })
  },
  {
    title: 'Адаптация и поддержка',
    desc: 'Куратор будет на связи первые недели (иногда месяцы).',
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
      ])
    })
  }
]

const requirements = [
  'Любовь, забота и терпение',
  'Финансовая стабильность',
  'Подходящие условия',
  'Время для прогулок',
  'Готовность к ветеринару',
  'Честность с куратором'
]
</script>
