<template>
  <div class="filter-container">
    <div class="search-box">
      <input 
        type="text"
        v-model="searchQuery"
        placeholder="Поиск продуктов..."
        @input="debounceSearch"
      />
    </div>
    
    <div class="filter-box">
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="">Все категории</option>
        <option value="Молочные продукты">Молочные продукты</option>
        <option value="Мясо">Мясо</option>
        <option value="Овощи и фрукты">Овощи и фрукты</option>
        <option value="Бакалея">Бакалея</option>
        <option value="Напитки">Напитки</option>
        <option value="Замороженные продукты">Замороженные продукты</option>
        <option value="Снэки">Снэки</option>
        <option value="Хлебобулочные изделия">Хлебобулочные изделия</option>
      </select>
    </div>
    
    <div class="sort-box">
      <select v-model="selectedSort" @change="applyFilters">
        <option value="">Сортировка по умолчанию</option>
        <option value="name_asc">По названию (А-Я)</option>
        <option value="name_desc">По названию (Я-А)</option>
        <option value="price_asc">По цене (сначала дешевле)</option>
        <option value="price_desc">По цене (сначала дороже)</option>
      </select>
    </div>
    
    <div class="filter-actions" v-if="hasActiveFilters">
      <button @click="clearFilters" class="btn">
        Сбросить фильтры
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProductStore } from '~/stores/products';
import { useRoute, useRouter } from 'nuxt/app';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('');
const selectedSort = ref('');
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

// Проверяем, есть ли активные фильтры
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || selectedSort.value;
});

// Применить фильтры и обновить URL
const applyFilters = () => {
  const query: Record<string, string> = {};
  
  if (searchQuery.value) {
    query.search = searchQuery.value;
  }
  
  if (selectedCategory.value) {
    query.category = selectedCategory.value;
  }
  
  if (selectedSort.value) {
    query.sort = selectedSort.value;
  }
  
  // Сбрасываем страницу на первую при изменении фильтров
  query.page = '1';
  
  // Обновляем URL
  router.push({ query });
};

// Отложенный поиск для предотвращения лишних запросов
const debounceSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
};

// Очистить все фильтры
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedSort.value = '';
  applyFilters();
};

// Инициализация значений из URL при загрузке
watch(() => route.query, (newQuery) => {
  searchQuery.value = (newQuery.search as string) || '';
  selectedCategory.value = (newQuery.category as string) || '';
  selectedSort.value = (newQuery.sort as string) || '';
}, { immediate: true });
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-box {
  flex: 1 1 300px;
  
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
}

.filter-box, .sort-box {
  flex: 1 1 200px;
  
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
}

.filter-actions {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
  }
  
  .search-box, .filter-box, .sort-box {
    width: 100%;
  }
}
</style> 