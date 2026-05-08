<template>
  <header
    class="sticky top-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'glass shadow-lg border-b border-white/20 py-2'
      : 'bg-white border-b border-warm-100 py-4'"
  >
    <nav class="container-custom">
      <div class="flex items-center justify-between gap-4">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0" aria-label="Главная">
          <div class="w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all duration-200 shrink-0">
            <img src="/images/logo/logo.png" alt="Логотип" class="w-full h-full object-cover" />
          </div>
          <div class="hidden md:block leading-tight">
            <div class="font-hobo text-base md:text-lg text-primary-800 leading-none tracking-wide">Фонд помощи</div>
            <div class="font-hobo text-sm md:text-base text-primary-400 tracking-wide">шнауцерам</div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <template v-for="item in menuPrimary" :key="item.label">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="relative px-5 py-2.5 text-sm font-bold text-warm-500 hover:text-warm-900 transition-all duration-300 rounded-2xl hover:bg-warm-50 group overflow-hidden"
              active-class="!text-primary-600 !bg-primary-50/50"
            >
              <span class="relative z-10">{{ item.label }}</span>
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-opacity" />
            </NuxtLink>
            <a
              v-else-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-2.5 text-sm font-bold text-warm-500 hover:text-warm-900 transition-all duration-300 rounded-2xl hover:bg-warm-50"
            >
              {{ item.label }}
            </a>
          </template>

          <div v-if="menuMore.length" class="relative group/more">
            <button
              type="button"
              class="px-5 py-2.5 text-sm font-bold text-warm-500 hover:text-warm-900 hover:bg-warm-50 transition-all duration-300 rounded-2xl flex items-center gap-1.5"
            >
              <span>Инфо</span>
              <svg class="w-4 h-4 opacity-40 group-hover/more:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 glass rounded-3xl shadow-2xl border-white/20 py-3 opacity-0 invisible translate-y-2 group-hover/more:opacity-100 group-hover/more:visible group-hover/more:translate-y-0 transition-all duration-300 z-[60] overflow-hidden">
                <template v-for="item in menuMore" :key="item.label">
                  <NuxtLink
                    v-if="item.to"
                    :to="item.to"
                    class="block px-6 py-3 text-sm font-bold text-warm-600 hover:bg-primary-50 hover:text-primary-600 transition-all"
                  >
                    {{ item.label }}
                  </NuxtLink>
                  <a
                    v-else-if="item.href"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block px-6 py-3 text-sm font-bold text-warm-600 hover:bg-primary-50 hover:text-primary-600 transition-all"
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
            class="relative w-11 h-11 flex items-center justify-center text-warm-400 hover:text-red-500 hover:bg-red-50 rounded-[1rem] transition-all duration-300"
            aria-label="Избранное"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="favCount > 0"
              class="absolute top-2 right-2 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md animate-scale-in"
            >{{ favCount }}</span>
          </NuxtLink>
          
          <NuxtLink
            to="/support"
            class="btn-primary px-7 py-3 rounded-[1.25rem] text-sm shadow-lg shadow-primary-500/20"
          >
            Помочь фонду
          </NuxtLink>
        </div>

        <!-- Mobile: burger -->
        <div class="lg:hidden flex items-center gap-2">
          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="w-12 h-12 flex items-center justify-center rounded-2xl bg-warm-50 hover:bg-warm-100 transition-all active:scale-90"
            :aria-label="mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          >
            <div class="w-5 h-4 relative flex flex-col justify-between overflow-hidden">
               <span class="w-full h-0.5 bg-warm-900 rounded-full transition-all duration-300" :class="mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''"></span>
               <span class="w-full h-0.5 bg-warm-900 rounded-full transition-all duration-300" :class="mobileMenuOpen ? 'translate-x-full opacity-0' : ''"></span>
               <span class="w-full h-0.5 bg-warm-900 rounded-full transition-all duration-300" :class="mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''"></span>
            </div>
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
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-warm-100 py-3 pb-4">
          <div class="flex flex-col gap-0.5">
            <template v-for="item in menuPrimary" :key="item.label">
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="px-4 py-2.5 rounded-xl text-warm-800 hover:bg-warm-50 font-medium transition-colors"
                active-class="bg-primary-50 text-primary-700 font-semibold"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
              <a
                v-else-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2.5 rounded-xl text-warm-800 hover:bg-warm-50 font-medium transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </a>
            </template>
            <div class="border-t border-warm-100 my-2 mx-1" />
            <template v-for="item in menuMore" :key="'m-' + item.label">
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="px-4 py-2 rounded-xl text-warm-600 hover:bg-warm-50 text-sm transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
              <a
                v-else-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl text-warm-600 hover:bg-warm-50 text-sm transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </a>
            </template>
            <div class="pt-3 px-1">
              <NuxtLink to="/animals" class="btn-primary w-full py-3.5 text-center text-sm shadow-md" @click="mobileMenuOpen = false">
                Найти друга
              </NuxtLink>
            </div>
            <div class="px-1 mt-2">
              <NuxtLink to="/support" class="btn-outline w-full py-3.5 text-center text-sm border-primary-200 text-primary-700" @click="mobileMenuOpen = false">
                Помочь фонду
              </NuxtLink>
            </div>
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
