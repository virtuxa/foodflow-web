<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2>Вход в систему</h2>
    
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <div class="form-control">
      <label for="username">Имя пользователя</label>
      <input 
        id="username" 
        v-model="form.username" 
        type="text" 
        required 
        :disabled="isLoading"
        autocomplete="username"
      />
    </div>
    
    <div class="form-control">
      <label for="password">Пароль</label>
      <input 
        id="password" 
        v-model="form.password" 
        :type="showPassword ? 'text' : 'password'" 
        required 
        :disabled="isLoading"
        autocomplete="current-password"
      />
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
      <NuxtLink to="/auth/register" class="auth-link">Регистрация</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { LoginCredentials } from '~/types';
import type { AuthResponse } from '~/services/authService';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');
const loginSuccess = ref(false);

const isLoading = computed(() => loading.value);
const redirectPath = computed(() => route.query.redirect as string || '/');

const form = reactive<LoginCredentials>({
  username: '',
  password: ''
});

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    const response = await authStore.login({
      username: form.username,
      password: form.password
    });
    
    loginSuccess.value = true;
    
    setTimeout(() => {
      router.push(redirectPath.value);
    }, 500);
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Произошла ошибка при входе';
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.error-message {
  background-color: #ffebee;
  color: var(--error-color);
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}
</style> 