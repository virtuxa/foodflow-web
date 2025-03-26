<template>
  <div class="edit-product-page">
    <h1>Редактировать продукт</h1>
    <ProductForm :product-id="productId" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ProductForm from '~/components/products/ProductForm.vue';
import { useProductStore } from '~/stores/products';
import { useAuthStore } from '~/stores/auth';

console.log('Edit product page - Script setup started');

const route = useRoute();
const productStore = useProductStore();
const authStore = useAuthStore();

console.log('Edit product page - Auth state:', authStore.isLoggedIn);

// Получаем ID продукта из параметров маршрута
const productId = computed(() => route.params.id as string);

// При монтировании компонента загружаем данные продукта
onMounted(async () => {
  console.log('Edit product page - Component mounted. Loading product:', productId.value);
  try {
    await productStore.fetchProductById(productId.value);
    console.log('Edit product page - Product loaded:', productStore.currentProduct);
  } catch (error) {
    console.error('Edit product page - Failed to load product:', error);
  }
});

// Устанавливаем метаданные страницы
useHead({
  title: 'Редактирование продукта - FoodFlow',
  meta: [
    { name: 'description', content: 'Редактирование информации о продукте в системе FoodFlow' }
  ]
});

// Устанавливаем middleware для проверки авторизации
definePageMeta({
  middleware: ['auth']
});

console.log('Edit product page - Script setup completed');
</script>

<style lang="scss" scoped>
.edit-product-page {
  h1 {
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style> 