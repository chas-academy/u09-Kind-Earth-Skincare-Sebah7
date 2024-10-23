import React from 'react';
import axiosInstance from '../../../utils/axiosInstance';

interface DeleteProductButtonProps {
  productId: string;
  onDelete: () => void;
}

const DeleteProduct: React.FC<DeleteProductButtonProps> = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/products/products/${productId}`);
      onDelete();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Product</button>;
};

export default DeleteProduct;