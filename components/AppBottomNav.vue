<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-warm-100 px-4 pb-safe pt-2 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
    <div class="flex items-center justify-around max-w-lg mx-auto">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 py-1 px-3 min-w-[64px] transition-all duration-300 relative group"
        active-class="text-primary-600"
      >
        <div class="relative">
          <component 
            :is="item.icon" 
            class="w-6 h-6 transition-transform group-active:scale-90" 
            :class="[isRouteActive(item.to) ? 'text-primary-600' : 'text-warm-400']"
          />
          <!-- Badge for Favorites -->
          <span 
            v-if="item.id === 'favorites' && favoriteCount > 0" 
            class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
          >
            {{ favoriteCount }}
          </span>
        </div>
        <span class="text-[10px] font-bold uppercase tracking-wider" :class="[isRouteActive(item.to) ? 'text-primary-600' : 'text-warm-400']">
          {{ item.label }}
        </span>
        
        <!-- Active Indicator -->
        <div 
          v-if="isRouteActive(item.to)" 
          class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
        />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { ids: favorites } = useFavorites()
const favoriteCount = computed(() => favorites.value.length)

const isRouteActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const navItems = [
  {
    id: 'home',
    label: 'Главная',
    to: '/',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ])
    })
  },
  {
    id: 'catalog',
    label: 'Поиск',
    to: '/animals',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
      ])
    })
  },
  {
    id: 'favorites',
    label: 'Любимцы',
    to: '/favorites',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    })
  },
  {
    id: 'help',
    label: 'Помощь',
    to: '/useful/adopt',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
      ])
    })
  }
]
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
