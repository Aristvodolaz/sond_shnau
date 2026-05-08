<template>
  <div class="min-h-screen bg-warm-50">
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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">О нас</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Правила <span class="text-primary-600 italic font-display font-medium">фонда</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Принципы работы, прозрачность и интересы каждой собаки
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom py-12 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
        
        <!-- Sidebar Navigation -->
        <aside class="hidden lg:block sticky top-24 space-y-2">
          <h3 class="text-xs font-black uppercase tracking-[0.2em] text-warm-400 mb-6 px-4">Разделы правил</h3>
          <nav class="space-y-1">
            <a v-for="(item, idx) in navItems" :key="idx" :href="item.href" 
               class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group hover:bg-white hover:shadow-sm"
               :class="activeSection === item.id ? 'bg-white text-primary-600 shadow-md shadow-primary-500/5' : 'text-warm-500 hover:text-warm-900'">
              <span class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    :class="activeSection === item.id ? 'bg-primary-500 scale-125' : 'bg-warm-200 group-hover:bg-warm-400'"></span>
              {{ item.label }}
            </a>
          </nav>
        </aside>

        <div class="space-y-16">
          <!-- Section 1 -->
          <section id="general" class="scroll-mt-24 space-y-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">01</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Общие положения</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg space-y-6">
              <div class="prose prose-lg prose-warm max-w-none text-warm-700">
                <p class="leading-relaxed">
                  Фонд помощи шнауцерам — добровольное объединение людей, занимающихся спасением, 
                  лечением и пристройством собак породы шнауцер и их метисов.
                </p>
                <div class="h-px bg-gradient-to-r from-warm-200/50 via-warm-200 to-warm-200/50 my-8"></div>
                <p class="leading-relaxed">
                  Мы работаем на безвозмездной основе. Все средства, поступающие в фонд, 
                  направляются исключительно на нужды собак: лечение, питание, содержание, транспортировку.
                </p>
                <p class="leading-relaxed">
                  Мы не занимаемся коммерческим разведением, продажей собак или посредничеством в купле-продаже.
                </p>
              </div>
            </div>
          </section>

          <!-- Section 2 -->
          <section id="admission" class="scroll-mt-24 space-y-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">02</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Приём собак в фонд</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(criterion, i) in criteria" :key="i" 
                     class="flex gap-4 p-5 bg-white/40 rounded-3xl border border-white/60">
                  <div class="w-10 h-10 shrink-0 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sm font-bold text-warm-800 leading-tight">{{ criterion }}</span>
                </div>
              </div>
              <div class="prose prose-lg prose-warm max-w-none text-warm-700 pt-4">
                <p class="leading-relaxed italic text-warm-500 border-l-4 border-primary-200 pl-6">
                  Перед приёмом собаки в фонд куратор проводит беседу с владельцем или нашедшим, 
                  выясняет обстоятельства, оценивает состояние животного.
                </p>
                <p class="leading-relaxed pt-4">
                  Если собака имеет хозяина, мы не принимаем её без его согласия и письменного отказа от прав на животное.
                </p>
              </div>
            </div>
          </section>

          <!-- Section 3 -->
          <section id="adoption" class="scroll-mt-24 space-y-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">03</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Пристройство собак</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg space-y-10">
              <div class="prose prose-lg prose-warm max-w-none text-warm-700">
                <p class="text-xl font-medium text-warm-900 leading-relaxed">
                  Мы очень тщательно подходим к выбору новых хозяев. Наша цель — не просто пристроить собаку, 
                  а найти ей дом навсегда.
                </p>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-primary-600 mb-6">Процесс пристройства</h3>
                <div class="grid grid-cols-1 gap-4">
                  <div v-for="(step, i) in adoptionSteps" :key="i" 
                       class="flex items-start gap-6 p-6 bg-white/60 rounded-3xl border border-white/60 hover:shadow-md transition-all duration-300">
                    <span class="w-8 h-8 shrink-0 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-black">{{ i + 1 }}</span>
                    <div>
                      <h4 class="font-bold text-warm-900 mb-1">{{ step.title }}</h4>
                      <p class="text-sm text-warm-600 leading-relaxed">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="prose prose-lg prose-warm max-w-none text-warm-700 pt-6">
                <p class="leading-relaxed">
                  Мы можем отказать в пристройстве, если есть сомнения в благополучии будущей жизни собаки. 
                  Это не личное отношение, а забота о животном.
                </p>
                <div class="mt-8 p-6 bg-primary-50 rounded-3xl border border-primary-100 flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shrink-0 shadow-sm">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p class="text-sm font-bold text-primary-900">Собаки пристраиваются бесплатно. Мы не берём плату за собаку.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 4 -->
          <section id="curators" class="scroll-mt-24 space-y-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">04</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Кураторы и волонтёры</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-warm-900 flex items-center gap-2">
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Кураторы
                  </h4>
                  <p class="text-warm-600 leading-relaxed text-[15px]">
                    Человек, который берёт на себя ответственность за конкретную собаку: 
                    организует лечение, передержку, ищет новых хозяев, ведёт переписку.
                  </p>
                </div>
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-warm-900 flex items-center gap-2">
                    <span class="w-2 h-2 bg-terra-500 rounded-full"></span>
                    Волонтёры
                  </h4>
                  <p class="text-warm-600 leading-relaxed text-[15px]">
                    Помогают с транспортировкой, временным содержанием (передержкой), 
                    сбором средств, распространением информации.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 5 -->
          <section id="finance" class="scroll-mt-24 space-y-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">05</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Финансовая прозрачность</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg space-y-8 text-center max-w-3xl mx-auto">
              <div class="w-16 h-16 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 mx-auto mb-2 shadow-inner">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A3.323 3.323 0 0010.605 4L9 4.509 7.395 4a3.323 3.323 0 00-4.013 3.318c0 .883.392 1.674 1.01 2.214l7.608 7.608a1 1 0 001.414 0l7.608-7.608a3.322 3.322 0 001.01-2.214z" />
                </svg>
              </div>
              <p class="text-xl font-bold text-warm-900">Каждое пожертвование фиксируется</p>
              <p class="text-warm-600 leading-relaxed">
                По каждой собаке ведётся финансовый отчёт: сколько было собрано, на что потрачено. 
                Куратор публикует отчёты в открытом доступе на форуме и в соцсетях.
              </p>
              <div class="inline-flex items-center gap-3 px-6 py-3 bg-white/60 rounded-2xl border border-white/80 text-sm font-bold text-warm-800">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Помощь собирается только под конкретную цель
              </div>
            </div>
          </section>

          <!-- Section 6 -->
          <section id="responsibility" class="scroll-mt-24 space-y-6 pb-12">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-4xl font-display font-black text-primary-600/20 italic">06</span>
              <h2 class="text-3xl font-display font-black text-warm-900 tracking-tight">Ответственность</h2>
            </div>
            <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 shadow-lg space-y-6 border-b-8 border-b-terra-500/20">
              <div class="prose prose-lg prose-warm max-w-none text-warm-700">
                <p class="leading-relaxed">
                  Если новый владелец не может больше содержать собаку, он обязан сообщить об этом куратору. 
                  Мы берём собаку обратно и ищем новый дом.
                </p>
                <div class="mt-8 p-8 bg-terra-50 rounded-[2rem] border border-terra-100 flex flex-col md:flex-row items-center gap-6">
                  <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-terra-600 shrink-0 shadow-sm">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p class="text-base font-bold text-terra-900 text-center md:text-left leading-relaxed">
                    Мы категорически против жестокого обращения. Если нам станет известно о плохом обращении, 
                    мы предпримем все меры для возвращения собаки.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Final Note -->
      <div class="mt-20 glass p-8 rounded-[2.5rem] border-white/60 text-center max-w-2xl mx-auto">
        <p class="text-warm-500 text-sm font-bold uppercase tracking-widest mb-2">Обновлено</p>
        <p class="text-2xl font-display font-black text-warm-900 mb-4">{{ new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
        <p class="text-warm-600 leading-relaxed text-sm">
          Эти правила могут дополняться и изменяться по мере развития фонда. 
          Актуальная версия всегда доступна на этой странице.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeSection = ref('general')

const navItems = [
  { id: 'general', label: 'Общие положения', href: '#general' },
  { id: 'admission', label: 'Приём собак', href: '#admission' },
  { id: 'adoption', label: 'Пристройство', href: '#adoption' },
  { id: 'curators', label: 'Команда', href: '#curators' },
  { id: 'finance', label: 'Прозрачность', href: '#finance' },
  { id: 'responsibility', label: 'Ответственность', href: '#responsibility' },
]

const criteria = [
  'Собака находится в опасности',
  'Владелец не может содержать',
  'Срочная ветеринарная помощь',
  'Порода — шнауцер или метис'
]

const adoptionSteps = [
  { title: 'Знакомство', desc: 'Встреча с собакой и общение с куратором.' },
  { title: 'Анкетирование', desc: 'Заполнение подробной анкеты о будущих условиях.' },
  { title: 'Проверка условий', desc: 'Фото жилья и обсуждение деталей содержания.' },
  { title: 'Договор', desc: 'Подписание договора ответственного содержания.' }
]

// Scroll spy logic
if (process.client) {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, { threshold: 0.5 })

    navItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
  })
}

// SEO
useHead({
  title: 'Правила Фонда — Фонд помощи шнауцерам',
  meta: [
    { name: 'description', content: 'Правила работы фонда помощи шнауцерам: приём собак, пристройство, работа кураторов, финансовая прозрачность.' }
  ]
})
</script>
