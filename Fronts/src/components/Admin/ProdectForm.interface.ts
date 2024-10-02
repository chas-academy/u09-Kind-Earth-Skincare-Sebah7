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
