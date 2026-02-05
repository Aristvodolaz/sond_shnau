<template>
  <div class="border border-warm-200 rounded-lg overflow-hidden">
    <button
      @click="isOpen = !isOpen"
      class="w-full px-6 py-4 bg-white hover:bg-warm-50 transition-colors flex items-center justify-between text-left"
      :aria-expanded="isOpen"
    >
      <span class="font-semibold text-warm-900">{{ title }}</span>
      <svg
        class="w-5 h-5 text-warm-600 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isOpen" class="px-6 py-4 bg-warm-50 border-t border-warm-200 overflow-hidden">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false
})

const isOpen = ref(props.defaultOpen)
</script>
