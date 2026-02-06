// Simple toast notification composable
interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const show = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: Toast = { id, message, type, duration }
    
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, duration = 3000) => show(message, 'success', duration)
  const error = (message: string, duration = 5000) => show(message, 'error', duration)
  const info = (message: string, duration = 3000) => show(message, 'info', duration)
  const warning = (message: string, duration = 4000) => show(message, 'warning', duration)

  return {
    toasts: readonly(toasts),
    show,
    success,
    error,
    info,
    warning,
    remove
  }
}
