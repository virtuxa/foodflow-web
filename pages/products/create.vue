<template>
  <div class="create-product-page">
    <h1>Создать новый продукт</h1>
    <ProductForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import ProductForm from '~/components/products/ProductForm.vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Проверяем авторизацию пользователя
  if (!authStore.isLoggedIn) {
    router.push('/auth/login');
  }
});

// Устанавливаем метаданные страницы
useHead({
  title: 'Создать продукт - FoodFlow',
  meta: [
    { name: 'description', content: 'Добавьте новый продукт в каталог' }
  ]
});

// Защищаем страницу с помощью middleware
definePageMeta({
  middleware: ['auth']
});
</script>

<style lang="scss" scoped>
.create-product-page {
  h1 {
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style> 