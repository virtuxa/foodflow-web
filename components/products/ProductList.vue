<template>
  <div class="product-list">
    <div v-if="isLoading" class="loading">
      Загрузка продуктов...
    </div>
    
    <div v-else-if="products && products.length === 0" class="no-products">
      <p>Продукты не найдены.</p>
      <button @click="navigateToCreate" class="btn btn-primary" v-if="isAuthenticated">
        Добавить продукт
      </button>
    </div>
    
    <div v-else-if="products && products.length > 0">
      <div class="products-grid">
        <div v-for="product in products" :key="product._id" class="product-card">
          <ProductCard :product="product" @refresh="fetchProducts" />
        </div>
      </div>
      
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="btn" 
          :class="{ 'btn-primary': currentPage > 1 }" 
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
        >
          Предыдущая
        </button>
        
        <span class="page-info">Страница {{ currentPage }} из {{ totalPages }}</span>
        
        <button 
          class="btn" 
          :class="{ 'btn-primary': currentPage < totalPages }" 
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
        >
          Следующая
        </button>
      </div>
    </div>
    
    <div v-else class="error">
      {{ productStore.error || 'Произошла ошибка при загрузке продуктов' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useProductStore } from '~/stores/products';
import { useAuthStore } from '~/stores/auth';
import ProductCard from '~/components/products/ProductCard.vue';

const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const totalPages = computed(() => productStore.getTotalPages);
const currentPage = computed(() => productStore.currentPage);
const isAuthenticated = computed(() => authStore.isLoggedIn);

const fetchProducts = () => {
  productStore.fetchProducts();
};

const setPage = (page: number) => {
  productStore.setPage(page);
  fetchProducts();
};

const navigateToCreate = () => {
  router.push('/products/create');
};

watch(() => route.query, (newQuery) => {
  if (newQuery.page) {
    const page = parseInt(newQuery.page as string) || 1;
    productStore.setPage(page);
  }
  
  if (newQuery.search) {
    productStore.setFilters({ search: newQuery.search as string });
  }
  
  if (newQuery.category) {
    productStore.setFilters({ category: newQuery.category as string });
  }
  
  fetchProducts();
}, { immediate: true });

onMounted(() => {
  fetchProducts();
});
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;
}

.loading, .no-products, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: var(--error-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  
  .page-info {
    margin: 0 1rem;
  }
}
</style> 