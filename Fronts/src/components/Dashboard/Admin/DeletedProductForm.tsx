// DeleteProductForm.tsx
import React, { useState, useEffect, Key } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import DeleteProductButton from './DeleteProductButton';

interface Product {
  _id: Key | null | undefined;
  name: string;
}

const DeleteProductForm: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleDelete = () => {
    setProductList(productList.filter(product => product._id !== selectedProductId));
    setSelectedProductId(null);
  };

  return (
    <div>
      <h2>Delete Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>Select Product:</label>
        <select onChange={(e) => handleProductSelect(e.target.value)} value={selectedProductId || ''} className='p-2 m-2 w-1/2'>
          <option value="" disabled>Select a product</option>
          {productList.map((product) => (
            <option key={product._id} value={String(product._id)}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProductId && (
        <DeleteProductButton productId={selectedProductId} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default DeleteProductForm;