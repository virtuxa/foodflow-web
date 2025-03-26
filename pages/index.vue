<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1>FoodFlow</h1>
        <p>Современный сервис для управления продуктами питания</p>
        <div class="hero-buttons">
          <NuxtLink to="/products" class="btn btn-primary">Посмотреть продукты</NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/auth/register" class="btn btn-secondary">Зарегистрироваться</NuxtLink>
          <NuxtLink v-else to="/products/create" class="btn btn-secondary">Добавить продукт</NuxtLink>
        </div>
      </div>
    </section>
    
    <section class="features">
      <h2>Возможности сервиса</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Управление продуктами</h3>
          <p>Добавляйте, редактируйте и удаляйте продукты в вашем каталоге</p>
        </div>
        
        <div class="feature-card">
          <h3>Категоризация</h3>
          <p>Организуйте продукты по категориям для удобного поиска и фильтрации</p>
        </div>
        
        <div class="feature-card">
          <h3>Поиск и фильтрация</h3>
          <p>Легко находите нужные продукты с помощью поиска и различных фильтров</p>
        </div>
        
        <div class="feature-card">
          <h3>Защищенный доступ</h3>
          <p>Безопасное хранение и управление данными с системой аутентификации</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isLoggedIn);
</script>

<style lang="scss" scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, #304b7a 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}

.features {
  margin-bottom: 3rem;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    h3 {
      color: var(--primary-color);
      margin-top: 0;
    }
  }
}

@media (max-width: 768px) {
  .hero .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style> 