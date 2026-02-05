<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Пропал или найден шнауцер?
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Потеря питомца — это стресс. Мы поможем вам действовать быстро и эффективно.
      </p>

      <!-- If Dog is Lost -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">
          Если ваша собака потерялась
        </h2>
        <div class="space-y-4 text-warm-700">
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Немедленно начните поиск</h3>
              <p>Обойдите близлежащие территории, спросите у соседей, проверьте места, где собака любит гулять.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Оповестите всех</h3>
              <p>Разместите объявления в соцсетях, на нашем форуме, в местных группах потерянных животных. Расклейте объявления в районе.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Обзвоните приюты и ветклиники</h3>
              <p>Возможно, вашего питомца уже нашли и доставили туда. Оставьте свои контакты и описание собаки.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Проверяйте онлайн-базы</h3>
              <p>Регулярно просматривайте объявления о найденных собаках на сайтах и в группах.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">5</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Не теряйте надежду</h3>
              <p>Многие собаки находятся спустя дни и даже недели. Продолжайте поиск и верьте в лучшее.</p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- If Dog is Found -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">
          Если вы нашли шнауцера
        </h2>
        <div class="space-y-4 text-warm-700">
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Обеспечьте безопасность</h3>
              <p>Аккуратно подойдите к собаке, не пугайте её. Если есть возможность, отведите в безопасное место.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Проверьте наличие идентификации</h3>
              <p>Осмотрите ошейник на наличие бирки с телефоном или адресом. Если есть чип — обратитесь в ветклинику для считывания.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Разместите объявление</h3>
              <p>Сфотографируйте собаку и разместите объявление о находке на форуме, в соцсетях, группах помощи животным.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</div>
            <div>
              <h3 class="font-semibold text-warm-900 mb-1">Свяжитесь с нами</h3>
              <p>Позвоните или напишите в фонд. Мы поможем найти хозяев или временную передержку.</p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Emergency Contacts -->
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-display font-semibold text-amber-900 mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Быстрые контакты
        </h3>
        <div class="space-y-2 text-amber-900">
          <p><strong>Телефон:</strong> {{ config.PHONE }}</p>
          <p><strong>Email:</strong> {{ config.EMAIL }}</p>
        </div>
      </div>

      <!-- Forum Link -->
      <div class="text-center">
        <UiButton :href="config.LOST_FOUND_FORUM_URL" variant="primary" size="lg" external>
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Перейти в раздел форума «Пропал / найден»
        </UiButton>
        <p class="text-sm text-warm-600 mt-3">
          На форуме вы можете разместить объявление и получить помощь сообщества
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

// SEO
useHead({
  title: 'Пропал / найден',
  meta: [
    { name: 'description', content: 'Что делать, если ваш шнауцер потерялся или вы нашли собаку. Инструкции и контакты для быстрой помощи.' }
  ]
})
</script>
