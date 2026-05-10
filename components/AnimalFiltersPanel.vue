<template>
  <div class="space-y-6">
    <!-- Header (sidebar only) -->
    <div v-if="variant === 'sidebar'">
      <h2 class="font-display font-semibold text-warm-900 text-lg tracking-tight">Подбор анкет</h2>
      <p class="text-xs text-warm-500 mt-1">Найдите подходящего питомца</p>
    </div>

    <!-- Search -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Поиск</label>
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          :value="model.q"
          type="search"
          placeholder="Имя, описание…"
          :class="inputClass + ' pl-9'"
          @input="emitPatch({ q: ($event.target as HTMLInputElement).value })"
        />
      </div>
    </div>

    <!-- City -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Город</label>
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <input
          :value="model.city"
          type="text"
          placeholder="Например, Москва"
          :class="inputClass + ' pl-9'"
          @input="emitPatch({ city: ($event.target as HTMLInputElement).value })"
        />
      </div>
    </div>

    <!-- Status pills -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Статус</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in statusOptions"
          :key="opt.value"
          type="button"
          :class="['pill-filter', model.status === opt.value ? 'pill-filter-active' : 'pill-filter-inactive']"
          @click="emitPatch({ status: opt.value })"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Age pills -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Возраст</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in ageOptions"
          :key="opt.value"
          type="button"
          :class="['pill-filter', model.age === opt.value ? 'pill-filter-active' : 'pill-filter-inactive']"
          @click="emitPatch({ age: opt.value })"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Breed select -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Порода</label>
      <select
        :value="model.type"
        :class="selectClass"
        @change="emitPatch({ type: ($event.target as HTMLSelectElement).value })"
      >
        <option value="all">Любая порода</option>
        <option value="riesenschnauzer">Ризеншнауцер</option>
        <option value="mittelschnauzer">Миттельшнауцер</option>
        <option value="zwergschnauzer">Цвергшнауцер</option>
        <option value="metis">Метис</option>
      </select>
    </div>

    <!-- Sort -->
    <div>
      <label class="block text-xs font-semibold text-warm-600 uppercase tracking-wide mb-2">Сортировка</label>
      <select
        :value="model.sort"
        :class="selectClass"
        @change="emitPatch({ sort: ($event.target as HTMLSelectElement).value as 'date_desc' | 'date_asc' })"
      >
        <option value="date_desc">Сначала новые</option>
        <option value="date_asc">Сначала старые</option>
      </select>
    </div>

    <!-- Reset -->
    <button
      type="button"
      class="w-full btn-ghost text-sm py-2.5 px-4 text-warm-500 hover:text-warm-700 border border-warm-200 hover:border-warm-300 rounded-xl"
      @click="$emit('reset')"
    >
      Сбросить фильтры
    </button>
  </div>
</template>

<script setup lang="ts">
export interface AnimalFiltersModel {
  q: string
  city: string
  type: string
  status: string
  age: string
  sort: 'date_desc' | 'date_asc'
}

interface Props {
  model: AnimalFiltersModel
  variant?: 'sidebar' | 'modal'
}

const props = withDefaults(defineProps<Props>(), { variant: 'sidebar' })

const emit = defineEmits<{
  'update:model': [AnimalFiltersModel]
  reset: []
}>()

const emitPatch = (patch: Partial<AnimalFiltersModel>) => {
  emit('update:model', { ...props.model, ...patch })
}

const statusOptions = [
  { value: 'all', label: 'Все' },
  { value: 'looking', label: 'Ищут дом' },
  { value: 'foster', label: 'Передержка' },
  { value: 'pensioner', label: 'Пенсионеры' }
]

const ageOptions = [
  { value: 'all', label: 'Любой' },
  { value: 'puppy', label: 'До 1 года' },
  { value: 'young', label: '1–3 года' },
  { value: 'adult', label: '3–7 лет' },
  { value: 'senior', label: '7+ лет' }
]

const inputClass = 'input-field'
const selectClass = 'select-field'
</script>
