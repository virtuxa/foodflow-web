import { defineStore } from 'pinia';
import { useProductService } from '~/services/productService';
import type { Product, ProductCreate } from '~/types';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    isLoading: false,
    error: null as string | null,
    totalProducts: 0,
    currentPage: 1,
    itemsPerPage: 10,
    filters: {
      search: '',
      sort: '',
      category: ''
    }
  }),
  
  getters: {
    getProducts: (state) => state.products,
    getCurrentProduct: (state) => state.currentProduct,
    getTotalPages: (state) => Math.ceil(state.totalProducts / state.itemsPerPage)
  },
  
  actions: {
    setFilters(filters: { search?: string; sort?: string; category?: string }) {
      this.filters = { ...this.filters, ...filters };
    },
    
    setPage(page: number) {
      this.currentPage = page;
    },
    
    setItemsPerPage(limit: number) {
      this.itemsPerPage = limit;
    },
    
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      
      const productService = useProductService();
      
      try {
        const response = await productService.getProducts(
          this.currentPage,
          this.itemsPerPage,
          this.filters.search,
          this.filters.sort,
          this.filters.category
        );
        
        if (response && Array.isArray(response.products)) {
          this.products = response.products;
          this.totalProducts = response.total;
        } else {
          this.products = [];
          this.totalProducts = 0;
          this.error = 'Неверный формат данных от сервера';
        }
      } catch (error: any) {
        this.products = [];
        this.totalProducts = 0;
        this.error = error.response?.data?.message || 'Ошибка при загрузке продуктов';
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchProductById(id: string) {
      this.isLoading = true;
      this.error = null;
      
      const productService = useProductService();
      
      try {
        const product = await productService.getProduct(id);
        this.currentProduct = product;
        return product;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при загрузке продукта';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async createProduct(product: ProductCreate) {
      this.isLoading = true;
      this.error = null;
      
      const productService = useProductService();
      
      try {
        const newProduct = await productService.createProduct(product);
        this.products.unshift(newProduct);
        this.totalProducts++;
        return newProduct;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при создании продукта';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async updateProduct(id: string, product: Partial<ProductCreate>) {
      this.isLoading = true;
      this.error = null;
      
      const productService = useProductService();
      
      try {
        const updatedProduct = await productService.updateProduct(id, product);
        
        const index = this.products.findIndex(p => p._id === id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        
        if (this.currentProduct?._id === id) {
          this.currentProduct = updatedProduct;
        }
        
        return updatedProduct;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при обновлении продукта';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async deleteProduct(id: string) {
      this.isLoading = true;
      this.error = null;
      
      const productService = useProductService();
      
      try {
        await productService.deleteProduct(id);
        
        this.products = this.products.filter(p => p._id !== id);
        this.totalProducts--;
        
        if (this.currentProduct?._id === id) {
          this.currentProduct = null;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при удалении продукта';
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
}); 