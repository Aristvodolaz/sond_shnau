<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Кто мы
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Мы — команда волонтёров, объединённых любовью к шнауцерам и желанием помогать тем, 
        кто оказался в беде.
      </p>

      <!-- Mission -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Наша миссия</h2>
        <p class="text-warm-700 leading-relaxed mb-4">
          Мы работаем для того, чтобы каждый шнауцер, оказавшийся без дома или в опасности, 
          получил второй шанс на счастливую жизнь в любящей семье.
        </p>
        <p class="text-warm-700 leading-relaxed">
          Фонд занимается спасением, лечением, реабилитацией и пристройством шнауцеров всех размеров: 
          ризеншнауцеров, миттельшнауцеров, цвергшнауцеров, а также метисов этих пород.
        </p>
      </UiCard>

      <!-- What We Do -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Чем мы занимаемся</h2>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Спасение и помощь</h3>
              <p class="text-warm-700">
                Забираем собак из приютов, с улицы, помогаем владельцам, которые не могут больше содержать питомца.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Лечение и реабилитация</h3>
              <p class="text-warm-700">
                Обеспечиваем ветеринарную помощь, лечим, проводим необходимые процедуры, реабилитируем после травм и болезней.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Пристройство</h3>
              <p class="text-warm-700">
                Тщательно подбираем новые семьи, проверяем условия содержания, помогаем с адаптацией.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Консультации и поддержка</h3>
              <p class="text-warm-700">
                Консультируем владельцев, помогаем в вопросах воспитания, ухода, поведения собак.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-2">Поиск потерянных собак</h3>
              <p class="text-warm-700">
                Помогаем в поиске потерявшихся питомцев, координируем волонтёров, размещаем объявления.
              </p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Our Values -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Наши ценности</h2>
        <ul class="space-y-3 text-warm-700">
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">•</span>
            <span><strong>Ответственность:</strong> Мы отвечаем за тех, кого берём под опеку, до самого конца.</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">•</span>
            <span><strong>Прозрачность:</strong> Открыто рассказываем о каждом случае, финансовых расходах, успехах и трудностях.</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">•</span>
            <span><strong>Честность:</strong> Не приукрашиваем ситуацию, говорим правду о состоянии и характере собак.</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary-500 mr-2">•</span>
            <span><strong>Любовь:</strong> Каждая собака для нас — личность, достойная заботы, уважения и счастья.</span>
          </li>
        </ul>
      </UiCard>

      <!-- Join Us -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 class="text-2xl font-display font-bold text-primary-900 mb-4">
          Присоединяйтесь к нам
        </h2>
        <p class="text-primary-800 mb-6">
          Мы всегда рады новым волонтёрам, помощникам, кураторам и просто неравнодушным людям. 
          Вместе мы делаем этот мир добрее.
        </p>
        <UiButton to="/contacts" variant="primary">
          Связаться с фондом
        </UiButton>
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
