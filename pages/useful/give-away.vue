<template>
  <div class="min-h-screen bg-warm-50">
    <section class="bg-white border-b border-warm-100 py-8 md:py-10">
      <div class="container-custom max-w-4xl">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Отдать шнауцера</h1>
        <p class="text-warm-500 mt-2 text-sm">Если вы не можете больше содержать собаку — мы поможем найти ей дом</p>
      </div>
    </section>
    <div class="container-custom max-w-4xl py-8 md:py-10">

      <!-- Process -->
      <UiCard class="mb-8">
        <h2 class="text-xl font-display font-semibold text-warm-900 mb-6">Как это работает</h2>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-sm font-semibold shrink-0">1</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Свяжитесь с нами</h3>
              <p class="text-warm-700">
                Позвоните или напишите. Расскажите о вашей ситуации и собаке. 
                Мы внимательно выслушаем и постараемся помочь.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-sm font-semibold shrink-0">2</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Заполните анкету</h3>
              <p class="text-warm-700">
                Мы попросим вас ответить на вопросы о собаке: возраст, характер, здоровье, особенности. 
                Это нужно, чтобы правильно презентовать собаку будущим владельцам.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-sm font-semibold shrink-0">3</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Предоставьте документы</h3>
              <p class="text-warm-700">
                Ветеринарный паспорт, документы о родословной (если есть), 
                письменный отказ от прав на животное (юридическая формальность).
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-sm font-semibold shrink-0">4</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Передача собаки</h3>
              <p class="text-warm-700">
                Мы организуем передачу собаки куратору или на передержку. 
                Если возможно, помогите с транспортировкой.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-sm font-semibold shrink-0">5</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Поиск новых хозяев</h3>
              <p class="text-warm-700">
                Мы размещаем информацию о собаке, ищем подходящую семью, 
                проводим собеседования и проверки. Вы можете следить за процессом.
              </p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Questionnaire -->
      <UiCard class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-display font-semibold text-warm-900">Анкета для передачи собаки</h2>
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
          <p><strong>АНКЕТА: ОТДАТЬ ШНАУЦЕРА</strong></p>
          <p>1. Полная кличка по документам с питомниковой приставкой, домашняя кличка. Возраст, дата рождения.</p>
          <p>2. Документы (ветпаспорт, родословная, щенячья карточка). Наличие клейма и чипа.</p>
          <p>3. Даты последних прививок и стерилизации.</p>
          <p>4. Как ведет себя с:</p>
          <p>&nbsp;&nbsp;&nbsp;- другими собаками — суками, кобелями;</p>
          <p>&nbsp;&nbsp;&nbsp;- незнакомыми людьми;</p>
          <p>&nbsp;&nbsp;&nbsp;- детьми;</p>
          <p>&nbsp;&nbsp;&nbsp;- котами.</p>
          <p>5. Как ведет себя дома один (одна).</p>
          <p>6. Лает ли на звонок? Когда еще может лаять.</p>
          <p>7. Может ли укусить, при каких обстоятельствах.</p>
          <p>8. Охраняет ли место, еду.</p>
          <p>9. Писает ли дома.</p>
          <p>10. Есть ли что-то, чего боится.</p>
          <p>11. Как дела с обучаемостью, есть ли любимые игры.</p>
          <p>12. Как ходит на поводке.</p>
          <p>13. Особенности характера.</p>
          <p>14. Чем болел/болеет.</p>
          <p>15. Как ездит в машине.</p>
          <p>16. Где живет сейчас (квартира/загородный дом/вольер/клиника).</p>
          <p>17. Пришлите фото.</p>
        </div>
        <p class="text-sm text-warm-600 mt-3">
          Скопируйте список вопросов и отправьте заполненную анкету на нашу почту или через контакты.
        </p>
      </UiCard>

      <!-- What We Need -->
      <UiCard class="mb-8">
        <h2 class="text-xl font-display font-semibold text-warm-900 mb-4">Что нам понадобится</h2>
        <div class="space-y-3 text-warm-700">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Фотографии собаки (минимум 3-5 хороших фото в полный рост, крупным планом)</span>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Ветеринарный паспорт (или информация о прививках)</span>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Заполненная анкета</span>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Видео с собакой (желательно, но не обязательно)</span>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Письменный отказ от прав на животное (можем помочь с оформлением)</span>
          </div>
        </div>
      </UiCard>

      <!-- Contact CTA -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 class="text-xl font-display font-semibold text-primary-900 mb-4">
          Готовы передать собаку?
        </h2>
        <p class="text-primary-800 mb-6">
          Свяжитесь с нами, и мы поможем найти вашей собаке новый любящий дом.
        </p>
        <UiButton to="/contacts" variant="primary" size="lg">
          Связаться с фондом
        </UiButton>
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
</script>
