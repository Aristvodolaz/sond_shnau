<template>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        @change="onFileChange"
      />
      <button
        v-if="mediaId && url"
        type="button"
        class="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100"
        @click="removeImage"
      >
        Удалить
      </button>
    </div>

    <div v-if="progress > 0 && progress < 100" class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>

    <div v-if="url" class="flex items-center gap-3">
      <img
        :src="url"
        alt="Предпросмотр"
        class="w-32 h-32 object-cover rounded border"
      />
      <div class="text-xs text-gray-600 break-all">
        <p class="font-medium">Текущее изображение</p>
        <p>ID: {{ mediaId }}</p>
        <p>{{ url }}</p>
      </div>
    </div>

    <div class="text-xs text-gray-500">
      <p>Допустимые форматы: JPG, PNG, WEBP. Максимальный размер: 10MB.</p>
      <p v-if="allowUrlFallback" class="mt-1">
        Или укажите URL вручную:
      </p>
      <input
        v-if="allowUrlFallback"
        v-model="manualUrl"
        type="url"
        placeholder="https://example.com/image.jpg"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
        @change="emitManualUrl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number | null
  initialUrl?: string | null
  allowUrlFallback?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'update:url', value: string | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const mediaId = ref<number | null>(props.modelValue ?? null)
const url = ref<string | null>(props.initialUrl ?? null)
const manualUrl = ref<string>('')
const progress = ref(0)
const error = ref<string | null>(null)

watch(
  () => props.modelValue,
  (val) => {
    mediaId.value = val ?? null
  },
)

function resetState() {
  progress.value = 0
  error.value = null
}

async function onFileChange(event: Event) {
  resetState()
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    error.value = 'Файл слишком большой. Максимальный размер 10MB.'
    return
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    error.value = 'Недопустимый формат файла. Разрешены JPG, PNG, WEBP.'
    return
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    progress.value = 10
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        // let browser set Content-Type with boundary
      },
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      throw new Error(data?.message || 'Ошибка загрузки файла')
    }

    progress.value = 80
    const data = await response.json()

    mediaId.value = data.id
    url.value = data.url
    progress.value = 100

    emit('update:modelValue', mediaId.value)
    emit('update:url', url.value)
  } catch (e: any) {
    console.error(e)
    error.value = e.message || 'Не удалось загрузить изображение'
    progress.value = 0
  }
}

async function removeImage() {
  if (!mediaId.value) {
    url.value = null
    emit('update:url', null)
    return
  }

  resetState()

  try {
    const response = await fetch(`/api/admin/upload/${mediaId.value}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      throw new Error(data?.message || 'Ошибка удаления файла')
    }

    mediaId.value = null
    url.value = null
    emit('update:modelValue', null)
    emit('update:url', null)
  } catch (e: any) {
    console.error(e)
    error.value = e.message || 'Не удалось удалить изображение'
  }
}

function emitManualUrl() {
  if (!props.allowUrlFallback) return
  url.value = manualUrl.value || null
  emit('update:url', url.value)
}
</script>

