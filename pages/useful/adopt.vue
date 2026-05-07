<template>
  <div class="min-h-screen bg-warm-50">
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom max-w-4xl">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Взять шнауцера</h1>
        <p class="text-warm-500 mt-2 text-sm">Как взять собаку из фонда — пошагово, с поддержкой куратора</p>
      </div>
    </section>
    <div class="container-custom max-w-4xl py-8 md:py-10">

      <!-- Why Adopt -->
      <section class="mb-16">
        <h2 class="text-3xl font-display font-extrabold text-warm-900 mb-10 text-center tracking-tight">Почему стоит взять собаку из фонда</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" class="group bg-white p-8 rounded-[2rem] border border-warm-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500">
            <div class="flex items-start gap-6">
              <div class="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-500">
                <component :is="benefit.icon" class="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3 group-hover:text-primary-600 transition-colors">{{ benefit.title }}</h3>
                <p class="text-warm-500 leading-relaxed text-base">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process -->
      <section class="mb-16">
        <h2 class="text-3xl font-display font-extrabold text-warm-900 mb-10 text-center tracking-tight">Как взять собаку: пошаговая инструкция</h2>
        <div class="space-y-6">
          <div
            v-for="(step, i) in detailedSteps"
            :key="i"
            class="group bg-white rounded-[2rem] border border-warm-100 p-8 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <div class="relative shrink-0">
              <div class="w-20 h-20 rounded-3xl bg-warm-50 group-hover:bg-primary-50 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                <component :is="step.icon" class="w-10 h-10 text-warm-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <div class="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border-2 border-warm-100 text-warm-500 group-hover:border-primary-500 group-hover:text-primary-500 flex items-center justify-center text-sm font-extrabold shadow-sm transition-all duration-500">
                {{ i + 1 }}
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-display font-bold text-xl text-warm-900 mb-3 group-hover:text-primary-600 transition-colors">{{ step.title }}</h3>
              <p class="text-warm-500 leading-relaxed text-base">{{ step.desc }}</p>
              <div v-if="i === 0" class="mt-5">
                <NuxtLink to="/animals" class="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all">
                  Посмотреть всех шнауцеров
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Questionnaire -->
      <UiCard class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-display font-semibold text-warm-900">Анкета потенциального владельца</h2>
          <button
            @click="copyQuestionnaire"
            class="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {{ copied ? 'Скопировано!' : 'Копировать' }}
          </button>
        </div>
        <div ref="questionnaireRef" class="bg-warm-100 rounded-lg p-6 text-sm font-mono text-warm-800 space-y-2 max-h-96 overflow-y-auto">
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
          <p>11. Кто будет основным «хозяином» собаки (гулять, кормить, воспитывать):</p>
          <p>12. Сколько времени в день вы сможете уделять собаке:</p>
          <p>13. Работаете ли вы / учитесь (график, сколько часов собака будет одна):</p>
          <p>14. Где собака будет находиться в ваше отсутствие:</p>
          <p>15. Готовы ли вы к длительным прогулкам (утром и вечером минимум по часу):</p>
          <p>16. Готовы ли вы к дрессировке / работе с кинологом при необходимости:</p>
          <p>17. Готовы ли вы к регулярным ветеринарным осмотрам и лечению:</p>
          <p>18. Какой бюджет вы готовы выделять на собаку ежемесячно (корм, ветеринария, груминг):</p>
          <p>19. Что будете делать с собакой во время отпуска / командировок:</p>
          <p>20. Готовы ли вы вернуть собаку в фонд, если не сможете больше содержать (вместо того, чтобы бросить или отдать кому попало):</p>
          <p>21. Дополнительная информация / комментарии:</p>
        </div>
        <p class="text-sm text-warm-600 mt-3">
          Скопируйте вопросы и пришлите заполненную анкету куратору или на почту фонда.
        </p>
      </UiCard>

      <!-- Requirements -->
      <section class="mb-12">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6 text-center">Что мы ожидаем от вас</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="req in requirements" :key="req" class="flex items-center gap-3 bg-white p-4 rounded-xl border border-warm-100 group hover:border-primary-200 transition-colors">
            <div class="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
              <svg class="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-warm-700 text-sm font-medium">{{ req }}</span>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 class="text-xl font-display font-semibold text-primary-900 mb-4">
          Готовы подарить собаке дом?
        </h2>
        <p class="text-primary-800 mb-6">
          Выберите собаку и свяжитесь с куратором. Мы поможем на каждом этапе!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UiButton to="/" variant="primary" size="lg">
            Посмотреть собак
          </UiButton>
          <UiButton to="/contacts" variant="outline" size="lg">
            Связаться с фондом
          </UiButton>
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
