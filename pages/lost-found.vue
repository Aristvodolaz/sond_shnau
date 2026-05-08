<template>
  <div class="min-h-screen bg-warm-50 pb-24">
    <!-- Hero Header -->
    <section class="relative py-20 overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100/50 backdrop-blur-md rounded-full border border-primary-200/50 mb-6">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Экстренная помощь</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Пропал или найден <br/>
            <span class="text-primary-600 italic font-display font-medium">шнауцер?</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Действуйте быстро — каждая минута важна. Мы поможем скоординировать поиск и оповестить сообщество.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Main Content -->
        <div class="lg:col-span-8 space-y-12">
          
          <!-- If Dog is Lost -->
          <section>
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 class="font-display font-black text-2xl md:text-3xl text-warm-900 tracking-tight">Если ваш питомец потерялся</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(step, i) in lostSteps" :key="i" class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                  <span class="font-display font-black text-4xl text-warm-200/50 leading-none">0{{ i + 1 }}</span>
                  <div class="w-10 h-10 bg-warm-50 rounded-xl flex items-center justify-center text-warm-400">
                     <component :is="step.icon" class="w-5 h-5" />
                  </div>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">{{ step.title }}</h3>
                <p class="text-sm text-warm-500 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </section>

          <!-- If Dog is Found -->
          <section>
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="font-display font-black text-2xl md:text-3xl text-warm-900 tracking-tight">Если вы нашли собаку</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(step, i) in foundSteps" :key="i" class="glass p-8 rounded-[2.5rem] border-white/60 hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                  <span class="font-display font-black text-4xl text-warm-200/50 leading-none">0{{ i + 1 }}</span>
                  <div class="w-10 h-10 bg-warm-50 rounded-xl flex items-center justify-center text-warm-400">
                     <component :is="step.icon" class="w-5 h-5" />
                  </div>
                </div>
                <h3 class="font-display font-bold text-xl text-warm-900 mb-3">{{ step.title }}</h3>
                <p class="text-sm text-warm-500 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </section>

        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-8">
          
          <!-- Emergency Box -->
          <div class="bg-primary-600 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary-500/20">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            
            <h3 class="font-display font-black text-2xl mb-8 relative z-10">Срочная связь</h3>
            
            <div class="space-y-6 relative z-10">
              <a v-for="phone in config.PHONES" :key="phone.number" :href="`tel:${phone.number.replace(/\s/g, '')}`" 
                 class="block group">
                <div class="text-[10px] font-black uppercase tracking-widest text-primary-200 mb-1">{{ phone.name }}</div>
                <div class="text-xl font-display font-bold group-hover:text-primary-100 transition-colors">{{ phone.number }}</div>
              </a>
              
              <div class="pt-6 border-t border-white/10">
                <div class="text-[10px] font-black uppercase tracking-widest text-primary-200 mb-1">Email фонда</div>
                <a :href="`mailto:${config.EMAIL}`" class="text-lg font-display font-bold hover:text-primary-100 transition-colors">{{ config.EMAIL }}</a>
              </div>
            </div>

            <div class="mt-10 relative z-10">
              <a :href="config.LOST_FOUND_FORUM_URL" target="_blank" 
                 class="w-full flex items-center justify-center gap-3 py-4 bg-white text-primary-700 rounded-2xl font-bold text-sm hover:bg-primary-50 transition-all shadow-lg active:scale-95">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Форум потеряшек
              </a>
            </div>
          </div>

          <!-- Helpful Info Widget -->
          <div class="glass p-8 rounded-[2.5rem] border-white/60">
            <h3 class="font-display font-black text-xl text-warm-900 mb-6">Важные советы</h3>
            <ul class="space-y-4">
              <li class="flex gap-3 text-sm text-warm-600 leading-relaxed">
                <svg class="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Всегда делайте четкие фото собаки при находке
              </li>
              <li class="flex gap-3 text-sm text-warm-600 leading-relaxed">
                <svg class="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Проверяйте наличие клейма или чипа в любой ветклинике
              </li>
              <li class="flex gap-3 text-sm text-warm-600 leading-relaxed">
                <svg class="w-5 h-5 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Не отдавайте собаку без подтверждения владения (фото, документы)
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

// Icons (mock components or use SVG paths)
const IconSearch = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>' }
const IconShare = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>' }
const IconPhone = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>' }
const IconBase = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>' }
const IconSafety = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' }
const IconChip = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>' }
const IconPhoto = { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' }

const lostSteps = [
  { title: 'Начните поиск', desc: 'Обойдите близлежащие территории, спросите у соседей, проверьте места выгула.', icon: IconSearch },
  { title: 'Оповестите всех', desc: 'Разместите объявления в соцсетях, на форуме и в местных группах.', icon: IconShare },
  { title: 'Обзвоните клиники', desc: 'Возможно, вашего питомца уже нашли и доставили к ветеринарам.', icon: IconPhone },
  { title: 'Проверяйте базы', desc: 'Регулярно просматривайте объявления о найденных собаках онлайн.', icon: IconBase }
]

const foundSteps = [
  { title: 'Обеспечьте покой', desc: 'Аккуратно заберите собаку в безопасное место, предложите воду и отдых.', icon: IconSafety },
  { title: 'Проверьте чип', desc: 'Осмотрите ошейник или обратитесь в клинику для поиска клейма или чипа.', icon: IconChip },
  { title: 'Дайте объявление', desc: 'Сфотографируйте собаку и разместите информацию на форуме и в соцсетях.', icon: IconPhoto },
  { title: 'Свяжитесь с нами', desc: 'Фонд поможет найти старых хозяев или организовать временный дом.', icon: IconPhone }
]

// SEO
useHead({
  title: 'Пропал / найден',
  meta: [
    { name: 'description', content: 'Что делать, если ваш шнауцер потерялся или вы нашли собаку. Инструкции и контакты для быстрой помощи.' }
  ]
})
</script>
