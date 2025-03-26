<template>
  <form @submit.prevent="handleRegister" class="auth-form">
    <h2>Регистрация</h2>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div class="form-control">
      <label for="email">Email</label>
      <input 
        id="email" 
        v-model="form.email" 
        type="email" 
        required 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-control">
      <label for="username">Имя пользователя</label>
      <input 
        id="username" 
        v-model="form.username" 
        type="text" 
        required 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-control">
      <label for="password">Пароль</label>
      <input 
        id="password" 
        v-model="form.password" 
        type="password" 
        required 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
      <NuxtLink to="/auth/login" class="auth-link">У меня уже есть аккаунт</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { RegisterCredentials } from '~/types';

const authStore = useAuthStore();
const router = useRouter();

const form = ref<RegisterCredentials>({
  email: '',
  username: '',
  password: ''
});

const isLoading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const handleRegister = async () => {
  try {
    await authStore.register(form.value);
    router.push('/');
  } catch (error) {
    // Ошибки уже обрабатываются в сторе
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