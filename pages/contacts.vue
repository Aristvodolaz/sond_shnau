<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-5xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Контакты
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Information -->
        <div>
          <UiCard class="mb-6">
            <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Связь с фондом</h2>
            
            <div class="space-y-5">
              <!-- Phone -->
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-warm-900 mb-1">Телефон</h3>
                  <a :href="`tel:${config.PHONE}`" class="link text-lg">{{ config.PHONE }}</a>
                  <p class="text-sm text-warm-600 mt-1">Звоните с 10:00 до 20:00 (МСК)</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-warm-900 mb-1">Email</h3>
                  <a :href="`mailto:${config.EMAIL}`" class="link text-lg">{{ config.EMAIL }}</a>
                  <p class="text-sm text-warm-600 mt-1">Отвечаем в течение 24 часов</p>
                </div>
              </div>

              <!-- Forum -->
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-warm-900 mb-1">Форум</h3>
                  <a :href="config.FORUM_URL" target="_blank" rel="noopener noreferrer" class="link text-lg inline-flex items-center">
                    Перейти на форум
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p class="text-sm text-warm-600 mt-1">Общайтесь с волонтёрами и владельцами</p>
                </div>
              </div>
            </div>
          </UiCard>

          <!-- Social Media -->
          <UiCard>
            <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Социальные сети</h2>
            
            <div class="space-y-4">
              <!-- VK -->
              <a
                :href="config.VK_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center p-4 bg-warm-100 rounded-lg hover:bg-warm-200 transition-colors group"
              >
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-warm-900">ВКонтакте</h3>
                  <p class="text-sm text-warm-600">Новости, фото, истории</p>
                </div>
              </a>

              <!-- Telegram -->
              <a
                :href="config.TG_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center p-4 bg-warm-100 rounded-lg hover:bg-warm-200 transition-colors group"
              >
                <div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-105 transition-transform">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-warm-900">Telegram</h3>
                  <p class="text-sm text-warm-600">Оперативные новости и связь</p>
                </div>
              </a>
            </div>
          </UiCard>
        </div>

        <!-- Financial Help -->
        <div>
          <UiCard class="h-full">
            <h2 class="text-2xl font-display font-bold text-warm-900 mb-6">Как помочь финансово</h2>
            
            <p class="text-warm-700 mb-6">
              Ваша помощь спасает жизни. Все средства идут на лечение, питание, содержание собак. 
              Мы ведём прозрачную отчётность и публикуем все чеки.
            </p>

            <div class="bg-warm-100 rounded-lg p-6 mb-6">
              <h3 class="font-semibold text-warm-900 mb-4">Реквизиты для перевода</h3>
              <div class="space-y-3 text-sm">
                <div>
                  <span class="text-warm-600">Банк:</span>
                  <p class="font-medium text-warm-900">{{ config.BANK_NAME }}</p>
                </div>
                <div>
                  <span class="text-warm-600">Получатель:</span>
                  <p class="font-medium text-warm-900">{{ config.RECIPIENT }}</p>
                </div>
                <div>
                  <span class="text-warm-600">Номер счёта:</span>
                  <p class="font-mono font-medium text-warm-900">{{ config.BANK_ACCOUNT }}</p>
                </div>
              </div>
              <p class="text-xs text-warm-600 mt-4">
                * Реквизиты являются примерными. Для актуальной информации свяжитесь с нами.
              </p>
            </div>

            <div class="bg-primary-50 border border-primary-200 rounded-lg p-5">
              <h3 class="font-semibold text-primary-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Другие способы помочь
              </h3>
              <ul class="space-y-2 text-primary-800 text-sm">
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Купить корм или лекарства по списку</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Оплатить конкретную процедуру / операцию</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Стать куратором или волонтёром</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Предоставить временную передержку</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Рассказать о нас друзьям и в соцсетях</span>
                </li>
              </ul>
            </div>

            <p class="text-sm text-warm-600 mt-6 italic">
              Даже небольшой вклад имеет значение. Спасибо за вашу доброту!
            </p>
          </UiCard>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="mt-12 bg-warm-100 rounded-xl p-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-6 text-center">
          Частые вопросы
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UiButton to="/useful/adopt" variant="outline" full-width>
            Как взять собаку?
          </UiButton>
          <UiButton to="/useful/give-away" variant="outline" full-width>
            Как отдать собаку?
          </UiButton>
          <UiButton to="/useful/faq" variant="outline" full-width>
            ЧаВо
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

// SEO
useHead({
  title: 'Контакты',
  meta: [
    { name: 'description', content: 'Контакты фонда помощи шнауцерам: телефон, email, социальные сети, реквизиты для помощи.' }
  ]
})
</script>
