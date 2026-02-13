<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-display font-bold text-warm-900">
        Управление "Шнауцеры дома"
      </h1>
      <UiButton @click="openAddModal" variant="primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Добавить запись
      </UiButton>
    </div>

    <!-- Search and Filters -->
    <UiCard class="mb-6">
      <div class="space-y-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Поиск
          </label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по имени, городу..."
              class="w-full pl-10 pr-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Порода
            </label>
            <select
              v-model="filterType"
              class="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Все породы</option>
              <option value="Ризеншнауцер">Ризеншнауцер</option>
              <option value="Миттельшнауцер">Миттельшнауцер</option>
              <option value="Цвергшнауцер">Цвергшнауцер</option>
              <option value="Метис">Метис</option>
            </select>
          </div>

          <!-- Year Filter -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Год
            </label>
            <select
              v-model="filterYear"
              class="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Все годы</option>
              <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>

          <!-- Forum Link Filter -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Ссылка на форум
            </label>
            <select
              v-model="filterForumLink"
              class="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Все</option>
              <option value="with">Со ссылкой</option>
              <option value="without">Без ссылки</option>
            </select>
          </div>
        </div>

        <!-- Results Count & Reset -->
        <div class="flex items-center justify-between pt-2 border-t border-warm-200">
          <p class="text-sm text-warm-600">
            Найдено записей: <span class="font-semibold text-warm-900">{{ filteredDogs.length }}</span> из {{ adoptedDogs?.length || 0 }}
          </p>
          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </UiCard>

    <!-- Adopted Dogs Table -->
    <UiCard :padding="false">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-warm-100 border-b border-warm-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Фото</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Имя</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Порода</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Год</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Город</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Ссылка</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-warm-200">
            <tr v-if="filteredDogs.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-warm-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Записи не найдены</p>
              </td>
            </tr>
            <tr v-for="dog in filteredDogs" :key="dog.id" class="hover:bg-warm-50 transition-colors">
              <td class="px-6 py-4">
                <img 
                  :src="dog.photo" 
                  :alt="dog.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td class="px-6 py-4 font-medium text-warm-900">{{ dog.name }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ dog.type }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ dog.year }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ dog.city }}</td>
              <td class="px-6 py-4">
                <a 
                  v-if="dog.forumUrl" 
                  :href="dog.forumUrl" 
                  target="_blank"
                  class="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Форум
                </a>
                <span v-else class="text-warm-400 text-sm">—</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="editDog(dog)"
                    class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteDog(dog)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Удалить"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UiCard>

    <!-- Add/Edit Modal -->
    <UiModal
      v-model="showModal"
      :title="editingDog ? 'Редактировать запись' : 'Добавить запись'"
      size="lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Имя собаки *
          </label>
          <UiInput
            v-model="form.name"
            type="text"
            placeholder="Введите имя"
            required
          />
        </div>

        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Порода *
          </label>
          <select
            v-model="form.type"
            class="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Выберите породу</option>
            <option value="Ризеншнауцер">Ризеншнауцер</option>
            <option value="Миттельшнауцер">Миттельшнауцер</option>
            <option value="Цвергшнауцер">Цвергшнауцер</option>
            <option value="Метис">Метис</option>
          </select>
        </div>

        <!-- Year & City -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Год пристройства *
            </label>
            <UiInput
              v-model.number="form.year"
              type="number"
              placeholder="2024"
              :min="2000"
              :max="new Date().getFullYear()"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Город *
            </label>
            <UiInput
              v-model="form.city"
              type="text"
              placeholder="Москва"
              required
            />
          </div>
        </div>

        <!-- Adoption Date -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Дата пристройства
          </label>
          <UiInput
            v-model="form.adoptionDate"
            type="date"
          />
        </div>

        <!-- Photo URL -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            URL фотографии *
          </label>
          <UiInput
            v-model="form.photo"
            type="url"
            placeholder="https://example.com/photo.jpg"
            required
          />
          <p class="mt-1 text-xs text-warm-500">
            Введите полный URL изображения (включая https://)
          </p>
        </div>

        <!-- Forum URL -->
        <div>
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Ссылка на форум (необязательно)
          </label>
          <UiInput
            v-model="form.forumUrl"
            type="url"
            placeholder="https://pet-help.ru/forum/topic/..."
          />
          <p class="mt-1 text-xs text-warm-500">
            Ссылка на тему форума (если есть)
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-warm-200">
          <UiButton
            type="button"
            variant="outline"
            @click="closeModal"
            :disabled="saving"
          >
            Отмена
          </UiButton>
          <UiButton
            type="submit"
            variant="primary"
            :loading="saving"
          >
            {{ editingDog ? 'Сохранить' : 'Добавить' }}
          </UiButton>
        </div>
      </form>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import type { AdoptedDog } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

useHead({
  title: 'Управление "Шнауцеры дома" - Админка'
})

const showModal = ref(false)
const editingDog = ref<AdoptedDog | null>(null)
const saving = ref(false)
const { adminFetch } = useAdminAuth()

// Fetch adopted dogs from API
const { data: adoptedDogs, refresh } = await useFetch<AdoptedDog[]>('/api/admin/adopted')

// Search and filter state
const searchQuery = ref('')
const filterType = ref('')
const filterYear = ref('')
const filterForumLink = ref('')

// Get available years for filter
const availableYears = computed(() => {
  if (!adoptedDogs.value) return []
  const years = [...new Set(adoptedDogs.value.map(d => d.year))]
  return years.sort((a, b) => b - a)
})

// Filtered dogs based on search and filters
const filteredDogs = computed(() => {
  if (!adoptedDogs.value) return []
  
  let result = adoptedDogs.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(dog => 
      dog.name.toLowerCase().includes(query) ||
      dog.city.toLowerCase().includes(query) ||
      dog.type.toLowerCase().includes(query)
    )
  }

  // Type filter
  if (filterType.value) {
    result = result.filter(dog => dog.type === filterType.value)
  }

  // Year filter
  if (filterYear.value) {
    result = result.filter(dog => dog.year === parseInt(filterYear.value))
  }

  // Forum link filter
  if (filterForumLink.value === 'with') {
    result = result.filter(dog => dog.forumUrl)
  } else if (filterForumLink.value === 'without') {
    result = result.filter(dog => !dog.forumUrl)
  }

  return result
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || filterType.value || filterYear.value || filterForumLink.value
})

// Reset all filters
const resetFilters = () => {
  searchQuery.value = ''
  filterType.value = ''
  filterYear.value = ''
  filterForumLink.value = ''
}

// Form state
const form = ref({
  name: '',
  type: '',
  year: new Date().getFullYear(),
  city: '',
  photo: '',
  adoptionDate: '',
  forumUrl: ''
})

// Open add modal
const openAddModal = () => {
  editingDog.value = null
  form.value = {
    name: '',
    type: '',
    year: new Date().getFullYear(),
    city: '',
    photo: '',
    adoptionDate: '',
    forumUrl: ''
  }
  showModal.value = true
}

// Edit dog
const editDog = (dog: AdoptedDog) => {
  editingDog.value = dog
  form.value = {
    name: dog.name,
    type: dog.type,
    year: dog.year,
    city: dog.city,
    photo: dog.photo,
    adoptionDate: dog.adoptionDate,
    forumUrl: dog.forumUrl || ''
  }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingDog.value = null
}

// Handle form submit
const handleSubmit = async () => {
  saving.value = true

  try {
    if (editingDog.value) {
      // Update existing dog
      await adminFetch(`/api/admin/adopted/${editingDog.value.id}`, {
        method: 'PUT',
        body: form.value
      })
      alert('Запись успешно обновлена')
    } else {
      // Create new dog
      await adminFetch('/api/admin/adopted', {
        method: 'POST',
        body: form.value
      })
      alert('Запись успешно добавлена')
    }

    await refresh()
    closeModal()
  } catch (error: any) {
    alert(error.message || 'Ошибка при сохранении')
  } finally {
    saving.value = false
  }
}

// Delete dog
const deleteDog = async (dog: AdoptedDog) => {
  if (!confirm(`Удалить запись "${dog.name}"?`)) return

  try {
    await adminFetch(`/api/admin/adopted/${dog.id}`, {
      method: 'DELETE'
    })
    alert('Запись успешно удалена')
    await refresh()
  } catch (error: any) {
    alert(error.message || 'Ошибка при удалении')
  }
}
</script>
