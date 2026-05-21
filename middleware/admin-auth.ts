// Admin authentication middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on server side or initial client load
  // Cookie with httpOnly flag is only readable on server
  if (import.meta.server) {
    const cookie = useCookie('admin_token')
    const event = useRequestEvent()
    const allCookies = event?.node.req.headers['cookie'] || 'none'
    
    console.log(`[Admin Auth Middleware] Accessing page: ${to.path}`)
    console.log(`[Admin Auth Middleware] Cookie 'admin_token' value present: ${!!cookie.value}`)
    console.log(`[Admin Auth Middleware] All cookies in request: ${allCookies}`)
    
    if (!cookie.value) {
      console.log(`[Admin Auth Middleware] Redirecting unauthorized user to /admin/login`)
      // No token, redirect to login
      return navigateTo('/admin/login')
    }
  }
  
  // On client side, we rely on API 401 responses
  // which are handled by useAdminAuth composable
})
