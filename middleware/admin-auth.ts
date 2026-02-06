// Admin authentication middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware on client-side navigation after initial load
  if (import.meta.client) {
    // Check if we have admin token cookie
    const hasToken = document.cookie.includes('admin_token=')
    
    if (!hasToken) {
      // No token, redirect to login
      return navigateTo('/admin/login')
    }
  }
  
  // On server side, we can't easily check the cookie validity without making a request
  // The API will handle authentication, and we'll handle 401 on the client
})
