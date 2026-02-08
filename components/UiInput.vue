<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-warm-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
      />
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
    </div>
    <p v-if="hint" class="mt-1 text-sm text-warm-600">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  id: () => `input-${Math.random().toString(36).substring(7)}`
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputClasses = computed(() => {
  const base = 'w-full px-4 py-3 text-base border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-warm-100 disabled:cursor-not-allowed touch-manipulation min-h-[44px]'
  const hasIcon = !!useSlots().icon
  
  if (props.error) {
    return `${base} border-red-300 focus:border-red-500 focus:ring-red-500 ${hasIcon ? 'pl-10' : ''}`
  }
  
  return `${base} border-warm-300 focus:border-primary-500 focus:ring-primary-500 ${hasIcon ? 'pl-10' : ''}`
})
</script>
