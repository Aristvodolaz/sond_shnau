<template>
  <div class="border border-warm-100 rounded-xl overflow-hidden bg-white" style="box-shadow: var(--shadow-card);">
    <button
      type="button"
      class="w-full px-5 py-4 bg-white hover:bg-warm-50 transition-colors duration-200 flex items-center justify-between text-left gap-4"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="font-semibold text-warm-900 text-sm leading-snug">{{ title }}</span>
      <svg
        class="w-4 h-4 text-warm-400 transition-transform duration-200 shrink-0"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="px-5 py-4 bg-warm-50 border-t border-warm-100 text-sm text-warm-700 leading-relaxed">
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
