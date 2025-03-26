<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/">FoodFlow</NuxtLink>
        </div>
        
        <nav class="nav-menu">
          <ul>
            <li>
              <NuxtLink to="/">Главная</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products">Продукты</NuxtLink>
            </li>
            <li v-if="isAuthenticated">
              <NuxtLink to="/products/create" class="btn-create">
                <span class="icon">+</span> Добавить продукт
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <div class="auth-section">
          <template v-if="isAuthenticated">
            <div class="user-info">
              <div class="user-avatar">{{ userInitials }}</div>
              <div class="user-details">
                <span class="username">{{ user?.username }}</span>
                <span class="email">{{ user?.email }}</span>
              </div>
            </div>
            <button @click="logout" class="btn btn-secondary">Выйти</button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="btn btn-primary">Войти</NuxtLink>
            <NuxtLink to="/auth/register" class="btn">Регистрация</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

// Получаем инициалы пользователя для отображения в аватаре
const userInitials = computed(() => {
  if (!user.value?.username) return '';
  
  const name = user.value.username;
  return name.charAt(0).toUpperCase();
});

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style lang="scss" scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
}

.nav-menu {
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin-right: 1.5rem;
      
      a {
        color: var(--text-color);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
        
        &:hover, &.router-link-active {
          color: var(--primary-color);
        }
      }

      .btn-create {
        display: flex;
        align-items: center;
        background-color: var(--success-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: darken(#2ecc71, 10%);
          color: white;
        }
        
        .icon {
          margin-right: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .user-info {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    
    .user-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    
    .user-details {
      display: flex;
      flex-direction: column;
      
      .username {
        font-weight: 500;
      }
      
      .email {
        font-size: 0.8rem;
        color: #666;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu ul {
    flex-wrap: wrap;
    justify-content: center;
    
    li {
      margin: 0 0.5rem;
    }
  }
  
  .auth-section {
    margin-top: 0.5rem;
  }
}
</style> 