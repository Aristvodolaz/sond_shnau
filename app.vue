<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
// Global meta and SEO
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — Фонд помощи шнауцерам` : 'Фонд помощи шнауцерам'
  }
})
</script>
