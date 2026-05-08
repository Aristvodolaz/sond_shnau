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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Передача в фонд</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Отдать шнауцера <br/>
            <span class="text-primary-600 italic font-display font-medium">в надёжные руки</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Если вы больше не можете содержать собаку — мы поможем найти ей новый дом. Без осуждения, с заботой о животном.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">



      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        <!-- Process -->
        <div class="lg:col-span-8">
          <h2 class="text-3xl md:text-4xl font-display font-black text-warm-900 mb-10 tracking-tight px-4">Как это работает</h2>
          <div class="space-y-6">
            
            <div class="glass rounded-[2.5rem] border-white/60 p-6 md:p-8 flex items-start gap-6 group hover:shadow-lg transition-all">
              <div class="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-md group-hover:scale-110 transition-transform">1</div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">Свяжитесь с нами</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base mb-4">Позвоните или напишите. Расскажите о вашей ситуации и собаке. Мы внимательно выслушаем и постараемся помочь.</p>
                <NuxtLink to="/contacts" class="btn-primary py-2.5 px-6 text-sm rounded-xl">Связаться с фондом</NuxtLink>
              </div>
            </div>

            <div class="glass rounded-[2.5rem] border-white/60 p-6 md:p-8 flex items-start gap-6 group hover:shadow-lg transition-all">
              <div class="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-md group-hover:scale-110 transition-transform">2</div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">Заполните анкету</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base mb-4">Ответьте на вопросы о собаке: возраст, характер, здоровье. Это нужно для поиска идеальной семьи.</p>
                <button @click="scrollToQuestionnaire" class="btn-primary py-2.5 px-6 text-sm rounded-xl">Анкета</button>
              </div>
            </div>

            <div class="glass rounded-[2.5rem] border-white/60 p-6 md:p-8 flex items-start gap-6 group hover:shadow-lg transition-all">
              <div class="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-md group-hover:scale-110 transition-transform">3</div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">Передача и документы</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base">Мы организуем передачу собаки куратору или сразу новым хозяевам, по обстоятельствам. Ветпаспорт не обязателен, только отказ.</p>
              </div>
            </div>

            <div class="glass rounded-[2.5rem] border-white/60 p-6 md:p-8 flex items-start gap-6 group hover:shadow-lg transition-all">
              <div class="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-md group-hover:scale-110 transition-transform">4</div>
              <div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">Поиск хозяев</h3>
                <p class="text-warm-500 leading-relaxed text-sm md:text-base">Мы размещаем информацию о собаке, ищем семью, проводим собеседования. Вы можете следить за процессом.</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Sidebar Needs & Questionnaire -->
        <div class="lg:col-span-4 space-y-8">
          
          <!-- What We Need -->
          <div class="bg-primary-600 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
            <h2 class="font-display font-black text-2xl mb-6 relative z-10">Что понадобится</h2>
            <ul class="space-y-4 relative z-10">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold leading-relaxed">Фотографии собаки (3-5 шт)</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold leading-relaxed">Ветпаспорт (если есть)</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold leading-relaxed">Заполненная анкета</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold leading-relaxed">Видео с собакой (по возможности)</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span class="text-primary-50 text-sm font-semibold leading-relaxed">Письменный отказ (поможем оформить)</span>
              </li>
            </ul>
          </div>

          <!-- Questionnaire -->
          <div class="glass p-8 rounded-[2.5rem] border-white/60">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-display font-black text-warm-900">Анкета</h2>
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
              <p><strong>АНКЕТА ДЛЯ ПЕРЕДАЧИ СОБАКИ В ФОНД</strong></p>
              <p>1. Ваши контактные данные (ФИО, телефон, email, город):</p>
              <p>2. Кличка собаки:</p>
              <p>3. Порода / тип (ризен / миттель / цверг / метис):</p>
              <p>4. Возраст:</p>
              <p>5. Пол (кобель/сука):</p>
              <p>6. Стерилизация / кастрация (да/нет):</p>
              <p>7. Прививки (какие, когда последние):</p>
              <p>8. Чип / клеймо (есть/нет, номер):</p>
              <p>9. Где сейчас находится собака:</p>
              <p>10. Причина отказа от собаки:</p>
              <p>11. Как долго собака с вами:</p>
              <p>12. Характер собаки (спокойная, активная, агрессивная, пугливая и т.д.):</p>
              <p>13. Отношение к детям:</p>
              <p>14. Отношение к другим собакам:</p>
              <p>15. Отношение к кошкам и другим животным:</p>
              <p>16. Знает ли команды (какие):</p>
              <p>17. Приучена ли к туалету на улице:</p>
              <p>18. Особенности поведения (боится чего-то, грызёт вещи, лает и т.д.):</p>
              <p>19. Состояние здоровья (здорова / есть заболевания, какие):</p>
              <p>20. Нужно ли лечение / операции:</p>
              <p>21. Что ест (корм, натуралка, особенности питания):</p>
              <p>22. Можете ли вы помочь с транспортировкой:</p>
              <p>23. Можете ли вы оставить собаку у себя на время поиска новых хозяев:</p>
              <p>24. Дополнительная информация / комментарии:</p>
            </div>
            <p class="text-xs text-warm-500 mt-4 leading-relaxed">
              Скопируйте вопросы, заполните и отправьте на нашу почту.
            </p>
          </div>

        </div>
      </div>

      <!-- CTA -->
      <div class="glass p-10 md:p-14 rounded-[3.5rem] border-white/60 text-center shadow-lg relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-terra-400/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <h2 class="relative z-10 text-3xl md:text-4xl font-display font-black text-warm-900 mb-4 tracking-tight">
          Хотите отдать собаку?
        </h2>
        <p class="relative z-10 text-warm-600 text-lg max-w-xl mx-auto mb-8">
          Свяжитесь с нами, и мы поможем найти вашей собаке новый любящий дом.
        </p>
        <div class="relative z-10">
          <NuxtLink to="/contacts" class="inline-flex btn bg-primary-600 text-white hover:bg-primary-700 px-10 py-5 text-lg font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95">
            Связаться с фондом
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Отдать шнауцера',
  meta: [
    { name: 'description', content: 'Как передать шнауцера в фонд, если вы не можете больше содержать собаку. Анкета и процесс передачи.' }
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
const scrollToQuestionnaire = () => {
  questionnaireRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
