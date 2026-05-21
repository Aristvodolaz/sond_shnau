import { getCookie } from 'h3'

export default defineEventHandler((event) => {
  const path = event.node.req.url || ''
  
  // Only log admin pages and API calls to keep logs clean
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    const method = event.node.req.method || 'GET'
    const cookie = getCookie(event, 'admin_token') || 'none'
    const xForwardedProto = event.node.req.headers['x-forwarded-proto'] || 'none'
    const host = event.node.req.headers['host'] || 'none'
    
    console.log(`[Server Request] ${method} ${path} | admin_token: ${cookie ? '(present)' : 'none'} | x-forwarded-proto: ${xForwardedProto} | host: ${host}`)
  }
})
