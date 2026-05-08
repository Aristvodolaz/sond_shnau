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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">О Фонде</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Всё о нашей <br/>
            <span class="text-primary-600 italic font-display font-medium">работе и правилах</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Мы — команда волонтёров, объединённых любовью к шнауцерам. Здесь вы найдёте всю информацию о нашей деятельности.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      
      <!-- Tabs Navigation -->
      <div class="flex flex-wrap gap-2 mb-12 p-2 glass rounded-[2rem] border-white/60 shadow-sm w-fit mx-auto lg:mx-0">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300"
          :class="activeTab === tab.id 
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
            : 'text-warm-500 hover:text-warm-900 hover:bg-white/50'"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 gap-10">
        
        <!-- Tab 1: Кто мы -->
        <div v-if="activeTab === 'about'" class="animate-fade-in">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div class="lg:col-span-8 space-y-10">
              <div class="glass p-8 md:p-12 rounded-[3.5rem] border-white/60 shadow-lg relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <h2 class="font-display font-black text-3xl md:text-4xl text-warm-900 mb-6 tracking-tight relative z-10">Наша миссия</h2>
                <div class="space-y-4 text-warm-700 text-lg leading-relaxed relative z-10">
                  <p>Мы работаем для того, чтобы каждый шнауцер, оказавшийся без дома или в опасности, получил второй шанс на счастливую жизнь в любящей семье.</p>
                  <p>Фонд занимается спасением, лечением, реабилитацией и пристройством шнауцеров всех размеров: ризеншнауцеров, миттельшнауцеров, цвергшнауцеров, а также метисов этих пород.</p>
                </div>
              </div>

              <div>
                <h2 class="font-display font-black text-3xl md:text-4xl text-warm-900 mb-8 tracking-tight px-4">Направления работы</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="item in activities" :key="item.title" class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div :class="`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6`">
                      <component :is="item.icon" class="w-7 h-7" />
                    </div>
                    <h3 class="font-display font-bold text-xl text-warm-900 mb-3">{{ item.title }}</h3>
                    <p class="text-warm-500 leading-relaxed text-sm">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-4 space-y-8">
              <div class="bg-primary-600 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <h2 class="font-display font-black text-3xl mb-8 relative z-10">Ценности</h2>
                <ul class="space-y-6 relative z-10">
                  <li v-for="v in values" :key="v.title">
                    <h4 class="font-display font-bold text-lg mb-1">{{ v.title }}</h4>
                    <p class="text-primary-100 text-sm leading-relaxed">{{ v.desc }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Правила -->
        <div v-if="activeTab === 'rules'" class="animate-fade-in">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div class="lg:col-span-8 space-y-8">
              <div v-for="section in rulesSections" :key="section.id" class="glass p-8 md:p-10 rounded-[3rem] border-white/60 shadow-lg">
                <h3 class="text-2xl font-display font-black text-warm-900 mb-6 flex items-center gap-4">
                  <span class="text-primary-500/20 italic">{{ section.num }}</span>
                  {{ section.title }}
                </h3>
                <div class="prose prose-warm max-w-none text-warm-700 leading-relaxed" v-html="section.content"></div>
              </div>
            </div>
            <div class="lg:col-span-4">
              <div class="glass p-8 rounded-[2.5rem] border-white/60 sticky top-24">
                <h4 class="font-display font-bold text-xl text-warm-900 mb-4">Важно знать</h4>
                <p class="text-warm-500 text-sm leading-relaxed mb-6">Мы работаем на безвозмездной основе. Все средства направляются исключительно на нужды собак.</p>
                <NuxtLink to="/support" class="btn-primary w-full py-4 text-center rounded-2xl block shadow-lg shadow-primary-500/20">Поддержать фонд</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: ЧаВо -->
        <div v-if="activeTab === 'faq'" class="animate-fade-in">
          <div class="max-w-4xl mx-auto space-y-12">
            <div v-for="group in faqGroups" :key="group.title">
              <h3 class="text-2xl font-display font-bold text-primary-800 mb-6 px-4">{{ group.title }}</h3>
              <div class="space-y-3">
                <UiAccordion v-for="q in group.items" :key="q.title" :title="q.title">
                  <div class="text-warm-700 leading-relaxed" v-html="q.content"></div>
                </UiAccordion>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 4: Юр отдел -->
        <div v-if="activeTab === 'legal'" class="animate-fade-in">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8 space-y-8">
              <div v-for="item in legalItems" :key="item.title" class="glass p-8 md:p-10 rounded-[3.5rem] border-white/60 hover:shadow-lg transition-all">
                <h3 class="text-2xl md:text-3xl font-display font-black text-warm-900 mb-6">{{ item.title }}</h3>
                <div class="text-warm-700 leading-relaxed" v-html="item.content"></div>
              </div>
            </div>
            <div class="lg:col-span-4 space-y-6">
              <div class="glass p-8 rounded-[2.5rem] border-white/60 bg-red-50/30 border-red-100">
                <h4 class="font-display font-bold text-xl text-red-900 mb-4">Наказание по ст. 245 УК РФ</h4>
                <p class="text-red-800/80 text-sm leading-relaxed">За жестокое обращение предусмотрены штрафы до 80 000 руб. или лишение свободы до 3 лет.</p>
              </div>
              <div class="glass p-8 rounded-[2.5rem] border-white/60">
                <h4 class="font-display font-bold text-xl text-warm-900 mb-4">Помощь</h4>
                <p class="text-warm-500 text-sm leading-relaxed mb-6">Если вы столкнулись с жестокостью — сообщите в полицию и нам.</p>
                <NuxtLink to="/contacts" class="btn-outline w-full py-4 text-center rounded-2xl block">Связаться с нами</NuxtLink>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref('about')

const tabs = [
  { id: 'about', label: 'О нас' },
  { id: 'rules', label: 'Правила' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'legal', label: 'Юр. отдел' }
]

const activities = [
  { 
    title: 'Спасение', 
    desc: 'Забираем собак из приютов, с улицы, помогаем владельцам в сложных ситуациях.', 
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    }), 
    bg: 'bg-primary-50', 
    color: 'text-primary-500' 
  },
  { 
    title: 'Лечение', 
    desc: 'Обеспечиваем ветеринарную помощь, реабилитацию и профессиональный уход.', 
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
      ])
    }), 
    bg: 'bg-emerald-50', 
    color: 'text-emerald-500' 
  },
  { 
    title: 'Пристройство', 
    desc: 'Тщательно подбираем новые семьи, проверяем условия и помогаем с адаптацией.', 
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ])
    }), 
    bg: 'bg-amber-50', 
    color: 'text-amber-500' 
  },
  { 
    title: 'Поддержка', 
    desc: 'Консультируем владельцев по вопросам воспитания, поведения и поиска потеряшек.', 
    icon: defineComponent({
      render: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
      ])
    }), 
    bg: 'bg-sky-50', 
    color: 'text-sky-500' 
  }
]

const values = [
  { title: 'Ответственность', desc: 'Мы отвечаем за тех, кого берём под опеку, до самого конца.' },
  { title: 'Прозрачность', desc: 'Открыто рассказываем о каждом случае, финансах и трудностях.' },
  { title: 'Честность', desc: 'Не приукрашиваем ситуацию, говорим правду о собаках.' },
  { title: 'Любовь', desc: 'Каждая собака для нас — личность, достойная счастья.' }
]

const rulesSections = [
  { num: '01', title: 'Общие положения', content: '<p>Фонд помощи шнауцерам — добровольное объединение людей, занимающихся спасением, лечением и пристройством собак. Мы работаем на безвозмездной основе. Все средства направляются исключительно на нужды собак: лечение, питание, содержание, транспортировку.</p>' },
  { num: '02', title: 'Приём собак', content: '<p>Мы принимаем собак породы шнауцер и их метисов. Перед приёмом куратор проводит беседу с владельцем. Если собака имеет хозяина, мы не принимаем её без письменного отказа от прав на животное.</p>' },
  { num: '03', title: 'Пристройство', content: '<p>Мы тщательно выбираем новых хозяев. Собаки пристраиваются бесплатно по договору ответственного содержания. Мы можем отказать в пристройстве, если есть сомнения в благополучии будущей жизни собаки.</p>' },
  { num: '04', title: 'Финансы', content: '<p>Каждое пожертвование фиксируется. По каждой собаке ведётся финансовый отчёт, который публикуется в открытом доступе.</p>' }
]

const faqGroups = [
  {
    title: 'Общие вопросы',
    items: [
      { title: 'Кто вы и чем занимаетесь?', content: '<p>Мы — волонтёрская организация, которая спасает, лечит и пристраивает шнауцеров и их метисов.</p>' },
      { title: 'Берёте ли вы плату за собак?', content: '<p>Нет, пристройство абсолютно бесплатное.</p>' },
      { title: 'Могу ли я стать волонтёром?', content: '<p>Конечно! Мы всегда рады помощи с транспортировкой, передержкой или инфо-поддержкой.</p>' }
    ]
  },
  {
    title: 'Пристройство',
    items: [
      { title: 'Как взять собаку из фонда?', content: '<p>Выберите собаку, познакомьтесь с ней, заполните анкету и подпишите договор.</p>' },
      { title: 'Какие требования к хозяевам?', content: '<p>Стабильный доход, подходящие условия, готовность нести ответственность и любовь к животным.</p>' },
      { title: 'Можно ли вернуть собаку?', content: '<p>Да, мы всегда заберём собаку обратно. Наша цель — счастье животного.</p>' }
    ]
  },
  {
    title: 'Уход',
    items: [
      { title: 'Сложно ли ухаживать за шнауцером?', content: '<p>Шнауцеры требуют регулярного тримминга (2-3 раза в год) и активных прогулок.</p>' },
      { title: 'Ладят ли они с детьми?', content: '<p>Зависит от социализации конкретной собаки. Куратор поможет подобрать подходящего питомца.</p>' }
    ]
  }
]

const legalItems = [
  { title: 'ФЗ № 498', content: '<p>Федеральный закон «Об ответственном обращении с животными» защищает питомцев от жестокости и определяет обязанности владельцев. Животные признаются существами, способными испытывать страдания.</p>' },
  { title: 'Обязанности владельца', content: '<p>Владелец обязан обеспечивать уход, ветеринарную помощь, безопасность граждан при выгуле и не допускать неконтролируемого размножения.</p>' },
  { title: 'Жестокое обращение', content: '<p>За жестокое обращение предусмотрена уголовная ответственность по ст. 245 УК РФ. Это включает побои, истязания, лишение пищи и оставление в опасности.</p>' }
]

// Note: In a real app, icons would be components or SVG strings. 
// I've simplified them here for brevity but kept the structure.

useHead({
  title: 'О Фонде — Фонд помощи шнауцерам',
  meta: [{ name: 'description', content: 'Вся информация о фонде: миссия, правила, ответы на вопросы и юридическая база.' }]
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
