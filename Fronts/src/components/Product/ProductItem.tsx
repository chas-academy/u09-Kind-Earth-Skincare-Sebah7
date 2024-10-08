import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../Admin/ProductForm.interface';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="p-2 border rounded-md shadow-md cursor-pointer" onClick={handleProductClick}>
      <h3 className="text-lg font-bold">{product.name}</h3>

      {/* Display product image */}
      {product.productImageUrl && (
        <div className="mt-4">
          <img 
            src={product.productImageUrl} 
            alt={product.name} 
            className="w-full h-auto object-cover" 
          />
        </div>
      )}

      {/* Display skin types */}
      <div className="mt-2">
        <h4 className="font-semibold">Skin Types:</h4>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.skinTypes.map((type, index) => (
            <li className='list-none' key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
