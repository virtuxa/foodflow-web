import axios from 'axios';

/**
 * Создает новый экземпляр axios с предустановленными заголовками
 * @param token JWT-токен для авторизации
 * @param baseURL Базовый URL для API
 * @returns Настроенный экземпляр axios
 */
export const useAxios = (token?: string, baseURL?: string) => {
  const config = useRuntimeConfig();
  
  const instance = axios.create({
    baseURL: baseURL || config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  
  return instance;
}; 