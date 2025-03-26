<template>
  <div class="register-page">
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import RegisterForm from '~/components/auth/RegisterForm.vue';

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
  title: 'Регистрация - FoodFlow',
  meta: [
    { name: 'description', content: 'Зарегистрируйтесь в FoodFlow' }
  ]
});
</script>

<style lang="scss" scoped>
.register-page {
  padding: 2rem 0;
}
</style> 