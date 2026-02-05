<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-warm-100 flex items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-3xl font-display font-bold text-warm-900 mb-2">
          Вход в админку
        </h1>
        <p class="text-warm-600">
          Введите логин и пароль для доступа
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-warm-700 mb-2">
            Логин
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="admin"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-warm-700 mb-2">
            Пароль
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          {{ error }}
        </div>

        <UiButton
          type="submit"
          variant="primary"
          size="lg"
          :disabled="loading"
          full-width
        >
          {{ loading ? 'Вход...' : 'Войти' }}
        </UiButton>
      </form>

      <div class="mt-6 text-center text-sm text-warm-600">
        <p>По умолчанию: <code class="bg-warm-200 px-2 py-1 rounded">admin / admin123</code></p>
        <p class="mt-1 text-xs">Обязательно смените пароль после первого входа!</p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Вход в админку'
})

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    router.push('/admin')
  } catch (e: any) {
    error.value = e.data?.message || 'Ошибка входа. Проверьте логин и пароль.'
  } finally {
    loading.value = false
  }
}
</script>
