// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useUser();
  
    if (!isAuthenticated.value && to.path !== '/login' && to.path !== '/api/auth/callback' && to.path !== '/auth/callback') {
      return abortNavigation(createError({ statusCode: 404, message: 'Page not found' }));
    }
  });