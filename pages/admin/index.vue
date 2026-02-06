<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-display font-bold text-warm-900">
        Управление собаками
      </h1>
      <UiButton @click="openAddModal" variant="primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Добавить собаку
      </UiButton>
    </div>

    <!-- Dogs Table -->
    <UiCard :padding="false">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-warm-100 border-b border-warm-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Фото</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Кличка</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Тип</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Возраст</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Город</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Статус</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-warm-900">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-warm-200">
            <tr v-for="dog in dogs" :key="dog.id" class="hover:bg-warm-50 transition-colors">
              <td class="px-6 py-4">
                <img :src="dog.photos[0]" :alt="dog.name" class="w-16 h-16 object-cover rounded-lg" />
              </td>
              <td class="px-6 py-4 font-medium text-warm-900">{{ dog.name }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ getDogTypeName(dog.type) }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ dog.age }}</td>
              <td class="px-6 py-4 text-warm-600 text-sm">{{ dog.city }}</td>
              <td class="px-6 py-4">
                <UiTag :variant="dog.status === 'pensioner' ? 'info' : 'success'" size="sm">
                  {{ dog.status === 'pensioner' ? 'Пенсионер' : 'Ищет дом' }}
                </UiTag>
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
      :title="editingDog ? 'Редактировать собаку' : 'Добавить собаку'"
    >
      <AdminDogForm
        :dog="editingDog"
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
  title: 'Управление собаками - Админка'
})

const showModal = ref(false)
const editingDog = ref<any>(null)
const saving = ref(false)
const toast = useToast()
const { adminFetch } = useAdminAuth()

// Fetch dogs from API
const { data: dogs, refresh } = await useFetch('/api/admin/dogs')

// Helper function to get dog type name in Russian
const getDogTypeName = (type: string) => {
  const types: Record<string, string> = {
    riesenschnauzer: 'Ризеншнауцер',
    mittelschnauzer: 'Миттельшнауцер',
    zwergschnauzer: 'Цвергшнауцер',
    metis: 'Метис'
  }
  return types[type] || type
}

// Open add modal
const openAddModal = () => {
  editingDog.value = null
  showModal.value = true
}

// Open edit modal with dog data
const editDog = (dog: any) => {
  editingDog.value = { ...dog }
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingDog.value = null
}

// Generate slug from name
const generateSlug = (name: string) => {
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  }

  return name
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Handle form submission (create or update)
const handleSubmit = async (data: any) => {
  saving.value = true

  try {
    // Transform data to API format
    const apiData = {
      slug: editingDog.value?.slug || generateSlug(data.name),
      name: data.name,
      type: data.type,
      age: data.age,
      city: data.city,
      curator_name: data.curator.name,
      curator_phone: data.curator.phone,
      curator_email: data.curator.email || null,
      photos: data.photos,
      description: data.description,
      features: Object.entries(data.features)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      health: data.health,
      character: data.character,
      forum_topic_url: data.forumTopicUrl,
      status: data.status,
      date_added: data.dateAdded
    }

    if (editingDog.value) {
      // Update existing dog
      await adminFetch(`/api/admin/dogs/${editingDog.value.id}`, {
        method: 'PUT',
        body: apiData
      })
      toast.success('Собака успешно обновлена!')
    } else {
      // Create new dog
      await adminFetch('/api/admin/dogs', {
        method: 'POST',
        body: apiData
      })
      toast.success('Собака успешно добавлена!')
    }

    closeModal()
    refresh()
  } catch (error: any) {
    console.error('Error saving dog:', error)
    toast.error(error.data?.message || 'Ошибка сохранения собаки')
  } finally {
    saving.value = false
  }
}

// Delete dog
const deleteDog = async (dog: any) => {
  if (!confirm(`Удалить собаку "${dog.name}"?`)) return

  try {
    await adminFetch(`/api/admin/dogs/${dog.id}`, { method: 'DELETE' })
    toast.success('Собака успешно удалена')
    refresh()
  } catch (error: any) {
    console.error('Error deleting dog:', error)
    toast.error(error.data?.message || 'Ошибка удаления собаки')
  }
}
</script>
