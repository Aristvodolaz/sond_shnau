<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/96 backdrop-blur-lg shadow-sm border-b border-warm-100'
      : 'bg-white border-b border-warm-100'"
  >
    <nav class="container-custom">
      <div class="flex items-center justify-between h-20 gap-4">

        <!-- Logo -->
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 md:gap-3.5 group shrink-0" aria-label="Главная">
          <img 
            src="/images/logo/logo.png" 
            alt="Логотип" 
            class="w-14 h-14 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform duration-500" 
          />
          <div class="flex flex-col justify-center -space-y-0.5 md:-space-y-1 mt-0.5">
            <div class="font-sans font-extrabold text-lg md:text-xl text-primary-900 leading-none tracking-tight">Фонд помощи</div>
            <div class="font-sans font-semibold text-base md:text-lg text-primary-500 leading-none tracking-wide">шнауцерам</div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          <template v-for="item in menuPrimary" :key="item.label">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="relative px-4 py-2 text-sm font-medium text-warm-600 hover:text-warm-900 transition-all duration-250 rounded-full hover:bg-warm-100/60 border-2 border-transparent group"
              active-class="!text-primary-600 !border-primary-400 !bg-primary-50/30"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              v-else-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="relative px-4 py-2 text-sm font-medium text-warm-600 hover:text-warm-900 transition-all duration-250 rounded-full hover:bg-warm-100/60 border-2 border-transparent group"
            >
              {{ item.label }}
            </a>
          </template>

          <div v-if="menuMore.length" class="relative group/more">
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-warm-600 hover:text-warm-900 hover:bg-warm-100/60 transition-colors duration-200 rounded-lg flex items-center gap-1"
            >
              Инфо
              <svg class="w-3.5 h-3.5 opacity-50 group-hover/more:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-warm-100/80 py-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-200 z-[60]">
                <template v-for="item in menuMore" :key="item.label">
                  <NuxtLink
                    v-if="item.to"
                    :to="item.to"
                    class="block px-4 py-2.5 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary-600 transition-colors"
                  >
                    {{ item.label }}
                  </NuxtLink>
                  <a
                    v-else-if="item.href"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block px-4 py-2.5 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary-600 transition-colors"
                  >
                    {{ item.label }}
                  </a>
                </template>
            </div>
          </div>
        </div>

        <!-- Desktop right actions -->
        <div class="hidden lg:flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/favorites"
            class="relative p-2 text-warm-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all duration-200"
            aria-label="Избранное"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="favCount > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
            >{{ favCount }}</span>
          </NuxtLink>
          <NuxtLink
            to="/support"
            class="btn-primary px-6 py-2.5 text-sm shadow-lg shadow-primary-500/20"
          >
            Помочь фонду
          </NuxtLink>
        </div>

        <!-- Mobile: favorites + burger -->
        <div class="lg:hidden flex items-center gap-0.5">
          <NuxtLink to="/favorites"
            class="relative w-10 h-10 flex items-center justify-center text-warm-500 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-colors"
            aria-label="Избранное">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="favCount > 0" class="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">{{ favCount }}</span>
          </NuxtLink>
          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-warm-100 transition-colors"
            :aria-label="mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          >
            <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-warm-100 py-3 pb-6 px-4">
          <div class="flex flex-col gap-1">
            <template v-for="item in menuPrimary" :key="item.label">
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="px-4 py-3 rounded-2xl text-warm-800 hover:bg-warm-50 font-semibold transition-colors flex items-center justify-between group"
                active-class="bg-primary-50 text-primary-700"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </template>
            
            <div class="border-t border-warm-100 my-4" />
            
            <div class="grid grid-cols-2 gap-2 mb-6">
              <template v-for="item in menuMore" :key="'m-' + item.label">
                <NuxtLink
                  v-if="item.to"
                  :to="item.to"
                  class="px-4 py-2.5 rounded-xl bg-warm-50 text-warm-600 text-xs font-bold uppercase tracking-wider text-center"
                  @click="mobileMenuOpen = false"
                >
                  {{ item.label }}
                </NuxtLink>
              </template>
            </div>

            <NuxtLink to="/support" class="btn-primary w-full py-4 text-center text-base shadow-xl shadow-primary-500/20" @click="mobileMenuOpen = false">
              Помочь фонду
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { menuPrimary, menuMore } = useMenuItems()
const { ids } = useFavorites()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const favCount = computed(() => ids.value.length)

const route = useRoute()
watch(() => route.path, () => { mobileMenuOpen.value = false })

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 8 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
