export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
} 