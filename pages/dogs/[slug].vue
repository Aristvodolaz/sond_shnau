<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
await navigateTo(`/animals/${slug}`, { replace: true })
</script>

<template>
  <div />
</template>
