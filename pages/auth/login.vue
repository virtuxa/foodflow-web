<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import LoginForm from '~/components/auth/LoginForm.vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Если пользователь уже авторизован, перенаправляем на главную
  if (authStore.isLoggedIn) {
    router.push('/');
  }
});

// Устанавливаем метаданные страницы
useHead({
  title: 'Вход - FoodFlow',
  meta: [
    { name: 'description', content: 'Войдите в свой аккаунт FoodFlow' }
  ]
});
</script>

<style lang="scss" scoped>
.login-page {
  padding: 2rem 0;
}
</style> 