<template>
  <div class="min-h-screen bg-warm-50">

    <!-- Page header -->
    <section class="bg-white border-b border-warm-100 py-6 md:py-10">
      <div class="container-custom max-w-4xl">
        <h1 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 leading-tight">Контакты</h1>
        <p class="text-warm-500 mt-1.5 text-sm">Свяжитесь с нами любым удобным способом</p>
      </div>
    </section>

    <div class="container-custom max-w-4xl py-6 md:py-10 space-y-4 md:space-y-6">

      <!-- Direct contacts -->
      <div class="bg-white rounded-2xl border border-warm-100 overflow-hidden" style="box-shadow: var(--shadow-card);">
        <div class="px-5 pt-5 pb-3 md:px-6 md:pt-6">
          <h2 class="font-display font-semibold text-base md:text-lg text-warm-900">Прямая связь</h2>
        </div>

        <div class="divide-y divide-warm-100">
          <!-- Phones -->
          <div class="px-5 py-4 md:px-6 md:py-5">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">Телефоны · 10:00–20:00 МСК</p>
                <div class="space-y-2">
                  <div v-for="phone in config.PHONES" :key="phone.number" class="flex items-center justify-between gap-2 flex-wrap">
                    <a
                      v-if="telUrl(phone.number)"
                      :href="telUrl(phone.number)!"
                      class="text-base md:text-lg font-semibold text-warm-900 hover:text-primary-600 transition-colors"
                    >
                      {{ phone.number }}
                    </a>
                    <span class="text-xs text-warm-400 bg-warm-50 px-2 py-0.5 rounded-full border border-warm-100">{{ phone.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <a :href="`mailto:${config.EMAIL}`"
            class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 hover:bg-warm-50 transition-colors group">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors">
              <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-0.5">Email · ответ за 24 ч</p>
              <p class="text-base font-semibold text-warm-900 group-hover:text-primary-600 transition-colors truncate">{{ config.EMAIL }}</p>
            </div>
            <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <!-- Forum -->
          <a :href="config.FORUM_URL" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 hover:bg-warm-50 transition-colors group">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-0.5">Форум</p>
              <p class="text-base font-semibold text-warm-900 group-hover:text-primary-600 transition-colors">Общайтесь с волонтёрами</p>
            </div>
            <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Social media -->
      <div class="bg-white rounded-2xl border border-warm-100 overflow-hidden" style="box-shadow: var(--shadow-card);">
        <div class="px-5 pt-5 pb-3 md:px-6 md:pt-6">
          <h2 class="font-display font-semibold text-base md:text-lg text-warm-900">Социальные сети</h2>
        </div>
        <div class="divide-y divide-warm-100">
          <a :href="config.VK_URL" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-4 hover:bg-warm-50 transition-colors group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:#0077FF;">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-warm-900">ВКонтакте</p>
              <p class="text-xs text-warm-400 mt-0.5">Новости, фото, истории</p>
            </div>
            <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a :href="config.TG_URL" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-4 hover:bg-warm-50 transition-colors group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:#2AABEE;">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-warm-900">Telegram</p>
              <p class="text-xs text-warm-400 mt-0.5">Оперативные новости и связь</p>
            </div>
            <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a :href="config.DZEN_URL" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-4 px-5 py-4 md:px-6 md:py-4 hover:bg-warm-50 transition-colors group">
            <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#000000] flex items-center justify-center">
              <img src="/icons/dzen.svg" class="w-full h-full object-cover scale-110" alt="Дзен" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-warm-900">Яндекс Дзен</p>
              <p class="text-xs text-warm-400 mt-0.5">Статьи и истории о шнауцерах</p>
            </div>
            <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Financial help -->
      <div class="bg-white rounded-2xl border border-warm-100 overflow-hidden" style="box-shadow: var(--shadow-card);">
        <div class="px-5 pt-5 md:px-6 md:pt-6">
          <h2 class="font-display font-semibold text-base md:text-lg text-warm-900 mb-1">Финансовая помощь</h2>
          <p class="text-warm-500 text-sm mb-5">Все средства идут на лечение, питание и содержание собак — с публичной отчётностью.</p>
        </div>

        <div class="px-5 pb-5 md:px-6 md:pb-6 space-y-3">
          <div class="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p class="text-sm text-amber-800 leading-relaxed">
              Для получения актуальных реквизитов свяжитесь с нами по телефону или email — предоставим всю информацию.
            </p>
          </div>

          <div class="space-y-2.5">
            <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider">Другие способы помочь</p>
            <div v-for="item in helpWays" :key="item" class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-sm text-warm-700">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick links -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 bg-white rounded-xl border border-warm-100 px-4 py-3.5 hover:border-primary-200 hover:bg-primary-50/40 transition-colors group"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="link.iconBg">
            <svg class="w-4 h-4" :class="link.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="link.svg" />
          </div>
          <span class="text-sm font-semibold text-warm-700 group-hover:text-primary-700 transition-colors">{{ link.label }}</span>
          <svg class="w-4 h-4 text-warm-300 group-hover:text-primary-400 ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

const { telUrl } = useContactLinks()

useHead({
  title: 'Контакты',
  meta: [{ name: 'description', content: 'Контакты фонда помощи шнауцерам: телефон, email, социальные сети.' }]
})

const helpWays = [
  'Купить корм или лекарства по списку',
  'Оплатить конкретную процедуру или операцию',
  'Стать куратором или волонтёром',
  'Предоставить временную передержку',
  'Рассказать о нас друзьям и в соцсетях'
]

const quickLinks = [
  {
    to: '/useful/adopt',
    label: 'Как взять собаку?',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-500',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`
  },
  {
    to: '/useful/give-away',
    label: 'Как отдать собаку?',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`
  },
  {
    to: '/useful/faq',
    label: 'Частые вопросы',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
  }
]
</script>
