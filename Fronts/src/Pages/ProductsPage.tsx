import React, { useState } from 'react';
import ProductList from '../components/Product/ProductsList';
import SearchBar from '../components/Shared/SearchBar';
import { PacmanLoader } from 'react-spinners';

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>

    <div className='relative top-15 left-1/2 transform -translate-x-1/2 w-3/4 z-[3]'>
        <SearchBar />
      </div>
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {loading && <PacmanLoader color="#91b553" />} {/* Loading indicator */}
        <ProductList onLoading={setLoading} />
      </div>
    </>

  );
};

export default ProductsPage;
