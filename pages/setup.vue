<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-warm-100 flex items-center justify-center p-4">
    <UiCard class="w-full max-w-2xl">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h1 class="text-3xl font-display font-bold text-warm-900 mb-2">
          Инициализация базы данных
        </h1>
        <p class="text-warm-600">
          Создание таблиц и миграция данных в PostgreSQL
        </p>
      </div>

      <!-- Connection Info -->
      <div class="bg-warm-100 rounded-lg p-6 mb-6">
        <h2 class="font-semibold text-warm-900 mb-3">Подключение к БД:</h2>
        <div class="space-y-2 text-sm font-mono">
          <div class="flex justify-between">
            <span class="text-warm-600">Host:</span>
            <span class="text-warm-900">155.212.216.148:5432</span>
          </div>
          <div class="flex justify-between">
            <span class="text-warm-600">Database:</span>
            <span class="text-warm-900">fond_shnau</span>
          </div>
          <div class="flex justify-between">
            <span class="text-warm-600">User:</span>
            <span class="text-warm-900">my_user</span>
          </div>
        </div>
      </div>

      <!-- Status Messages -->
      <div v-if="loading" class="mb-6">
        <UiLoader text="Инициализация базы данных..." />
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <h3 class="font-semibold text-red-900 mb-1">Ошибка инициализации</h3>
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <h3 class="font-semibold text-green-900 mb-2">✅ База данных инициализирована!</h3>
            <ul class="text-sm text-green-800 space-y-1">
              <li v-for="step in successSteps" :key="step">• {{ step }}</li>
            </ul>
            <div class="mt-4 p-3 bg-green-100 rounded border border-green-300">
              <p class="text-sm font-semibold text-green-900 mb-1">Учётные данные админа:</p>
              <p class="text-sm text-green-800">Логин: <code class="bg-white px-2 py-1 rounded">admin</code></p>
              <p class="text-sm text-green-800">Пароль: <code class="bg-white px-2 py-1 rounded">admin123</code></p>
              <p class="text-xs text-green-700 mt-2">⚠️ Обязательно смените пароль после первого входа!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <UiButton
          v-if="!success"
          @click="initializeDatabase"
          variant="primary"
          size="lg"
          :disabled="loading"
          full-width
        >
          {{ loading ? 'Инициализация...' : 'Инициализировать базу данных' }}
        </UiButton>

        <UiButton
          v-if="success"
          to="/admin/login"
          variant="primary"
          size="lg"
          full-width
        >
          Перейти в админку
        </UiButton>

        <UiButton
          to="/"
          variant="outline"
          size="lg"
          full-width
        >
          На главную
        </UiButton>
      </div>

      <!-- Warning -->
      <div class="mt-6 text-center text-sm text-warm-600">
        <p>⚠️ Запускайте инициализацию только один раз!</p>
        <p class="mt-1">При повторном запуске данные не задублируются.</p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Инициализация БД'
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const successSteps = ref<string[]>([])

const initializeDatabase = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const response = await $fetch<{
      success: boolean
      message: string
      steps: string[]
    }>('/api/init-db')

    if (response.success) {
      success.value = true
      successSteps.value = response.steps
    }
  } catch (e: any) {
    error.value = e.data?.message || e.message || 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}
</script>
