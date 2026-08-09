export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  router.afterEach((to, from) => {
    // Ждем небольшую задержку, чтобы title страницы успел обновиться
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(89861167, 'hit', window.location.href, {
          title: document.title,
          referer: window.location.origin + from.fullPath
        })
      }
    }, 50)
  })
})
