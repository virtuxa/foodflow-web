import { useApi } from './api';
import type { LoginCredentials, RegisterCredentials, User } from '~/types';

// Интерфейс ответа при аутентификации
export interface AuthResponse extends User {
  token: string;
  _id: string;
  username: string;
  email: string;
  role: string;
}

export const useAuthService = () => {
  const api = useApi();
  
  return {
    // Регистрация пользователя
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
      const response = await api.post('/auth/register', credentials);
      return response.data;
    },
    
    // Вход пользователя
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    
    // Проверка валидности токена
    async validateToken(token: string): Promise<boolean> {
      try {
        const response = await api.post('/auth/validate', { token });
        return response.data.valid;
      } catch (error) {
        return false;
      }
    },
    
    // Верификация токена и получение данных пользователя
    async verifyToken(token: string): Promise<User | null> {
      try {
        const response = await api.post('/auth/verify', { token });
        return response.data;
      } catch (error) {
        return null;
      }
    },
    
    // Выход пользователя (очистка локального хранилища)
    logout(): void {
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  };
}; 