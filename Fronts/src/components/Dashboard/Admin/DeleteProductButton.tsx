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

  return <button className=' text-white flex w-full items-center justify-center 
  rounded-lg border-none
  bg-clayAsh
  px-10 py-[7.3px] transition duration-200 
  ease-in-out hover:bg-formPrimaryText 
  hover:scale-105 active:scale-95 active:gb-neutral-700' onClick={handleDelete}>Delete Product</button>;
};

export default DeleteProduct;