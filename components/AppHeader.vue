<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-200' : 'bg-white border-b border-warm-100'"
  >
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-18 gap-4">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0" aria-label="Главная">
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all duration-200 shrink-0">
            <img src="/images/logo/logo.png" alt="Логотип" class="w-full h-full object-cover" />
          </div>
          <div class="hidden sm:block leading-tight">
            <div class="font-hobo text-sm md:text-base text-primary-800 leading-none tracking-wide">Фонд помощи</div>
            <div class="font-hobo text-xs md:text-sm text-primary-500 tracking-wide">шнауцерам</div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <NuxtLink
            v-for="item in menuPrimary"
            :key="item.label"
            :to="item.to!"
            class="relative px-3 py-2 text-sm font-semibold text-warm-700 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-primary-50 group"
            active-class="!text-primary-600"
          >
            {{ item.label }}
            <span class="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 rounded-full scale-x-0 group-[.router-link-active]:scale-x-100 transition-transform duration-200" />
          </NuxtLink>

          <div v-if="menuMore.length" class="relative group/more">
            <button
              type="button"
              class="px-3 py-2 text-sm font-semibold text-warm-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 rounded-lg flex items-center gap-1"
            >
              Ещё
              <svg class="w-3.5 h-3.5 opacity-60 group-hover/more:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-warm-100 py-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-150 z-[60]">
              <NuxtLink
                v-for="item in menuMore"
                :key="item.label"
                :to="item.to!"
                class="block px-4 py-2.5 text-sm text-warm-700 hover:bg-warm-50 hover:text-primary-600 transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Desktop right actions -->
        <div class="hidden lg:flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/favorites"
            class="p-2 text-warm-600 hover:text-primary-500 transition-colors relative"
            aria-label="Избранное"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="favCount > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >{{ favCount }}</span>
          </NuxtLink>
          <NuxtLink
            to="/animals"
            class="btn-primary px-5 py-2.5 text-sm"
          >
            Найти питомца
          </NuxtLink>
        </div>

        <!-- Mobile: favorites + burger -->
        <div class="lg:hidden flex items-center gap-2">
          <NuxtLink to="/favorites" class="p-2 text-warm-600 hover:text-primary-500 transition-colors relative" aria-label="Избранное">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="favCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{{ favCount }}</span>
          </NuxtLink>
          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-xl hover:bg-warm-100 transition-colors"
            :aria-label="mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
            aria-expanded="mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-warm-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6 text-warm-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-warm-100 py-3 mb-1">
          <div class="flex flex-col gap-0.5">
            <NuxtLink
              v-for="item in menuPrimary"
              :key="item.label"
              :to="item.to!"
              class="px-4 py-3 rounded-xl text-warm-800 hover:bg-warm-50 font-semibold transition-colors"
              active-class="bg-primary-50 text-primary-700"
              @click="mobileMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
            <div class="border-t border-warm-100 my-1" />
            <NuxtLink
              v-for="item in menuMore"
              :key="'m-' + item.label"
              :to="item.to!"
              class="px-4 py-2.5 rounded-xl text-warm-700 hover:bg-warm-50 text-sm transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
            <div class="pt-2 px-1">
              <NuxtLink to="/animals" class="btn-primary w-full py-3 text-center text-sm" @click="mobileMenuOpen = false">
                Найти питомца
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
