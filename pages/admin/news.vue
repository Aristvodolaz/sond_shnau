<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-display font-bold text-warm-900">
        Управление новостями
      </h1>
      <UiButton @click="openAddModal" variant="primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Добавить новость
      </UiButton>
    </div>

    <!-- News Table -->
    <UiCard :padding="false">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-warm-100 border-b border-warm-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Заголовок</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Дата</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Статус</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-warm-200">
            <tr v-for="item in news" :key="item.id" class="hover:bg-warm-50 transition-colors">
              <td class="px-6 py-4 font-medium text-warm-900">{{ item.title }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ formatDate(item.date) }}</td>
              <td class="px-6 py-4">
                <UiTag :variant="item.published ? 'success' : 'default'" size="sm">
                  {{ item.published ? 'Опубликовано' : 'Черновик' }}
                </UiTag>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="editNews(item)"
                    class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteNews(item)"
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
      :title="editingNews ? 'Редактировать новость' : 'Добавить новость'"
    >
      <AdminNewsForm
        :news="editingNews"
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
  title: 'Управление новостями - Админка'
})

const showModal = ref(false)
const editingNews = ref<any>(null)
const saving = ref(false)
const toast = useToast()
const { adminFetch } = useAdminAuth()

// Fetch news from API
const { data: news, refresh } = await useFetch('/api/admin/news')

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Generate slug from title
const generateSlug = (title: string) => {
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  }

  return title
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Open add modal
const openAddModal = () => {
  editingNews.value = null
  showModal.value = true
}

// Open edit modal with news data
const editNews = (item: any) => {
  editingNews.value = { ...item }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingNews.value = null
}

// Handle form submission (create or update)
const handleSubmit = async (data: any) => {
  saving.value = true

  try {
    // Transform data to API format
    const apiData = {
      slug: editingNews.value?.slug || generateSlug(data.title),
      title: data.title,
      date: data.date,
      preview: data.preview,
      content: data.content,
      image: data.image || null,
      published: data.published
    }

    if (editingNews.value) {
      // Update existing news
      await adminFetch(`/api/admin/news/${editingNews.value.id}`, {
        method: 'PUT',
        body: apiData
      })
      toast.success('Новость успешно обновлена!')
    } else {
      // Create new news
      await adminFetch('/api/admin/news', {
        method: 'POST',
        body: apiData
      })
      toast.success('Новость успешно добавлена!')
    }

    closeModal()
    refresh()
  } catch (error: any) {
    console.error('Error saving news:', error)
    toast.error(error.data?.message || 'Ошибка сохранения новости')
  } finally {
    saving.value = false
  }
}

// Delete news
const deleteNews = async (item: any) => {
  if (!confirm(`Удалить новость "${item.title}"?`)) return

  try {
    await adminFetch(`/api/admin/news/${item.id}`, { method: 'DELETE' })
    toast.success('Новость успешно удалена')
    refresh()
  } catch (error: any) {
    console.error('Error deleting news:', error)
    toast.error(error.data?.message || 'Ошибка удаления новости')
  }
}
</script>
