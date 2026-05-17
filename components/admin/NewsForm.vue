<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Title -->
    <UiInput
      v-model="form.title"
      label="Заголовок"
      placeholder="Заголовок новости..."
      required
      :error="errors.title"
    />

    <!-- Date -->
    <UiInput
      v-model="form.date"
      label="Дата публикации"
      type="date"
      required
      :error="errors.date"
    />

    <!-- Preview -->
    <UiTextarea
      v-model="form.preview"
      label="Краткое описание (для списка новостей)"
      placeholder="Краткое описание..."
      required
      :rows="3"
      :error="errors.preview"
    />

    <!-- Content -->
    <UiTextarea
      v-model="form.content"
      label="Полный текст новости"
      placeholder="Полный текст новости..."
      required
      :rows="10"
      :error="errors.content"
    />

    <!-- Image -->
    <div>
      <label class="block text-sm font-medium text-warm-700 mb-2">
        Изображение (необязательно)
      </label>
      <UiInput
        v-model="form.image"
        type="url"
        placeholder="https://example.com/image.jpg"
      />
      <div class="mt-2 flex items-center gap-3">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="block w-full text-sm text-warm-700 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100"
          @change="onImageFileChange"
        />
        <span v-if="uploadingImage" class="text-sm text-primary-600 whitespace-nowrap">
          Загрузка...
        </span>
      </div>
      <p v-if="imageUploadError" class="mt-1 text-sm text-red-600">
        {{ imageUploadError }}
      </p>
      <p class="mt-1 text-xs text-warm-500">
        Загрузите файл или вставьте URL изображения
      </p>
      <img
        v-if="form.image"
        :src="resolveMediaUrl(form.image)"
        alt="Предпросмотр"
        class="mt-3 h-40 w-full max-w-xs rounded-lg border border-warm-200 object-cover bg-warm-50"
      />
    </div>

    <!-- Published -->
    <div class="flex items-center space-x-3">
      <input
        type="checkbox"
        v-model="form.published"
        id="published"
        class="w-5 h-5 text-primary-500 border-warm-300 rounded focus:ring-primary-500"
      />
      <label for="published" class="text-sm font-medium text-warm-700 cursor-pointer">
        Опубликовать сразу
      </label>
    </div>

    <!-- Submit Buttons -->
    <div class="flex items-center justify-end space-x-3 pt-4">
      <UiButton
        type="button"
        variant="secondary"
        @click="$emit('cancel')"
        :disabled="loading"
      >
        Отмена
      </UiButton>
      <UiButton
        type="submit"
        variant="primary"
        :disabled="loading"
      >
        {{ loading ? 'Сохранение...' : (editMode ? 'Обновить' : 'Создать') }}
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  news?: any
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const { adminFetch } = useAdminAuth()
const { resolveMediaUrl } = useMediaUrl()

const UPLOAD_MAX_BYTES = 25 * 1024 * 1024
const uploadingImage = ref(false)
const imageUploadError = ref('')

const onImageFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  imageUploadError.value = ''
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    imageUploadError.value = 'Разрешены только JPG, PNG, WEBP'
    target.value = ''
    return
  }

  if (file.size > UPLOAD_MAX_BYTES) {
    imageUploadError.value = 'Файл слишком большой (максимум 25MB)'
    target.value = ''
    return
  }

  try {
    uploadingImage.value = true
    const formData = new FormData()
    formData.append('file', file)

    const response = await adminFetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    form.image = response.url
  } catch (error: any) {
    imageUploadError.value = error?.data?.message || 'Ошибка загрузки изображения'
  } finally {
    uploadingImage.value = false
    target.value = ''
  }
}

// Check if we're editing or creating
const editMode = computed(() => !!props.news)

// Form state
const form = reactive({
  title: '',
  date: new Date().toISOString().split('T')[0],
  preview: '',
  content: '',
  image: '',
  published: false
})

// Errors state
const errors = reactive({
  title: '',
  date: '',
  preview: '',
  content: ''
})

// Function to initialize form with news data
const initializeForm = (news: any) => {
  if (news) {
    form.title = news.title || ''
    form.date = news.date || new Date().toISOString().split('T')[0]
    form.preview = news.preview || ''
    form.content = news.content || ''
    form.image = news.image || ''
    form.published = news.published || false
  }
}

// Initialize form with news data if editing
watch(() => props.news, initializeForm, { immediate: true })

// Also initialize on mount if news is already present
onMounted(() => {
  if (props.news) {
    initializeForm(props.news)
  }
})

// Form validation
const validate = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate required fields
  if (!form.title.trim()) {
    errors.title = 'Заголовок обязателен'
    isValid = false
  }

  if (!form.date) {
    errors.date = 'Дата обязательна'
    isValid = false
  }

  if (!form.preview.trim()) {
    errors.preview = 'Краткое описание обязательно'
    isValid = false
  }

  if (!form.content.trim()) {
    errors.content = 'Полный текст обязателен'
    isValid = false
  }

  return isValid
}

// Submit handler
const handleSubmit = () => {
  if (!validate()) return

  // Prepare data for submission
  const data = {
    title: form.title.trim(),
    date: form.date,
    preview: form.preview.trim(),
    content: form.content.trim(),
    image: form.image.trim() || null,
    published: form.published
  }

  emit('submit', data)
}
</script>
