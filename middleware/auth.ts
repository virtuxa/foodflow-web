import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  
  if (process.client) {
    if (!authStore.isLoggedIn) {
      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      });
    }
  }
}); 