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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Правовая база</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Юридический <br/>
            <span class="text-primary-600 italic font-display font-medium">отдел</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Правовая информация для владельцев, волонтёров и защитников животных. Законы, права и обязанности.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Animal Rights -->
          <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 hover:shadow-lg transition-all group">
            <h2 class="text-2xl md:text-3xl font-display font-black text-warm-900 mb-6 group-hover:text-primary-600 transition-colors">Права животных в РФ</h2>
            <div class="text-warm-700 leading-relaxed space-y-4">
              <p>
                В России действует Федеральный закон «Об ответственном обращении с животными» от 27.12.2018 № 498-ФЗ. 
                Этот закон регулирует отношения в области обращения с животными, защищает их от жестокости и определяет 
                ответственность владельцев.
              </p>
              <div class="bg-primary-50/50 rounded-2xl p-6 border border-primary-100/50 mt-4">
                <p class="font-bold text-warm-900 mb-3">Основные принципы закона:</p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <span class="text-primary-500 mt-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <span>Отношение к животным как к существам, способным испытывать эмоции и физические страдания</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-primary-500 mt-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <span>Ответственность человека за судьбу животного</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-primary-500 mt-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <span>Воспитание нравственного и гуманного отношения к животным</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-primary-500 mt-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <span>Научно обоснованное сочетание нравственных и экономических интересов</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Owner Responsibilities -->
          <div class="glass p-8 md:p-10 rounded-[2.5rem] border-white/60 hover:shadow-lg transition-all group">
            <h2 class="text-2xl md:text-3xl font-display font-black text-warm-900 mb-6 group-hover:text-primary-600 transition-colors">Обязанности владельца</h2>
            <div class="text-warm-700 leading-relaxed">
              <p class="mb-4 font-medium">Владелец собаки по закону обязан:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span class="text-sm">Обеспечивать надлежащий уход, своевременное кормление, поение</span>
                </div>
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span class="text-sm">Предоставлять животному ветеринарную помощь</span>
                </div>
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span class="text-sm">Обеспечивать безопасность граждан при выгуле собаки</span>
                </div>
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span class="text-sm">Не допускать неконтролируемого размножения</span>
                </div>
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">5</span>
                  <span class="text-sm">Регистрировать и маркировать животное (чипирование, клеймо)</span>
                </div>
                <div class="bg-white/50 rounded-2xl p-4 flex items-start gap-3 border border-warm-100 shadow-sm">
                  <span class="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">6</span>
                  <span class="text-sm">Убирать продукты жизнедеятельности в общественных местах</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cruelty -->
          <div class="glass p-8 md:p-10 rounded-[2.5rem] border-red-100 bg-gradient-to-br from-white to-red-50/30 hover:shadow-lg transition-all relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <h2 class="text-2xl md:text-3xl font-display font-black text-red-900 mb-6 relative z-10">Жестокое обращение</h2>
            <div class="text-warm-700 leading-relaxed space-y-4 relative z-10">
              <p>За жестокое обращение с животными предусмотрена уголовная ответственность <strong class="text-red-800">по статье 245 УК РФ</strong>.</p>
              
              <div class="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 class="font-bold text-red-900 mb-3">Что считается жестоким обращением:</h3>
                <ul class="space-y-2 text-red-800/90 text-sm">
                  <li>• Побои, истязания, причинение боли и страданий</li>
                  <li>• Использование животных в боях</li>
                  <li>• Лишение пищи, воды, содержание в неподходящих условиях</li>
                  <li>• Оставление животного в опасности</li>
                  <li>• Использование в ненаучных целях с причинением боли</li>
                </ul>
              </div>
              
              <p class="text-sm font-medium">
                Наказание: штраф до 80 000 рублей, обязательные или исправительные работы, либо лишение свободы до 3 лет (при отягчающих — до 5 лет).
              </p>
            </div>
          </div>

        </div>

        <div class="lg:col-span-4 space-y-8">
          <!-- Abandonment -->
          <div class="glass p-6 rounded-[2rem] border-white/60">
            <h3 class="font-display font-bold text-lg text-warm-900 mb-4">Отказ от животного</h3>
            <div class="text-warm-600 text-sm leading-relaxed space-y-3">
              <p>Бросать животное на улице — это преступление. Если вы не можете больше содержать собаку:</p>
              <ul class="list-disc pl-4 space-y-1">
                <li>Свяжитесь с нами или другим фондом</li>
                <li>Разместите объявления о пристройстве</li>
                <li>Обратитесь в приют</li>
                <li>Попросите знакомых о передержке</li>
              </ul>
              <div class="mt-4 pt-4 border-t border-warm-100">
                <NuxtLink to="/useful/give-away" class="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-1">
                  Как передать в фонд
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Adoption Contract -->
          <div class="glass p-6 rounded-[2rem] border-white/60">
            <h3 class="font-display font-bold text-lg text-warm-900 mb-4">Договор передачи</h3>
            <div class="text-warm-600 text-sm leading-relaxed space-y-3">
              <p>При пристройстве мы заключаем юридический договор, который содержит:</p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2"><span class="text-primary-400">•</span> Данные сторон и описание собаки</li>
                <li class="flex items-start gap-2"><span class="text-primary-400">•</span> Обязательства по уходу</li>
                <li class="flex items-start gap-2"><span class="text-primary-400">•</span> Право фонда на проверку</li>
                <li class="flex items-start gap-2"><span class="text-primary-400">•</span> Обязательство вернуть фонду при невозможности содержания</li>
              </ul>
            </div>
          </div>

          <!-- Lost and Found -->
          <div class="glass p-6 rounded-[2rem] border-white/60">
            <h3 class="font-display font-bold text-lg text-warm-900 mb-4">Находка</h3>
            <div class="text-warm-600 text-sm leading-relaxed space-y-3">
              <p>Если вы нашли собаку, по закону вы обязаны:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Попытаться найти владельца</li>
                <li>Сообщить о находке</li>
                <li>Обеспечить временный уход</li>
              </ol>
              <p class="text-xs text-warm-400 mt-2">Если владелец не найден в течение 6 месяцев, вы можете оставить собаку себе.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 glass p-10 md:p-14 rounded-[3.5rem] border-white/60 text-center shadow-lg relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-terra-400/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <h2 class="relative z-10 text-3xl md:text-4xl font-display font-black text-warm-900 mb-4 tracking-tight">
          Нужна консультация?
        </h2>
        <p class="relative z-10 text-warm-600 text-lg max-w-xl mx-auto mb-8">
          Мы не являемся юристами, но можем помочь разобраться в базовых вопросах или порекомендовать специалистов.
        </p>
        <div class="relative z-10">
          <NuxtLink to="/contacts" class="inline-flex btn bg-primary-600 text-white hover:bg-primary-700 px-10 py-5 text-lg font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
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
  title: 'Юридический отдел',
  meta: [
    { name: 'description', content: 'Правовая информация о защите прав животных, обязанностях владельцев собак и ответственности за жестокое обращение.' }
  ]
})
</script>
