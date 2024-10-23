import React, { useState, useEffect, Key } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { Product } from './ProductForm.interface';
import UpdateProductFormUI from './UpdateProductFormUI';

interface UpdateProductFormProps {
  onUpdate: () => void;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ onUpdate }) => {
  const [productList, setProductList] = useState<{ _id: Key | null | undefined; id: string; name: string }[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productData, setProductData] = useState<Partial<Product> | null>(null);
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProductId) {
        try {
          const response = await axiosInstance.get(`/products/${selectedProductId}`);
          setProductData(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setError('Failed to fetch product details.');
        }
      } else {
        setProductData(null);
      }
    };

    fetchProductDetails();
  }, [selectedProductId]);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleUpdate = async (updatedProductData: Partial<Product>) => {
    if (!updatedProductData || !selectedProductId) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Not authorized to perform this action!");
        return;
      }

      await axiosInstance.put(`/products/products/${selectedProductId}`, updatedProductData);
      onUpdate();
      setSelectedProductId(null);
      setProductData(null);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
    }
  };

  return (
    <>
    <div className='border shadow rounded-lg px-8 bg-glass backdrop-blur-glass'>
      <h2>Update Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>Select Product:</label>
        <select onChange={(e) => handleProductSelect(e.target.value)} 
        value={selectedProductId || ''}
        className='p-2 m-2 w-1/2'>
          <option value="" disabled>Select a product</option>
          {productList.map((product) => (
            <option key={product._id} value={String(product._id)}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      {productData && (
        <UpdateProductFormUI productData={productData} onUpdate={handleUpdate} />
      )}
    </div>
    </>
  );
};

export default UpdateProductForm;
