// Admin authentication middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on server side or initial client load
  // Cookie with httpOnly flag is only readable on server
  if (import.meta.server) {
    const cookie = useCookie('admin_token')
    
    if (!cookie.value) {
      // No token, redirect to login
      return navigateTo('/admin/login')
    }
  }
  
  // On client side, we rely on API 401 responses
  // which are handled by useAdminAuth composable
})
