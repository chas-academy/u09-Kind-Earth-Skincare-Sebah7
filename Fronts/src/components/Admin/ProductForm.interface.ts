export interface ProductFormData {
  name: string;
  description: string;
  categories: string[];
  criteria: string[];
  skinTypes: string[];
  skinConcerns: string[];
  ingredients: string[];
  price: string;
  productImageUrl?: string | null;
}

// Interface for product fetched from the backend
export interface Product extends ProductFormData {
  _id: string; // Include MongoDB ID for the product
  rating?: number; // Optional rating from your backend
}
