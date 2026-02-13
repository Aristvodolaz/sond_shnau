<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-display font-bold text-warm-900">
        Управление историями
      </h1>
      <UiButton @click="openAddModal" variant="primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Добавить историю
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
              placeholder="Поиск по имени собаки, превью..."
              class="w-full pl-10 pr-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <!-- Photo Filter -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Фото "До/После"
            </label>
            <select
              v-model="filterPhoto"
              class="w-full px-4 py-2 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Все</option>
              <option value="with">С фото</option>
              <option value="without">Без фото</option>
            </select>
          </div>
        </div>

        <!-- Results Count & Reset -->
        <div class="flex items-center justify-between pt-2 border-t border-warm-200">
          <p class="text-sm text-warm-600">
            Найдено историй: <span class="font-semibold text-warm-900">{{ filteredStories.length }}</span> из {{ stories?.length || 0 }}
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

    <!-- Stories Table -->
    <UiCard :padding="false">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-warm-100 border-b border-warm-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Имя собаки</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Год</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Часть</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Фото</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-warm-200">
            <tr v-if="filteredStories.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-warm-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Истории не найдены</p>
              </td>
            </tr>
            <tr v-for="story in filteredStories" :key="story.id" class="hover:bg-warm-50 transition-colors">
              <td class="px-6 py-4 font-medium text-warm-900">{{ story.dogName }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ story.year }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ story.part || '—' }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <img
                    v-if="story.beforePhoto"
                    :src="story.beforePhoto"
                    alt="До"
                    class="w-12 h-12 object-cover rounded"
                  />
                  <svg v-if="story.beforePhoto && story.afterPhoto" class="w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <img
                    v-if="story.afterPhoto"
                    :src="story.afterPhoto"
                    alt="После"
                    class="w-12 h-12 object-cover rounded"
                  />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="editStory(story)"
                    class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteStory(story)"
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
      :title="editingStory ? 'Редактировать историю' : 'Добавить историю'"
    >
      <AdminStoryForm
        :story="editingStory"
        :loading="saving"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </UiModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

useHead({
  title: 'Управление историями - Админка'
})

const showModal = ref(false)
const editingStory = ref<any>(null)
const saving = ref(false)
const toast = useToast()
const { adminFetch } = useAdminAuth()

// Fetch stories from API
const { data: stories, refresh } = await useFetch('/api/admin/stories')

// Search and filter state
const searchQuery = ref('')
const filterYear = ref('')
const filterPhoto = ref('')

// Get available years for filter
const availableYears = computed(() => {
  if (!stories.value) return []
  const years = [...new Set(stories.value.map((s: any) => s.year))]
  return years.sort((a, b) => b - a)
})

// Filtered stories based on search and filters
const filteredStories = computed(() => {
  if (!stories.value) return []
  
  let result = stories.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((story: any) => 
      story.dogName.toLowerCase().includes(query) ||
      story.preview.toLowerCase().includes(query)
    )
  }

  // Year filter
  if (filterYear.value) {
    result = result.filter((story: any) => story.year === parseInt(filterYear.value))
  }

  // Photo filter
  if (filterPhoto.value === 'with') {
    result = result.filter((story: any) => story.beforePhoto && story.afterPhoto)
  } else if (filterPhoto.value === 'without') {
    result = result.filter((story: any) => !story.beforePhoto || !story.afterPhoto)
  }

  return result
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || filterYear.value || filterPhoto.value
})

// Reset all filters
const resetFilters = () => {
  searchQuery.value = ''
  filterYear.value = ''
  filterPhoto.value = ''
}

// Generate slug from dog name and year
const generateSlug = (dogName: string, year: number, part?: number) => {
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  }

  const slug = dogName
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return part ? `${slug}-${year}-${part}` : `${slug}-${year}`
}

// Open add modal
const openAddModal = () => {
  editingStory.value = null
  showModal.value = true
}

// Open edit modal with story data
const editStory = (story: any) => {
  editingStory.value = { ...story }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingStory.value = null
}

// Handle form submission (create or update)
const handleSubmit = async (data: any) => {
  saving.value = true

  try {
    // Transform data to API format
    const apiData = {
      slug: editingStory.value?.slug || generateSlug(data.dogName, data.year, data.part),
      dog_name: data.dogName,
      year: data.year,
      part: data.part || null,
      preview: data.preview,
      content: data.content,
      photos: data.photos,
      before_photo: data.beforePhoto || null,
      after_photo: data.afterPhoto || null
    }

    if (editingStory.value) {
      // Update existing story
      await adminFetch(`/api/admin/stories/${editingStory.value.id}`, {
        method: 'PUT',
        body: apiData
      })
      toast.success('История успешно обновлена!')
    } else {
      // Create new story
      await adminFetch('/api/admin/stories', {
        method: 'POST',
        body: apiData
      })
      toast.success('История успешно добавлена!')
    }

    closeModal()
    refresh()
  } catch (error: any) {
    console.error('Error saving story:', error)
    toast.error(error.data?.message || 'Ошибка сохранения истории')
  } finally {
    saving.value = false
  }
}

// Delete story
const deleteStory = async (story: any) => {
  if (!confirm(`Удалить историю "${story.dogName}"?`)) return

  try {
    await adminFetch(`/api/admin/stories/${story.id}`, { method: 'DELETE' })
    toast.success('История успешно удалена')
    refresh()
  } catch (error: any) {
    console.error('Error deleting story:', error)
    toast.error(error.data?.message || 'Ошибка удаления истории')
  }
}
</script>
