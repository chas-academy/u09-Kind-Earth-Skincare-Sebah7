import React, { useState, useEffect } from 'react';
import { Product } from './ProductForm.interface';
import Button from "../../Shared/Button";

const categoriesEnum = [
  "cleanser", "moisturizer", "serum", "toner", "mask",
  "exfoliator", "sunscreen", "eye cream", "lip care", "treatment",
];

const criteriaEnum = [
  "clean", "vegan", "cruelty-free", "BDS-approved", "Not-in-BDS-list",
];

const skinTypesEnum = ["dry", "oily", "combination", "sensitive", "normal"];
const skinConcernsEnum = [
  "acne", "aging", "dark spots", "dryness", "oiliness",
  "pores", "redness", "sensitivity",
];

interface UpdateProductFormUIProps {
  productData: Partial<Product>;
  onUpdate: (updatedProductData: Partial<Product>) => void;
}

const UpdateProductFormUI: React.FC<UpdateProductFormUIProps> = ({ productData, onUpdate }) => {
  const [productDataState, setProductData] = useState(productData);
  const [ingredientsCount, setIngredientsCount] = useState(productData.ingredients?.length || 1);

  useEffect(() => {
    setProductData(productData);
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      const checked = target.checked;

      setProductData((prev) => ({
        ...prev!,
        [name]: checked
          ? [...(prev![name] as string[]), value]
          : (prev![name] as string[]).filter((item) => item !== value),
      }));
    } else if (type === "file") {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductData((prev) => ({
            ...prev!,
            productImageUrl: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if ((e.target as HTMLSelectElement).multiple) {
      const target = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(target.selectedOptions).map(option => option.value);

      setProductData(prev => ({
        ...prev!,
        [name]: selectedOptions,
      }));
    } else {
      setProductData(prev => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(productDataState);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg max-w-5xl mx-auto">

      <div className='flex flex-col lg:flex-row lg:gap-8 justify-center'>
        <div className="bg-white p-6 mb-2 rounded-lg shadow-md flex-1">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input 
            type="text"
            name="name"
            value={productDataState.name || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={productDataState.description || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
          {[...Array(ingredientsCount)].map((_, index) => (
            <div key={index}>
              <input
                type="text"
                name={`ingredients-${index}`}
                value={productDataState.ingredients?.[index] || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
              {ingredientsCount !== 1 && index >= 1 && (
                <button
                  onClick={() => setIngredientsCount(count => count - 1)}
                  className="mt-2 mr-2 text-sm text-gray-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setIngredientsCount(count => count + 1)}
            className="inline-block text-sm text-gray-700"
          >
            Add Ingredient
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories</label>
          <div className="mt-1">
            {categoriesEnum.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={productDataState.categories?.includes(category) || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">Criteria</label>
          <div className="mt-1">
            {criteriaEnum.map((criteria) => (
              <div key={criteria} className="flex items-center">
                <input
                  type="checkbox"
                  name="criteria"
                  value={criteria}
                  checked={productDataState.criteria?.includes(criteria) || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{criteria}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-white p-6 mb-2 rounded-lg shadow-md flex-1'>

<div className="mb-4">
        <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700">Product Image</label>
        <input
          type="file"
          name="productImageUrl"
          onChange={handleChange}
          className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        <div className="mt-4 h-32 w-full flex items-center justify-center border border-dashed border-gray-300 rounded-md">
          {productDataState.productImageUrl ? (
            <img 
              src={productDataState.productImageUrl} alt="Image preview" className="h-full w-auto object-contain" />
          ) : (
            <span className="text-gray-500">Image Preview</span>
          )}
        </div>
      </div>

        <div className="mb-4">
          <label htmlFor="skinTypes" className="block text-sm font-medium text-gray-700">Skin Type</label>
          <div className="mt-1">
            {skinTypesEnum.map((skinType) => (
              <div key={skinType} className="flex items-center">
                <input
                  type="checkbox"
                  name="skinTypes"
                  value={skinType}
                  checked={productDataState.skinTypes?.includes(skinType) || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{skinType}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="skinConcerns" className="block text-sm font-medium text-gray-700">Skin Concerns</label>
          <div className="mt-1">
            {skinConcernsEnum.map((skinConcern) => (
              <div key={skinConcern} className="flex items-center">
                <input
                  type="checkbox"
                  name="skinConcerns"
                  value={skinConcern}
                  checked={productDataState.skinConcerns?.includes(skinConcern) || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{skinConcern}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>    

      <div className="col-span-2 flex justify-center">
        <Button text="Update Product" type="submit"/>
      </div>
    </form>
  );
};

export default UpdateProductFormUI;