<template>
  <div class="min-h-screen bg-warm-50 pb-24 lg:pb-12">

    <!-- Loading state -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-24 gap-4">
      <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      <p class="text-warm-500 font-medium">Загружаем анкету…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!dog" class="text-center py-24">
      <div class="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg class="w-10 h-10 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="font-display font-semibold text-2xl text-warm-900 mb-2">Анкета не найдена</h1>
      <p class="text-warm-500 mb-6">Возможно, питомец уже нашёл дом.</p>
      <NuxtLink to="/animals" class="btn-primary px-8 py-3">Смотреть всех</NuxtLink>
    </div>

    <!-- Dog detail -->
    <template v-else>
      <!-- Breadcrumb -->
      <div class="container-custom pt-6 pb-0">
        <nav class="flex items-center gap-2 text-sm text-warm-500 flex-wrap">
          <NuxtLink to="/" class="hover:text-primary-600 transition-colors">Главная</NuxtLink>
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <NuxtLink to="/animals" class="hover:text-primary-600 transition-colors">Шнауцеры</NuxtLink>
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-warm-900 font-medium">{{ dog.name }}</span>
        </nav>
      </div>

      <!-- Main content -->
      <div class="container-custom py-8 md:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">

          <!-- Left: Gallery -->
          <div class="space-y-4">
            <!-- Main photo -->
            <div 
              class="group relative rounded-[2rem] overflow-hidden bg-white p-2 shadow-2xl shadow-warm-200/50 cursor-zoom-in transition-all duration-500 hover:shadow-primary-500/10" 
              style="aspect-ratio: 4/3;"
              @click="lightboxOpen = true"
            >
              <div class="w-full h-full rounded-[1.5rem] overflow-hidden bg-warm-50 relative">
                <template v-if="currentPhoto">
                  <img
                    :src="resolveMediaUrl(currentPhoto)"
                    aria-hidden="true"
                    class="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                  />
                  <img
                    :src="resolveMediaUrl(currentPhoto)"
                    :alt="dog.name"
                    class="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </template>
                <div v-else class="w-full h-full flex items-center justify-center text-warm-400">
                  <svg class="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <!-- Nav arrows for multiple photos -->
                <template v-if="dog.photos.length > 1">
                  <button
                    type="button"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:bg-white active:scale-90 transition-all z-10"
                    @click.stop="prevPhoto"
                  >
                    <svg class="w-5 h-5 text-warm-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:bg-white active:scale-90 transition-all z-10"
                    @click.stop="nextPhoto"
                  >
                    <svg class="w-5 h-5 text-warm-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </template>

                <!-- Zoom hint -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div class="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <svg class="w-6 h-6 text-warm-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                <!-- Photo counter -->
                <div v-if="dog.photos.length > 1" class="absolute bottom-4 right-4 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md">
                  {{ currentPhotoIndex + 1 }} / {{ dog.photos.length }}
                </div>
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="dog.photos.length > 1" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-0.5">
              <button
                v-for="(photo, i) in dog.photos"
                :key="i"
                type="button"
                :class="[
                  'shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-[1.5rem] overflow-hidden border-2 p-1.5 bg-white shadow-sm transition-all duration-300',
                  currentPhoto === photo ? 'border-primary-500 shadow-xl ring-8 ring-primary-500/5 scale-[1.02]' : 'border-transparent hover:border-warm-200'
                ]"
                @click="currentPhoto = photo; currentPhotoIndex = i"
              >
                <img :src="resolveMediaUrl(photo)" :alt="`${dog.name} фото ${i + 1}`" class="w-full h-full object-contain rounded-2xl bg-warm-50" />
              </button>
            </div>

            <!-- Features tags -->
            <div v-if="displayFeatures.length" class="flex flex-wrap gap-2.5 pt-4">
              <span
                v-for="(f, i) in displayFeatures"
                :key="i"
                class="px-5 py-3 bg-primary-50 border border-primary-200 text-primary-700 rounded-[1.25rem] text-[13px] font-bold uppercase tracking-tight shadow-sm flex items-center gap-2"
              >
                <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
                {{ f }}
              </span>
            </div>
          </div>

          <!-- Right: Info -->
          <div>
            <div class="flex items-start justify-between mb-4">
              <!-- Status badge -->
              <span :class="['inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide', statusBadgeClass]">
                {{ statusLabel(dog.status) }}
              </span>

              <!-- Favorite -->
              <button
                type="button"
                :class="[
                  'w-10 h-10 flex items-center justify-center rounded-full border transition-all',
                  favorited
                    ? 'border-primary-400 bg-primary-50 text-primary-500'
                    : 'border-warm-200 text-warm-400 hover:border-primary-300 hover:text-primary-500 bg-white shadow-sm'
                ]"
                @click="toggleFav"
              >
                <svg class="w-5 h-5" :fill="favorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <h1 class="font-display font-semibold text-3xl md:text-4xl text-warm-900 mb-1.5 leading-tight">{{ dog.name }}</h1>
            <p class="text-base text-primary-600 font-semibold mb-5">{{ breedLabel(dog.type) }}</p>

            <!-- Key attributes -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-gradient-to-br from-white to-warm-50 rounded-xl p-3.5 border border-warm-100 shadow-sm flex flex-col justify-center min-h-[70px]">
                <p class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-0.5 opacity-70">Возраст</p>
                <p class="text-base md:text-lg font-display font-bold text-warm-900 leading-tight">{{ dog.age }}</p>
              </div>
              <div class="bg-gradient-to-br from-white to-warm-50 rounded-xl p-3.5 border border-warm-100 shadow-sm flex flex-col justify-center min-h-[70px]">
                <p class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-0.5 opacity-70">Город</p>
                <p class="text-base md:text-lg font-display font-bold text-warm-900 leading-tight truncate">{{ dog.city }}</p>
              </div>
              <div class="bg-gradient-to-br from-white to-warm-50 rounded-xl p-3.5 border border-warm-100 shadow-sm flex flex-col justify-center min-h-[70px] col-span-2">
                <p class="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-0.5 opacity-70">Куратор</p>
                <div class="flex items-center justify-between">
                  <p class="text-base md:text-lg font-display font-bold text-warm-900 leading-tight">{{ dog.curator.name }}</p>
                  <a :href="`tel:${dog.curator.phone.replace(/\s/g, '')}`" class="text-xs md:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                    {{ dog.curator.phone }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Information sections -->
            <div class="space-y-8 mb-10">
              <!-- About -->
              <section v-if="dog.description?.trim()" class="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
                <h3 class="font-display font-bold text-lg text-warm-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  О собаке
                </h3>
                <p class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.description }}</p>
              </section>

              <!-- Character -->
              <section v-if="dog.character?.trim()" class="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
                <h3 class="font-display font-bold text-lg text-warm-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Характер
                </h3>
                <p class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.character }}</p>
              </section>

              <!-- Health -->
              <section v-if="dog.health?.trim()" class="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <h3 class="font-display font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Здоровье
                </h3>
                <p class="text-blue-900 leading-relaxed whitespace-pre-line">{{ dog.health }}</p>
              </section>

              <!-- Story -->
              <section v-if="dog.story?.trim()" class="bg-warm-100/50 rounded-2xl p-6 border border-warm-200 shadow-sm">
                <h3 class="font-display font-bold text-lg text-warm-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  История
                </h3>
                <p class="text-warm-700 leading-relaxed whitespace-pre-line">{{ dog.story }}</p>
              </section>
            </div>

            <!-- Contact section -->
            <div class="bg-white rounded-2xl border border-warm-100 p-5 mb-5">
              <p class="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Связаться с куратором</p>
              <div class="grid grid-cols-2 gap-2.5">
                <a
                  :href="telHref()"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-warm-50 border border-warm-200 rounded-xl text-sm font-semibold text-warm-800 hover:bg-warm-100 hover:border-warm-300 transition-colors"
                >
                  <svg class="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Позвонить
                </a>
                <a
                  v-if="dog.forumTopicUrl"
                  :href="dog.forumTopicUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-primary-50 border border-primary-200 rounded-xl text-sm font-semibold text-primary-800 hover:bg-primary-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Форум
                </a>
                <a
                  v-if="dog.curator.telegram"
                  :href="tgHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-sky-50 border border-sky-200 rounded-xl text-sm font-semibold text-sky-800 hover:bg-sky-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.21.21 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  v-if="dog.curator.email"
                  :href="`mailto:${dog.curator.email}`"
                  class="flex items-center justify-center gap-2 py-3 px-4 bg-warm-50 border border-warm-200 rounded-xl text-sm font-semibold text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  <svg class="w-4 h-4 text-warm-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>

            <!-- Primary CTA -->
            <button
              class="btn-primary w-full py-4 text-lg shadow-lg shadow-primary-500/20"
              @click="requestOpen = true"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Хочу забрать
            </button>

          </div>
        </div>

        <!-- Related animals -->
        <section v-if="related.length" class="mt-16 pt-10 border-t border-warm-200">
          <h2 class="font-display font-semibold text-2xl md:text-3xl text-warm-900 mb-8">
            Ещё в {{ dog.city }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DogCard v-for="d in related" :key="d.id" :dog="d" />
          </div>
        </section>
      </div>

      <!-- Sticky mobile CTA bar -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-warm-200 px-4 py-3 safe-bottom">
        <div class="flex gap-2">
          <button class="btn-primary flex-1 py-3 text-sm" @click="requestOpen = true">
            Хочу забрать
          </button>
          <a :href="telHref()" class="w-12 h-12 flex items-center justify-center rounded-xl bg-warm-50 border border-warm-200 text-warm-700 hover:bg-warm-100 transition-colors shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            v-if="dog.forumTopicUrl"
            :href="dog.forumTopicUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors shrink-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>

      <AdoptionRequestModal
        v-model="requestOpen"
        :animal-id="dog.id"
        :animal-name="dog.name"
      />

      <!-- Photo Lightbox -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="lightboxOpen" 
          class="fixed inset-0 z-[100] bg-warm-900/80 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          @click="lightboxOpen = false"
        >
          <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" @click.stop>
            <!-- Close button moved closer to photo -->
            <button 
              class="absolute -top-4 -right-4 md:-top-10 md:-right-10 w-12 h-12 bg-white text-warm-900 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 z-[110]"
              @click="lightboxOpen = false"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="relative w-full h-full flex items-center justify-center">
              <img 
                :src="resolveMediaUrl(currentPhoto)" 
                class="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border-4 border-white/10" 
                alt="" 
              />

              <template v-if="dog.photos.length > 1">
                <button
                  class="absolute left-2 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/40 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90"
                  @click="prevPhoto"
                >
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  class="absolute right-2 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/40 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90"
                  @click="nextPhoto"
                >
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </template>
            </div>
            
            <div v-if="dog.photos.length > 1" class="mt-8 bg-black/40 px-4 py-2 rounded-full text-white font-bold tracking-widest text-sm backdrop-blur-md">
              {{ currentPhotoIndex + 1 }} / {{ dog.photos.length }}
            </div>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AnimalListResponse, Dog } from '~/types'

const route = useRoute()
const slug = route.params.slug as string
const { resolveMediaUrl } = useMediaUrl()
const { statusLabel, breedLabel } = useAnimalLabels()
const { tgUrl } = useContactLinks()
const { has, toggle } = useFavorites()

const { data: dog, pending } = await useFetch<Dog>(`/api/animals/${slug}`)
const currentPhoto = ref('')
const currentPhotoIndex = ref(0)
const requestOpen = ref(false)
const lightboxOpen = ref(false)

watch(lightboxOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

watch(dog, (d) => {
  if (d?.photos?.length) {
    currentPhoto.value = d.photos[0]
    currentPhotoIndex.value = 0
  }
}, { immediate: true })

const statusBadgeClass = computed(() => {
  switch (dog.value?.status) {
    case 'looking': return 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
    case 'foster': return 'bg-primary-700 text-white'
    case 'pensioner': return 'bg-primary-900 text-white'
    default: return 'bg-warm-400 text-white'
  }
})

function prevPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + len) % len
  currentPhoto.value = dog.value.photos[currentPhotoIndex.value]
}

function nextPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % len
  currentPhoto.value = dog.value.photos[currentPhotoIndex.value]
}

const featureLabels: Record<string, string> = {
  sterilized: 'Стерилизован(а)',
  vaccinated: 'Привит(а)',
  treatedforparasites: 'Обработан(а) от паразитов',
  treatedforparasite: 'Обработан(а) от паразитов'
}

const displayFeatures = computed(() =>
  (dog.value?.features ?? []).map(f => featureLabels[f.toLowerCase()] || f).filter(Boolean)
)

const telHref = () => dog.value ? `tel:${dog.value.curator.phone.replace(/\s/g, '')}` : '#'

const tgHref = computed(() => dog.value?.curator.telegram ? tgUrl(dog.value.curator.telegram) : '#')

const favorited = computed(() => dog.value ? has(dog.value.id) : false)
const toggleFav = () => { if (dog.value) toggle(dog.value.id) }

const related = ref<Dog[]>([])

watch(dog, async (d) => {
  if (!d) { related.value = []; return }
  try {
    const res = await $fetch<AnimalListResponse>('/api/animals', {
      query: { city: d.city, status: 'looking', pageSize: '7' }
    })
    related.value = res.items.filter(x => x.id !== d.id).slice(0, 3)
  } catch {
    related.value = []
  }
}, { immediate: true })

useHead(() => {
  const d = dog.value
  if (!d) return { title: 'Животное' }
  return {
    title: d.name,
    meta: [{ name: 'description', content: `${d.name} — ${breedLabel(d.type)}, ${d.age}, ${d.city}.` }]
  }
})
</script>
