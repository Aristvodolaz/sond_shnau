// Admin authentication helper composable
export const useAdminAuth = () => {
  const router = useRouter()
  const toast = useToast()

  // Handle fetch with auth error handling
  const adminFetch = async <T = any>(url: string, options: any = {}): Promise<T> => {
    try {
      return await $fetch<T>(url, options)
    } catch (error: any) {
      // Check if it's a 401 error (unauthorized)
      if (error.statusCode === 401 || error.status === 401) {
        toast.error('Сессия истекла. Пожалуйста, войдите снова.')
        
        // Clear any existing admin token
        document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        
        // Redirect to login page
        await router.push('/admin/login')
        
        throw new Error('Session expired')
      }
      
      // Re-throw other errors
      throw error
    }
  }

  // Check if user is authenticated (for middleware/guards)
  const checkAuth = async (): Promise<boolean> => {
    try {
      // Try to fetch admin data to verify session
      await $fetch('/api/admin/dogs', { method: 'GET' })
      return true
    } catch (error: any) {
      if (error.statusCode === 401 || error.status === 401) {
        return false
      }
      // Other errors don't mean unauthenticated
      return true
    }
  }

  return {
    adminFetch,
    checkAuth
  }
}
