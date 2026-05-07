<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>
    <AppFooter class="hidden sm:block" />
    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
// Default layout with header and footer
</script>
