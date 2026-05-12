<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Header -->
    <section class="bg-white border-b border-warm-100 py-6 md:py-10">
      <div class="container-custom max-w-5xl">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Информация</h1>
        <p class="mt-1.5 text-sm text-warm-500">
          Всё, что вам нужно знать о работе фонда, правилах пристройства и защите животных
        </p>

        <!-- Local navigation -->
        <nav class="flex flex-wrap gap-2 mt-6" aria-label="Разделы страницы">
          <a href="#about" class="rounded-full px-4 py-2 text-sm font-semibold border border-warm-200 bg-white text-warm-700 shadow-sm hover:bg-warm-50 hover:border-warm-300 transition-colors">Кто мы</a>
          <a href="#rules" class="rounded-full px-4 py-2 text-sm font-semibold border border-warm-200 bg-white text-warm-700 shadow-sm hover:bg-warm-50 hover:border-warm-300 transition-colors">Правила фонда</a>
          <a href="#faq" class="rounded-full px-4 py-2 text-sm font-semibold border border-warm-200 bg-white text-warm-700 shadow-sm hover:bg-warm-50 hover:border-warm-300 transition-colors">Часто задаваемые вопросы</a>
          <a href="#legal" class="rounded-full px-4 py-2 text-sm font-semibold border border-warm-200 bg-white text-warm-700 shadow-sm hover:bg-warm-50 hover:border-warm-300 transition-colors">Юридическая информация</a>
        </nav>
      </div>
    </section>

    <div class="container-custom max-w-5xl py-12 md:py-16">
      <div class="space-y-16 md:space-y-20">
        
        <!-- Section: Кто мы -->
        <section id="about" class="scroll-mt-24">
          <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div class="w-10 h-10 md:w-11 md:h-11 shrink-0 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 class="font-display font-bold text-2xl md:text-3xl text-warm-900 leading-tight">Кто мы</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <UiCard class="md:col-span-2">
              <h3 class="text-lg md:text-xl font-display font-semibold text-warm-900 mb-3 md:mb-4">Наша миссия</h3>
              <p class="text-warm-700 leading-relaxed mb-4 text-base md:text-lg">
                Мы — команда волонтёров, объединённых любовью к шнауцерам. Мы работаем для того, чтобы каждый шнауцер, оказавшийся без дома или в опасности, получил второй шанс на счастливую жизнь в любящей семье.
              </p>
              <p class="text-warm-700 leading-relaxed text-base">
                Фонд занимается спасением, лечением, реабилитацией и пристройством шнауцеров всех размеров: ризеншнауцеров, миттельшнауцеров, цвергшнауцеров, а также метисов этих пород.
              </p>
            </UiCard>
            
            <div class="space-y-4">
              <h3 class="font-display font-bold text-lg md:text-xl text-warm-900">Чем мы занимаемся</h3>
              <div class="space-y-3">
                <div v-for="item in activities" :key="item.title" class="flex items-start gap-4 p-4 bg-white rounded-2xl border border-warm-100 shadow-sm">
                  <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-warm-900 mb-1">{{ item.title }}</h4>
                    <p class="text-sm text-warm-600 leading-snug">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="font-display font-bold text-lg md:text-xl text-warm-900">Наши ценности</h3>
              <div class="bg-white rounded-2xl border border-warm-100 p-6 space-y-4 shadow-sm">
                <div v-for="val in values" :key="val.title" class="flex gap-4">
                  <span class="text-primary-500 font-bold text-lg leading-none shrink-0">#</span>
                  <div>
                    <h4 class="font-semibold text-warm-900 mb-1">{{ val.title }}</h4>
                    <p class="text-sm text-warm-600 leading-snug">{{ val.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: Правила Фонда -->
        <section id="rules" class="scroll-mt-24 pt-10 border-t border-warm-100">
          <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div class="w-10 h-10 md:w-11 md:h-11 shrink-0 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 class="font-display font-bold text-2xl md:text-3xl text-warm-900 leading-tight">Правила фонда</h2>
          </div>

          <div class="prose prose-warm max-w-none text-warm-700 mb-8 md:mb-10">
            <p class="text-base md:text-lg leading-relaxed">
              Фонд помощи шнауцерам работает на безвозмездной основе. Мы не занимаемся коммерческим разведением и продажей собак. Все средства направляются исключительно на нужды подопечных.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="rule in rules" :key="rule.title" class="bg-white p-6 rounded-2xl border border-warm-100 shadow-sm hover:border-warm-200 transition-colors">
              <h3 class="font-display font-semibold text-warm-900 mb-3 flex items-center gap-2">
                <span class="w-6 h-6 bg-warm-100 text-warm-600 rounded-md flex items-center justify-center text-xs font-bold shrink-0">{{ rule.num }}</span>
                {{ rule.title }}
              </h3>
              <p class="text-sm text-warm-600 leading-relaxed">{{ rule.desc }}</p>
            </div>
          </div>
        </section>

        <!-- Section: ЧаВо -->
        <section id="faq" class="scroll-mt-24 pt-10 border-t border-warm-100">
          <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div class="w-10 h-10 md:w-11 md:h-11 shrink-0 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="font-display font-bold text-2xl md:text-3xl text-warm-900 leading-tight">Часто задаваемые вопросы</h2>
          </div>

          <div class="space-y-3 max-w-4xl">
            <UiAccordion v-for="q in faqs" :key="q.title" :title="q.title">
              <template #title>
                <div class="flex items-center gap-3 md:gap-4 py-1">
                  <div class="w-10 h-10 bg-warm-50 rounded-xl flex items-center justify-center shrink-0 border border-warm-100">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="faqIcons[q.icon] || faqIcons.Default" />
                    </svg>
                  </div>
                  <span class="font-semibold text-warm-900 text-left">{{ q.title }}</span>
                </div>
              </template>
              <div class="pl-14 pr-4 md:pr-6 pb-2 text-warm-700 leading-relaxed text-sm md:text-base">
                {{ q.content }}
              </div>
            </UiAccordion>
          </div>
        </section>

        <!-- Section: Юридический отдел -->
        <section id="legal" class="scroll-mt-24 pt-10 border-t border-warm-100">
          <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div class="w-10 h-10 md:w-11 md:h-11 shrink-0 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h2 class="font-display font-bold text-2xl md:text-3xl text-warm-900 leading-tight">Юридическая информация</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div class="bg-white p-6 rounded-2xl border border-warm-100 shadow-sm hover:border-warm-200 transition-colors">
                <h3 class="font-display font-semibold text-warm-900 mb-3">Ответственное обращение</h3>
                <p class="text-sm text-warm-700 mb-4">В России действует Федеральный закон «Об ответственном обращении с животными» от 27.12.2018 № 498-ФЗ.</p>
                <ul class="text-sm text-warm-600 space-y-2">
                  <li class="flex gap-2"><span class="text-primary-400 font-bold shrink-0">•</span>Отношение к животным как к существам, способным испытывать боль</li>
                  <li class="flex gap-2"><span class="text-primary-400 font-bold shrink-0">•</span>Ответственность человека за судьбу животного</li>
                  <li class="flex gap-2"><span class="text-primary-400 font-bold shrink-0">•</span>Запрет на жестокое обращение</li>
                </ul>
              </div>
              <div class="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                <h3 class="font-display font-semibold text-red-900 mb-3">Уголовная ответственность</h3>
                <p class="text-sm text-red-800 leading-relaxed">За жестокое обращение с животными предусмотрена уголовная ответственность (ст. 245 УК РФ), вплоть до лишения свободы на срок до 5 лет.</p>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border border-warm-100 shadow-sm hover:border-warm-200 transition-colors">
              <h3 class="font-display font-semibold text-warm-900 mb-3">Договор фонда</h3>
              <p class="text-sm text-warm-700 mb-4">При пристройстве мы заключаем договор ответственного содержания. Основные пункты:</p>
              <div class="space-y-3">
                <div v-for="point in legalPoints" :key="point" class="flex gap-3 text-sm text-warm-700">
                  <span class="text-primary-500 font-bold shrink-0">✓</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom CTA -->
        <div class="bg-primary-500 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-500/20">
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-6 relative z-10">Остались вопросы?</h2>
          <p class="text-primary-100 text-lg mb-10 max-w-xl mx-auto relative z-10">Мы всегда на связи и готовы помочь. Напишите нам или позвоните.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <UiButton to="/contacts" variant="primary" size="lg" class="bg-white !text-primary-600 hover:bg-primary-50">Связаться с нами</UiButton>
            <UiButton to="/useful/faq" variant="outline" size="lg" class="border-white text-white hover:bg-white/10">Все вопросы</UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Информация',
  meta: [{ name: 'description', content: 'Информация о фонде помощи шнауцерам: кто мы, правила, ответы на вопросы и юридическая информация.' }]
})

const activities = [
  { 
    title: 'Спасение', 
    desc: 'Забираем собак из приютов и с улиц.', 
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  { 
    title: 'Лечение', 
    desc: 'Обеспечиваем ветеринарную помощь.', 
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  { 
    title: 'Пристройство', 
    desc: 'Находим собакам любящие семьи.', 
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  { 
    title: 'Поддержка', 
    desc: 'Помогаем владельцам с адаптацией.', 
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 18.364l3.536-3.536m0-5.656L5.636 5.636M12 12m-9 0a9 9 0 1118 0 9 9 0 01-18 0z'
  }
]

const values = [
  { title: 'Ответственность', desc: 'Мы отвечаем за подопечных до конца.' },
  { title: 'Прозрачность', desc: 'Открыто рассказываем о расходах.' },
  { title: 'Честность', desc: 'Говорим правду о состоянии собак.' }
]

const rules = [
  { num: '1', title: 'Приём в фонд', desc: 'Принимаем собак в опасности, метисов и породистых шнауцеров только по согласию владельца.' },
  { num: '2', title: 'Пристройство', desc: 'Тщательно выбираем семьи, проводим анкетирование и проверку условий.' },
  { num: '3', title: 'Финансы', desc: 'Пожертвования собираются под конкретные цели, отчёты публикуются открыто.' },
  { num: '4', title: 'Возврат', desc: 'Если вы не можете больше содержать собаку, вы обязаны вернуть её в фонд.' }
]

const faqs = [
  {
    title: 'Кто вы и чем занимаетесь?',
    content: 'Мы — волонтёрская организация, которая спасает, лечит и пристраивает шнауцеров (ризеншнауцеров, миттельшнауцеров, цвергшнауцеров) и их метисов. Работаем исключительно на добровольной основе, все средства идут на нужды собак.',
    icon: 'UsersIcon'
  },
  {
    title: 'Берёте ли вы плату за собак?',
    content: 'Нет, мы не продаём собак. Пристройство абсолютно бесплатное. Иногда мы можем попросить помочь с транспортными расходами или частично компенсировать стоимость уже проведённого лечения, но это всегда обсуждается индивидуально.',
    icon: 'BanknotesIcon'
  },
  {
    title: 'Могу ли я стать волонтёром?',
    content: 'Конечно! Мы всегда рады помощи. Вы можете помогать с транспортировкой собак, временной передержкой, распространением информации, сбором средств. Свяжитесь с нами через раздел «Контакты», и мы расскажем, как присоединиться.',
    icon: 'HandRaisedIcon'
  },
  {
    title: 'Как вы финансируетесь?',
    content: 'Исключительно за счёт добровольных пожертвований неравнодушных людей. Мы ведём прозрачную отчётность: публикуем чеки, выкладываем финансовые отчёты по каждой собаке. Никакого государственного или коммерческого финансирования у нас нет.',
    icon: 'ChartBarIcon'
  },
  {
    title: 'Как взять собаку из фонда?',
    content: 'Процесс простой: выберите собаку на сайте и свяжитесь с куратором, познакомьтесь с собакой лично, заполнине анкету, подпишите договор ответственного содержания и заберите собаку домой.',
    icon: 'HomeIcon'
  },
  {
    title: 'Какие требования к будущим хозяевам?',
    content: 'Мы хотим быть уверены, что собака попадёт в хорошие руки. Основные требования: стабильный доход, подходящие условия содержания, готовность нести ответственность, любовь к животным. Мы не пристраиваем собак в семьи с очень маленькими детьми, если собака к ним не адаптирована.',
    icon: 'ClipboardDocumentCheckIcon'
  },
  {
    title: 'Можно ли вернуть собаку, если не подошла?',
    content: 'Да, мы всегда заберём собаку обратно, если что-то пошло не так. Главное — сообщите куратору как можно раньше. Мы не осуждаем: лучше вовремя понять, что не справляетесь, чем мучить и себя, и собаку.',
    icon: 'ArrowUturnLeftIcon'
  },
  {
    title: 'Сколько времени занимает пристройство?',
    content: 'Зависит от ситуации. Иногда всё происходит за неделю, иногда процесс может растянуться на месяц, если нужно больше времени на адаптацию или проверку условий. Мы никогда не торопимся, если есть сомнения.',
    icon: 'ClockIcon'
  },
  {
    title: 'Сложно ли ухаживать за шнауцером?',
    content: 'Шнауцеры — умные, энергичные собаки. Их шерсть требует тримминга 2-3 раза в год и регулярного расчёсывания. Они активны и нуждаются в длительных прогулках. Если вы готовы уделять время — шнауцер станет отличным компаньоном.',
    icon: 'SparklesIcon'
  },
  {
    title: 'Подходят ли шнауцеры для квартиры?',
    content: 'Миттели и цверги отлично чувствуют себя в квартире при условии прогулок. Ризены более крупные — им желателен частный дом, но и в квартире они могут жить комфортно при достаточной физической нагрузке.',
    icon: 'BuildingOfficeIcon'
  },
  {
    title: 'Ладят ли шнауцеры с детьми и другими животными?',
    content: 'Зависит от социализации. Многие шнауцеры прекрасно ладят с детьми и другими питомцами. При выборе собаки куратор обязательно расскажет об особенностях характера конкретного подопечного.',
    icon: 'HeartIcon'
  },
  {
    title: 'Что делать, если шнауцер заболел?',
    content: 'Немедленно обратитесь к ветеринару. Если собака из нашего фонда — свяжитесь с куратором, мы всегда поможем советом и поддержкой.',
    icon: 'LifebuoyIcon'
  },
  {
    title: 'Что делать, если я нашёл шнауцера на улице?',
    content: 'Свяжитесь с нами через контакты или форум. Мы поможем определить, есть ли у собаки хозяин, организуем проверку чипа и размещение объявлений.',
    icon: 'MagnifyingGlassIcon'
  },
  {
    title: 'Могу ли я помочь финансово?',
    content: 'Да, любая помощь важна. Вы можете сделать пожертвование на лечение конкретной собаки или на общие нужды фонда. Реквизиты указаны в разделе «Контакты».',
    icon: 'BanknotesIcon'
  }
]

const faqIcons: Record<string, string> = {
  UsersIcon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  BanknotesIcon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m11.452-2.368L19.735 4.5m-4.53 7.568L12 18.75m4.53-7.568l-2.265 2.265m2.265-2.265l2.265-2.265M3 19.5A1.5 1.5 0 011.5 18V6A1.5 1.5 0 013 4.5h15a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3z',
  HandRaisedIcon: 'M10.05 4.57c.4-1.31.9-2.07 1.45-2.07s1.05.76 1.45 2.07c.71 2.31 1.05 5.43 1.05 9.43s-.34 7.12-1.05 9.43c-.4 1.31-.9 2.07-1.45 2.07s-1.05-.76-1.45-2.07c-.71-2.31-1.05-5.43-1.05-9.43s.34-7.12 1.05-9.43z',
  ChartBarIcon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  HomeIcon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  ClipboardDocumentCheckIcon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  ArrowUturnLeftIcon: 'M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3',
  ClockIcon: 'M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  SparklesIcon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 19l-.457-1.597a1.5 1.5 0 00-1.096-1.096L15.1 15.85l1.597-.457a1.5 1.5 0 001.096-1.096L18.25 12.7l.457 1.597a1.5 1.5 0 001.096 1.096L21.4 15.85l-1.597.457a1.5 1.5 0 00-1.096 1.096L18.25 19z',
  BuildingOfficeIcon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 16.5h1.5m3 0h1.5',
  HeartIcon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  LifebuoyIcon: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-3a6 6 0 110-12 6 6 0 010 12zm0-9V6m0 12v-3m-3-3H6m12 0h-3',
  MagnifyingGlassIcon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  Default: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

const legalPoints = [
  'Обязательства по уходу и кормлению',
  'Право фонда на проверку условий',
  'Обязательство вернуть собаку в фонд при невозможности содержания',
  'Запрет на передачу третьим лицам'
]
</script>
