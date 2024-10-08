import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/Product/ProductsList';
import { Product } from '../components/Admin/ProductForm.interface';

const ProductsPage: React.FC = () => {
const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

 const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    console.log('Fetched products:', response.data);
    if (Array.isArray(response.data)) {
      setProducts(response.data);
    } else if (response.data.products) {
      setProducts(response.data.products);
    } else {
      console.error('Unexpected response structure:', response.data);
      setError('Unexpected response structure.');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    setError('Failed to fetch products.');
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
