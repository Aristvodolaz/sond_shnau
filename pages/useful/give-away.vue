<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Отдать шнауцера
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Если вы оказались в ситуации, когда не можете больше содержать собаку — мы поможем. 
        Не бросайте животное на улице, обратитесь к нам.
      </p>

      <!-- Important -->
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div class="flex items-start">
          <svg class="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 class="font-bold text-amber-900 mb-2">Важно понимать</h3>
            <p class="text-amber-800">
              Бросать собаку — это жестокое обращение и преступление. Собака, оказавшаяся на улице, 
              испытывает сильный стресс, может попасть под машину, заболеть, умереть от голода или холода. 
              Обратитесь за помощью — мы не осуждаем, мы помогаем.
            </p>
          </div>
        </div>
      </div>

      <!-- Process -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Как это работает</h2>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Свяжитесь с нами</h3>
              <p class="text-warm-700">
                Позвоните или напишите. Расскажите о вашей ситуации и собаке. 
                Мы внимательно выслушаем и постараемся помочь.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Заполните анкету</h3>
              <p class="text-warm-700">
                Мы попросим вас ответить на вопросы о собаке: возраст, характер, здоровье, особенности. 
                Это нужно, чтобы правильно презентовать собаку будущим владельцам.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Предоставьте документы</h3>
              <p class="text-warm-700">
                Ветеринарный паспорт, документы о родословной (если есть), 
                письменный отказ от прав на животное (юридическая формальность).
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Передача собаки</h3>
              <p class="text-warm-700">
                Мы организуем передачу собаки куратору или на передержку. 
                Если возможно, помогите с транспортировкой.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">5</div>
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
          <h2 class="text-2xl font-display font-bold text-warm-900">Анкета для передачи собаки</h2>
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
        <p class="text-sm text-warm-600 mt-3">
          Скопируйте список вопросов и отправьте заполненную анкету на нашу почту или через контакты.
        </p>
      </UiCard>

      <!-- What We Need -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Что нам понадобится</h2>
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
        <h2 class="text-2xl font-display font-bold text-primary-900 mb-4">
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
