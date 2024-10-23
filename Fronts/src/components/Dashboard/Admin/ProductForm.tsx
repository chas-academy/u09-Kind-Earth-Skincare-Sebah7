import React, { useState } from 'react';
import Button from "../../Shared/Button";
import { ProductFormData } from './ProductForm.interface';
import axiosInstance from '../../../utils/axiosInstance';

const categoriesEnum = [
  "cleanser", "moisturizer", "serum", "toner", "mask",
  "exfoliator", "sunscreen", "eye cream", "lip care", "treatment",];
const criteriaEnum = ["clean","vegan",
        "cruelty-free",
        "BDS-approved",
        "Not-in-BDS-list",];
const skinTypesEnum = ["dry", "oily", "combination", "sensitive", "normal"];
const skinConcernsEnum = ["acne",
        "aging",
        "dark spots",
        "dryness",
        "oiliness",
        "pores",
        "redness",
        "sensitivity",];

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    categories: [],
    criteria: [],
    skinTypes: [],
    skinConcerns: [],
    ingredients: [],
    productImageUrl: '',
  });

  const [ingredientsCount, setIngredientsCount] = useState(1);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   
    const { name, value, type} = e.target;
    
    if (type === "checkbox") {
    const target = e.target as HTMLInputElement;
    const checked = target.checked;

    setFormData((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...(prevState[name as keyof typeof formData] as string[]), value]
        : (prevState[name as keyof typeof formData] as string[]).filter(
            (item) => item !== value
          ),
    }));
  } else if (name.startsWith('ingredients')) {
const ingredientIndex = Number(name.split('-')[1]);

    setFormData((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients.slice(0, ingredientIndex),
        value,
        ...prevState.ingredients.slice(ingredientIndex + 1),
      ],
    }));
  } else if (type === "file") {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
      setFormData(prevState => ({
        ...prevState,
 productImageUrl: reader.result as string,  
 }));
      };
      reader.readAsDataURL(file);
    }
    } else if ((e.target as HTMLSelectElement).multiple) {

   const target = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(target.selectedOptions)
        .map(option => option.value);
    
    setFormData(prev => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } 
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
    }));
  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Not autherozised to perform this action!");
        return;
      }

    try {
      await axiosInstance.post('/products', formData);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
    <div className='border shadow rounded-lg px-8 bg-glass backdrop-blur-glass'>
<form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

  <h2 className="col-span-2 text-center text-2xl font-semibold text-gray-700">Add a Product</h2>

<div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">General Information</h3>

      <div className="mb-4">
        <label htmlFor="name" 
        className="block text-sm font-medium text-gray-700">
          Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"

        />
      </div>

      <div className="mb-4">
        <label htmlFor="description"
        className="block text-sm font-medium text-gray-700">
          Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="categories"
        className="block text-sm font-medium text-gray-700">
          Categories</label>
        <div className="mt-1">
    {categoriesEnum.map((category) => (
      <div key={category} className="flex items-center">
        <input
          type="checkbox"
          name="categories"
          value={category}
          checked={formData.categories.includes(category)}
          onChange={handleChange}
          className="mr-2"
        />
        <label>{category}</label>
      </div>
    ))}
  </div>
      </div>

      <div className="mb-4">
        <label htmlFor="criteria"
        className="block text-sm font-medium text-gray-700">
          Criteria</label>
        <div className="mt-1">
    {criteriaEnum.map((criteria) => (
      <div key={criteria} className="flex items-center">
        <input
          type="checkbox"
          name="criteria"
          value={criteria}
          checked={formData.criteria.includes(criteria)}
          onChange={handleChange}
          className="mr-2"
        />
        <label>{criteria}</label>
      </div>
    ))}
  </div>
      </div>
</div>

<div className='bg-white p-6 rounded-lg shadow-md'>
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Skin Information</h3>

      <div className="mb-4">
        <label htmlFor="criteria"
        className="block text-sm font-medium text-gray-700">
          Skin Type</label>
        <div className="mt-1">
    {skinTypesEnum.map((skinTypes) => (
      <div key={skinTypes} className="flex items-center">
        <input
          type="checkbox"
          name="skinTypes"
          value={skinTypes}
          checked={formData.skinTypes.includes(skinTypes)}
          onChange={handleChange}
          className="mr-2"
        />
        <label>{skinTypes}</label>
      </div>
    ))}
  </div>
</div>

<div className="mb-4">
        <label htmlFor="criteria"
        className="block text-sm font-medium text-gray-700">
          Skin Concerns</label>
        <div className="mt-1">
    {skinConcernsEnum.map((skinConcerns) => (
      <div key={skinConcerns} className="flex items-center">
        <input
          type="checkbox"
          name="skinConcerns"
          value={skinConcerns}
          checked={formData.skinConcerns.includes(skinConcerns)}
          onChange={handleChange}
          className="mr-2"
        />
        <label>{skinConcerns}</label>
      </div>
    ))}
  </div>
</div>

</div>

<div className="bg-white p-6 rounded-lg shadow-md">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingridients</h3>

<div className="mb-4">
        <label htmlFor="ingredients"
        className="block text-sm font-medium text-gray-700">
          Ingredients</label>
          {[...Array(ingredientsCount)].map((_, index) => (
            <div key={index}>
        <input
          type="text"
        name={`ingredients-${index}`}
        value={formData.ingredients[index] || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-2 border border-gray-300 
          rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
    className="inline-block mt-2 text-sm text-gray-700"
  >
    Add Ingredient
  </button>
      </div>

</div>

<div className="bg-white p-6 rounded-lg shadow-md">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Image</h3>
<label htmlFor="productImageUrl"
className="block text-sm font-medium text-gray-700">
    Product Image</label>
        <input
          type="file"
          name="productImageUrl"
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        <div className="mt-4 h-32 w-full flex items-center justify-center border border-dashed border-gray-300 rounded-md">
{formData.productImageUrl
? (
            <img 
            src={formData.productImageUrl} alt="Image preview" className="h-full w-auto object-contain" />
          ) : (
            <span className="text-gray-500">Image Preview</span>
          )}
          </div>
</div>

<div 
            className="col-span-2 flex justify-center"
            >
              <Button text="Create Product" type="submit"/>
</div>

    </form>
    </div>
    </>
  );
};

export default ProductForm;
