<template>
  <div class="bg-white rounded-3xl overflow-hidden border border-warm-100 shadow-card flex flex-col h-full animate-fade-in">
    <div class="shimmer bg-warm-100" style="aspect-ratio: 1/1;" />
    <div class="p-5 flex flex-col gap-4">
      <div class="space-y-2.5">
        <div class="flex justify-between items-start">
          <div class="shimmer h-6 w-3/5 rounded-lg" />
          <div class="shimmer h-5 w-1/4 rounded-full" />
        </div>
        <div class="shimmer h-4 w-2/5 rounded-md" />
      </div>
      
      <div class="flex gap-2">
        <div class="shimmer h-7 w-20 rounded-full" />
        <div class="shimmer h-7 w-24 rounded-full" />
      </div>

      <div class="pt-4 mt-auto border-t border-warm-50 flex items-center justify-between">
        <div class="shimmer h-5 w-24 rounded-lg" />
        <div class="shimmer h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(244, 244, 242, 1) 0%,
    rgba(250, 250, 249, 1) 50%,
    rgba(244, 244, 242, 1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
