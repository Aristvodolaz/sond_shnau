
<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 class="text-3xl font-display font-bold text-warm-900 mb-2">
          Сброс администратора
        </h1>
        <p class="text-warm-600">
          Удалит всех пользователей и создаст нового админа из .env
        </p>
      </div>

      <div v-if="loading" class="mb-6">
        <UiLoader text="Сброс пользователя..." />
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="flex-1">
            <h3 class="font-semibold text-red-900 mb-1">Ошибка</h3>
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
            <h3 class="font-semibold text-green-900 mb-2">✅ Администратор сброшен!</h3>
            <p class="text-sm text-green-800 mb-2">Новый пользователь создан из переменных окружения</p>
            <div class="mt-3 p-3 bg-green-100 rounded border border-green-300">
              <p class="text-sm font-semibold text-green-900">Username: {{ username }}</p>
              <p class="text-xs text-green-700 mt-1">Пароль из .env (ADMIN_PASSWORD)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <UiButton
          v-if="!success"
          @click="resetAdmin"
          variant="primary"
          size="lg"
          :disabled="loading"
          full-width
        >
          {{ loading ? 'Сброс...' : '⚠️ Сбросить администратора' }}
        </UiButton>

        <UiButton
          v-if="success"
          @click="goToLogin"
          variant="primary"
          size="lg"
          full-width
        >
          Перейти к входу
        </UiButton>

        <UiButton
          @click="goHome"
          variant="secondary"
          size="lg"
          full-width
        >
          На главную
        </UiButton>
      </div>

      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-xs text-yellow-800">
          <strong>⚠️ Внимание:</strong> Это действие удалит всех существующих пользователей и создаст нового администратора с учетными данными из файла .env (ADMIN_USERNAME и ADMIN_PASSWORD).
        </p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Сброс администратора'
})

const router = useRouter()
const loading = ref(false)
const error = ref('')
const success = ref(false)
const username = ref('')

const resetAdmin = async () => {
  if (!confirm('Вы уверены? Это удалит всех пользователей!')) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await $fetch('/api/admin/reset-password', {
      method: 'POST'
    })

    success.value = true
    username.value = result.username
  } catch (e: any) {
    error.value = e.data?.message || 'Ошибка сброса администратора'
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/admin/login')
}

const goHome = () => {
  router.push('/')
}
</script>
