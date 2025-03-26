import { defineStore } from 'pinia';
import { useAuthService } from '~/services/authService';
import type { User, LoginCredentials, RegisterCredentials } from '~/types';
import type { AuthResponse } from '~/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),
  
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },
  
  actions: {
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    
    setToken(token: string | null) {
      this.token = token;
      if (process.client) {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }
    },
    
    setError(error: string | null) {
      this.error = error;
    },
    
    async register(credentials: RegisterCredentials) {
      this.loading = true;
      this.error = null;
      
      const authService = useAuthService();
      
      try {
        const response = await authService.register(credentials);
        const { token, ...userData } = response;
        
        this.setUser(userData);
        this.setToken(token);
        return response;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Ошибка при регистрации');
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async login(credentials: LoginCredentials) {
      this.loading = true;
      this.error = null;
      
      const authService = useAuthService();
      
      try {
        const response = await authService.login(credentials);
        const { token, ...userData } = response;
        
        this.setUser(userData);
        this.setToken(token);
        return response;
      } catch (error: any) {
        this.setError(error.response?.data?.message || 'Неверное имя пользователя или пароль');
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async checkAuth() {
      if (!process.client) {
        return false;
      }
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      const authService = useAuthService();
      
      try {
        const user = await authService.verifyToken(token);
        
        if (user) {
          this.setUser(user);
          this.setToken(token);
          return true;
        } else {
          this.logout();
          return false;
        }
      } catch (error) {
        this.logout();
        return false;
      }
    },
    
    logout() {
      const authService = useAuthService();
      authService.logout();
      this.setUser(null);
      this.setToken(null);
      this.isAuthenticated = false;
    }
  }
}); 