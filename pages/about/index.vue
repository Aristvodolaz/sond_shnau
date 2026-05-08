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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">О фонде</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Кто мы <br/>
            <span class="text-primary-600 italic font-display font-medium">и зачем мы здесь</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Мы — команда волонтёров, объединённых любовью к шнауцерам. Мы спасаем, лечим и находим новый дом тем, кто в этом нуждается.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Main Content -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Mission -->
          <div class="glass p-8 md:p-12 rounded-[3.5rem] border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <h2 class="font-display font-black text-3xl md:text-4xl text-warm-900 mb-6 tracking-tight relative z-10">Наша миссия</h2>
            <div class="space-y-4 text-warm-700 text-lg leading-relaxed relative z-10">
              <p>
                Мы работаем для того, чтобы каждый шнауцер, оказавшийся без дома или в опасности, 
                получил второй шанс на счастливую жизнь в любящей семье.
              </p>
              <p>
                Фонд занимается спасением, лечением, реабилитацией и пристройством шнауцеров всех размеров: 
                ризеншнауцеров, миттельшнауцеров, цвергшнауцеров, а также метисов этих пород.
              </p>
            </div>
          </div>

          <!-- What We Do -->
          <div>
            <h2 class="font-display font-black text-3xl md:text-4xl text-warm-900 mb-8 tracking-tight px-4">Чем мы занимаемся</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 mb-6">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">Спасение и помощь</h3>
                <p class="text-warm-500 leading-relaxed text-sm">
                  Забираем собак из приютов, с улицы, помогаем владельцам, которые не могут больше содержать питомца.
                </p>
              </div>

              <div class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">Лечение</h3>
                <p class="text-warm-500 leading-relaxed text-sm">
                  Обеспечиваем ветеринарную помощь, лечим, проводим необходимые процедуры, реабилитируем после травм.
                </p>
              </div>

              <div class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">Пристройство</h3>
                <p class="text-warm-500 leading-relaxed text-sm">
                  Тщательно подбираем новые семьи, проверяем условия содержания, помогаем с адаптацией.
                </p>
              </div>

              <div class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-6">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">Поддержка</h3>
                <p class="text-warm-500 leading-relaxed text-sm">
                  Консультируем владельцев, помогаем в вопросах воспитания, ухода, поведения собак. Помогаем в поиске потеряшек.
                </p>
              </div>
              
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-8">
          
          <!-- Our Values -->
          <div class="bg-primary-600 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
            <h2 class="font-display font-black text-3xl mb-8 relative z-10">Наши ценности</h2>
            
            <ul class="space-y-6 relative z-10">
              <li>
                <h4 class="font-display font-bold text-lg mb-1">Ответственность</h4>
                <p class="text-primary-100 text-sm leading-relaxed">Мы отвечаем за тех, кого берём под опеку, до самого конца.</p>
              </li>
              <li>
                <h4 class="font-display font-bold text-lg mb-1">Прозрачность</h4>
                <p class="text-primary-100 text-sm leading-relaxed">Открыто рассказываем о каждом случае, финансах и трудностях.</p>
              </li>
              <li>
                <h4 class="font-display font-bold text-lg mb-1">Честность</h4>
                <p class="text-primary-100 text-sm leading-relaxed">Не приукрашиваем ситуацию, говорим правду о собаках.</p>
              </li>
              <li>
                <h4 class="font-display font-bold text-lg mb-1">Любовь</h4>
                <p class="text-primary-100 text-sm leading-relaxed">Каждая собака для нас — личность, достойная счастья.</p>
              </li>
            </ul>
          </div>

          <!-- Join CTA -->
          <div class="glass p-8 rounded-[2.5rem] border-white/60 text-center shadow-lg">
            <div class="w-16 h-16 bg-terra-50 rounded-full flex items-center justify-center text-terra-500 mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="font-display font-black text-2xl text-warm-900 mb-3">Присоединяйтесь</h3>
            <p class="text-warm-500 text-sm leading-relaxed mb-6">
              Мы всегда рады новым волонтёрам, помощникам, кураторам. Вместе мы делаем мир добрее.
            </p>
            <NuxtLink to="/contacts" class="btn bg-primary-600 text-white hover:bg-primary-700 px-8 py-4 text-base font-bold rounded-2xl w-full shadow-lg transition-all hover:scale-105 active:scale-95">
              Связаться с фондом
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Кто мы',
  meta: [
    { name: 'description', content: 'О фонде помощи шнауцерам: наша миссия, ценности, направления работы и команда волонтёров.' }
  ]
})
</script>
