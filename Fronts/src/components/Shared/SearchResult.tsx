import { useLocation } from 'react-router-dom';
import { Product } from '../Dashboard/Admin/ProductForm.interface';
import SearchBar from './SearchBar';
import ProductItem from '../Product/ProductItem';

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults as Product[] || [];

  return (
    <>

    {/* Search Area */}
<div 
className='relative top-15 left-1/2 transform -translate-x-1/2 w-3/4 z-[3]'>
  <SearchBar />
</div>

      <h2>Your Search Results Below!</h2>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
          {searchResults.map((product) => (
            <ProductItem key={product._id} product={product} />

          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
};

export default SearchResultsPage;
