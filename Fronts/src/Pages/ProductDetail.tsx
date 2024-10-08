import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../components/Admin/ProductForm.interface';
import Button from '../components/Shared/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);

  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Product details not found...</p>;
  }

  return (
    <>
    <div className="p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">

      
<div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
<div className="w-full lg:sticky top-0 text-center">
{/* Product Image */}
{product.productImageUrl && (
  <div className="lg:h-[560px]">
          <img 
            src={product.productImageUrl} 
            alt={product.name} 
            className="lg:w-11/12 w-full h-full rounded-md object-cover object-top" 
          />
          </div>
      )}
</div>

<div>
{/* <div className="flex flex-wrap items-start gap-4"> */}
<h2 className="text-2xl font-bold">{product.name}</h2>
 {/* </div> */}

<hr className="my-8" />
                      
<div className="flex flex-wrap gap-4 items-start">
      {product.price && (
        <div className="mb-4">
          <h4 className="font-semibold">Price estimate:</h4>
          <p>${product.price}</p>
        </div>
      )}


</div>

<hr className="my-8" />

      {/* Display categories */}
      <div className="mb-4">
        <h3 className="text-xl font-bold">Categories:</h3>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.categories.map((category, index) => (
            <li key={index} className='font-semibold text-sm rounded-md flex items-center justify-center shrink-0'>{category}</li>
          ))}
        </ul>        
      </div>

<hr className="my-8" />

      {/* Display criteria */}
      <div className="mb-4">
        <h4 className="text-xl font-bold">Criteria:</h4>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.criteria.map((criterion, index) => (
            <li key={index} className='font-semibold text-sm rounded-md flex items-center justify-center shrink-0'>{criterion}</li>
          ))}
        </ul>
      </div>

<hr className="my-8" />

      {/* Display skin concerns */}
      <div className="mb-4">
        <h4 className="text-xl font-bold">Skin Concerns:</h4>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.skinConcerns.map((concern, index) => (
            <li key={index} className='font-semibold text-sm rounded-md flex items-center justify-center shrink-0'>{concern}</li>
          ))}
        </ul>
      </div>

<hr className="my-8" />

      {/* Display skin types */}
      <div className="mb-4">
        <h4 className="text-xl font-bold">Skin Types:</h4>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.skinTypes.map((type, index) => (
            <li key={index} className='font-semibold text-sm rounded-md flex items-center justify-center shrink-0'>{type}</li>
          ))}
        </ul>
      </div>

<hr className="my-8" />

      {/* Display ingredients */}
      <div className="mb-4">
        <h4 className="text-xl font-bold">Ingredients:</h4>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-4">
          {product.ingredients.map((ingredient, index) => (
            <li key={index} 
            className='font-semibold text-sm rounded-md flex items-center justify-center shrink-0'>{ingredient}</li>
          ))}
        </ul>
    </div>

<hr className="my-8" />
   
<div className="flex flex-wrap gap-4">
<Button text="Add to Routine" type="submit"/>
</div>               
</div>
</div>

  <div className="mt-20 max-w-4xl">
      {/* Tab Navigation */}
      <ul className="flex border-b list-disc list-inside">
        <li
          className={`cursor-pointer list-none text-sm py-3 px-8 font-semibold transition-all ${
            activeTab === 'description'
              ? 'text-gray-800 bg-gray-100 border-b-2 border-gray-800'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => handleTabClick('description')}
        >
          Description
        </li>
        <li
          className={`cursor-pointer list-none text-sm py-3 px-8 font-semibold transition-all ${
            activeTab === 'reviews'
              ? 'text-gray-800 bg-gray-100 border-b-2 border-gray-800'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'description' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
            <p className="text-sm text-gray-500 mt-4">{product.description}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800">Product Reviews</h3>
            <p className="text-sm text-gray-500 mt-4">{product.rating}</p>
          </div>
        )}
      </div>
    </div>
    
    </div>
    </>
  );
};

export default ProductDetail;
