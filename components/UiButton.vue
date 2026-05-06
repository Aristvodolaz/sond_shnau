<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  fullWidth: false
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => {
  const variantMap = {
    primary:   'btn-primary',
    secondary: 'btn-ghost bg-warm-100 text-warm-800 hover:bg-warm-200',
    outline:   'btn-outline',
    ghost:     'btn-ghost',
    danger:    'btn-danger'
  }

  const sizeMap = {
    xs: 'px-3 py-1.5 text-xs min-h-[32px]',
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[40px]',
    lg: 'px-7 py-3.5 text-base min-h-[48px]'
  }

  return [
    variantMap[props.variant],
    sizeMap[props.size],
    props.fullWidth ? 'w-full' : ''
  ].filter(Boolean).join(' ')
})
</script>
