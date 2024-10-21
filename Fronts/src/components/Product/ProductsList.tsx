// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../Dashboard/Admin/ProductForm.interface';
import ProductItem from './ProductItem';
import axiosInstance from '../../utils/axiosInstance';

interface ProductListProps {
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onError, onLoading }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchProducts = async () => {
    if (onLoading) onLoading(true);
    try {
      const response = await axiosInstance.get('/products');
      console.log('Fetched products:', response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data.products) {
        setProducts(response.data.products);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('Unexpected response structure.');
        if (onError) onError('Unexpected response structure.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products.');
      if (onError) onError('Failed to fetch products.');
    } finally {
      if (onLoading) onLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {error && <p className="text-red-500">{error}</p>}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map(product => <ProductItem key={product._id} product={product} />)
      )}
    </div>
    </>

  );
};

export default ProductList;
