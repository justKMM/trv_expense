export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
      const tokens = localStorage.getItem('zoho_tokens')
      if (!tokens && to.path !== '/') {
        return navigateTo('/')
      }
    }
  })