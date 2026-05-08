<template>
  <div class="min-h-screen bg-warm-50 pb-24 lg:pb-16">

    <!-- Loading -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-32 gap-5">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-4 border-primary-100" />
        <div class="absolute inset-0 rounded-full border-4 border-t-primary-500 animate-spin" />
      </div>
      <p class="text-warm-400 font-medium text-sm tracking-wide">Загружаем анкету…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!dog" class="text-center py-32">
      <div class="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h1 class="font-display font-bold text-2xl text-warm-900 mb-3">Анкета не найдена</h1>
      <p class="text-warm-500 mb-8">Возможно, питомец уже нашёл дом.</p>
      <NuxtLink to="/animals" class="btn-primary px-8 py-3">Смотреть всех</NuxtLink>
    </div>

    <!-- Dog detail -->
    <template v-else>

      <!-- Breadcrumb -->
      <div class="container-custom pt-5 pb-0">
        <nav class="flex items-center gap-1.5 text-xs text-warm-400 flex-wrap">
          <NuxtLink to="/" class="hover:text-primary-600 transition-colors font-medium">Главная</NuxtLink>
          <svg class="w-3 h-3 shrink-0 text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <NuxtLink to="/animals" class="hover:text-primary-600 transition-colors font-medium">Шнауцеры</NuxtLink>
          <svg class="w-3 h-3 shrink-0 text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-warm-700 font-semibold">{{ dog.name }}</span>
        </nav>
      </div>

      <!-- Main content -->
      <div class="container-custom py-7 md:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-8 xl:gap-14">

          <!-- ── LEFT: Gallery ────────────────────────────── -->
          <div class="space-y-4 animate-fade-up">

            <!-- Main photo -->
            <div
              class="relative rounded-3xl overflow-hidden bg-warm-200 shadow-xl cursor-zoom-in select-none"
              style="aspect-ratio: 4/3;"
              @click="openLightbox(currentPhotoIndex)"
            >
              <img
                v-if="currentPhoto"
                :src="resolveMediaUrl(currentPhoto)"
                :alt="dog.name"
                class="w-full h-full object-cover transition-all duration-500"
                draggable="false"
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-warm-400 gap-3">
                <svg class="w-14 h-14 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm opacity-50">Фото не добавлено</span>
              </div>

              <!-- Navigation arrows -->
              <template v-if="dog.photos.length > 1">
                <button
                  type="button"
                  class="photo-nav-btn left-3"
                  @click.stop="prevPhoto"
                  aria-label="Предыдущее фото"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="photo-nav-btn right-3"
                  @click.stop="nextPhoto"
                  aria-label="Следующее фото"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </template>

              <!-- Photo counter + zoom hint -->
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div v-if="dog.photos.length > 1" class="bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {{ currentPhotoIndex + 1 }} / {{ dog.photos.length }}
                </div>
                <div class="ml-auto bg-black/40 text-white/80 text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                  </svg>
                  Увеличить
                </div>
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="dog.photos.length > 1" class="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                v-for="(photo, i) in dog.photos"
                :key="i"
                type="button"
                :class="[
                  'shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200',
                  currentPhotoIndex === i
                    ? 'border-primary-500 shadow-md shadow-primary-500/20 scale-[0.97]'
                    : 'border-transparent hover:border-warm-300 opacity-70 hover:opacity-100'
                ]"
                style="width: 72px; height: 72px;"
                @click="setPhoto(i)"
              >
                <img
                  :src="resolveMediaUrl(photo)"
                  :alt="`${dog.name} — фото ${i + 1}`"
                  class="w-full h-full object-cover"
                  draggable="false"
                />
              </button>
            </div>

            <!-- Feature tags -->
            <div v-if="displayFeatures.length" class="flex flex-wrap gap-2">
              <span
                v-for="(f, i) in displayFeatures"
                :key="i"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 rounded-full text-xs font-bold"
              >
                <svg class="w-3 h-3 text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ f }}
              </span>
            </div>

          </div>

          <!-- ── RIGHT: Info panel ─────────────────────────── -->
          <div class="animate-fade-up" style="animation-delay:80ms;">

            <!-- Status + Favorite row -->
            <div class="flex items-center justify-between mb-4">
              <span :class="['status-badge', statusBadgeClass]">
                <span class="status-dot" />
                {{ statusLabel(dog.status) }}
              </span>
              <button
                :class="[
                  'w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-200',
                  favorited
                    ? 'border-rose-400 bg-rose-50 text-rose-500'
                    : 'border-warm-200 text-warm-400 hover:border-rose-300 hover:text-rose-400 hover:bg-rose-50'
                ]"
                :title="favorited ? 'Убрать из избранного' : 'Добавить в избранное'"
                @click="toggleFav"
              >
                <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'scale-110': favorited }" :fill="favorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Name + breed -->
            <h1 class="font-display font-extrabold text-4xl md:text-5xl text-warm-900 leading-[1.05] tracking-tight mb-2">
              {{ dog.name }}
            </h1>
            <p class="text-base text-primary-600 font-bold tracking-wide mb-7">
              {{ breedLabel(dog.type) }}
            </p>

            <!-- Key attributes grid -->
            <div class="grid grid-cols-3 gap-2.5 mb-7">
              <div class="attr-card">
                <svg class="attr-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="attr-label">Возраст</p>
                <p class="attr-value">{{ dog.age }}</p>
              </div>
              <div class="attr-card">
                <svg class="attr-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p class="attr-label">Город</p>
                <p class="attr-value">{{ dog.city }}</p>
              </div>
              <div class="attr-card">
                <svg class="attr-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <p class="attr-label">Куратор</p>
                <p class="attr-value truncate">{{ dog.curator.name.split(' ')[0] }}</p>
              </div>
            </div>

            <!-- Tabs -->
            <div class="mb-5">
              <div class="flex gap-1 p-1 bg-warm-100 rounded-2xl mb-5">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  type="button"
                  :class="[
                    'flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-white text-warm-900 shadow-sm'
                      : 'text-warm-500 hover:text-warm-800'
                  ]"
                  @click="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>

              <!-- Tab content -->
              <div class="min-h-[100px]">
                <div v-if="activeTab === 'about'">
                  <p v-if="dog.description?.trim()" class="text-warm-700 leading-relaxed text-[15px] whitespace-pre-line">{{ dog.description }}</p>
                  <p v-else class="text-warm-400 italic text-sm">Описание не добавлено.</p>
                </div>
                <div v-else-if="activeTab === 'character'">
                  <p v-if="dog.character?.trim()" class="text-warm-700 leading-relaxed text-[15px] whitespace-pre-line">{{ dog.character }}</p>
                  <p v-else class="text-warm-400 italic text-sm">Характер не описан.</p>
                </div>
                <div v-else-if="activeTab === 'health'">
                  <div class="rounded-2xl bg-primary-50 border border-primary-100 p-4">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </div>
                      <p class="text-primary-900 leading-relaxed text-[15px] whitespace-pre-line">{{ dog.health || 'Данные о здоровье не указаны.' }}</p>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeTab === 'story'">
                  <p v-if="dog.story?.trim()" class="text-warm-700 leading-relaxed text-[15px] whitespace-pre-line">{{ dog.story }}</p>
                  <p v-else class="text-warm-400 italic text-sm">История пока не рассказана.</p>
                </div>
              </div>
            </div>

            <!-- Contact section -->
            <div class="rounded-2xl border border-warm-100 bg-white overflow-hidden mb-4" style="box-shadow: 0 2px 12px rgba(0,0,0,.05);">
              <div class="px-5 py-3.5 border-b border-warm-100 flex items-center justify-between">
                <div>
                  <p class="text-xs font-black uppercase tracking-widest text-warm-400">Куратор</p>
                  <p class="font-display font-bold text-warm-900 text-base mt-0.5">{{ dog.curator.name }}</p>
                </div>
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                  <span class="font-display font-black text-primary-600 text-sm">
                    {{ dog.curator.name.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="p-3 grid grid-cols-2 gap-2">
                <a :href="telHref()" class="contact-btn contact-btn-default">
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>Позвонить</span>
                </a>
                <a
                  v-if="dog.curator.telegram"
                  :href="tgHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-btn contact-btn-telegram"
                >
                  <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.21.21 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.84-1.65 4.64-1.94 5.16-1.94.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.28.01.43z"/>
                  </svg>
                  <span>Telegram</span>
                </a>
                <a
                  v-if="dog.forumTopicUrl"
                  :href="dog.forumTopicUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-btn contact-btn-forum"
                >
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>Форум</span>
                </a>
                <a
                  v-if="dog.curator.email"
                  :href="`mailto:${dog.curator.email}`"
                  class="contact-btn contact-btn-default"
                >
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>

            <!-- Primary CTA -->
            <button
              class="w-full btn-primary py-4 text-base rounded-2xl"
              @click="requestOpen = true"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Хочу взять домой
            </button>

          </div>
        </div>

        <!-- Related animals -->
        <section v-if="related.length" class="mt-16 pt-12 border-t border-warm-200">
          <h2 class="font-display font-extrabold text-2xl md:text-3xl text-warm-900 mb-8 tracking-tight">
            Ещё в {{ dog.city }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DogCard v-for="d in related" :key="d.id" :dog="d" />
          </div>
        </section>
      </div>

      <!-- Mobile sticky bar -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-warm-200 px-4 py-3 safe-bottom">
        <div class="flex gap-2.5">
          <button class="btn-primary flex-1 py-3 text-sm rounded-xl" @click="requestOpen = true">
            Хочу взять домой
          </button>
          <a :href="telHref()" class="mobile-action-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </a>
          <a
            v-if="dog.forumTopicUrl"
            :href="dog.forumTopicUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-action-btn text-primary-700 bg-primary-50 border-primary-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <Transition name="lightbox">
          <div
            v-if="lightboxOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center"
            @click.self="closeLightbox"
          >
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/92 backdrop-blur-sm" @click="closeLightbox" />

            <!-- Controls bar (top) -->
            <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4">
              <span class="text-white/60 text-sm font-medium tabular-nums">
                {{ lightboxIndex + 1 }} / {{ dog.photos.length }}
              </span>
              <div class="flex items-center gap-2">
                <span class="text-white/60 text-sm hidden sm:block">{{ dog.name }}</span>
                <button
                  type="button"
                  class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white/80 hover:text-white ml-4"
                  @click="closeLightbox"
                  aria-label="Закрыть"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Main lightbox image -->
            <div class="relative z-10 w-full h-full flex items-center justify-center px-16 py-20">
              <img
                :src="resolveMediaUrl(dog.photos[lightboxIndex])"
                :alt="`${dog.name} — фото ${lightboxIndex + 1}`"
                class="max-w-full max-h-full object-contain rounded-xl select-none"
                style="box-shadow: 0 25px 80px rgba(0,0,0,.6);"
                draggable="false"
              />
            </div>

            <!-- Arrow prev -->
            <button
              v-if="dog.photos.length > 1"
              type="button"
              class="lightbox-arrow left-3 md:left-5"
              @click="lightboxPrev"
              aria-label="Предыдущее фото"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <!-- Arrow next -->
            <button
              v-if="dog.photos.length > 1"
              type="button"
              class="lightbox-arrow right-3 md:right-5"
              @click="lightboxNext"
              aria-label="Следующее фото"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <!-- Thumbnail strip (bottom) -->
            <div
              v-if="dog.photos.length > 1"
              class="absolute bottom-0 left-0 right-0 z-10 py-4 px-5 flex justify-center gap-2 overflow-x-auto scrollbar-none"
            >
              <button
                v-for="(photo, i) in dog.photos"
                :key="i"
                type="button"
                :class="[
                  'shrink-0 rounded-lg overflow-hidden transition-all duration-200 border-2',
                  lightboxIndex === i
                    ? 'border-white scale-100 opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80 scale-95'
                ]"
                style="width: 56px; height: 56px;"
                @click="lightboxIndex = i"
              >
                <img :src="resolveMediaUrl(photo)" :alt="`Фото ${i + 1}`" class="w-full h-full object-cover" draggable="false"/>
              </button>
            </div>

          </div>
        </Transition>
      </Teleport>

      <AdoptionRequestModal
        v-model="requestOpen"
        :animal-id="dog.id"
        :animal-name="dog.name"
      />
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
const activeTab = ref('about')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const tabs = [
  { id: 'about',     label: 'О собаке' },
  { id: 'character', label: 'Характер' },
  { id: 'health',    label: 'Здоровье' },
  { id: 'story',     label: 'История' }
]

watch(dog, (d) => {
  if (d?.photos?.length) {
    currentPhoto.value = d.photos[0]
    currentPhotoIndex.value = 0
  }
}, { immediate: true })

function setPhoto(i: number) {
  if (!dog.value) return
  currentPhotoIndex.value = i
  currentPhoto.value = dog.value.photos[i]
}

function prevPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  setPhoto((currentPhotoIndex.value - 1 + len) % len)
}

function nextPhoto() {
  if (!dog.value) return
  const len = dog.value.photos.length
  setPhoto((currentPhotoIndex.value + 1) % len)
}

function openLightbox(index: number) {
  if (!dog.value?.photos.length) return
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function lightboxPrev() {
  if (!dog.value) return
  lightboxIndex.value = (lightboxIndex.value - 1 + dog.value.photos.length) % dog.value.photos.length
}

function lightboxNext() {
  if (!dog.value) return
  lightboxIndex.value = (lightboxIndex.value + 1) % dog.value.photos.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

const statusBadgeClass = computed(() => {
  switch (dog.value?.status) {
    case 'looking':   return 'badge-looking'
    case 'foster':    return 'badge-foster'
    case 'pensioner': return 'badge-pensioner'
    default:          return 'badge-default'
  }
})

const featureLabels: Record<string, string> = {
  sterilized:           'Стерилизован(а)',
  vaccinated:           'Привит(а)',
  treatedForParasites:  'Обработан(а) от паразитов'
}

const displayFeatures = computed(() =>
  (dog.value?.features ?? []).map(f => featureLabels[f] || f).filter(Boolean)
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

<style scoped>
/* Navigation arrows on main photo */
.photo-nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 w-9 h-9
         bg-white/85 backdrop-blur-sm rounded-full
         flex items-center justify-center
         shadow-lg hover:bg-white active:scale-95
         transition-all duration-150 text-warm-700;
}

/* Attribute cards */
.attr-card {
  @apply flex flex-col items-start gap-1 bg-white rounded-2xl p-3.5
         border border-warm-100;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
}
.attr-icon {
  @apply w-5 h-5 text-primary-400 mb-0.5;
}
.attr-label {
  @apply text-[10px] font-black uppercase tracking-widest text-warm-400;
}
.attr-value {
  @apply text-sm font-bold text-warm-900 leading-tight;
}

/* Status badge */
.status-badge {
  @apply inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide;
}
.status-dot {
  @apply w-1.5 h-1.5 rounded-full bg-current;
  animation: pulseDot 2s ease-in-out infinite;
}
.badge-looking   { @apply bg-primary-100 text-primary-700; }
.badge-foster    { @apply bg-amber-100 text-amber-700; }
.badge-pensioner { @apply bg-warm-200 text-warm-600; }
.badge-default   { @apply bg-warm-100 text-warm-600; }

/* Contact buttons */
.contact-btn {
  @apply flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-150 col-span-1;
}
.contact-btn-default {
  @apply bg-warm-50 border border-warm-200 text-warm-700 hover:bg-warm-100 hover:border-warm-300;
}
.contact-btn-telegram {
  @apply bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100;
}
.contact-btn-forum {
  @apply bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100;
}

/* Mobile action buttons */
.mobile-action-btn {
  @apply w-12 h-12 flex items-center justify-center rounded-xl
         bg-warm-50 border border-warm-200 text-warm-600
         hover:bg-warm-100 transition-colors shrink-0;
}

/* Lightbox arrows */
.lightbox-arrow {
  @apply absolute top-1/2 -translate-y-1/2 z-20
         w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
         flex items-center justify-center
         text-white/70 hover:text-white
         transition-all duration-150 backdrop-blur-sm
         border border-white/10;
}

/* Lightbox transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
