// ProductList.tsx
import React from 'react';
import { Product } from '../Admin/ProductForm.interface';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
