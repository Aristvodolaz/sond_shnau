<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <nav class="container-custom py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
<div
  class="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105"
>
  <img
    src="/images/logo/logo.png"
    alt="Логотип"
    class="w-full h-full object-cover"
  />
</div>
          <div class="hidden sm:block">
            <div class="font-display font-bold text-lg text-warm-900">Фонд помощи</div>
            <div class="text-sm text-warm-600">шнауцерам</div>
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-1">
          <template v-for="item in menuItems" :key="item.label">
            <!-- Menu item without children -->
            <NuxtLink
              v-if="!item.children"
              :to="item.to!"
              class="px-4 py-2 rounded-lg text-warm-700 hover:text-primary-500 hover:bg-warm-100 transition-colors font-medium"
              active-class="text-primary-500 bg-warm-100"
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Menu item with dropdown -->
            <div v-else class="relative group/dropdown">
              <button
                class="px-4 py-2 rounded-lg text-warm-700 hover:text-primary-500 hover:bg-warm-100 transition-colors font-medium flex items-center space-x-1"
              >
                <span>{{ item.label }}</span>
                <svg class="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div class="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50">
                <div class="bg-white rounded-lg shadow-lg py-2 border border-warm-200">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.label"
                    :to="child.to!"
                    class="block px-4 py-2 text-warm-700 hover:bg-warm-100 hover:text-primary-500 transition-colors"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 rounded-lg hover:bg-warm-100 transition-colors"
          aria-label="Открыть меню"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-1">
            <template v-for="item in menuItems" :key="item.label">
              <!-- Menu item without children -->
              <NuxtLink
                v-if="!item.children"
                :to="item.to!"
                class="px-4 py-3 rounded-lg text-warm-700 hover:text-primary-500 hover:bg-warm-100 transition-colors font-medium"
                active-class="text-primary-500 bg-warm-100"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </NuxtLink>

              <!-- Menu item with children -->
              <div v-else>
                <button
                  @click="toggleSubmenu(item.label)"
                  class="w-full px-4 py-3 rounded-lg text-warm-700 hover:text-primary-500 hover:bg-warm-100 transition-colors font-medium flex items-center justify-between"
                >
                  <span>{{ item.label }}</span>
                  <svg
                    class="w-4 h-4 transition-transform"
                    :class="{ 'rotate-180': openSubmenu === item.label }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-200"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition-all duration-200"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div v-if="openSubmenu === item.label" class="ml-4 mt-1 space-y-1 overflow-hidden">
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.label"
                      :to="child.to!"
                      class="block px-4 py-2 rounded-lg text-warm-600 hover:text-primary-500 hover:bg-warm-100 transition-colors"
                      @click="mobileMenuOpen = false"
                    >
                      {{ child.label }}
                    </NuxtLink>
                  </div>
                </Transition>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { menuItems } = useMenuItems()
const mobileMenuOpen = ref(false)
const openSubmenu = ref<string | null>(null)

const toggleSubmenu = (label: string) => {
  openSubmenu.value = openSubmenu.value === label ? null : label
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  openSubmenu.value = null
})
</script>
