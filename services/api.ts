import axios from 'axios';
import { useAuthStore } from '~/stores/auth';

// Создаем composable для использования API
export const useApi = () => {
  const config = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // Перехватчик для добавления токена аутентификации
  api.interceptors.request.use(
    (config) => {
      if (process.client) {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem('token');
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Перехватчик для обработки ответов
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (process.client && error.response?.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
        
        const nuxtApp = useNuxtApp();
        nuxtApp.$router.push('/auth/login');
      }
      return Promise.reject(error);
    }
  );
  
  return api;
}; 