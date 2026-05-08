<template>
  <footer class="bg-warm-900 text-warm-200">
    <!-- Top accent gradient -->
    <div class="h-1.5 bg-gradient-to-r from-primary-600 via-terra-500 to-primary-400" />

    <div class="container-custom py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">

        <!-- Brand & Vision -->
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-500/40">
              <img src="/images/logo/logo.png" alt="Логотип" class="w-full h-full object-cover" />
            </div>
            <div>
              <div class="font-hobo text-base text-white leading-none tracking-wide">Фонд помощи</div>
              <div class="font-hobo text-sm text-primary-300 tracking-wide">шнауцерам</div>
            </div>
          </div>
          <p class="text-warm-400 leading-relaxed text-lg max-w-md">
            Мы верим, что каждый шнауцер заслуживает любящую семью и безопасный дом. Присоединяйтесь к нам в нашей миссии по спасению и заботе.
          </p>
          <div class="flex items-center gap-4 mt-10">
            <a
              v-for="social in [ { id: 'vk', icon: 'M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z' }, { id: 'tg', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z' } ]"
              :key="social.id"
              href="#"
              class="w-12 h-12 glass-dark rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path :d="social.icon"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="lg:col-span-3">
          <h3 class="font-display font-black text-white text-lg mb-8 tracking-tight">Разделы</h3>
          <ul class="space-y-4">
            <li v-for="link in quickLinks" :key="link.label">
              <NuxtLink :to="link.to" class="text-warm-400 hover:text-primary-400 transition-all text-base font-bold flex items-center group">
                <span class="w-2 h-2 rounded-full bg-primary-500/0 group-hover:bg-primary-500 mr-0 group-hover:mr-3 transition-all duration-300" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div class="lg:col-span-4">
          <h3 class="font-display font-black text-white text-lg mb-8 tracking-tight">Контакты</h3>
          <div class="space-y-5">
            <a :href="`tel:${config.PHONES[0].number.replace(/\s/g, '')}`" class="flex flex-col gap-1 group">
               <span class="text-[10px] font-black text-warm-500 uppercase tracking-widest">Телефон горячей линии</span>
               <span class="text-xl font-display font-bold text-warm-200 group-hover:text-primary-400 transition-colors">{{ config.PHONES[0].number }}</span>
            </a>
            <a :href="`mailto:${config.EMAIL}`" class="flex flex-col gap-1 group">
               <span class="text-[10px] font-black text-warm-500 uppercase tracking-widest">Электронная почта</span>
               <span class="text-xl font-display font-bold text-warm-200 group-hover:text-primary-400 transition-colors">{{ config.EMAIL }}</span>
            </a>
          </div>
          <NuxtLink to="/support" class="mt-10 btn-primary w-full py-5 text-lg rounded-2xl shadow-2xl shadow-primary-500/20">
            Стать волонтером
          </NuxtLink>
        </div>
      </div>

      <div class="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-warm-500 text-sm font-bold">
        <p>&copy; {{ new Date().getFullYear() }} Фонд помощи шнауцерам. Все права защищены.</p>
        <div class="flex gap-8">
           <a href="#" class="hover:text-primary-400 transition-colors">Политика конфиденциальности</a>
           <a href="#" class="hover:text-primary-400 transition-colors">Публичная оферта</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'

const quickLinks = [
  { label: 'Каталог питомцев', to: '/animals' },
  { label: 'Помочь проекту', to: '/support' },
  { label: 'Счастливые истории', to: '/stories' },
  { label: 'Потеряшки', to: '/lost-found' },
  { label: 'О нас', to: '/about' },
  { label: 'Форум', to: config.FORUM_URL, external: true }
]
</script>
