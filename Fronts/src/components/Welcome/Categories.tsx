import React from "react";

const categories = [
  { name: "Cleansers" },
  { name: "Toners" },
  { name: "Masks" },
  { name: "Serums" },
  { name: "Moisturizers" }
];

interface CategoryProps {
  title: string; 
}

const Category: React.FC<CategoryProps> = ({ title }) => {

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold italic">{title}</h2>
        <a href="#" className="italic text-lg text-gray-700 hover:underline">
          View all
        </a>
      </div>

    <div className="w-full mb-3 h-0.5 bg-primaryText"></div>


      {/* Category grid */}
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white h-40 rounded-md flex justify-center items-center shadow-md"
          >
            <p className="font-semibold italic text-lg">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
