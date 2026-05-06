<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'flat' | 'elevated'
  padding?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: true,
  hover: false
})

const classes = computed(() => {
  const base = props.padding ? 'p-6' : ''
  const hover = props.hover ? 'card-hover cursor-pointer' : ''

  const variants = {
    default:  'card',
    flat:     'card-flat',
    elevated: 'card-elevated'
  }

  return [variants[props.variant], base, hover].filter(Boolean).join(' ')
})
</script>
