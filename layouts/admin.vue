<template>
  <div class="min-h-screen bg-warm-50">
    <!-- Admin Header -->
    <header class="bg-white border-b border-warm-200 sticky top-0 z-50">
      <div class="container-custom py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-display font-bold text-warm-900">
              📊 Панель управления
            </h1>
            <nav class="hidden md:flex space-x-1">
              <NuxtLink
                to="/admin"
                class="px-4 py-2 rounded-lg text-warm-700 hover:bg-warm-100 transition-colors"
                active-class="bg-primary-100 text-primary-700"
              >
                Собаки
              </NuxtLink>
              <NuxtLink
                to="/admin/news"
                class="px-4 py-2 rounded-lg text-warm-700 hover:bg-warm-100 transition-colors"
                active-class="bg-primary-100 text-primary-700"
              >
                Новости
              </NuxtLink>
              <NuxtLink
                to="/admin/stories"
                class="px-4 py-2 rounded-lg text-warm-700 hover:bg-warm-100 transition-colors"
                active-class="bg-primary-100 text-primary-700"
              >
                Истории
              </NuxtLink>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/"
              target="_blank"
              class="text-sm text-warm-600 hover:text-primary-500 transition-colors flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              На сайт
            </NuxtLink>
            <button
              @click="logout"
              class="text-sm text-warm-600 hover:text-red-600 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="container-custom py-8">
      <slot />
    </main>

    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const logout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  router.push('/admin/login')
}
</script>
