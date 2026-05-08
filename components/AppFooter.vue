<template>
  <footer class="relative bg-warm-900 text-warm-200 overflow-hidden">

    <!-- Top gradient accent -->
    <div class="h-[3px] bg-gradient-to-r from-primary-700 via-terra-500 to-primary-400" />

    <!-- Main footer content -->
    <div class="container-custom pt-14 pb-10 relative">



      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">

        <!-- Brand & Mission (4 cols) -->
        <div class="lg:col-span-4">
          <NuxtLink to="/" class="flex items-center gap-3 mb-6 group">
            <div class="w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary-500/30 group-hover:ring-primary-500/60 transition-all duration-300">
              <img src="/images/logo/logo.png" alt="Логотип фонда" class="w-full h-full object-cover" />
            </div>
            <div>
              <div class="font-hobo text-[15px] text-white leading-none tracking-wide">Фонд помощи</div>
              <div class="font-hobo text-[13px] text-primary-400 tracking-wide mt-0.5">шнауцерам</div>
            </div>
          </NuxtLink>

          <p class="text-warm-400 leading-relaxed text-[15px] max-w-xs mb-8">
            Спасаем шнауцеров по всей России с 2014 года. Каждый пёс заслуживает любящую семью и безопасный дом.
          </p>

          <!-- Social links -->
          <div class="flex items-center gap-3">
            <a :href="config.VK_URL" target="_blank" rel="noopener noreferrer" title="ВКонтакте" class="footer-social-btn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z"/>
              </svg>
            </a>
            <a :href="config.TG_URL" target="_blank" rel="noopener noreferrer" title="Telegram" class="footer-social-btn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.21.21 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
              </svg>
            </a>
            <a :href="config.DZEN_URL" target="_blank" rel="noopener noreferrer" title="Дзен" class="footer-social-btn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 14.5c-.04 2.1-1.1 3.45-1.1 3.45s-1.06-1.35-1.1-3.45c-.03-1.5.5-2.8 1.1-3.7.6.9 1.13 2.2 1.1 3.7zm-1.1-7.3c-.6-.9-1.13-2.2-1.1-3.7.04-2.1 1.1-3.45 1.1-3.45s1.06 1.35 1.1 3.45c.03 1.5-.5 2.8-1.1 3.7zm3.5 2.55c.9-.6 2.2-1.13 3.7-1.1 2.1.04 3.45 1.1 3.45 1.1s-1.35 1.06-3.45 1.1c-1.5.03-2.8-.5-3.7-1.1zm-8.7 0c.9.6 2.2 1.13 3.7 1.1 2.1-.04 3.45-1.1 3.45-1.1s-1.35-1.06-3.45-1.1c-1.5-.03-2.8.5-3.7 1.1z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation (2 cols) -->
        <div class="lg:col-span-2">
          <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-warm-500 mb-6">Разделы</h3>
          <ul class="space-y-3.5">
            <li v-for="link in quickLinks" :key="link.label">
              <NuxtLink
                :to="link.to"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-warm-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
              >
                <span class="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300 shrink-0" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources (2 cols) -->
        <div class="lg:col-span-2">
          <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-warm-500 mb-6">Полезное</h3>
          <ul class="space-y-3.5">
            <li v-for="link in resourceLinks" :key="link.label">
              <NuxtLink
                :to="link.to"
                class="text-warm-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
              >
                <span class="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300 shrink-0" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contacts (4 cols) -->
        <div class="lg:col-span-4">
          <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-warm-500 mb-6">Контакты</h3>

          <div class="space-y-2.5 mb-5">
            <a
              v-for="phone in config.PHONES"
              :key="phone.number"
              :href="`tel:${phone.number.replace(/\s/g, '')}`"
              class="flex items-center justify-between group py-2.5 px-4 rounded-xl border border-white/[0.07] hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-200"
            >
              <div>
                <div class="text-[10px] font-bold text-warm-500 uppercase tracking-widest">{{ phone.name }}</div>
                <div class="text-[15px] font-display font-bold text-warm-200 group-hover:text-primary-300 transition-colors mt-0.5">
                  {{ phone.number }}
                </div>
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-primary-500/20 flex items-center justify-center transition-all duration-200 shrink-0">
                <svg class="w-4 h-4 text-warm-500 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
            </a>
          </div>

          <a
            :href="`mailto:${config.EMAIL}`"
            class="flex items-center gap-3 group mb-6 py-2.5 px-4 rounded-xl border border-white/[0.07] hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-200"
          >
            <svg class="w-4 h-4 text-warm-500 group-hover:text-primary-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-[15px] font-semibold text-warm-300 group-hover:text-primary-300 transition-colors">{{ config.EMAIL }}</span>
          </a>

          <NuxtLink to="/support" class="footer-cta-btn">
            <svg class="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="relative z-10">Стать волонтёром</span>
          </NuxtLink>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/[0.06]">
      <div class="container-custom py-5">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-warm-600 text-xs">
            © {{ new Date().getFullYear() }} Фонд помощи шнауцерам. Все права защищены.
          </p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-warm-600 hover:text-warm-400 transition-colors text-xs">Политика конфиденциальности</a>
            <a href="#" class="text-warm-600 hover:text-warm-400 transition-colors text-xs">Публичная оферта</a>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

const quickLinks = [
  { label: 'Каталог питомцев',   to: '/animals' },
  { label: 'Счастливые истории', to: '/stories' },
  { label: 'Потеряшки',          to: '/lost-found' },
  { label: 'О фонде',            to: '/about' },
  { label: 'Форум',              to: config.FORUM_URL, external: true }
]

const resourceLinks = [
  { label: 'Помочь проекту',   to: '/support' },
  { label: 'Правила фонда',    to: '/about/rules' },
  { label: 'Как взять собаку', to: '/useful/adoption-guide' },
  { label: 'Отдать собаку',    to: '/useful/giving-away' },
  { label: 'Контакты',         to: '/contacts' }
]
</script>

<style scoped>
.footer-social-btn {
  @apply w-10 h-10 rounded-xl flex items-center justify-center text-warm-500
         border border-white/[0.08] hover:border-primary-500/40 hover:text-primary-400
         hover:bg-primary-500/10 transition-all duration-200;
}

.footer-cta-btn {
  @apply flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
         font-bold text-sm text-white transition-all duration-300 relative overflow-hidden;
  background: linear-gradient(135deg, #2b7fb8 0%, #3a9cdc 50%, #c85e30 100%);
}
.footer-cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1f5f8a 0%, #2b7fb8 50%, #a34a24 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.footer-cta-btn:hover::before {
  opacity: 1;
}


</style>
