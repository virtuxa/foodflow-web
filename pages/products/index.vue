<template>
  <div class="products-page">
    <div class="page-header">
      <h1>Каталог продуктов</h1>
      
      <div v-if="isAuthenticated" class="action-buttons">
        <NuxtLink to="/products/create" class="btn btn-success">
          <span class="icon">+</span> Добавить продукт
        </NuxtLink>
      </div>
    </div>
    
    <div class="auth-banner" v-if="!isAuthenticated">
      <div class="banner-content">
        <div class="banner-icon">🔒</div>
        <div class="banner-text">
          <h3>Войдите, чтобы управлять продуктами</h3>
          <p>Для добавления, редактирования и удаления продуктов необходима авторизация</p>
        </div>
        <div class="banner-actions">
          <NuxtLink to="/auth/login" class="btn btn-primary">Войти</NuxtLink>
          <NuxtLink to="/auth/register" class="btn">Регистрация</NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="controls-section">
      <ProductFilter />
    </div>
    
    <ProductList />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import ProductList from '~/components/products/ProductList.vue';
import ProductFilter from '~/components/products/ProductFilter.vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isLoggedIn);

// Устанавливаем метаданные страницы
useHead({
  title: 'Каталог продуктов - FoodFlow',
  meta: [
    { name: 'description', content: 'Просмотрите наш каталог продуктов питания' }
  ]
});
</script>

<style lang="scss" scoped>
.products-page {
  h1 {
    margin-bottom: 1rem;
  }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .action-buttons {
    .btn-success {
      background-color: var(--success-color);
      color: white;
      display: flex;
      align-items: center;
      
      &:hover {
        background-color: darken(#2ecc71, 10%);
      }
      
      .icon {
        font-weight: bold;
        margin-right: 0.3rem;
      }
    }
  }
}

.auth-banner {
  background-color: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .banner-content {
    display: flex;
    align-items: center;
    
    .banner-icon {
      font-size: 2rem;
      margin-right: 1.5rem;
    }
    
    .banner-text {
      flex: 1;
      
      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }
      
      p {
        margin: 0;
        color: #666;
      }
    }
    
    .banner-actions {
      display: flex;
      gap: 0.5rem;
    }
  }
}

.controls-section {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .auth-banner .banner-content {
    flex-direction: column;
    text-align: center;
    
    .banner-icon {
      margin-right: 0;
      margin-bottom: 1rem;
    }
    
    .banner-text {
      margin-bottom: 1rem;
    }
  }
}
</style> 