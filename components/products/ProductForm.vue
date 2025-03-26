<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <h2>{{ isEditing ? 'Редактировать продукт' : 'Создать новый продукт' }}</h2>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div class="form-control">
      <label for="name">Название продукта</label>
      <input 
        id="name" 
        v-model="form.name" 
        type="text" 
        required 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-control">
      <label for="category">Категория</label>
      <select 
        id="category" 
        v-model="form.category" 
        required 
        :disabled="isLoading"
      >
        <option value="">Выберите категорию</option>
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
    
    <div class="form-control">
      <label for="price">Цена (₽)</label>
      <input 
        id="price" 
        v-model.number="form.price" 
        type="number" 
        min="0" 
        step="0.01" 
        required 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea 
        id="description" 
        v-model="form.description" 
        rows="4" 
        required 
        :disabled="isLoading"
      ></textarea>
    </div>
    
    <div class="form-control">
      <label for="imageUrl">URL изображения (необязательно)</label>
      <input 
        id="imageUrl" 
        v-model="form.imageUrl" 
        type="url" 
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-actions">
      <button type="button" @click="$router.back()" class="btn">
        Отмена
      </button>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Сохранение...' : (isEditing ? 'Обновить' : 'Создать') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '~/stores/products';
import type { Product, ProductCreate } from '~/types';

interface Props {
  productId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  productId: ''
});

const productStore = useProductStore();
const router = useRouter();

const isEditing = computed(() => !!props.productId);
const isLoading = computed(() => productStore.isLoading);
const error = computed(() => productStore.error);

const form = ref<ProductCreate>({
  name: '',
  price: 0,
  category: '',
  description: '',
  imageUrl: ''
});

onMounted(async () => {
  if (isEditing.value) {
    try {
      const product = await productStore.fetchProductById(props.productId);
      if (product) {
        form.value = {
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          imageUrl: product.imageUrl || ''
        };
      }
    } catch (error) {
      // Ошибка обрабатывается в сторе
    }
  }
});

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await productStore.updateProduct(props.productId, form.value);
    } else {
      await productStore.createProduct(form.value);
    }
    router.push('/products');
  } catch (error) {
    // Ошибка обрабатывается в сторе
  }
};
</script>

<style lang="scss" scoped>
.product-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.error-message {
  background-color: #ffebee;
  color: var(--error-color);
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style> 