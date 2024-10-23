import React, { useEffect, useState } from "react";
import { useSearchBar } from "../../hooks/useSearchBar";
import { PacmanLoader } from "react-spinners";
import catImage from '../../assets/category.jpg';

interface CategoryProps {
  title: string;
   type: "categories" | "criteria" | "skinTypes" | "skinConcerns";
  onViewAll: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, type, onViewAll }) => {
  const {handleSubmit} = useSearchBar();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/products/enums");
        const data = await response.json();
        setItems(
          type === "categories"
            ? data.categories
            : type === "criteria"
            ? data.criteria
            : type === "skinTypes"
            ? data.skinTypes
            : data.skinConcerns
        );
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type]);

  const handleCategoryClick = (filter:string) => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent, { [type]: filter });
  };


  const limitedItems = items.slice(0, 5);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold italic">{title}</h2>
        <a onClick={onViewAll} className="italic text-lg text-gray-700 hover:underline">
          View all
        </a>
      </div>

    <div className="w-full mb-3 h-0.5 bg-primaryText"></div>


      {/* Category grid */}
      <div className="grid grid-cols-3 gap-6">
        {loading ? (
          <PacmanLoader color="#91b553" />
        ) : (
        limitedItems.map((item, index) => (
          <div
            key={index}
            className="h-40 rounded-md flex justify-center items-center shadow-md"
          style={{
                backgroundImage: `url(${catImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            onClick={() => handleCategoryClick(item)}
          >

            <p className="font-semibold italic text-lg">{item}</p>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
