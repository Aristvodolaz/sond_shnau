<template>
  <div class="card" :class="{ 'p-6': padding }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  padding?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: true
})
</script>
