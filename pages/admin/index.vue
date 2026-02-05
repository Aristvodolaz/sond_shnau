<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-display font-bold text-warm-900">
        Управление собаками
      </h1>
      <UiButton @click="showAddModal = true" variant="primary">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Управление собаками - Админка'
})

const showAddModal = ref(false)

// Fetch dogs
const { data: dogs, refresh } = await useFetch('/api/admin/dogs')

const getDogTypeName = (type: string) => {
  const types: Record<string, string> = {
    riesenschnauzer: 'Ризеншнауцер',
    mittelschnauzer: 'Миттельшнауцер',
    zwergschnauzer: 'Цвергшнауцер',
    metis: 'Метис'
  }
  return types[type] || type
}

const editDog = (dog: any) => {
  // TODO: Open edit modal
  console.log('Edit dog:', dog)
}

const deleteDog = async (dog: any) => {
  if (!confirm(`Удалить собаку "${dog.name}"?`)) return

  try {
    await $fetch(`/api/admin/dogs/${dog.id}`, { method: 'DELETE' })
    refresh()
  } catch (error) {
    alert('Ошибка удаления')
  }
}
</script>
