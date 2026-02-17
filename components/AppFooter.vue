<template>
  <footer class="bg-warm-800 text-warm-100 mt-auto">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Mission -->
        <div>
          <h3 class="font-display font-bold text-xl mb-4 text-white">Наша миссия</h3>
          <p class="text-warm-300 leading-relaxed">
            Мы помогаем шнауцерам найти любящий дом, спасаем потерявшихся питомцев и поддерживаем ответственное владение собаками.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-display font-bold text-xl mb-4 text-white">Быстрые ссылки</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-warm-300 hover:text-primary-400 transition-colors">
                Главная
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-warm-300 hover:text-primary-400 transition-colors">
                О нас
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/useful/adopt" class="text-warm-300 hover:text-primary-400 transition-colors">
                Взять шнауцера
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacts" class="text-warm-300 hover:text-primary-400 transition-colors">
                Контакты
              </NuxtLink>
            </li>
            <li>
              <a
                :href="config.FORUM_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="text-warm-300 hover:text-primary-400 transition-colors inline-flex items-center space-x-1"
              >
                <span>Форум</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Social & Contact -->
        <div>
          <h3 class="font-display font-bold text-xl mb-4 text-white">Мы в соцсетях</h3>
          <div class="flex space-x-4 mb-6">
            <a
              :href="config.VK_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-warm-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              aria-label="ВКонтакте"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.55 14.66h-1.45c-.57 0-.74-.46-1.76-1.48-.89-.87-1.28-1-1.5-1-.31 0-.4.09-.4.53v1.35c0 .36-.12.58-1.05.58-1.53 0-3.23-.93-4.43-2.65C6.45 11.71 6 10.26 6 9.88c0-.22.09-.42.53-.42h1.45c.4 0 .55.18.7.6.77 2.14 2.07 4 2.6 4 .2 0 .29-.09.29-.6V11.1c-.06-.98-.58-1.06-.58-1.4 0-.18.15-.36.4-.36h2.28c.33 0 .46.18.46.57v3.07c0 .33.15.46.24.46.2 0 .36-.13.73-.5 1.13-1.28 1.94-3.25 1.94-3.25.11-.22.29-.42.7-.42h1.45c.43 0 .53.22.43.57-.15.8-1.86 3.37-1.86 3.37-.16.26-.22.38 0 .67.16.22.7.68 1.06 1.1.65.7 1.14 1.29 1.27 1.7.14.4-.07.6-.48.6z"/>
              </svg>
            </a>
            <a
              :href="config.TG_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-warm-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              aria-label="Telegram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
              </svg>
            </a>
          </div>
          <div class="space-y-2 text-warm-300 text-sm">
            <p>{{ config.EMAIL }}</p>
            <p>{{ config.PHONES[0].number }}</p>
          </div>
        </div>
      </div>

      <div class="border-t border-warm-700 mt-8 pt-8 text-center text-warm-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Фонд помощи шнауцерам. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { config } from '~/utils/config'
</script>
