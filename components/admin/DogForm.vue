<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Basic Info -->
    <div class="grid grid-cols-2 gap-4">
      <UiInput
        v-model="form.name"
        label="Кличка"
        placeholder="Барон"
        required
        :error="errors.name"
      />
      
      <div class="w-full">
        <label class="block text-sm font-medium text-warm-700 mb-2">
          Тип <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.type"
          required
          class="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Выберите тип</option>
          <option value="riesenschnauzer">Ризеншнауцер</option>
          <option value="mittelschnauzer">Миттельшнауцер</option>
          <option value="zwergschnauzer">Цвергшнауцер</option>
          <option value="metis">Метис</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UiInput
        v-model="form.age"
        label="Возраст (текст)"
        placeholder="~5 лет"
        required
        :error="errors.age"
      />
      
      <UiInput
        v-model="form.city"
        label="Город"
        placeholder="Москва"
        required
        :error="errors.city"
      />
    </div>

    <UiInput
      v-model="form.ageMonthsStr"
      label="Возраст в месяцах (для фильтров, необязательно)"
      type="text"
      placeholder="Напр. 24"
    />

    <div class="w-full">
      <label class="block text-sm font-medium text-warm-700 mb-2">
        Статус <span class="text-red-500">*</span>
      </label>
      <select
        v-model="form.status"
        required
        class="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="looking">Ищет дом</option>
        <option value="foster">На передержке</option>
        <option value="pensioner">Пенсионер</option>
      </select>
    </div>

    <!-- Curator Info -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Куратор</h3>
      <div class="grid grid-cols-2 gap-4">
        <UiInput
          v-model="form.curatorName"
          label="Имя куратора"
          placeholder="Иван Иванов"
          required
          :error="errors.curatorName"
        />
        
        <UiInput
          v-model="form.curatorPhone"
          label="Телефон куратора"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          required
          :error="errors.curatorPhone"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <UiInput
          v-model="form.curatorWhatsapp"
          label="WhatsApp (номер или как в телефоне)"
          type="tel"
          placeholder="+79991234567"
        />
        <UiInput
          v-model="form.curatorTelegram"
          label="Telegram (ник без @)"
          placeholder="username"
        />
      </div>
      
      <UiInput
        v-model="form.curatorEmail"
        label="Email куратора (необязательно)"
        type="email"
        placeholder="curator@example.com"
        class="mt-4"
      />
    </div>

    <!-- Здоровье и характер -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Здоровье и характер</h3>
      
      <UiTextarea
        v-model="form.health"
        label="Здоровье"
        placeholder="Информация о здоровье..."
        required
        :rows="3"
        :error="errors.health"
        class="mt-4"
      />
      
      <UiTextarea
        v-model="form.character"
        label="Характер"
        placeholder="Описание характера..."
        required
        :rows="3"
        :error="errors.character"
        class="mt-4"
      />
    </div>

    <UiTextarea
      v-model="form.description"
      label="Краткое описание (для карточки в списке)"
      placeholder="2–3 предложения без телефона в тексте"
      :rows="3"
      class="mt-4"
    />

    <UiTextarea
      v-model="form.story"
      label="История (длинный блок на странице животного)"
      placeholder="Как попал(а), что пережил(а)..."
      :rows="4"
      class="mt-4"
    />

    <!-- Features -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Особенности</h3>
      <div class="space-y-2">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="form.features.sterilized"
            class="w-5 h-5 text-primary-500 border-warm-300 rounded focus:ring-primary-500"
          />
          <span class="text-warm-700">Стерилизован(а)</span>
        </label>
        <label class="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="form.features.vaccinated"
            class="w-5 h-5 text-primary-500 border-warm-300 rounded focus:ring-primary-500"
          />
          <span class="text-warm-700">Привит(а)</span>
        </label>
        <label class="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="form.features.treatedForParasites"
            class="w-5 h-5 text-primary-500 border-warm-300 rounded focus:ring-primary-500"
          />
          <span class="text-warm-700">Обработан(а) от паразитов</span>
        </label>
      </div>
    </div>

    <!-- Photos -->
    <div class="pt-4 border-t border-warm-200">
      <h3 class="text-lg font-semibold text-warm-900 mb-3">Фотографии</h3>
      <div class="space-y-2">
        <div v-for="(photo, index) in form.photos" :key="index" class="rounded-lg border border-warm-200 p-3">
          <div class="flex items-center space-x-2">
            <UiInput
              v-model="form.photos[index]"
              :placeholder="`URL фотографии ${index + 1}`"
              required
            />
            <button
              v-if="form.photos.length > 1"
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
          <div class="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              @change="onPhotoFileChange(index, $event)"
              class="block w-full text-sm text-warm-700 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100"
            />
            <span
              v-if="uploadingPhotoIndex === index"
              class="text-sm text-primary-600 whitespace-nowrap"
            >
              Загрузка...
            </span>
          </div>
          <p v-if="uploadErrorByIndex[index]" class="mt-1 text-sm text-red-600">
            {{ uploadErrorByIndex[index] }}
          </p>
          <img
            v-if="form.photos[index]"
            :src="resolveMediaUrl(form.photos[index])"
            :alt="`Предпросмотр ${index + 1}`"
            class="mt-3 h-40 w-full max-w-xs rounded-lg border border-warm-200 object-cover bg-warm-50"
          />
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

    <!-- Forum URL (optional — не используем в основном сценарии) -->
    <UiInput
      v-model="form.forumTopicUrl"
      label="Ссылка на тему форума (необязательно)"
      type="url"
      placeholder="https://..."
    />

    <!-- Date Added -->
    <UiInput
      v-model="form.dateAdded"
      label="Дата добавления"
      type="date"
      required
      :error="errors.dateAdded"
    />

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
  dog?: any
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()
const { adminFetch } = useAdminAuth()
const { resolveMediaUrl } = useMediaUrl()

/** Keep in sync with UPLOAD_MAX_FILE_SIZE_MB / server upload route */
const UPLOAD_MAX_BYTES = 25 * 1024 * 1024

// Check if we're editing or creating
const editMode = computed(() => !!props.dog)

// Form state
const form = reactive({
  name: '',
  type: '',
  age: '',
  city: '',
  status: 'looking',
  ageMonthsStr: '',
  curatorName: '',
  curatorPhone: '',
  curatorEmail: '',
  curatorWhatsapp: '',
  curatorTelegram: '',
  health: '',
  character: '',
  description: '',
  story: '',
  features: {
    sterilized: false,
    vaccinated: false,
    treatedForParasites: false
  },
  photos: [''],
  forumTopicUrl: '',
  dateAdded: ''
})

// Errors state
const errors = reactive({
  name: '',
  age: '',
  city: '',
  curatorName: '',
  curatorPhone: '',
  health: '',
  character: '',
  dateAdded: ''
})

// Function to initialize form with dog data
const initializeForm = (dog: any) => {
  if (dog) {
    // Editing mode: fill all fields from existing dog data
    form.name = dog.name || ''
    form.type = dog.type || ''
    form.age = dog.age || ''
    form.city = dog.city || ''
    form.status = dog.status || 'looking'
    form.ageMonthsStr = dog.age_months != null ? String(dog.age_months) : ''
    form.curatorName = dog.curator_name || dog.curatorName || ''
    form.curatorPhone = dog.curator_phone || dog.curatorPhone || ''
    form.curatorEmail = dog.curator_email || dog.curatorEmail || ''
    form.curatorWhatsapp = dog.curator_whatsapp || dog.curatorWhatsapp || ''
    form.curatorTelegram = dog.curator_telegram || dog.curatorTelegram || ''
    form.health = dog.health || ''
    form.character = dog.character || ''
    form.description = dog.description || ''
    form.story = dog.story || ''
    
    // Convert features from array to object
    if (Array.isArray(dog.features)) {
      form.features = {
        sterilized: dog.features.includes('sterilized'),
        vaccinated: dog.features.includes('vaccinated'),
        treatedForParasites: dog.features.includes('treatedForParasites')
      }
    } else if (typeof dog.features === 'object') {
      form.features = dog.features
    } else {
      form.features = { sterilized: false, vaccinated: false, treatedForParasites: false }
    }
    
    form.photos = dog.photos && dog.photos.length > 0 ? [...dog.photos] : ['']
    form.forumTopicUrl = dog.forum_topic_url || dog.forumTopicUrl || ''
    // Always use stored date; never fall back to today when editing
    form.dateAdded = dog.date_added
      ? String(dog.date_added).split('T')[0]
      : (dog.dateAdded ? String(dog.dateAdded).split('T')[0] : '')
  } else {
    // Creating mode: reset form and set today as default date
    form.name = ''
    form.type = ''
    form.age = ''
    form.city = ''
    form.status = 'looking'
    form.ageMonthsStr = ''
    form.curatorName = ''
    form.curatorPhone = ''
    form.curatorEmail = ''
    form.curatorWhatsapp = ''
    form.curatorTelegram = ''
    form.health = ''
    form.character = ''
    form.description = ''
    form.story = ''
    form.features = { sterilized: false, vaccinated: false, treatedForParasites: false }
    form.photos = ['']
    form.forumTopicUrl = ''
    form.dateAdded = new Date().toISOString().split('T')[0]
  }
}

// Initialize form with dog data if editing
watch(() => props.dog, initializeForm, { immediate: true })

// Also initialize on mount if dog is already present
onMounted(() => {
  if (props.dog) {
    initializeForm(props.dog)
  }
})

// Photo management
const addPhoto = () => {
  form.photos.push('')
}

const removePhoto = (index: number) => {
  form.photos.splice(index, 1)
}

const uploadingPhotoIndex = ref<number | null>(null)
const uploadErrorByIndex = reactive<Record<number, string>>({})

const onPhotoFileChange = async (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  uploadErrorByIndex[index] = ''

  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    uploadErrorByIndex[index] = 'Разрешены только JPG, PNG, WEBP'
    target.value = ''
    return
  }

  if (file.size > UPLOAD_MAX_BYTES) {
    uploadErrorByIndex[index] = 'Файл слишком большой (максимум 25MB)'
    target.value = ''
    return
  }

  try {
    uploadingPhotoIndex.value = index
    const formData = new FormData()
    formData.append('file', file)

    const response = await adminFetch<{ id: number; url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    form.photos[index] = response.url
  } catch (error: any) {
    uploadErrorByIndex[index] = error?.data?.message || 'Ошибка загрузки изображения'
  } finally {
    uploadingPhotoIndex.value = null
    target.value = ''
  }
}

// Form validation
const validate = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate required fields
  if (!form.name.trim()) {
    errors.name = 'Кличка обязательна'
    isValid = false
  }

  if (!form.age.trim()) {
    errors.age = 'Возраст обязателен'
    isValid = false
  }

  if (!form.city.trim()) {
    errors.city = 'Город обязателен'
    isValid = false
  }

  if (!form.curatorName.trim()) {
    errors.curatorName = 'Имя куратора обязательно'
    isValid = false
  }

  if (!form.curatorPhone.trim()) {
    errors.curatorPhone = 'Телефон куратора обязателен'
    isValid = false
  }

  if (!form.health.trim()) {
    errors.health = 'Информация о здоровье обязательна'
    isValid = false
  }

  if (!form.character.trim()) {
    errors.character = 'Описание характера обязательно'
    isValid = false
  }

  if (!form.dateAdded) {
    errors.dateAdded = 'Дата добавления обязательна'
    isValid = false
  }

  return isValid
}

// Submit handler
const handleSubmit = () => {
  if (!validate()) return

  // Prepare data for submission
  const data = {
    name: form.name.trim(),
    type: form.type,
    age: form.age.trim(),
    city: form.city.trim(),
    status: form.status,
    ageMonths: (() => {
      const t = form.ageMonthsStr.trim()
      if (!t) return null
      const n = Number.parseInt(t, 10)
      return Number.isNaN(n) ? null : n
    })(),
    curator: {
      name: form.curatorName.trim(),
      phone: form.curatorPhone.trim(),
      email: form.curatorEmail.trim() || null,
      whatsapp: form.curatorWhatsapp.trim() || null,
      telegram: form.curatorTelegram.trim() || null
    },
    description: form.description.trim(),
    story: form.story.trim(),
    health: form.health.trim(),
    character: form.character.trim(),
    features: form.features,
    photos: form.photos.filter(p => p.trim()),
    forumTopicUrl: form.forumTopicUrl.trim(),
    dateAdded: form.dateAdded
  }

  emit('submit', data)
}
</script>
