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
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">Связь с нами</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Контакты <br/>
            <span class="text-primary-600 italic font-display font-medium">для любых вопросов</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Свяжитесь с нами удобным для вас способом. Мы всегда на связи и готовы помочь, проконсультировать или ответить на ваши вопросы.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <!-- Direct Contacts -->
        <div class="lg:col-span-7 space-y-10">
          <div>
            <h2 class="font-display font-black text-3xl text-warm-900 mb-8 px-4">Прямая связь</h2>
            <div class="space-y-6">
              
              <!-- Phones -->
              <div class="glass p-8 md:p-10 rounded-[3rem] border-white/60 hover:shadow-xl transition-all duration-300">
                <div class="flex items-start gap-6">
                  <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-[10px] font-black uppercase tracking-widest text-warm-400 mb-4">Телефоны кураторов · 10:00–20:00</div>
                    <div class="space-y-4">
                      <div v-for="phone in config.PHONES" :key="phone.number" class="flex items-center justify-between border-b border-warm-100 pb-4 last:border-0 last:pb-0">
                        <a :href="`tel:${phone.number.replace(/\s/g, '')}`" class="text-xl md:text-2xl font-display font-bold text-warm-900 hover:text-primary-600 transition-colors">
                          {{ phone.number }}
                        </a>
                        <span class="text-xs font-bold text-warm-500 bg-warm-100 px-3 py-1 rounded-full">{{ phone.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <a :href="`mailto:${config.EMAIL}`" class="block glass p-8 md:p-10 rounded-[3rem] border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div class="flex items-center gap-6">
                  <div class="w-16 h-16 bg-violet-50 text-violet-500 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-[10px] font-black uppercase tracking-widest text-warm-400 mb-1">Email · Отвечаем за 24ч</div>
                    <div class="text-xl md:text-2xl font-display font-bold text-warm-900 group-hover:text-primary-600 transition-colors">{{ config.EMAIL }}</div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </div>

        <!-- Social Media & Quick Links -->
        <div class="lg:col-span-5 space-y-10">
          
          <div>
            <h2 class="font-display font-black text-3xl text-warm-900 mb-8 px-4">Социальные сети</h2>
            <div class="space-y-4">
              <a :href="config.VK_URL" target="_blank" class="flex items-center gap-5 glass p-6 rounded-[2rem] border-white/60 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md bg-[#0077FF] group-hover:scale-110 transition-transform">
                  <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-display font-bold text-lg text-warm-900 group-hover:text-[#0077FF] transition-colors">ВКонтакте</div>
                  <div class="text-sm text-warm-500">Новости, фото, истории</div>
                </div>
              </a>

              <a :href="config.TG_URL" target="_blank" class="flex items-center gap-5 glass p-6 rounded-[2rem] border-white/60 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md bg-[#2AABEE] group-hover:scale-110 transition-transform">
                  <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-display font-bold text-lg text-warm-900 group-hover:text-[#2AABEE] transition-colors">Telegram</div>
                  <div class="text-sm text-warm-500">Оперативные новости и связь</div>
                </div>
              </a>

              <a :href="config.DZEN_URL" target="_blank" class="flex items-center gap-5 glass p-6 rounded-[2rem] border-white/60 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md bg-black group-hover:scale-110 transition-transform">
                  <img src="/icons/dzen.svg" class="w-8 h-8" alt="Дзен" />
                </div>
                <div>
                  <div class="font-display font-bold text-lg text-warm-900 group-hover:text-black transition-colors">Яндекс Дзен</div>
                  <div class="text-sm text-warm-500">Статьи и истории о шнауцерах</div>
                </div>
              </a>
            </div>
          </div>

          <div class="bg-primary-600 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden text-center">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />
            <h3 class="font-display font-black text-2xl mb-4 relative z-10">Есть вопросы?</h3>
            <p class="text-primary-100 text-sm leading-relaxed mb-8 relative z-10">
              Задайте их на нашем форуме! Там общаются кураторы, волонтеры и просто неравнодушные люди.
            </p>
            <a :href="config.FORUM_URL" target="_blank" class="relative z-10 inline-flex w-full items-center justify-center bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 text-base font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
              Перейти на форум
            </a>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

useHead({
  title: 'Контакты',
  meta: [{ name: 'description', content: 'Контакты фонда помощи шнауцерам: телефон, email, социальные сети.' }]
})
</script>
