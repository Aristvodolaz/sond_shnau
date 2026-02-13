<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Dog Name and Year -->
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <UiInput
          v-model="form.dogName"
          label="Имя собаки"
          placeholder="Барон"
          required
          :error="errors.dogName"
        />
      </div>
      <UiInput
        v-model.number="form.year"
        label="Год"
        type="number"
        placeholder="2024"
        required
        :error="errors.year"
      />
    </div>

    <!-- Part (optional) -->
    <UiInput
      v-model.number="form.part"
      label="Часть истории (необязательно)"
      type="number"
      placeholder="1, 2, 3..."
      hint="Оставьте пустым, если история не разделена на части"
    />

    <!-- Preview -->
    <UiTextarea
      v-model="form.preview"
      label="Краткое описание (для списка)"
      placeholder="Краткое описание истории..."
      required
      :rows="3"
      :error="errors.preview"
    />

    <!-- Content -->
    <UiTextarea
      v-model="form.content"
      label="Полный текст истории"
      placeholder="Полный текст истории..."
      required
      :rows="10"
      :error="errors.content"
    />

    <!-- Before/After Photos -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Фото "До и После"</h3>
      <div class="grid grid-cols-2 gap-4">
        <UiInput
          v-model="form.beforePhoto"
          label="Фото ДО"
          type="url"
          placeholder="https://..."
        />
        <UiInput
          v-model="form.afterPhoto"
          label="Фото ПОСЛЕ"
          type="url"
          placeholder="https://..."
        />
      </div>
    </div>

    <!-- Additional Photos -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Дополнительные фотографии (необязательно)</h3>
      <div class="space-y-2">
        <div v-if="form.photos.length === 0" class="text-sm text-warm-500 mb-2">
          Нет добавленных фотографий
        </div>
        <div v-for="(photo, index) in form.photos" :key="index" class="flex items-center space-x-2">
          <UiInput
            v-model="form.photos[index]"
            :placeholder="`URL фотографии ${index + 1}`"
          />
          <button
            type="button"
            @click="removePhoto(index)"
            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Удалить"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          @click="addPhoto"
          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          + Добавить фотографию
        </button>
      </div>
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
  story?: any
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

// Check if we're editing or creating
const editMode = computed(() => !!props.story)

// Form state
const form = reactive({
  dogName: '',
  year: new Date().getFullYear(),
  part: null as number | null,
  preview: '',
  content: '',
  beforePhoto: '',
  afterPhoto: '',
  photos: [] as string[]
})

// Errors state
const errors = reactive({
  dogName: '',
  year: '',
  preview: '',
  content: ''
})

// Initialize form with story data if editing
// Function to initialize form with story data
const initializeForm = (story: any) => {
  if (story) {
    form.dogName = story.dog_name || story.dogName || ''
    form.year = story.year || new Date().getFullYear()
    form.part = story.part || null
    form.preview = story.preview || ''
    form.content = story.content || ''
    form.beforePhoto = story.before_photo || story.beforePhoto || ''
    form.afterPhoto = story.after_photo || story.afterPhoto || ''
    form.photos = story.photos && story.photos.length > 0 ? [...story.photos] : []
  }
}

// Initialize form with story data if editing
watch(() => props.story, initializeForm, { immediate: true })

// Also initialize on mount if story is already present
onMounted(() => {
  if (props.story) {
    initializeForm(props.story)
  }
})

// Photo management
const addPhoto = () => {
  form.photos.push('')
}

const removePhoto = (index: number) => {
  form.photos.splice(index, 1)
}

// Form validation
const validate = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate required fields
  if (!form.dogName.trim()) {
    errors.dogName = 'Имя собаки обязательно'
    isValid = false
  }

  if (!form.year || form.year < 1900 || form.year > 2100) {
    errors.year = 'Введите корректный год'
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
    dogName: form.dogName.trim(),
    year: form.year,
    part: form.part,
    preview: form.preview.trim(),
    content: form.content.trim(),
    beforePhoto: form.beforePhoto.trim() || null,
    afterPhoto: form.afterPhoto.trim() || null,
    photos: form.photos.filter(p => p.trim())
  }

  emit('submit', data)
}
</script>
