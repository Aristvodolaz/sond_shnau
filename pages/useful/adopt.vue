<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Взять шнауцера
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Взять собаку из фонда — это подарить ей второй шанс на счастье. 
        Мы поможем вам на каждом этапе: от выбора до адаптации.
      </p>

      <!-- Why Adopt -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Почему стоит взять собаку из фонда</h2>
        <div class="space-y-4 text-warm-700">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Вы спасаете жизнь</h3>
              <p>Каждая пристроенная собака — это освободившееся место для новой собаки в беде.</p>
            </div>
          </div>

          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Вы знаете характер собаки</h3>
              <p>Мы честно рассказываем об особенностях каждой собаки, её здоровье и привычках.</p>
            </div>
          </div>

          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Поддержка после пристройства</h3>
              <p>Куратор остаётся на связи, помогает советами, поддерживает в период адаптации.</p>
            </div>
          </div>

          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Это бесплатно</h3>
              <p>Мы не продаём собак. Вы можете добровольно помочь с расходами на лечение или транспортировку, но это не обязательно.</p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Process -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Как взять собаку: пошаговая инструкция</h2>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Выберите собаку</h3>
              <p class="text-warm-700 mb-2">
                Посмотрите карточки собак на главной странице. Изучите описание, характер, особенности. 
                Подумайте, подходит ли вам эта собака.
              </p>
              <UiButton to="/" variant="outline" size="sm">Посмотреть собак</UiButton>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Свяжитесь с куратором</h3>
              <p class="text-warm-700">
                Позвоните или напишите куратору собаки (контакты указаны в карточке). 
                Задайте все интересующие вопросы, расскажите о себе и условиях содержания.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Познакомьтесь с собакой</h3>
              <p class="text-warm-700">
                Встретьтесь с собакой лично. Погуляйте, пообщайтесь, понаблюдайте за её поведением. 
                Это важно — вы должны понравиться друг другу.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Заполните анкету</h3>
              <p class="text-warm-700">
                Мы попросим вас ответить на вопросы о ваших условиях, опыте, мотивации. 
                Это не экзамен — просто способ убедиться, что собаке будет хорошо.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">5</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Подготовьте дом</h3>
              <p class="text-warm-700">
                Купите миски, лежанку, игрушки, корм. Уберите опасные предметы. 
                Подготовьте место для собаки.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">6</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Подпишите договор</h3>
              <p class="text-warm-700">
                Договор ответственного содержания — юридический документ, защищающий интересы собаки. 
                В нём прописаны ваши обязанности и условия возврата, если что-то пойдёт не так.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">7</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Заберите собаку домой</h3>
              <p class="text-warm-700">
                Поздравляем! У вас новый член семьи. Первые дни дайте собаке освоиться, будьте терпеливы.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">8</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Адаптация и поддержка</h3>
              <p class="text-warm-700">
                Куратор будет на связи первые недели (иногда месяцы). Не стесняйтесь задавать вопросы, 
                делиться успехами и трудностями.
              </p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Questionnaire -->
      <UiCard class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-display font-bold text-warm-900">Анкета потенциального владельца</h2>
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
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Что мы ожидаем от вас</h2>
        <ul class="space-y-3 text-warm-700">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Любовь, забота и терпение</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Финансовую стабильность для обеспечения нужд собаки</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Подходящие условия содержания</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Время для прогулок, воспитания, игр</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Готовность обращаться к ветеринару при необходимости</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Честность и открытость в общении с куратором</span>
          </li>
        </ul>
      </UiCard>

      <!-- CTA -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 class="text-2xl font-display font-bold text-primary-900 mb-4">
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
</script>
