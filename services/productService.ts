import { useApi } from './api';
import { useAxios } from '~/composables/useAxios';
import type { Product, ProductCreate } from '~/types';
import { useAuthStore } from '~/stores/auth';

// Интерфейс ответа для продуктов
interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Интерфейс API ответа
interface ApiProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export const useProductService = () => {
  const api = useApi();
  const authStore = useAuthStore();
  
  const getSecureApi = () => {
    return useAxios(authStore.token || undefined);
  };
  
  return {
    async getProducts(page = 1, limit = 10, search = '', sort = '', category = ''): Promise<ProductsResponse> {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (search) params.append('search', search);
      if (sort) params.append('sort', sort);
      if (category) params.append('category', category);
      
      const queryString = params.toString();
      
      try {
        const response = await api.get(`/products?${queryString}`);
        const apiResponse = response.data as ApiProductsResponse;
        
        if (apiResponse && Array.isArray(apiResponse.items)) {
          return {
            products: apiResponse.items,
            total: apiResponse.total || apiResponse.items.length,
            page: apiResponse.page || page,
            limit: apiResponse.limit || limit
          };
        } 
        
        if (Array.isArray(response.data)) {
          return {
            products: response.data,
            total: response.data.length,
            page,
            limit
          };
        }
        
        return {
          products: [],
          total: 0,
          page,
          limit
        };
      } catch (error) {
        throw error;
      }
    },
    
    async getProduct(id: string): Promise<Product> {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    
    async createProduct(product: ProductCreate): Promise<Product> {
      const secureApi = getSecureApi();
      const response = await secureApi.post('/products', product);
      return response.data;
    },
    
    async updateProduct(id: string, product: Partial<ProductCreate>): Promise<Product> {
      const secureApi = getSecureApi();
      const response = await secureApi.patch(`/products/${id}`, product);
      return response.data;
    },
    
    async deleteProduct(id: string): Promise<void> {
      const secureApi = getSecureApi();
      await secureApi.delete(`/products/${id}`);
    }
  };
}; 