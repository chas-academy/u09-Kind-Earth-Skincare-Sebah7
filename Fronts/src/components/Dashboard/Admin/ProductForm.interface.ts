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
  _id: string;
  rating?: number;
  [key: string]: unknown;
}
