<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    <UiToast />
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
