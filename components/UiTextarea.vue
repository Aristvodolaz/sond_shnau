<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-warm-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :class="textareaClasses"
    />
    <p v-if="hint" class="mt-1 text-sm text-warm-600">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  rows?: number
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  id: () => `textarea-${Math.random().toString(36).substring(7)}`
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaClasses = computed(() => {
  const base = 'w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-warm-100 disabled:cursor-not-allowed resize-y'
  
  if (props.error) {
    return `${base} border-red-300 focus:border-red-500 focus:ring-red-500`
  }
  
  return `${base} border-warm-300 focus:border-primary-500 focus:ring-primary-500`
})
</script>
