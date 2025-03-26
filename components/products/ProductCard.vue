<template>
  <div class="card product-card" v-if="product">
    <div v-if="isAuthenticated" class="product-actions-ribbon">
      <button @click="navigateToEdit" class="action-btn edit-btn" title="Редактировать">
        <span>✏️</span>
      </button>
      <button @click="confirmDelete" class="action-btn delete-btn" title="Удалить">
        <span>🗑️</span>
      </button>
    </div>
    
    <div class="product-image" v-if="product.imageUrl">
      <img :src="product.imageUrl" :alt="product.name" />
    </div>
    <div class="product-image placeholder" v-else>
      <div class="placeholder-text">Нет изображения</div>
    </div>
    
    <div class="product-content">
      <h3 class="product-title">{{ product.name }}</h3>
      <div class="product-category">{{ product.category }}</div>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ formatPrice(product.price) }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useProductStore } from '~/stores/products';
import type { Product } from '~/types';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  refresh: [];
}>();

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();

const isAuthenticated = computed(() => authStore.isLoggedIn);

const formatPrice = (price: number): string => {
  if (typeof price !== 'number') return '0';
  return price.toLocaleString('ru-RU');
};

const navigateToEdit = () => {
  if (props.product && props.product._id) {
    router.push(`/products/edit/${props.product._id}`);
  }
};

const confirmDelete = async () => {
  if (!props.product || !props.product._id || !props.product.name) return;
  
  if (confirm(`Вы уверены, что хотите удалить продукт "${props.product.name}"?`)) {
    try {
      await productStore.deleteProduct(props.product._id);
      emit('refresh');
    } catch (error) {
      // Ошибка обрабатывается в сторе
    }
  }
};
</script>

<style lang="scss" scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    .product-actions-ribbon {
      opacity: 1;
    }
  }
}

.product-actions-ribbon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.3rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
  
  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    &.edit-btn {
      background-color: #f39c12;
      color: white;
    }
    
    &.delete-btn {
      background-color: #e74c3c;
      color: white;
    }
  }
}

.product-image {
  height: 200px;
  background-color: #f8f8f8;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .placeholder-text {
      color: #aaa;
      font-size: 0.9rem;
    }
  }
}

.product-content {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.product-category {
  color: #777;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  background-color: #f5f5f5;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.product-description {
  margin-bottom: auto;
  font-size: 0.95rem;
  line-height: 1.4;
}

.product-price {
  font-weight: bold;
  font-size: 1.3rem;
  margin: 1rem 0 0 0;
  color: var(--primary-color);
}
</style> 